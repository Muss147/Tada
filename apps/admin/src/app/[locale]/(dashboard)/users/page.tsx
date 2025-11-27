import { UsersTable } from "@/components/users/users-table";
import StatCard from "@/components/contributors/stat-card";
import { prisma } from "@/lib/prisma";
import { getI18n } from "@/locales/server";
import {
  Users,
  UserCheck,
  Shield,
  UserX,
} from "lucide-react";

export const metadata = {
  title: "Gestion des Utilisateurs | Tada",
};

async function getUsersWithStats() {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      kyc_status: true,
      image: true,
      location: true,
      job: true,
      position: true,
      country: true,
      sector: true,
      banned: true,
      createdAt: true,
      updatedAt: true,
      _count: {
        select: {
          members: true,
          missionAssignments: true,
          surveyResponses: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  // Calculer les statistiques
  const totalUsers = users.length;
  const contributors = users.filter((u) => u.role === "contributor").length;
  const clients = users.filter((u) => u.role === "client").length;
  const admins = users.filter((u) => u.role === "admin").length;
  const bannedUsers = users.filter((u) => u.banned).length;
  const verifiedUsers = users.filter((u) => u.kyc_status === "completed").length;

  return {
    users,
    stats: {
      total: totalUsers,
      contributors,
      clients,
      admins,
      banned: bannedUsers,
      verified: verifiedUsers,
    },
  };
}

export default async function UsersPage() {
  const t = await getI18n();
  const { users, stats } = await getUsersWithStats();

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 mb-4">
        {[
          {
            key: "total-users",
            label: "Total Utilisateurs",
            value: stats.total,
            icon: <Users className="h-8 w-8 text-blue-600" />,
          },
          {
            key: "contributors",
            label: "Contributeurs",
            value: stats.contributors,
            icon: <UserCheck className="h-8 w-8 text-green-600" />,
          },
          {
            key: "admins",
            label: "Administrateurs",
            value: stats.admins,
            icon: <Shield className="h-8 w-8 text-purple-600" />,
          },
          {
            key: "banned-users",
            label: "Utilisateurs Bannis",
            value: stats.banned,
            icon: <UserX className="h-8 w-8 text-red-600" />,
          },
        ].map((item) => (
          <StatCard key={item.key} item={item} />
        ))}
      </div>
      <div className="min-h-screen p-3 bg-white">
        <UsersTable users={users} />
      </div>
    </div>
  );
}
