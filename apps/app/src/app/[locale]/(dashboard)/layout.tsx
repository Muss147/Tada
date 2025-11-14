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

  // Authentication check disabled - allow access without login
  // if (!session || !session.user) {
  //   notFound();
  // }

  // Mock user for development (remove when authentication is re-enabled)
  const user = session?.user || {
    id: "dev-user",
    name: "Dev User",
    email: "dev@example.com",
  };

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header user={user as any} />
        <main className="flex-1 overflow-y-auto p-4">
          <div className="px-2 h-full">{children}</div>
        </main>
      </div>
    </div>
  );
}
