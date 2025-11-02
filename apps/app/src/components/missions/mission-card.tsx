"use client";

import { timeAgo } from "@/lib/utils";
import { useCurrentLocale, useI18n } from "@/locales/client";
import Link from "next/link";
import { MissionStatus } from "./mission-status";
import MissionPermissionsModal from "./mission-permissions-modal";
import { useMemo, useState } from "react";
import { Mission } from "./type";
import { ExportOrgMissions } from "./export-all-button";
import { useAction } from "next-safe-action/hooks";
import { toast } from "@/hooks/use-toast";
import { duplicateMissionAction } from "@/actions/missions/duplicate-mission-action";
import { Copy } from "lucide-react";
import { Button } from "@tada/ui/components/button";
import { Icons } from "../icons";
import { useRouter } from "next/navigation";

interface MissionCardProps {
  mission: Mission & { submissions: number; percentage: number };
  orgId: string;
}

export function MissionCard({ mission, orgId }: MissionCardProps) {
  const t = useI18n();
  const router = useRouter();
  const currentLocale = useCurrentLocale();
  const [isLoading, setIsLoading] = useState(false);
  const pureMission = useMemo(() => {
    const { submissions, percentage, ...rest } = mission;
    return rest;
  }, [mission]);

  const duplicateMission = useAction(duplicateMissionAction, {
    onSuccess: async ({ data }) => {
      setIsLoading(true);
      await router.push(`/missions/${orgId}/${data?.duplicationId}`);
      toast({
        title: t("missions.duplicate.success"),
        description: t("missions.duplicate.descriptionSuccess"),
      });
    },
    onError: () => {
      toast({
        title: t("missions.duplicate.error"),
        description: t("missions.duplicate.descriptionError"),
        variant: "destructive",
      });
      setIsLoading(false);
    },
  });

  if (isLoading) {
    return (
      <div className="fixed inset-0 z-50 bg-white/80 dark:bg-black/80 flex flex-col items-center justify-center">
        <Icons.spinner className="h-8 w-8 animate-spin text-gray-700 dark:text-gray-200" />
        <span className="text-sm text-gray-700 mt-1 font-light">
          {t("missions.duplicate.redirect")}
        </span>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between">
      <Link
        href={`/missions/${orgId}/${mission.id}`}
        className="grid grid-cols-4 py-6 px-4 gap-4"
      >
        <div className="flex flex-col">
          <h2 className="font-medium text-gray-800 dark:text-gray-100">
            {mission.name}
          </h2>
          {mission.status && <MissionStatus mission={mission} />}
        </div>

        <div className="flex flex-col">
          <div className="flex items-center">
            <span className="text-gray-600 text-sm dark:text-gray-100">
              {t("missions.completion", { percentage: mission.percentage })}
            </span>
          </div>

          {mission.createdAt && (
            <span className="text-xs text-gray-400 mt-2 dark:text-gray-100">
              {timeAgo(new Date(mission.createdAt), currentLocale)}
            </span>
          )}
        </div>

        <div className="flex flex-col">
          <div className="flex items-center">
            <span className="text-gray-600 text-sm dark:text-gray-100">
              {t("missions.submissions", {
                submissions: mission.submissions,
              })}
            </span>
          </div>

          {mission.updatedAt && (
            <span className="text-xs text-gray-400 mt-2 dark:text-gray-100">
              {timeAgo(new Date(mission.updatedAt), currentLocale)}
            </span>
          )}
        </div>

        <div className="flex flex-col">
          {mission.updatedAt && (
            <span className="text-gray-600 text-sm dark:text-gray-100">
              {timeAgo(new Date(mission.updatedAt), currentLocale)}
            </span>
          )}

          {mission.updatedType && (
            <span className="text-xs text-gray-400 mt-2 dark:text-gray-100">
              {t(
                `missions.updated_type.${mission.updatedType}` as keyof typeof t
              )}
            </span>
          )}
        </div>
      </Link>
      <div className="space-x-2 flex">
        <Button
          size="icon"
          onClick={() =>
            duplicateMission.execute({ missionId: pureMission.id })
          }
        >
          {duplicateMission?.isExecuting ? (
            <Icons.spinner className="h-4 w-4 animate-spin" />
          ) : (
            <Copy size={20} />
          )}
        </Button>
        <MissionPermissionsModal orgId={orgId} mission={pureMission as any} />
      </div>
    </div>
  );
}
