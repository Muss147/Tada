import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/current-user";
import OpenAI from "openai";

export const runtime = "nodejs"; // pour être sûr de pouvoir utiliser le SDK OpenAI côté serveur

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

type AiAnswerJson = {
  answer: string;
  charts?: {
    type: string;
    subType?: string | null;
    title?: string;
    description?: string;
    data: any;
    config?: any;
  }[];
};

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const startedAt = Date.now();

  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: "OPENAI_API_KEY manquant côté serveur" },
        { status: 500 },
      );
    }

    const analysisId = params.id;
    const body = await req.json();
    const { question } = body as { question?: string };

    if (!question || !question.trim()) {
      return NextResponse.json(
        { error: "La question est obligatoire" },
        { status: 400 },
      );
    }

    // 1) Charger l’analyse + dataset + quelques infos de contexte
    const analysis = await prisma.aiAnalysis.findUnique({
      where: { id: analysisId },
      include: {
        dataset: true,
        workspace: true,
      },
    });

    if (!analysis) {
      return NextResponse.json(
        { error: "Analyse introuvable" },
        { status: 404 },
      );
    }

    // Autorisation minimale : créateur de l’analyse ou owner du dataset
    if (
      analysis.createdById !== user.id &&
      analysis.dataset.ownerId !== user.id
    ) {
      return NextResponse.json(
        { error: "Vous n'avez pas accès à cette analyse" },
        { status: 403 },
      );
    }

    const dataset = analysis.dataset;

    // 2) Construire le contexte envoyé au LLM
    const detectedSchema =
      typeof dataset.detectedSchema === "string"
        ? safeJsonParse(dataset.detectedSchema)
        : (dataset.detectedSchema as any);

    const sampleDataRaw =
      typeof dataset.sampleData === "string"
        ? safeJsonParse(dataset.sampleData)
        : (dataset.sampleData as any);

    const sampleData = Array.isArray(sampleDataRaw)
      ? sampleDataRaw.slice(0, 50) // on limite pour ne pas exploser le token count
      : [];

    const contextPayload = {
      dataset: {
        id: dataset.id,
        name: dataset.name,
        description: dataset.description,
        rowCount: dataset.rowCount,
        columnCount: dataset.columnCount,
        detectedSchema,
      },
      analysis: {
        id: analysis.id,
        title: analysis.title,
        type: analysis.type,
        filters: analysis.filters,
        settings: analysis.settings,
        language: analysis.language,
      },
      sampleData,
      question,
    };

    // 3) Appel LLM
    const systemPrompt = `
Tu es un assistant de data analyst pour un dashboard d'insights.
Tu reçois :
- le schéma des colonnes
- un échantillon de données (sampleData)
- la configuration de l'analyse (filters, settings)
- une question utilisateur

Ta réponse doit être un JSON **valide** (pas de texte autour), de la forme :

{
  "answer": "texte explicatif (en français)",
  "charts": [
    {
      "type": "bar" | "line" | "pie" | "kpi" | "table",
      "subType": "grouped" | "stacked" | null,
      "title": "Titre du graphique",
      "description": "Optionnel : explication courte",
      "data": { ... }, // labels/datasets OU structure adaptée pour un KPI
      "config": {
        "xField": "nom de la variable",
        "yField": "nom de la variable",
        "aggregation": "sum" | "avg" | "count",
        "breakdownField": "optionnel"
      }
    }
  ]
}

- Toujours inclure "answer".
- "charts" peut être omis si la question ne nécessite pas de graphique.
- Ne pas inclure de backticks, ni de commentaire, ni de texte hors JSON.
`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4.1-mini",
      temperature: 0.2,
      messages: [
        {
          role: "system",
          content: systemPrompt,
        },
        {
          role: "user",
          content: JSON.stringify(contextPayload),
        },
      ],
    });

    const content = completion.choices[0].message?.content ?? "{}";

    let parsed: AiAnswerJson;
    try {
      parsed = JSON.parse(content) as AiAnswerJson;
    } catch (e) {
      // fallback si le modèle a renvoyé du texte chelou
      parsed = {
        answer: content,
      };
    }

    if (!parsed.answer) {
      parsed.answer = "Analyse générée, mais without answer explicite.";
    }

    const latencyMs = Date.now() - startedAt;
    const modelUsed = completion.model;

    // 4) Sauvegarder la query dans AiAnalysisQuery
    const queryRecord = await prisma.aiAnalysisQuery.create({
      data: {
        analysisId: analysis.id,
        userId: user.id,
        question: question.trim(),
        answer: parsed.answer,
        answerJson: parsed,
        model: modelUsed,
        latencyMs,
      },
    });

    // 5) Optionnel : créer des charts à partir de answerJson.charts
    if (parsed.charts && parsed.charts.length > 0) {
      await prisma.$transaction(async (tx) => {
        // Ici, choix simple : on ajoute les nouveaux charts à la suite
        const existingCount = await tx.aiAnalysisChart.count({
          where: { analysisId: analysis.id },
        });

        let order = existingCount;

        for (const c of parsed.charts!) {
          order++;

          await tx.aiAnalysisChart.create({
            data: {
              analysisId: analysis.id,
              type: c.type,
              subType: c.subType ?? null,
              title: c.title ?? null,
              description: c.description ?? null,
              chartData: c.data,
              config: c.config ?? null,
              layout: null,
              order,
            },
          });
        }
      });
    }

    // 6) Retour API : question + réponse + éventuels charts créés
    return NextResponse.json(
      {
        success: true,
        query: {
          id: queryRecord.id,
          question: queryRecord.question,
          answer: queryRecord.answer,
          answerJson: queryRecord.answerJson,
          model: queryRecord.model,
          latencyMs: queryRecord.latencyMs,
          createdAt: queryRecord.createdAt,
        },
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("[AI_ANALYSIS_QUERY_POST_ERROR]", error);
    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 },
    );
  }
}

// Petit helper safe pour JSON.parse
function safeJsonParse(input: unknown): any {
  if (typeof input !== "string") return input;
  try {
    return JSON.parse(input);
  } catch {
    return null;
  }
}
