// src/components/missions/forms/config-mission-for-contributors-form.tsx
"use client";

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
import { useFormContext } from "react-hook-form";
import { Input } from "@tada/ui/components/input";
import { Textarea } from "@tada/ui/components/textarea";
import Image from "next/image";
import { useState } from "react";

export function ConfigMissionForContributorsForm() {
  const t = useI18n();
  const form = useFormContext<
    typeof createMissionConfigForContributorsSchema._type
  >();

  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  /**
   * Avatar upload (preview only)
   * Le fichier est stocké dans le form state
   * L’upload réel se fera dans PublishMissionModal
   */
  const handleAvatarUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setAvatarFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarUrl(reader.result as string);
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-6">
      {/* Avatar */}
      <div>
        <FormLabel>{t("settings.personalInfo.avatar")}</FormLabel>

        <div className="flex items-center">
          <div className="flex-1 border border-input rounded-md shadow-sm">
            {avatarPreview ? (
              <Image
                src={avatarPreview}
                width={120}
                height={120}
                alt=""
                className="w-full"
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
            <FormLabel className="text-sm/5 font-medium">
              {t("missions.publish.form.configMissionTitle")}
            </FormLabel>
            <FormControl>
              <Input
                placeholder={t("missions.publish.form.configMissionTitle")}
                {...field}
              />
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
            <FormLabel className="text-sm/5 font-medium">
              {t("missions.publish.form.configMissionDescription")}
            </FormLabel>
            <FormControl>
              <Textarea
                placeholder={t(
                  "missions.publish.form.configMissionDescription"
                )}
                rows={8}
                {...field}
              />
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
            <FormLabel className="text-sm/5 font-medium">
              {t("missions.publish.form.configMissionGain")}
            </FormLabel>
            <FormControl>
              <Input
                type="number"
                placeholder={t("missions.publish.form.configMissionGain")}
                {...field}
                onChange={(e) => field.onChange(Number(e.target.value))}
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
              <FormLabel className="text-sm/5 font-medium">
                {t("missions.publish.form.configMissionDuration")}
              </FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder={t(
                    "missions.publish.form.configMissionDuration"
                  )}
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
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
              <FormLabel className="text-sm/5 font-medium">
                {t("missions.publish.form.configMissionDeadline")}
              </FormLabel>
              <FormControl>
                <Input
                  type="datetime-local"
                  value={
                    field.value
                      ? new Date(field.value).toISOString().slice(0, 16)
                      : ""
                  }
                  onChange={(e) =>
                    field.onChange(
                      e.target.value ? new Date(e.target.value) : null
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
            <FormLabel className="text-sm/5 font-medium">
              {t("missions.publish.form.configMissionSampleSize")}
            </FormLabel>
            <FormControl>
              <Input
                type="number"
                placeholder={t(
                  "missions.publish.form.configMissionSampleSize"
                )}
                {...field}
                onChange={(e) => field.onChange(Number(e.target.value))}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}