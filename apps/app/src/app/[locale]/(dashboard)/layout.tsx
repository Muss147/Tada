import { Header } from "@/components/base/header";
import { Sidebar } from "@/components/base/sidebar";
import { notFound } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session || !session.user) {
    notFound();
  }

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header user={session.user as any} />
        <main className="flex-1 overflow-y-auto p-4">
          <div className="px-2 h-full">{children}</div>
        </main>
      </div>
    </div>
  );
}
