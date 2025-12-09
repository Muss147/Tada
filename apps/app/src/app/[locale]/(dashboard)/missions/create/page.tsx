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
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { locale } = await params;
  const value = await searchParams;

  const workspaceId = value.workspaceId as string | undefined;
  const templateId = value.t as string | undefined;
  const mode = value.mode as string | undefined;

  if (!workspaceId) {
    // pas de workspace → on renvoie vers la home ou la liste des workspaces
    return redirect(`/${locale}`);
  }

  const workspace = await prisma.workspace.findUnique({
    where: { id: workspaceId },
    include: {
      organization: true,
    },
  });

  if (!workspace || !workspace.organization) {
    return redirect(`/${locale}`);
  }

  const organization = {
    id: workspace.organization.id,
    status: workspace.organization.status,
  };

  const shouldShowConversationCard = !templateId && (!mode || mode === "ai");

  return (
    <div className="flex h-screen bg-gray-100">
      {shouldShowConversationCard && <ConversationCard />}
      <CreateMissionCard
        organization={organization}
        workspace={workspace}
        locale={locale}
      />
    </div>
  );
}
