import { BarChartCard } from "@/components/missions/boards/graphs/bar-chart";
import { BarChartHorizontalCard } from "@/components/missions/boards/graphs/bar-chart-horizontal";
import { BarChartHorizontalStackedCard } from "@/components/missions/boards/graphs/bar-chart-horizontal-stacked";
import { BarChartStackedCard } from "@/components/missions/boards/graphs/bar-chart-stacked";
import { PieChartCard } from "@/components/missions/boards/graphs/pie-chart";
import { RadarChartCard } from "@/components/missions/boards/graphs/radar-chart";
import { ArrayChartCard } from "@/components/missions/boards/graphs/array-chart";
import { ChartConfig } from "@/components/missions/boards/graphs/ui/chart";
import { prisma } from "@/lib/prisma";
import {
  convertPrismaSurveyToSurveyData,
  extractAllQuestionsDataWithConfig,
  QuestionData,
} from "@/lib/utils";
import {
  extractResponsesForQuestion,
  formatChartDataFromResponses,
  generateChartConfigFromData,
  extractPrimaryKeysFromRatingData,
  extractRatingRange,
} from "@/lib/chart-data-formatter";
import { notFound } from "next/navigation";
import { MyRuntimeProvider } from "./my-runtime-provider";
import { AssistantModal } from "@tada/ui/components/assistant-ui/assistant-modal";
import FilterChangeChartType from "@/components/missions/boards/modals/filter-change-chart-type";
import { InsightsSection } from "@/components/missions/boards/insights-section";
import type { VisualizationId } from "@/lib/chart-types";
import MissionDashboardClient from "./mission-dashboard-client";

export const metadata = {
  title: "Mission | Tada",
};

export default async function Page({
  params,
}: {
  params: { locale: string; workspaceId: string; missionId: string };
}) {
  const { missionId } = params;

  const mission = await prisma.mission.findUnique({
    where: { id: missionId },
    select: {
      id: true,
      name: true,
      status: true,
      createdAt: true,
      updatedAt: true,
      executiveSummary: true,
      executiveSummaryUpdatedAt: true,
      survey: {
        select: {
          id: true,
          questions: true,
          response: {
            where: { status: "completed" },
            select: {
              id: true,
              responses: true,
              age: true,
              gender: true,
              location: true,
              status: true,
            },
          },
        },
      },
      missionCharts: {
        where: {
          status: "published",
        },
        orderBy: {
          dashboardOrder: "asc",
        },
      },
    },
  });

  if (!mission) {
    notFound();
  }

  if (
    !mission.survey?.[0]?.response ||
    mission.survey[0].response.length === 0
  ) {
    return (
      <div className="p-6 text-center">
        <h1 className="text-xl font-bold">Aucune réponse disponible</h1>
        <p className="text-gray-500 mt-2">
          Il n’y a pas encore de réponses pour cette mission.
        </p>
      </div>
    );
  }

  const responseDb = convertPrismaSurveyToSurveyData(mission as any);
  const surveyResponses = mission.survey[0].response || [];

  let questionsData: QuestionData[] = [];

  // 1) On privilégie les missionCharts (config sauvegardée)
  if (mission.missionCharts && mission.missionCharts.length > 0) {
    questionsData = mission.missionCharts
      .map((chart) => {
        const chartData = chart.chartData as any;

        if (!chartData?.question || !chartData?.type) return null;

        const questionResponses = extractResponsesForQuestion(
          surveyResponses,
          chartData.question
        );

        const realTimeData = formatChartDataFromResponses(
          questionResponses,
          chartData.type
        );

        const realTimeConfig = generateChartConfigFromData(
          realTimeData,
          chartData.type
        );

        let primaryKeys: string[] | undefined;
        let min: number | undefined;
        let max: number | undefined;

        if (chartData.type === "rating" && Array.isArray(realTimeData)) {
          primaryKeys = extractPrimaryKeysFromRatingData(realTimeData);
          const range = extractRatingRange(realTimeData);
          min = range.min;
          max = range.max;
        }

        return {
          question: chartData.question,
          type: chartData.type,
          chart_type: chartData.chart_type as VisualizationId,
          allowed_chart: (chartData.allowed_chart || []) as VisualizationId[],
          participants_responded: questionResponses.length,
          data: realTimeData,
          config: realTimeConfig,
          primaryKeys,
          min,
          max,
          insights: chart.insights || null,
          insightsUpdatedAt: chart.insightsUpdatedAt,
          chartId: chart.id,
        } satisfies QuestionData;
      })
      .filter(Boolean) as QuestionData[];
  }

  // 2) Sinon, on génère à partir des réponses brutes
  if (questionsData.length === 0) {
    questionsData = extractAllQuestionsDataWithConfig(responseDb);
  }

  const totalResponses = responseDb.metadata.total_responses;

  console.log("[Page] questionsData", questionsData);
  console.log("[Page] Responses", surveyResponses);
  return (
    <div>
      <MyRuntimeProvider
        responses={responseDb}
        mission={{
          id: mission.id,
          status: mission.status || "in_progress",
          executiveSummary: mission.executiveSummary,
          executiveSummaryUpdatedAt: mission.executiveSummaryUpdatedAt,
        }}
      >
        <MissionDashboardClient
          initialQuestions={questionsData}
          totalResponses={totalResponses}
          missionStatus={mission.status || "in_progress"}
        />

        <AssistantModal />
      </MyRuntimeProvider>
    </div>
  );
}
