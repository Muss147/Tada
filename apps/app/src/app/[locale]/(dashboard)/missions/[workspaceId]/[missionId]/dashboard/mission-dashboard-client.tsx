// src/app/[locale]/(dasboard)/missions/[workspaceId]/[missionId]/dasboard/mission-dashboard-client.tsx
"use client";

import { useCallback, useEffect, useState } from "react";
import { useQueryState } from "nuqs";
import { useRouter, useSearchParams } from "next/navigation";
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
import type {
  WorkspaceMember,
  CommentLite,
} from "@/components/comments/comments-types";
import { QuestionCommentsBubble } from "@/components/missions/comments/question-comments-bubble";
import { CommentPin } from "@/components/missions/comments/comment-pin";

interface MissionDashboardClientProps {
  missionId: string;
  initialQuestions: QuestionData[];
  totalResponses: number;
  missionStatus: string;
  commentCountsByQuestion?: Record<string, number>;
  currentUserId: string;
  workspaceMembers: WorkspaceMember[];
}

export default function MissionDashboardClient({
  missionId,
  initialQuestions,
  totalResponses,
  missionStatus,
  commentCountsByQuestion,
  currentUserId,
  workspaceMembers,
}: MissionDashboardClientProps) {
  const [questions, setQuestions] = useState<QuestionData[]>(initialQuestions);
  const [activeBubbleQuestionKey, setActiveBubbleQuestionKey] = useState<
    string | null
  >(null);

  const router = useRouter();
  const searchParams = useSearchParams();

  const openCommentsForQuestion = (question: QuestionData) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("commentQuestionKey", question.question);

    // on garde l’URL à jour pour le drawer global
    router.replace(`?${params.toString()}`, { scroll: false });

    // scroll vers la question
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("scroll-to-question", {
          detail: { questionKey: question.question },
        })
      );
    }

    // ouvre / ferme la bulle locale façon Figma
    setActiveBubbleQuestionKey((prev) =>
      prev === question.question ? null : question.question
    );
  };

  // paramètre partagé avec le modal de changement de chart
  const [, setQuestionId] = useQueryState("questionId", {
    defaultValue: "",
  });

  const openChangeChartModal = (question: QuestionData) => {
    const id = question.chartId ?? question.question;
    setQuestionId(id);
  };

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
      setQuestions((prev) =>
        prev.map((q) =>
          q.chartId === questionId || q.question === questionId
            ? { ...q, chart_type: chartType }
            : q
        )
      );
    },
    []
  );

  // Listener pour "scroll-to-question" (depuis le drawer)
  useEffect(() => {
    const handler = (e: Event) => {
      const custom = e as CustomEvent<{ questionKey: string }>;
      const key = custom.detail?.questionKey;
      if (!key) return;

      const el =
        document.querySelector<HTMLElement>(`[data-question-key="${key}"]`) ||
        document.getElementById(`question-${key}`);

      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
        el.classList.add("ring-2", "ring-sky-400", "ring-offset-2");

        setTimeout(() => {
          el.classList.remove("ring-2", "ring-sky-400", "ring-offset-2");
        }, 2000);
      }
    };

    window.addEventListener("scroll-to-question", handler);
    return () => window.removeEventListener("scroll-to-question", handler);
  }, []);

  return (
    <>
      {questions
        .filter((question) => question.participants_responded > 0)
        .map((question, index) => {
          const commentCount =
            commentCountsByQuestion?.[question.question] ?? 0;

          const participationLabel = `${index + 1} de ${
            questions.length
          } | ${question.participants_responded} Participants (${Math.round(
            (question.participants_responded / totalResponses) * 100
          )}%)`;

          const renderInsights =
            !!question.insights && !!question.insightsUpdatedAt;

          const type = question.chart_type;

          const questionKey = question.question;
          const domId = `question-${index + 1}`;
          const bubbleOpen = activeBubbleQuestionKey === questionKey;

          return (
            <div
              key={question.chartId ?? index}
              id={domId}
              data-question-key={questionKey}
              className="relative mb-8 space-y-3"
            >
              {commentCount > 0 && (
                <CommentPin
                  count={commentCount}
                  label={question.question}
                  onClick={() => openCommentsForQuestion(question)}
                />
              )}

              {renderInsights && (
                <InsightsSection
                  insights={question.insights as any}
                  insightsUpdatedAt={question.insightsUpdatedAt}
                  questionTitle={question.question}
                  missionStatus={missionStatus}
                />
              )}

              {question.type !== "text" && question.type !== "comment" && (
                <div className="flex justify-end gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => openChangeChartModal(question)}
                  >
                    Modifier la visualisation
                  </Button>

                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => openCommentsForQuestion(question)}
                    className="relative"
                    title={question.question}
                  >
                    Commentaires
                    {commentCount > 0 && (
                      <span className="ml-2 inline-flex h-5 min-w-[20px] items-center justify-center rounded-full bg-primary/10 text-primary text-[11px] px-1">
                        {commentCount}
                      </span>
                    )}
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

              {/* Bulle de commentaires façon Figma, ancrée sur la question */}
              {bubbleOpen && (
                <QuestionCommentsBubble
                  missionId={missionId}
                  questionKey={questionKey}
                  questionLabel={question.question}
                  currentUserId={currentUserId}
                  workspaceMembers={workspaceMembers}
                  onClose={() => setActiveBubbleQuestionKey(null)}
                />
              )}
            </div>
          );
        })}

      {/* Modal de changement de type de graphe */}
      <FilterChangeChartType
        getQuestionConfig={getQuestionConfig}
        onApply={handleApply}
      />
    </>
  );
}
