// src/app/[locale]/(dasboard)/missions/[workspaceId]/[missionId]/dasboard/mission-dashboard-client.tsx
"use client";

import { useCallback, useState } from "react";
import { useQueryState } from "nuqs";
import { Button } from "@tada/ui/components/button";

import { BarChartCard } from "@/components/missions/boards/graphs/bar-chart";
import { BarChartHorizontalCard } from "@/components/missions/boards/graphs/bar-chart-horizontal";
import { BarChartHorizontalStackedCard } from "@/components/missions/boards/graphs/bar-chart-horizontal-stacked";
import { BarChartStackedCard } from "@/components/missions/boards/graphs/bar-chart-stacked";
import { PieChartCard } from "@/components/missions/boards/graphs/pie-chart";
import { RadarChartCard } from "@/components/missions/boards/graphs/radar-chart";
import { ArrayChartCard } from "@/components/missions/boards/graphs/array-chart";
import { ChartConfig } from "@/components/missions/boards/graphs/ui/chart";
import { InsightsSection } from "@/components/missions/boards/insights-section";
import FilterChangeChartType from "@/components/missions/boards/modals/filter-change-chart-type";

import type { QuestionData } from "@/lib/utils";
import type { VisualizationId } from "@/lib/chart-types";

interface MissionDashboardClientProps {
  initialQuestions: QuestionData[];
  totalResponses: number;
  missionStatus: string;
}

export default function MissionDashboardClient({
  initialQuestions,
  totalResponses,
  missionStatus,
}: MissionDashboardClientProps) {
  const [questions, setQuestions] = useState<QuestionData[]>(initialQuestions);

  // paramètre partagé avec le modal
  const [, setQuestionId] = useQueryState("questionId", {
    defaultValue: "",
  });

  // 👉 TOUJOURS ouvrir le modal, même si pas de chartId
  const openChangeChartModal = (question: QuestionData) => {
    const id = question.chartId ?? question.question;
    setQuestionId(id);
  };

  // 👉 retrouve la question par chartId OU par texte de question
  const getQuestionConfig = useCallback(
    (questionId: string) => {
      const q = questions.find(
        (q) => q.chartId === questionId || q.question === questionId
      );

      if (!q) return undefined;

      return {
        allowed_chart: q.allowed_chart,
        currentChartType: q.chart_type,
      };
    },
    [questions]
  );

  // 👉 quand on clique sur "Appliquer" dans le modal
  const handleApply = useCallback(
    ({
      questionId,
      chartType,
      filter,
      isSorted,
    }: {
      questionId: string;
      filter: string;
      chartType: VisualizationId;
      isSorted: boolean;
    }) => {
      console.log("[Client] handleApply appelé", {
        questionId,
        chartType,
        filter,
        isSorted,
      });

      setQuestions((prev) => {
        const updated = prev.map((q) =>
          q.chartId === questionId || q.question === questionId
            ? { ...q, chart_type: chartType }
            : q
        );

        console.log(
          "[Client] state après update",
          updated.map((q) => ({
            id: q.chartId,
            question: q.question,
            chart_type: q.chart_type,
          }))
        );

        return updated;
      });
    },
    []
  );

  return (
    <>
      {questions
        .filter((question) => question.participants_responded > 0)
        .map((question, index) => {
          console.log("[Render] question", {
            id: question.chartId,
            question: question.question,
            chart_type: question.chart_type,
          });

          const participationLabel = `${index + 1} de ${
            questions.length
          } | ${question.participants_responded} Participants (${Math.round(
            (question.participants_responded / totalResponses) * 100
          )}%)`;

          const renderInsights =
            !!question.insights && !!question.insightsUpdatedAt;

          const type = question.chart_type;

          return (
            <div key={question.chartId ?? index} className="mb-8 space-y-3">
              {renderInsights && (
                <InsightsSection
                  insights={question.insights as any}
                  insightsUpdatedAt={question.insightsUpdatedAt}
                  questionTitle={question.question}
                  missionStatus={missionStatus}
                />
              )}

              {question.type !== "text" && question.type !== "comment" && (
                <div className="flex justify-end">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => openChangeChartModal(question)}
                  >
                    Modifier la visualisation
                  </Button>
                </div>
              )}

              {/* BAR / COLUMN */}
              {type === "bar" && (
                <BarChartHorizontalCard
                  subDashboardItemId={question.chartId ?? ""}
                  data={
                    question.data as Array<{
                      label: string;
                      value: number;
                      percentage?: number;
                    }>
                  }
                  config={question.config as ChartConfig}
                  primaryDataKey="value"
                  categoryKey="label"
                  title={question.question}
                  description=""
                  participationQuestions={participationLabel}
                />
              )}

              {type === "column" && (
                <BarChartCard
                  subDashboardItemId={question.chartId ?? ""}
                  data={
                    question.data as Array<{
                      label: string;
                      value: number;
                      percentage?: number;
                    }>
                  }
                  config={question.config as ChartConfig}
                  primaryDataKey="value"
                  categoryKey="label"
                  title={question.question}
                  description=""
                  participationQuestions={participationLabel}
                />
              )}

              {/* STACKED BAR / STACKED COLUMN */}
              {(type === "stacked_bar" || type === "stacked_column") && (
                <BarChartHorizontalStackedCard
                  subDashboardItemId={question.chartId ?? ""}
                  data={question.data as any}
                  config={question.config as ChartConfig}
                  categoryKey={
                    question.type === "rating" ? "category" : "label"
                  }
                  title={question.question}
                  description=""
                  participationQuestions={participationLabel}
                  participantCount={question.participants_responded}
                  primaryKeys={question.primaryKeys}
                  min={question.min || 0}
                  max={question.max || 100}
                />
              )}

              {/* PIE */}
              {type === "pie" && (
                <PieChartCard
                  subDashboardItemId={question.chartId ?? ""}
                  data={
                    question.data as Array<{ label: string; value: number }>
                  }
                  config={question.config as ChartConfig}
                  primaryDataKey="value"
                  categoryKey="label"
                  title={question.question}
                  description=""
                  participationQuestions={participationLabel}
                  participantCount={question.participants_responded}
                />
              )}

              {/* TABLE */}
              {type === "table" && (
                <ArrayChartCard
                  subDashboardItemId={question.chartId ?? ""}
                  texts={question.data as string[]}
                  title={question.question}
                  description=""
                  participationQuestions={participationLabel}
                />
              )}

              {/* TURF / radar */}
              {type === "turf" && (
                <RadarChartCard
                  subDashboardItemId={question.chartId ?? ""}
                  data={
                    question.data as Array<{ label: string; value: number }>
                  }
                  config={question.config as ChartConfig}
                  primaryDataKey="value"
                  categoryKey="label"
                  title={question.question}
                  description=""
                  participationQuestions={participationLabel}
                />
              )}
            </div>
          );
        })}

      {/* Modal connecté au state */}
      <FilterChangeChartType
        getQuestionConfig={getQuestionConfig}
        onApply={handleApply}
      />
    </>
  );
}
