"use client";

import { useCurrency } from "@/hooks/use-currency";
import { signOut, useSession } from "@/lib/auth-client";
import { useChangeLocale, useCurrentLocale, useI18n } from "@/locales/client";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@tada/ui/components/avatar";
import { Button } from "@tada/ui/components/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@tada/ui/components/dropdown";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@tada/ui/components/select";
import { cn } from "@tada/ui/lib/utils";
import {
  Calendar,
  CircleDollarSign,
  Clock,
  FileText,
  FolderOpen,
  Globe,
  Home,
  Layers,
  LogOut,
  Moon,
  Settings,
  User,
  Users,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { SidebarGroup } from "./sidebar-group";

interface SidebarItemProps {
  icon: React.ReactNode;
  text: string;
  href: string;
  active?: boolean;
}

function SidebarItem({ icon, text, href, active }: SidebarItemProps) {
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center px-4 py-3 text-sm rounded-lg transition-colors",
        active
          ? "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white"
          : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800"
      )}
    >
      <span className="mr-3">{icon}</span>
      <span>{text}</span>
    </Link>
  );
}

const languages = [
  { code: "fr", name: "Français", flag: "/flags/fr.svg" },
  { code: "en", name: "English", flag: "/flags/en.svg" },
] as const;

export function Sidebar() {
  const t = useI18n();
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession();

  // Get current locale from pathname
  const currentLocale = useCurrentLocale();

  const navigationItems = [];

  const navigationGroups = [
    {
      items: [
        {
          icon: <Home className="h-5 w-5" />,
          text: t("navigation.home"),
          href: "/",
        },
      ],
    },
    {
      title: t("navigation.workspace"),
      items: [
        {
          icon: <Users className="h-5 w-5" />,
          text: t("navigation.contributors"),
          href: "/contributors",
        },
        {
          icon: <FolderOpen className="h-5 w-5" />,
          text: t("navigation.missions"),
          href: "/missions",
        },
        {
          icon: <FolderOpen className="h-5 w-5" />,
          text: t("navigation.missions_to_validate"),
          href: "/missions-to-validate",
        },
        {
          icon: <User className="h-5 w-5" />,
          text: t("navigation.organizations"),
          href: "/organizations",
        },
      ],
    },
    {
      title: t("navigation.explore"),
      items: [
        {
          icon: <Layers className="h-5 w-5" />,
          text: t("navigation.templates"),
          href: `/templates`,
        },
      ],
    },
    {
      title: t("navigation.settings"),
      items: [
        {
          icon: <Settings className="h-5 w-5" />,
          text: t("navigation.settings"),
          href: "/settings/access-control",
        },
      ],
    },
  ];

  const handleSignOut = async () => {
    await signOut();
    router.push("/login");
  };

  const currentLanguage =
    languages.find((lang) => lang.code === currentLocale) || languages[0];

  return (
    <div className="w-64 h-screen bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 flex flex-col">
      {/* Logo */}
      <div className="p-6">
        <Link href="/" className="flex items-center">
          <Image
            src="/logo-group.png"
            alt="Tada Logo"
            width={90}
            height={32}
            priority
            className=""
          />
        </Link>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 px-4 overflow-y-auto">
        {navigationGroups.map((group, _idx) => (
          <SidebarGroup key={_idx} title={group.title || ""}>
            {group.items.map((item, idx) => (
              <SidebarItem
                key={idx}
                icon={item.icon}
                text={item.text}
                href={item.href}
                active={pathname === item.href}
              />
            ))}
          </SidebarGroup>
        ))}
      </nav>

      {/* User Profile */}
      <div className="p-6 border-t border-gray-200 dark:border-gray-800">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="w-full justify-start px-0 hover:bg-transparent"
            >
              <Avatar className="mr-3">
                {session?.user?.image && (
                  <AvatarImage src={session?.user?.image} alt="User avatar" />
                )}
                <AvatarFallback>
                  {session?.user?.name?.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 text-left ">
                <p className="text-xs font-medium dark:text-white truncate line-clamp-1">
                  {session?.user?.name}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate line-clamp-1">
                  {session?.user?.email}
                </p>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[200px]">
            <DropdownMenuLabel>{t("user.menu.title")}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              <Link href="/settings/access-control">
                <span>{t("user.menu.settings")}</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <CircleDollarSign className="mr-2 h-4 w-4" />
              <Link href="/pricings">
                <span>{t("user.menu.pricings")}</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleSignOut}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>{t("user.menu.signOut")}</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
