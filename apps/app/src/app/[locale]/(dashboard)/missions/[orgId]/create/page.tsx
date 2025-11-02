import { ConversationCard } from "@/components/missions/conversation-card";
import { CreateMissionCard } from "@/components/missions/create-mission-card";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
export const metadata = {
  title: "Create Mission | Tada",
};

export default async function Page({
  params,
  searchParams,
}: {
  params: { orgId: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const orgId = params.orgId;
  const templateId = searchParams.t;
  const mode = searchParams.mode;

  if (!orgId) return redirect("/");

  const org = await prisma.organization.findUnique({
    where: {
      id: orgId,
    },
    select: {
      id: true,
      name: true,
      status: true,
    },
  });

  if (!org) return redirect("/");

  const shouldShowConversationCard = !templateId && (!mode || mode === "ai");

  return (
    <div className="flex h-screen bg-gray-100">
      {shouldShowConversationCard && <ConversationCard />}
      <CreateMissionCard organization={org} />
    </div>
  );
}
