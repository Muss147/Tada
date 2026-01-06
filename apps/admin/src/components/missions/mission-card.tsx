// src/components/missions/mission-card.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { timeAgo } from "@/lib/utils";
import { useCurrentLocale, useI18n } from "@/locales/client";
import { MissionStatus } from "./mission-status";
import type { Mission } from "./type";
import { FullScreenLoader } from "@tada/ui/components/customs/fullscreen-loader";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@tada/ui/components/dropdown-menu";
import { Button } from "@tada/ui/components/button";
import {
  Loader2,
  MoreHorizontal,
  Users,
  UserPlus,
  CloudUpload,
  CloudDownload,
  EyeIcon,
  CheckCircle,
} from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { toast } from "@/hooks/use-toast";
import { publishMissionAction } from "@/actions/missions/publish-mission-action";
import { updateMissionStatusAction } from "@/actions/missions/update-mission-status-action";
import { MissionPublishStatus } from "./mission-publish-status";
import { MissionAssignmentModal } from "./mission-assignment-modal";
import { AssignedContributorsView } from "./assigned-contributors";
import { PublishMissionModal } from "./modals/publish-mission-modal";

interface MissionCardProps {
  mission: Mission & { submissions: number; percentage: number };
}

export function MissionCard({ mission }: MissionCardProps) {
  const t = useI18n();
  const locale = useCurrentLocale();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false);
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [isAssignedViewOpen, setIsAssignedViewOpen] = useState(false);

  const publishMission = useAction(publishMissionAction, {
    onSuccess: () => {
      toast({
        title: t("missions.publish.success"),
        description: t("missions.publish.successDescription"),
      });
      router.refresh();
    },
    onError: () => {
      toast({
        title: t("missions.publish.error"),
        variant: "destructive",
      });
    },
  });

  const updateMissionStatus = useAction(updateMissionStatusAction, {
    onSuccess: () => {
      toast({
        title: "Mission complétée",
        description: "La mission est maintenant terminée.",
      });
      router.refresh();
    },
  });

  const goToMission = () => {
    setIsLoading(true);
    router.push(`/missions/${mission.id}`);
  };

  useEffect(() => () => setIsLoading(false), []);

  return (
    <>
      {isLoading && <FullScreenLoader />}

      <div
          onClick={
            mission.isPublish 
              ? goToMission 
              : (e) => {
                  e.stopPropagation();
                  setIsPublishModalOpen(true);
                }
          }
          className="cursor-pointer border-b hover:bg-gray-50 transition"
        >
        <div className="grid grid-cols-4 gap-4 px-4 py-6">
          {/* Infos mission */}
          <div className="col-span-2">
            <h3 className="font-medium">{mission.name}</h3>
            <MissionStatus mission={mission} />
          </div>

          {/* Progression */}
          <div>
            <p className="text-sm text-gray-600">
              {t("missions.completion", { percentage: mission.percentage })}
            </p>
            <p className="text-xs text-gray-400 mt-1">
              {timeAgo(new Date(mission.createdAt), locale)}
            </p>
          </div>

          {/* Actions */}
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-600">
                {t("missions.submissions", {
                  submissions: mission.submissions,
                })}
              </p>
              <MissionPublishStatus mission={mission} />
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  {publishMission.isExecuting ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    <MoreHorizontal />
                  )}
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={(e) => {
                  e.stopPropagation();
                  setIsAssignModalOpen(true);
                }}>
                  <UserPlus className="mr-2 h-4 w-4" />
                  Attribuer
                </DropdownMenuItem>

                <DropdownMenuItem onClick={(e) => {
                  e.stopPropagation();
                  setIsAssignedViewOpen(true);
                }}>
                  <Users className="mr-2 h-4 w-4" />
                  Contributeurs
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                {!mission.isPublish ? (
                  <DropdownMenuItem onClick={(e) => {
                    e.stopPropagation();
                    setIsPublishModalOpen(true);
                  }}>
                    <CloudUpload className="mr-2 h-4 w-4" />
                    Publier
                  </DropdownMenuItem>
                ) : (
                  <>
                    <DropdownMenuItem
                      onClick={(e) => {
                        e.stopPropagation();
                        publishMission.execute({
                          missionId: mission.id,
                          isPublish: false,
                          status: "on hold",
                        });
                      }}
                    >
                      <CloudDownload className="mr-2 h-4 w-4" />
                      Retirer
                    </DropdownMenuItem>

                    <DropdownMenuItem
                      onClick={(e) => {
                        e.stopPropagation();
                        updateMissionStatus.execute({
                          missionId: mission.id,
                          status: "completed",
                        });
                      }}
                    >
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Compléter
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      <PublishMissionModal
        isOpen={isPublishModalOpen}
        onClose={(assign) => {
          setIsPublishModalOpen(false);
          if (assign) setIsAssignModalOpen(true);
        }}
        mission={mission}
      />

      <MissionAssignmentModal
        isOpen={isAssignModalOpen}
        onClose={() => setIsAssignModalOpen(false)}
        missionId={mission.id}
        missionName={mission.name}
      />

      <AssignedContributorsView
        isOpen={isAssignedViewOpen}
        onClose={() => setIsAssignedViewOpen(false)}
        missionId={mission.id}
        missionName={mission.name}
      />
    </>
  );
}