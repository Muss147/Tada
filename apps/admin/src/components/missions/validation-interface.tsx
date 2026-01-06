// src/components/missions/validation-interface.tsx
"use client";

import { validateMissionAction } from "@/actions/missions/validation-mission-action";
import { useToast } from "@/hooks/use-toast";
import { useI18n } from "@/locales/client";
import { Mission } from "@prisma/client";
import { Button } from "@tada/ui/components/button";
import { Textarea } from "@tada/ui/components/textarea";
import { Check, Edit, Loader2, X } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

interface ValidationInterfaceProps {
  mission: Mission;
}

type ValidationStatus = "ok" | "pending" | "issue";

export function ValidationInterface({ mission }: ValidationInterfaceProps) {
  const t = useI18n();
  const router = useRouter();
  const { toast } = useToast();

  const [comment, setComment] = useState(mission.validationComment || "");
  const [briefStatus, setBriefStatus] = useState<ValidationStatus>(
    mission.validationStatusStep1 || "pending"
  );
  const [questionnaireStatus, setQuestionnaireStatus] = useState<ValidationStatus>(
    mission.validationStatusStep2 || "pending"
  );

  // --- Vérification si le bouton "Approuver" doit être actif ---
  const isApproveEnabled =
    briefStatus === "ok" && questionnaireStatus === "ok";

  // --- Mise à jour du commentaire automatiquement si une étape a un problème ---
  useEffect(() => {
    if (briefStatus === "issue") {
      setComment("Problème détecté à l'étape 1. Veuillez le corriger et re-soumettre la mission.");
    } else if (questionnaireStatus === "issue") {
      setComment("Problème détecté à l'étape 2. Veuillez le corriger et re-soumettre la mission.");
    } else {
      setComment(""); // Si tout est ok
    }
  }, [briefStatus, questionnaireStatus, t]);

  const validateMission = useAction(validateMissionAction, {
    onSuccess: (data) => {
      const status = data.data?.mission.validationStatus;
      toast({
        title: t("missionsToSubmit.validation.success"),
        description: `Mission marquée comme ${status}.`,
      });
      router.push("/missions-to-validate");
    },
    onError: (error) => {
      console.error(error);
      toast({
        title: t("missionsToSubmit.validation.error"),
        description: t("common.generic_error"),
        variant: "destructive",
      });
    },
  });

  const handleValidationAction = (
    validationStatus: "approved" | "rejected" | "modification_requested"
  ) => {
    const cleanComment = comment.trim();

    if (validationStatus !== "approved" && !cleanComment) {
      toast({
        title: t("missionsToSubmit.validation.warning"),
        description:
          validationStatus === "rejected"
            ? t("missionsToSubmit.validation.comment_required_reject")
            : t("missionsToSubmit.validation.comment_required_modify"),
        variant: "destructive",
      });
      return;
    }

    validateMission.execute({
      missionId: mission.id,
      validationStatus,
      comment: cleanComment || undefined,
    });
  };

  const renderSection = (
    title: string,
    content: string,
    criteria: string[],
    step: 1 | 2,
    status: ValidationStatus,
    setStatus: (status: ValidationStatus) => void
  ) => {
    const isIssue = status === "issue";
    const isOk = status === "ok";

    return (
      <div
        className={`bg-white p-6 rounded-lg shadow-sm mb-6 border ${
          isIssue
            ? "border-red-300"
            : isOk
            ? "border-green-300"
            : "border-gray-200"
        }`}
      >
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          Étape {step} : {title}
        </h2>

        <div className="p-4 bg-gray-50 border border-gray-100 rounded-md mb-4 whitespace-pre-line">
          {content}
        </div>

        <h3 className="text-lg font-medium mb-2 text-gray-700">
          Critères d'analyse :
        </h3>
        <ul className="list-disc ml-6 space-y-1 text-sm text-gray-600">
          {criteria.map((c, index) => (
            <li key={index}>{c}</li>
          ))}
        </ul>

        <div className="mt-4 flex space-x-2 justify-end">
          <Button
            variant="outline"
            className={`border-red-200 hover:bg-red-50 ${
              isIssue ? "bg-red-100" : ""
            } text-red-600`}
            onClick={() => setStatus("issue")}
          >
            <X className="w-4 h-4 mr-2" />
            Problème détecté
          </Button>
          <Button
            variant="outline"
            className={`border-green-200 hover:bg-green-50 ${
              isOk ? "bg-green-100" : ""
            } text-green-600`}
            onClick={() => setStatus("ok")}
          >
            <Check className="w-4 h-4 mr-2" />
            Conforme
          </Button>
        </div>
      </div>
    );
  };

  return (
    <div className="grid grid-cols-3 gap-6">
      <div className="col-span-2 space-y-6">
        {renderSection(
          t("missionsToSubmit.validation.step1_title"),
          `Problématique: ${mission.problemSummary || t("common.no_data")}
Objectifs: ${mission.objectives || t("common.no_data")}
Audiences: ${
            mission.audiences ? JSON.stringify(mission.audiences) : t("common.no_data")
          }
Nb. Réponses: ${mission.targetSampleSize || t("common.not_specified")}`,
          [
            t("missionsToSubmit.validation.c1_objectives"),
            t("missionsToSubmit.validation.c1_problem"),
            t("missionsToSubmit.validation.c1_segments"),
            t("missionsToSubmit.validation.c1_coherence"),
          ],
          1,
          briefStatus,
          setBriefStatus
        )}

        {renderSection(
          t("missionsToSubmit.validation.step2_title"),
          mission.assumptions || t("missionsToSubmit.validation.questionnaire_placeholder"),
          [
            t("missionsToSubmit.validation.c2_brief_coherence"),
            t("missionsToSubmit.validation.c2_structure"),
            t("missionsToSubmit.validation.c2_clarity"),
            t("missionsToSubmit.validation.c2_workload"),
            t("missionsToSubmit.validation.c2_feasibility"),
          ],
          2,
          questionnaireStatus,
          setQuestionnaireStatus
        )}
      </div>

      <div className="col-span-1 sticky top-8 h-fit space-y-4">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-xl font-semibold mb-4">Actions SuperAdmin</h3>

          <div className="space-y-4">
            <Textarea
              placeholder={t("missionsToSubmit.validation.comment_placeholder")}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={4}
            />

            <Button
              className={`w-full justify-start ${
                isApproveEnabled
                  ? "bg-green-500 hover:bg-green-600"
                  : "bg-gray-300 cursor-not-allowed"
              }`}
              onClick={() => handleValidationAction("approved")}
              disabled={!isApproveEnabled || validateMission.isExecuting}
            >
              {validateMission.isExecuting ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Check className="w-4 h-4 mr-2" />
              )}
              {t("missionsToSubmit.validation.action_approve")}
            </Button>

            <Button
              className="w-full justify-start bg-yellow-500 hover:bg-yellow-600"
              onClick={() => handleValidationAction("modification_requested")}
              disabled={validateMission.isExecuting}
            >
              <Edit className="w-4 h-4 mr-2" />
              {t("missionsToSubmit.validation.action_modify")}
            </Button>

            <Button
              variant="destructive"
              className="w-full justify-start"
              onClick={() => handleValidationAction("rejected")}
              disabled={validateMission.isExecuting}
            >
              <X className="w-4 h-4 mr-2" />
              {t("missionsToSubmit.validation.action_reject")}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}