// src/components/missions/modals/publish-mission-modal.tsx
"use client";

import { useState, useEffect } from "react";
import { createClient } from "@tada/supabase/client";
import { Button } from "@tada/ui/components/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@tada/ui/components/dialog";
import { useI18n } from "@/locales/client";
import { Mission } from "@prisma/client";
import { Form } from "@tada/ui/components/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { createMissionConfigForContributorsSchema } from "@/actions/missions/schema";
import { ConfigMissionForContributorsForm } from "../forms/config-mission-for-contributors-form";
import { MissionBrief } from "@/components/surveys/mission-brief";
import { SurveyShow } from "@/components/ui/survey-show";
import { AudiencesFilterProvider } from "@/context/audiences-filter-context";
import { SurveysBuilderProvider } from "@/context/surveys-builder-context";
import { useAction } from "next-safe-action/hooks";
import { createConfigMissionAction } from "@/actions/missions/create-config-mission-action";
import { updateMissionDetailsAction } from "@/actions/missions/update-mission-details-action";
import { publishMissionAction } from "@/actions/missions/publish-mission-action";
import { toast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

type Step = "config" | "preview";

interface Props {
  isOpen: boolean;
  onClose: (assign?: boolean) => void;
  mission: Mission;
  config: {
    title: string;
    description: string | null;
    gain: bigint;
    duration: bigint;
    deadline: Date | null;
    targetSampleSize: number | null;
    imageUrl: string | null;
  } | null;
}

export function PublishMissionModal({ isOpen, onClose, mission, config }: Props) {
  const t = useI18n();
  const [step, setStep] = useState<Step>("config");

  const form = useForm<
    z.infer<typeof createMissionConfigForContributorsSchema>
  >({
    resolver: zodResolver(createMissionConfigForContributorsSchema),
    defaultValues: {
      title: config?.title ?? mission.name,
      description: config?.description ?? mission.problemSummary ?? "",
      gain: config?.gain ? Number(config.gain) : 0,
      duration: config?.duration ? Number(config.duration) : 0,
      deadline: config?.deadline ?? null,
      targetSampleSize: config?.targetSampleSize ?? undefined,
      imageUrl: config?.imageUrl ?? null,
    },
  });

  useEffect(() => {
    if (!config) return;

    form.reset({
      title: config.title,
      description: config.description ?? "",
      gain: Number(config.gain),
      duration: Number(config.duration),
      deadline: config.deadline ?? null,
      targetSampleSize: config.targetSampleSize ?? undefined,
      imageUrl: config.imageUrl ?? null,
    });
  }, [config, form]);

  const createConfig = useAction(createConfigMissionAction);
  const updateMission = useAction(updateMissionDetailsAction);
  const publishMission = useAction(publishMissionAction);

  const supabase = createClient();

  async function uploadImage(file: File): Promise<string> {
    const fileExt = file.name.split(".").pop();
    const fileName = `${crypto.randomUUID()}.${fileExt}`;
    const filePath = `missions/${fileName}`;

    const { error } = await supabase.storage
      .from("missions")
      .upload(filePath, file, {
        upsert: true,
        contentType: file.type,
      });

    if (error) {
      throw new Error(error.message);
    }

    const { data } = supabase.storage
      .from("missions")
      .getPublicUrl(filePath);

    return data.publicUrl;
  }

  const handlePublish = async () => {
    const values = form.getValues();

    try {
      const values = form.getValues();

      if (!values.imageFile && !config?.imageUrl) {
        toast({
          title: "Image requise",
          variant: "destructive",
        });
        return;
      }

      let imageUrl = config?.imageUrl ?? null;

      if (values.imageFile) {
        imageUrl = await uploadImage(values.imageFile);
      }

      // Mise à jour des infos principales
      await updateMission.executeAsync({
        missionId: mission.id,
        title: values.title,
        description: values.description,
        gain: values.gain,
        duration: values.duration,
        deadline: values.deadline,
        targetSampleSize: values.targetSampleSize,
        imageUrl, // ✅ URL finale (nouvelle ou existante)
      });

      // 2️⃣ Config contributeur
      if (!config) {
        await createConfig.executeAsync({
          missionId: mission.id,
          ...values,
        });
      }

      // 3️⃣ Publication → déclenche la génération des graphiques
      // await publishMission.executeAsync({
      //   missionId: mission.id,
      //   isPublish: true,
      //   status: "live", // 👈 OBLIGATOIRE pour générer les graphiques
      // });

      toast({
        title: t("missions.publish.success"),
      });

      onClose(true);
    } catch (error) {
      console.error(error);
      toast({
        title: t("missions.publish.error"),
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => onClose()}>
      <DialogContent className="max-w-5xl p-0 max-h-[90vh] overflow-hidden">
        <DialogHeader className="border-b px-6 py-4">
          <DialogTitle className="text-xl font-semibold">
            {t("missions.publish.titleModalPublishMission")}
          </DialogTitle>
        </DialogHeader>

        <SurveysBuilderProvider>
          <div className="p-6 overflow-y-auto max-h-[70vh]">
            {step === "config" && (
              <Form {...form}>
                <ConfigMissionForContributorsForm />
              </Form>
            )}

            {step === "preview" && (
              <div className="grid grid-cols-3 gap-6">
                <AudiencesFilterProvider>
                  <MissionBrief mission={mission} isPublish />
                </AudiencesFilterProvider>

                <div className="col-span-2">
                  <SurveyShow />
                </div>
              </div>
            )}
          </div>

          <DialogFooter className="border-t px-6 py-4 flex justify-between">
            {step === "preview" && (
              <Button variant="outline" onClick={() => setStep("config")}>
                {t("missions.publish.form.previous")}
              </Button>
            )}

            <Button
              onClick={() =>
                step === "config" ? setStep("preview") : handlePublish()
              }
              disabled={createConfig.isExecuting || publishMission.isExecuting}
            >
              {createConfig.isExecuting || publishMission.isExecuting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {t("common.loading")}
                </>
              ) : step === "config" ? (
                t("missions.publish.form.next")
              ) : (
                t("missions.publish.form.done")
              )}
            </Button>
          </DialogFooter>
        </SurveysBuilderProvider>
      </DialogContent>
    </Dialog>
  );
}