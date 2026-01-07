// src/components/missions/forms/config-mission-for-contributors-form.tsx
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useFormContext } from "react-hook-form";

import { createMissionConfigForContributorsSchema } from "@/actions/missions/schema";
import { Icons } from "@/components/icons";
import { useI18n } from "@/locales/client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@tada/ui/components/form";
import { Input } from "@tada/ui/components/input";
import { Textarea } from "@tada/ui/components/textarea";

import type { z } from "zod";
import type { MissionConfigContributor } from "@prisma/client";

type FormValues = z.infer<
  typeof createMissionConfigForContributorsSchema
>;

interface Props {
  config?: MissionConfigContributor | null;
}

export function ConfigMissionForContributorsForm({ config }: Props) {
  const t = useI18n();
  const form = useFormContext<FormValues>();

  const [avatarPreview, setAvatarPreview] = useState<string | null>(
    config?.imageUrl ?? null
  );
  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  /**
   * RESET SÉCURISÉ
   * - Seulement si la config arrive
   * - Seulement si l’utilisateur n’a pas encore modifié le formulaire
   */
  useEffect(() => {
    if (!config) return;

    form.reset({
      title: config.title,
      description: config.description,
      gain: Number(config.gain),
      duration: Number(config.duration),
      deadline: config.deadline ?? null,
      targetSampleSize: config.targetSampleSize ?? undefined,
    });

    setAvatarPreview(config.imageUrl ?? null);
  }, [config?.id]);

  /**
   * Avatar upload (preview only)
   * L’upload réel se fera ailleurs (PublishMissionModal)
   */
  const handleAvatarUpload = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // 🔐 On stocke le fichier dans le form
    form.setValue("imageFile", file, {
      shouldDirty: true,
      shouldValidate: true,
    });

    const reader = new FileReader();
    reader.onloadend = () => {
      setAvatarPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-6">
      <FormField
        control={form.control}
        name="imageFile"
        render={() => <></>}
      />
      {/* Avatar */}
      <div>
        <FormLabel>{t("settings.personalInfo.avatar")}</FormLabel>

        <div className="flex items-center">
          <div className="flex-1 border border-input rounded-md shadow-sm">
            {avatarPreview ? (
              <Image
                src={avatarPreview}
                width={400}
                height={200}
                alt=""
                className="w-full object-cover rounded-md"
                unoptimized={false}
              />
            ) : (
              <label className="p-6 text-center cursor-pointer block">
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleAvatarUpload}
                />
                <div className="w-10 h-10 bg-red-100 rounded-full mx-auto mb-2 flex items-center justify-center">
                  <Icons.upload className="h-5 w-5 text-primary" />
                </div>
                <p className="text-primary mb-1">
                  {t("settings.personalInfo.uploadText")}
                </p>
                <p className="text-gray-500 text-sm">
                  {t("settings.personalInfo.dragAndDrop")}
                </p>
                <p className="text-gray-400 text-xs mt-1">
                  {t("settings.personalInfo.fileTypes")}
                </p>
              </label>
            )}
          </div>
        </div>
      </div>

      {/* Title */}
      <FormField
        control={form.control}
        name="title"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              {t("missions.publish.form.configMissionTitle")}
            </FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Description */}
      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              {t("missions.publish.form.configMissionDescription")}
            </FormLabel>
            <FormControl>
              <Textarea rows={8} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Gain */}
      <FormField
        control={form.control}
        name="gain"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              {t("missions.publish.form.configMissionGain")}
            </FormLabel>
            <FormControl>
              <Input
                type="number"
                {...field}
                onChange={(e) =>
                  field.onChange(Number(e.target.value))
                }
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Duration + Deadline */}
      <div className="grid md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="duration"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {t("missions.publish.form.configMissionDuration")}
              </FormLabel>
              <FormControl>
                <Input
                  type="number"
                  {...field}
                  onChange={(e) =>
                    field.onChange(Number(e.target.value))
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="deadline"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {t("missions.publish.form.configMissionDeadline")}
              </FormLabel>
              <FormControl>
                <Input
                  type="datetime-local"
                  value={
                    field.value
                      ? new Date(field.value)
                          .toISOString()
                          .slice(0, 16)
                      : ""
                  }
                  onChange={(e) =>
                    field.onChange(
                      e.target.value
                        ? new Date(e.target.value)
                        : null
                    )
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      {/* Target sample size */}
      <FormField
        control={form.control}
        name="targetSampleSize"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              {t(
                "missions.publish.form.configMissionSampleSize"
              )}
            </FormLabel>
            <FormControl>
              <Input
                type="number"
                {...field}
                onChange={(e) =>
                  field.onChange(Number(e.target.value))
                }
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}