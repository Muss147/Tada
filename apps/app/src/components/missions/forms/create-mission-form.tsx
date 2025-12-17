import { createMissionAction } from "@/actions/missions/create-mission-action";
import { createMissionSchema } from "@/actions/missions/schema";
import { Icons } from "@/components/icons";
import { useAudiencesFilter } from "@/context/audiences-filter-context";
import { useToast } from "@/hooks/use-toast";
import { useI18n } from "@/locales/client";
import { Button } from "@tada/ui/components/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@tada/ui/components/form";
import { Edit } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useFormContext } from "react-hook-form";
import { AudiencesFilterModal } from "../modals/audiences-filter-modal";

import { generateMissionBriefAIAction } from "@/actions/missions/generate-mission-brief-ai";
import { useThread } from "@assistant-ui/react";

interface Section {
  id: number;
  key: string;
  title: string;
  content: string;
  status: string;
  color: string;
  placeholder?: string;
  selectedMarkets?: string[];
}

const extractTextFromMessage = (msg: any): string => {
  if (!msg?.content) return "";
  return (
    msg.content
      .filter((c: any) => c.type === "text")
      .map((c: any) => c.text)
      .join("\n") ?? ""
  );
};

export function CreateMissionForm({
  organization,
  workspaceId,
  locale,
}: {
  organization: { status: string | null; id: string };
  workspaceId: string;
  locale: string;
}) {
  const t = useI18n();
  const { toast } = useToast();
  const router = useRouter();
  const form = useFormContext();
  const searchParams = useSearchParams();
  const templateId = searchParams.get("t");
  const mode = searchParams.get("mode");

  const isAiMode = mode === "ai";

  const editSectionRef = useRef<HTMLDivElement>(null);
  const editTitleRef = useRef<HTMLDivElement>(null);
  const [isAudiencesFilterModalOpen, setIsAudiencesFilterModalOpen] =
    useState(false);
  const [title, setTitle] = useState(t("missions.createMission.form.name"));
  const [editingTitle, setEditingTitle] = useState(false);
  const [tempTitle, setTempTitle] = useState("");
  const [editingSection, setEditingSection] = useState<number | null>(null);
  const [tempContent, setTempContent] = useState("");

  const [lastSyncedAssistantId, setLastSyncedAssistantId] = useState<
    string | null
  >(null);

  const {
    activeFiltersCount,
    selectedFilters,
    filterGroups,
    handleOptionSelect,
  } = useAudiencesFilter();

  const watchedName = form.watch("name");
  const watchedProblem = form.watch("problemSummary");
  const watchedObjectives = form.watch("objectives");
  const watchedAssumptions = form.watch("assumptions");

  const hasCoreInputs =
    !!watchedName?.trim() ||
    !!watchedProblem?.trim() ||
    !!watchedObjectives?.trim() ||
    !!watchedAssumptions?.trim();

  const hasAudiences = activeFiltersCount > 0;

  // Messages du thread assistant-ui
  const thread = useThread();

  // thread peut être undefined au tout début
  const threadMessages = thread?.messages ?? [];

  const lastAssistantMessage = threadMessages
    .slice()
    .reverse()
    .find((m) => m.role === "assistant");

  // On garde le texte pour plus tard (quand tu feras vraiment le refine)
  const lastAssistantText =
    lastAssistantMessage?.content
      ?.filter((c: any) => c.type === "text")
      .map((c: any) => c.text)
      .join("\n") ?? "";

  const hasAssistantMessage = !!lastAssistantMessage;

  const createMission = useAction(createMissionAction, {
    onSuccess: (data) => {
      toast({
        title: t("missions.createMission.form.success"),
      });

      const mission = data.data?.data;
      if (mission) {
        router.push(`/${locale}/missions/${workspaceId}/${mission.id}/surveys`);
      }
    },
    onError: () => {
      toast({
        title: t("missions.createMission.form.error"),
        variant: "destructive",
      });
    },
  });
  const [sections, setSections] = useState<Section[]>([
    {
      id: 1,
      key: "problemSummary",
      title: t("missions.createMission.form.problemSummary"),
      content: "",
      status: "pending",
      placeholder: t("missions.createMission.form.placeholder"),
      color: "green",
    },
    {
      id: 2,
      key: "objectives",
      title: t("missions.createMission.form.strategicGoal"),
      content: "",
      status: "pending",
      placeholder: t("missions.createMission.form.placeholder"),
      color: "green",
    },
    {
      id: 3,
      key: "assumptions",
      title: t("missions.createMission.form.assumptions"),
      content: "",
      status: "pending",
      placeholder: t("missions.createMission.form.placeholder"),
      color: "green",
    },
    {
      id: 4,
      key: "audiences",
      title: t("missions.createMission.form.audiences"),
      content: "",
      selectedMarkets: ["UK", "USA"],
      status: "pending",
      placeholder: t("missions.createMission.form.targetPlaceholder"),
      color: "gray",
    },
  ]);

  const startEditingTitle = () => {
    setEditingTitle(true);
    setTempTitle(title);
  };

  const saveTitleChanges = () => {
    if (tempTitle && tempTitle.trim() !== "") {
      setTitle(tempTitle);
    }
    setEditingTitle(false);
  };

  const startEditingContent = (id: number) => {
    const section = sections.find((s) => s.id === id);
    setEditingSection(id);
    setTempContent(section?.content || "");
  };

  const saveContentChanges = () => {
    if (editingSection) {
      setSections(
        sections?.map((section) =>
          section.id === editingSection
            ? {
                ...section,
                content: tempContent,
                status: tempContent ? "completed" : "pending",
              }
            : section
        )
      );
      setEditingSection(null);
    }
  };

  const onSubmit = async (values: object) => {
    createMission.execute(
      createMissionSchema.parse({
        ...values,
        workspaceId,
        organizationId: organization.id,
        audiences: selectedFilters,
        templateId,
        mode,
      })
    );
  };

  const generateBrief = useAction(generateMissionBriefAIAction, {
    onSuccess: (res) => {
      const brief = res.data?.data;
      if (!brief) return;

      form.setValue("name", brief.name, { shouldDirty: true });
      form.setValue("problemSummary", brief.problemSummary, {
        shouldDirty: true,
      });
      form.setValue("objectives", brief.objectives, { shouldDirty: true });
      form.setValue("assumptions", brief.assumptions, { shouldDirty: true });
      form.setValue("sampleSummary", brief.sampleSummary, {
        shouldDirty: true,
      });
      form.setValue("targetSampleSize", brief.targetSampleSize ?? undefined, {
        shouldDirty: true,
      });
      form.setValue(
        "preliminaryRecommendations",
        brief.preliminaryRecommendations,
        { shouldDirty: true }
      );
      form.setValue("studyStructure", brief.studyStructure, {
        shouldDirty: true,
      });

      // Mettre à jour les sections (pastilles vertes)
      setSections((prev) =>
        prev.map((s) => {
          if (["problemSummary", "objectives", "assumptions"].includes(s.key)) {
            const v = form.getValues(s.key);
            return {
              ...s,
              content: v,
              status: v ? "completed" : "pending",
            };
          }
          return s;
        })
      );

      toast({
        title: t("missions.createMission.form.aiBriefFilled"),
        description:
          "Le brief complet a été rempli automatiquement. Tu peux encore l’éditer avant de sauvegarder.",
      });
    },
    onError: () => {
      toast({
        title: t("common.error.somethingWentWrong"),
        description:
          "Impossible de générer le plan complet de l’étude. Réessaie dans un instant.",
        variant: "destructive",
      });
    },
  });

  function renderBulletedList(text: string): JSX.Element {
    if (!text) return <></>;

    // On découpe UNIQUEMENT sur les retours à la ligne
    const rawLines = text
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter(Boolean);

    // Si une seule ligne => on affiche juste le texte tel quel
    if (rawLines.length <= 1) {
      return (
        <p className="whitespace-pre-line text-left">
          {rawLines[0]?.endsWith(".") ? rawLines[0] : rawLines[0]}
        </p>
      );
    }

    // On nettoie les bullets / numéros : "• ", "- ", "1. ", "2) ", etc.
    const items = rawLines.map((line) =>
      line
        .replace(/^[-*•●]\s*/, "") // bullets
        .replace(/^\d+[\.\)]\s*/, "") // numéros "1. " ou "2) "
        .trim()
    );

    return (
      <ul className="list-disc pl-5 space-y-1 text-left">
        {items.map((item, idx) => (
          <li key={idx}>{item.endsWith(".") ? item : item + "."}</li>
        ))}
      </ul>
    );
  }

  useEffect(() => {
    if (!isAiMode) return;
    if (!threadMessages.length) return;

    const ASK_RE =
      locale === "fr"
        ? /Est-ce que tout cela vous semble correct \? Si oui, je peux maintenant remplir le formulaire avec ces informations\./
        : /Does all of this look correct\? If yes, I can now fill the form with this information\./;

    const CONFIRM_RE =
      locale === "fr"
        ? /^\s*(oui|ok|okay|d['’]accord|c['’]est bon|parfait)\s*[.!?]?\s*$/i
        : /^\s*(yes|yep|ok|okay|sounds good|perfect)\s*[.!?]?\s*$/i;

    // 1) On cherche le DERNIER message assistant qui propose de remplir le formulaire
    let askedIndex = -1;
    for (let i = threadMessages.length - 1; i >= 0; i--) {
      const msg = threadMessages[i];
      if (msg.role !== "assistant") continue;
      const text = extractTextFromMessage(msg);
      if (ASK_RE.test(text)) {
        askedIndex = i;
        break;
      }
    }

    if (askedIndex === -1) {
      return; // aucun assistant n'a proposé de remplir le formulaire
    }

    const assistantMsg = threadMessages[askedIndex];
    const assistantText = extractTextFromMessage(assistantMsg);

    // 2) On cherche une confirmation utilisateur APRÈS ce message
    const confirmMsg = threadMessages
      .slice(askedIndex + 1)
      .reverse()
      .find((m) => {
        if (m.role !== "user") return false;
        const userText = extractTextFromMessage(m).trim();
        return CONFIRM_RE.test(userText);
      });

    if (!confirmMsg) {
      return; // pas encore de "oui / ok / parfait" après la proposition
    }

    // 3) On obtient un identifiant stable pour ce récap assistant
    const assistantId =
      (assistantMsg as any).id ??
      (assistantMsg as any).messageId ??
      `assistant-${askedIndex}`;

    if (assistantId === lastSyncedAssistantId) {
      return; // déjà traité
    }

    if (generateBrief.status === "executing") {
      return;
    }

    // 4) On marque ce récap comme traité AVANT de lancer la génération
    setLastSyncedAssistantId(assistantId);

    // 5) On lance la génération du brief
    toast({
      title:
        locale === "fr"
          ? "Génération du brief en cours…"
          : "Generating the brief…",
      description:
        locale === "fr"
          ? "Je remplis automatiquement le formulaire à partir de la conversation."
          : "I'm filling the form from the conversation.",
    });
    generateBrief.execute({
      name: form.getValues("name"),
      problemSummary: assistantText || form.getValues("problemSummary"),
      objectives: form.getValues("objectives"),
      assumptions: form.getValues("assumptions"),
      audiences: selectedFilters,
    });
  }, [
    isAiMode,
    threadMessages,
    lastSyncedAssistantId,
    generateBrief.status,
    form,
    selectedFilters,
  ]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        editingSection &&
        editSectionRef.current &&
        !editSectionRef.current.contains(
          (event as unknown as React.ChangeEvent<HTMLInputElement>).target
        )
      ) {
        saveContentChanges();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [editingSection]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        editingTitle &&
        editTitleRef.current &&
        !editTitleRef.current.contains(
          (event as unknown as React.ChangeEvent<HTMLInputElement>).target
        )
      ) {
        saveTitleChanges();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [editingTitle]);

  useEffect(() => {
    const subscription = form.watch((values) => {
      if (values.name) {
        setTitle(values.name);
      }

      // biome-ignore lint/complexity/noForEach: <explanation>
      sections.forEach((section) => {
        if (values[section.key]) {
          setSections((prev) =>
            prev.map((s) =>
              s.key === section.key
                ? {
                    ...s,
                    content: values[section.key],
                    status: values[section.key] ? "completed" : "pending",
                  }
                : s
            )
          );
        }
      });
    });

    return () => subscription.unsubscribe();
  }, [form]);

  useEffect(() => {
    if (activeFiltersCount > 0) {
      setSections((prev) =>
        prev.map((s) =>
          s.key === "audiences" ? { ...s, status: "completed" } : s
        )
      );
    }
  }, [activeFiltersCount]);

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="h-full flex flex-col bg-white dark:bg-gray-900 p-4"
    >
      <input type="hidden" {...form.register("hidden")} />

      <div className="flex justify-between items-start mb-6">
        <div className="flex-1 flex-col">
          {editingTitle ? (
            <div ref={editTitleRef} className="mb-2">
              <FormField
                control={form.control}
                defaultValue={tempTitle}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <textarea
                        className="w-full text-black dark:text-white p-2 border border-gray-600 rounded focus:outline-none focus:border-blue-500"
                        rows={2}
                        {...field}
                        onChange={(e) => {
                          field.onChange(e.target.value);
                          setTitle(e.target.value);
                        }}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <div className="flex mt-2 space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  type="button"
                  onClick={() => setEditingTitle(false)}
                  className="text-black dark:text-white"
                >
                  {t("common.cancel")}
                </Button>

                {/* Bouton 2 : Mettre à jour depuis la conversation AI */}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  //disabled={!canRefineFromConversation}
                  onClick={() => {
                    console.log(
                      "[AI refine brief] lastAssistantText:",
                      lastAssistantText
                    );

                    // Ici plus tard :
                    // refineMissionBriefAIAction.execute({
                    //   conversation: lastAssistantText,
                    //   currentBrief: {
                    //     name: form.getValues("name"),
                    //     problemSummary: form.getValues("problemSummary"),
                    //     objectives: form.getValues("objectives"),
                    //     assumptions: form.getValues("assumptions"),
                    //     sampleSummary: form.getValues("sampleSummary"),
                    //     targetSampleSize: form.getValues("targetSampleSize"),
                    //     preliminaryRecommendations: form.getValues("preliminaryRecommendations"),
                    //     studyStructure: form.getValues("studyStructure"),
                    //   },
                    // });
                  }}
                >
                  {t("missions.createMission.form.aiUpdateFromConversation")}
                </Button>

                <Button
                  size="sm"
                  type="button"
                  onClick={() => {
                    setTitle(form.getValues("name"));
                    setEditingTitle(false);
                  }}
                >
                  {t("common.save")}
                </Button>
              </div>
            </div>
          ) : (
            <div className=" flex space-x-8 items-center">
              <h1 className="text-xl font-semibold text-black dark:text-white transition-colors border-b border-transparent hover:border-gray-600 inline-block">
                {title}
              </h1>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  type="button"
                  onClick={startEditingTitle}
                >
                  <Edit className="w-4 h-4 " />
                </Button>
              </div>
            </div>
          )}

          <span className="text-sm text-gray-400 cursor-pointer hover:text-gray-300 transition-colors">
            {t("missions.createMission.form.researchMarket")}
          </span>
        </div>

        <div className="flex flex-col gap-2 items-end">
          <Button variant="default" size="lg" type="submit">
            {createMission.status === "executing" ? (
              <Icons.spinner className="w-4 h-4 animate-spin" />
            ) : (
              t("common.save")
            )}
          </Button>
        </div>
      </div>

      {/* Bandeau "Brief en cours de génération" */}
      {generateBrief.status === "executing" && (
        <div className="mb-4 flex items-center gap-2 rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-900 dark:border-amber-500/40 dark:bg-amber-500/10 dark:text-amber-100">
          <Icons.spinner className="h-4 w-4 animate-spin" />
          <span>
            {t("missions.createMission.form.aiBriefGenerating") ??
              (locale === "fr"
                ? "Brief en cours de génération à partir de la conversation…"
                : "Generating the brief from the conversation…")}
          </span>
        </div>
      )}

      {/* Sections */}
      <div className="space-y-6 w-full">
        {sections.map((section) => (
          <div
            key={section.key}
            className="bg-[#FFD3CE] dark:bg-gray-900 border border-[#FFD3CE] rounded-md p-4"
          >
            <div className="flex items-center mb-3">
              <div
                className={`w-3 h-3 rounded-full mr-3 ${
                  section.status === "pending"
                    ? "bg-yellow-400"
                    : section.status === "completed"
                      ? "bg-green-500"
                      : "bg-gray-400"
                }`}
              />

              <h2 className="text-black dark:text-white font-bold text-lg flex-grow">
                {section.title}
              </h2>

              <Button
                variant="outline"
                size="sm"
                type="button"
                onClick={() => startEditingContent(section.id)}
              >
                <Edit className="w-4 h-4" />
              </Button>
            </div>

            {/* Contenu de la section */}
            <div className="ml-6">
              {section.id === 4 ? (
                <div className="flex-1 flex flex-col space-y-3 overflow-y-auto">
                  {/* 🔹 Placeholder au-dessus du bouton */}
                  <p className="text-sm text-black/80 dark:text-white/80">
                    {section.placeholder}
                  </p>

                  <Button
                    size="lg"
                    className="w-full"
                    type="button"
                    onClick={() => setIsAudiencesFilterModalOpen(true)}
                  >
                    {t("missions.createMission.form.filterAudiences")}{" "}
                    {activeFiltersCount > 0 && (
                      <span className="text-sm text-gray-400">
                        ({activeFiltersCount})
                      </span>
                    )}
                  </Button>

                  {activeFiltersCount > 0 && (
                    <div className="mt-2">
                      <div className="flow-root">
                        <div className="-mx-2 -my-1 flex flex-wrap">
                          {Object.keys(selectedFilters).map((groupId) =>
                            Object.keys(selectedFilters[groupId] || {}).map(
                              (filterId) => {
                                const group = filterGroups.find(
                                  (g) => g.id === groupId
                                );
                                const filter = group?.filters.find(
                                  (f) => f.id === filterId
                                );

                                return (
                                  selectedFilters![groupId]![
                                    filterId
                                  ] as string[]
                                )?.map((value) => {
                                  const option = filter?.options?.find(
                                    (o) => o.value === value
                                  );
                                  return (
                                    <span
                                      key={`${groupId}-${filterId}-${value}`}
                                      className="m-1 inline-flex items-center rounded-full border border-gray-200 bg-white py-1.5 pl-3 pr-1 text-sm font-medium text-gray-900"
                                    >
                                      <span>
                                        {filter?.label}:{" "}
                                        {option?.label || value}
                                      </span>
                                      <button
                                        type="button"
                                        className="ml-1 inline-flex h-4 w-4 flex-shrink-0 rounded-full p-1 text-gray-400 hover:bg-gray-200 hover:text-gray-500"
                                        onClick={() =>
                                          handleOptionSelect(
                                            groupId,
                                            filterId,
                                            value,
                                            false
                                          )
                                        }
                                      >
                                        <span className="sr-only">
                                          Retirer {filter?.label}{" "}
                                          {option?.label || value}
                                        </span>
                                        <svg
                                          className="h-2 w-2"
                                          stroke="currentColor"
                                          fill="none"
                                          viewBox="0 0 8 8"
                                        >
                                          <path
                                            strokeLinecap="round"
                                            strokeWidth="1.5"
                                            d="M1 1l6 6m0-6L1 7"
                                          />
                                        </svg>
                                      </button>
                                    </span>
                                  );
                                });
                              }
                            )
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ) : editingSection === section.id ? (
                <div ref={editSectionRef} className="w-full">
                  <FormField
                    control={form.control}
                    defaultValue={tempContent}
                    name={section.key}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <textarea
                            className="w-full text-black dark:text-white p-2 border border-gray-600 rounded focus:outline-none focus:border-blue-500"
                            rows={4}
                            {...field}
                            onChange={(e) => {
                              field.onChange(e.target.value);
                              setTempContent(e.target.value);
                            }}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <div className="flex justify-end mt-2 space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      type="button"
                      onClick={() => setEditingSection(null)}
                      className="text-black dark:text-white"
                    >
                      {t("common.cancel")}
                    </Button>
                    <Button
                      size="sm"
                      type="button"
                      onClick={() => {
                        if (editingSection) {
                          form.setValue(section.key, tempContent);
                        }
                        saveContentChanges();
                      }}
                    >
                      {t("common.save")}
                    </Button>
                  </div>
                </div>
              ) : (
                <button
                  type="button"
                  className="text-black dark:text-white hover:bg-opacity-30 p-2 rounded-md transition-colors text-left w-full"
                  onClick={() => startEditingContent(section.id)}
                >
                  {section.content
                    ? renderBulletedList(section.content)
                    : section.placeholder}
                </button>
              )}
            </div>
          </div>
        ))}
        {/* {organization?.status === "active" && (
          <div className="bg-[#FFD3CE] dark:bg-gray-900 border border-[#FFD3CE] rounded-md p-4">
            <div className="flex items-center mb-3">
            
              <div
                className={`w-3 h-3 rounded-full mr-3 ${
                  haveSurveys === "pending"
                    ? "bg-yellow-400"
                    : haveSurveys === "completed"
                    ? "bg-green-500"
                    : "bg-gray-400"
                }`}
              />
              <h2 className="text-black dark:text-white font-bold text-lg flex-grow ">
                {t("missions.createMission.form.surveys")}
              </h2>

              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  type="button"
                  onClick={() => {
                    if (mission) {
                      router.push(
                        `/missions/${organization.id}/${mission.id}/surveys`
                      );
                      return;
                    }
                    toast({
                      title: t("missions.surveys.saveAfterSurvey"),
                      variant: "destructive",
                    });
                  }}
                >
                  <Edit className="w-4 h-4 " />
                </Button>
              </div>
            </div>
            <Button
              size="lg"
              className="w-full"
              type="button"
              onClick={() => {
                if (mission) {
                  router.push(
                    `/missions/${organization.id}/${mission.id}/surveys`
                  );
                  return;
                }
                toast({
                  title: t("missions.surveys.saveAfterSurvey"),
                  variant: "destructive",
                });
              }}
            >
              {t("missions.createMission.form.showSurveys")}
            </Button>
          </div>
        )} */}
      </div>
      <AudiencesFilterModal
        isOpen={isAudiencesFilterModalOpen}
        onOpenChange={() => setIsAudiencesFilterModalOpen(false)}
        orgId={organization.id}
        missionId={undefined}
        currentUserId={undefined}
      />
    </form>
  );
}
