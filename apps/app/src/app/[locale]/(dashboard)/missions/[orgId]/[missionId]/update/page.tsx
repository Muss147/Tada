import { ConversationCard } from "@/components/missions/conversation-card";
import { UpdateMissionCard } from "@/components/missions/update-mission-card";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Update Mission info| Tada",
};

export default async function Page({
  params,
}: {
  params: { orgId: string; missionId: string };
}) {
  const orgId = params.orgId;

  const org = await prisma.organization.findUnique({
    where: { id: orgId },
    select: { id: true, name: true, status: true },
  });

  if (!org) return redirect("/");

  const mission =
    (await prisma.tempMission.findUnique({
      where: { missionId: params.missionId },
    })) ??
    (await prisma.mission.findUnique({
      where: { id: params.missionId },
    }));

  if (!mission) return redirect("/");

  return (
    <div className="flex h-screen bg-gray-100">
      <ConversationCard />
      <UpdateMissionCard
        organization={org}
        mission={mission}
        originalMissionId={params?.missionId}
      />
    </div>
  );
}
