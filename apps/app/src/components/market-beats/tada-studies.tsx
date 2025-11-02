"use client";

import { useState, useEffect } from "react";
import { useAction } from "next-safe-action/hooks";
import { Input } from "@tada/ui/components/input";
import { authClient } from "@/lib/auth-client";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@tada/ui/components/select";
import { Button } from "@tada/ui/components/button";
import { Badge } from "@tada/ui/components/badge";
import { Search, Lock, ArrowRight, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  createSubscriptionCheckoutAction,
  getOrganizationSubscription,
  getSubscriptionPlans,
} from "@/actions/missions/subscription-actions";
import { useRouter } from "next/navigation";
import { useCurrentLocale, useI18n, useScopedI18n } from "@/locales/client";
import type { Mission, Organization } from "@prisma/client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@tada/ui/components/dialog";
import { recordMissionConsultation } from "@/actions/missions/consulted-mission";

interface DisplayMission {
  id: string;
  title: string;
  subtitle: string;
  date: string;
  bgColor: string;
}

interface StudiesDashboardProps {
  billingEmail: string;
  organization: any;
  missions: Mission[];
  maxMissionsAllowed: number;
  consultedMissionIds: string[];
}

const getMissionBgColor = (index: number): string => {
  const colors = [
    "from-blue-500 to-blue-700",
    "from-teal-600 to-teal-800",
    "from-red-600 to-red-800",
    "from-yellow-500 to-orange-600",
    "from-cyan-400 to-blue-500",
    "from-blue-600 to-indigo-700",
    "from-purple-500 to-purple-700",
    "from-pink-500 to-pink-700",
    "from-indigo-500 to-indigo-700",
    "from-emerald-500 to-emerald-700",
    "from-amber-500 to-amber-700",
  ];
  return colors[index % colors.length] || "from-red-600 to-red-800";
};

export function TadaStudies({
  billingEmail,
  organization,
  missions,
  maxMissionsAllowed,
  consultedMissionIds,
}: StudiesDashboardProps) {
  const t = useI18n();
  const studiesT = useScopedI18n("studies");
  const upgradeT = useScopedI18n("upgrade");
  const errorsT = useScopedI18n("errors");
  const currentLocale = useCurrentLocale();
  const { data: organizations } = authClient.useListOrganizations();
  const [subscription, setSubscription] = useState<any>(null);
  const [plans, setPlans] = useState<any[]>([]);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [selectedDisplayMission, setSelectedDisplayMission] =
    useState<DisplayMission | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<string>("all");
  const [loadingMissionId, setLoadingMissionId] = useState<string | null>(null); // Mission ID is string
  const { toast } = useToast();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createCheckout = useAction(createSubscriptionCheckoutAction, {
    onSuccess: ({ data }) => {
      if (data?.success && data.data?.url) {
        window.location.href = data.data.url;
      }
    },
    onError: ({ error }) => {
      console.log("error --", error);
      toast({
        title: t("common.error.somethingWentWrong"),
        description: errorsT("createCheckout"),
        variant: "destructive",
      });
    },
  });

  const recordConsultation = useAction(recordMissionConsultation, {
    onSuccess: ({ data }: any) => {
      if (data?.success) {
        console.log(data.message);
      } else {
        toast({
          title: t("common.error.somethingWentWrong"),
          description: data?.message || "Failed to record consultation.",
          variant: "destructive",
        });
      }
    },
    onError: ({ error }) => {
      console.error("Error recording consultation:", error);
      toast({
        title: t("common.error.somethingWentWrong"),
        description: "Failed to record consultation.",
        variant: "destructive",
      });
    },
  });

  useEffect(() => {
    if (!organizations?.[0]?.id) return;
    const fetchSubscription = async () => {
      setLoading(true);
      const result = await getOrganizationSubscription(
        organizations?.[0]?.id ?? ""
      );
      if (result.success) {
        setSubscription(result.data);
      } else {
        setError(result.error || "Une erreur est survenue");
      }
      setLoading(false);
    };
    fetchSubscription();
  }, [organizations]);

  useEffect(() => {
    async function loadData() {
      try {
        const subscriptionRes = await getSubscriptionPlans();
        setSubscription(subscriptionRes?.data);
        setPlans(subscriptionRes?.data || []);
      } catch (err) {
        console.error("Erreur chargement des données:", err);
        toast({
          title: t("common.error.somethingWentWrong"),
          description: errorsT("loadingPlans"),
          variant: "destructive",
        });
      }
    }
    loadData();
  }, [t, errorsT]);

  const handleMissionClick = async (mission: Mission) => {
    if (loadingMissionId !== null) {
      return;
    }

    // Map Mission to DisplayMission for modal display
    const displayMission: DisplayMission = {
      id: mission.id,
      title: mission.name,
      subtitle: mission.problemSummary || mission.objectives || "",
      date: new Date(mission.createdAt)
        .toLocaleDateString(currentLocale, { year: "numeric", month: "short" })
        .toUpperCase(),
      bgColor: getMissionBgColor(missions.indexOf(mission)),
    };

    // Check if the mission has already been consulted
    const isAlreadyConsulted = consultedMissionIds.includes(mission.id);

    // If already consulted, allow access regardless of limit
    if (isAlreadyConsulted) {
      setLoadingMissionId(mission.id);
      try {
        await new Promise((resolve) => setTimeout(resolve, 1500));
        router.push(`/missions/${organization?.id}/${mission.id}/dashboard`);
      } catch (error) {
        console.error("Erreur lors de la navigation:", error);
        toast({
          title: t("common.error.somethingWentWrong"),
          description: errorsT("accessStudy"),
          variant: "destructive",
        });
      } finally {
        setLoadingMissionId(null);
      }
      return;
    }

    // If not already consulted, check against the limit
    const currentConsultedCount = consultedMissionIds.length;
    if (currentConsultedCount >= maxMissionsAllowed) {
      setSelectedDisplayMission(displayMission);
      setShowUpgradeModal(true);
      return;
    }

    // If not locked and not already consulted, record consultation and navigate
    setLoadingMissionId(mission.id);
    try {
      await recordConsultation.execute({
        organizationId: organization?.id || "",
        missionId: mission.id,
      });

      await new Promise((resolve) => setTimeout(resolve, 1500));
      router.push(`/missions/${organization?.id}/${mission.id}/dashboard`);
    } catch (error) {
      console.error("Erreur lors de la navigation:", error);
      toast({
        title: t("common.error.somethingWentWrong"),
        description: errorsT("accessStudy"),
        variant: "destructive",
      });
    } finally {
      setLoadingMissionId(null);
    }
  };

  const handleUpgrade = (planId: string) => {
    if (loadingMissionId !== null) {
      return;
    }

    createCheckout.execute({
      organizationId: organization?.id,
      planId,
      billingEmail,
    });
  };

  const filteredMissions = missions.filter((mission) => {
    const missionName = mission.name || "";
    const problemSummary = mission.problemSummary || "";
    const objectives = mission.objectives || "";
    const type = mission.type || "";

    const matchesSearch =
      searchQuery === "" ||
      missionName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      problemSummary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      objectives.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesType =
      selectedType === "all" ||
      type.toLowerCase().includes(selectedType.toLowerCase());

    return matchesSearch && matchesType;
  });

  const hasLoadingMission = loadingMissionId !== null;

  const formatPrice = (price: number, currency: string, interval: string) => {
    const formattedPrice = new Intl.NumberFormat(
      currentLocale === "fr" ? "fr-FR" : "en-US",
      {
        style: "currency",
        currency: currency.toUpperCase(),
      }
    ).format(price);
    const intervalText =
      interval === "month" ? t("common.month") : t("common.year");
    return upgradeT("plans.priceFormat", {
      price: formattedPrice,
      interval: intervalText,
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-[#FF5B4A]" />
          <p className="text-gray-600">{t("common.loading")}</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <header className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {studiesT("title")}
            </h1>
          </div>
          <div className="flex items-center gap-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="text"
                placeholder={studiesT("searchPlaceholder")}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                disabled={hasLoadingMission}
                className="pl-12 pr-4 py-3 w-96 shadow-none bg-gray-50 border-gray-200 rounded-md text-gray-700 placeholder-gray-500 focus:bg-white focus:border-gray-300 focus:outline-none focus:ring-0 disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>
          </div>
        </div>
        {(!organization.subscription ||
          organization.subscription.status !== "active") && (
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-blue-900">
                  {studiesT("subscription.freeVersion")}
                </h3>
                <p className="text-blue-700">
                  {studiesT("subscription.freeDescription", {
                    count: maxMissionsAllowed,
                  })}
                </p>
              </div>
              <Button
                onClick={() => {
                  router.push(`/pricing/${organization?.id}`);
                }}
                className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={hasLoadingMission}
              >
                {t("common.upgrade")}
              </Button>
            </div>
          </div>
        )}
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredMissions.map((mission, index) => {
          const isAlreadyConsulted = consultedMissionIds.includes(mission.id);
          const isLockedForNewConsultation =
            !isAlreadyConsulted &&
            consultedMissionIds.length >= maxMissionsAllowed;
          const isCurrentlyLoading = loadingMissionId === mission.id;
          const shouldBlur = hasLoadingMission && !isCurrentlyLoading;

          const displayMission: DisplayMission = {
            id: mission.id,
            title: mission.name,
            subtitle: mission.problemSummary || mission.objectives || "", // Use problemSummary or objectives as subtitle
            date: new Date(mission.createdAt)
              .toLocaleDateString(currentLocale, {
                year: "numeric",
                month: "short",
              })
              .toUpperCase(),
            bgColor: getMissionBgColor(index), // Assign color based on index
          };

          return (
            <div
              key={displayMission.id}
              onClick={() => handleMissionClick(mission)} // Pass the original mission object
              className={`relative rounded-2xl overflow-hidden shadow-lg transition-all duration-300 group h-80 ${
                isLockedForNewConsultation ? "opacity-75" : ""
              } ${shouldBlur ? "blur-sm opacity-50" : ""} ${
                hasLoadingMission
                  ? "cursor-not-allowed"
                  : "cursor-pointer hover:shadow-xl"
              } ${
                isCurrentlyLoading ? "ring-2 ring-blue-500 ring-opacity-50" : ""
              }`}
            >
              {/* Background with gradient overlay */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${displayMission.bgColor}`}
              >
                <div
                  className={`absolute inset-0 ${
                    isLockedForNewConsultation ? "bg-black/50" : "bg-black/20"
                  }`}
                />
              </div>
              {/* Loading Overlay */}
              {isCurrentlyLoading && (
                <div className="absolute inset-0 flex items-center justify-center z-20 bg-black/30 backdrop-blur-sm">
                  <div className="bg-white/95 backdrop-blur-sm rounded-full p-4 shadow-lg">
                    <Loader2 className="h-8 w-8 text-blue-600 animate-spin" />
                  </div>
                </div>
              )}
              {/* Lock Overlay */}
              {isLockedForNewConsultation && !isCurrentlyLoading && (
                <div className="absolute inset-0 flex items-center justify-center z-10">
                  <div className="bg-white/90 backdrop-blur-sm rounded-full p-3">
                    <Lock className="h-5 w-5 text-gray-700" />
                  </div>
                </div>
              )}
              {isCurrentlyLoading && (
                <div className="absolute inset-0 z-10 bg-transparent" />
              )}
              <div className="relative h-full p-6 flex flex-col">
                <div className="mb-4">
                  <span className="inline-block bg-white/90 text-gray-800 text-xs font-bold px-3 py-1.5 rounded-md">
                    {displayMission.date}
                  </span>
                  {isCurrentlyLoading && (
                    <Badge
                      variant="default"
                      className="ml-2 bg-blue-100 text-blue-800"
                    >
                      {studiesT("card.loadingStudy")}
                    </Badge>
                  )}
                </div>
                <div className="flex-1 flex">
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-white text-2xl font-bold leading-tight line-clamp-4 mb-2">
                        {displayMission.title}
                      </h3>
                    </div>
                    {displayMission.subtitle && (
                      <p className="text-white/90 text-xs font-medium mt-auto line-clamp-5">
                        {displayMission.subtitle}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              {/* Hover overlay */}
              {!hasLoadingMission && (
                <div
                  className={`absolute inset-0 transition-opacity duration-300 ${
                    !isLockedForNewConsultation
                      ? "bg-black/10 opacity-0 group-hover:opacity-100"
                      : "bg-black/20 opacity-0 group-hover:opacity-100"
                  }`}
                />
              )}
              {!isLockedForNewConsultation && !hasLoadingMission && (
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="bg-[#FF5B4A] rounded-full p-1">
                    <ArrowRight className="h-4 w-4 text-white" />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Upgrade Modal */}
      <Dialog open={showUpgradeModal} onOpenChange={setShowUpgradeModal}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{upgradeT("modal.title")}</DialogTitle>
            <DialogDescription>
              {upgradeT("modal.description", {
                studyTitle: selectedDisplayMission?.title.replace(/\n/g, " "),
                count: maxMissionsAllowed,
              })}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowUpgradeModal(false)}
            >
              {t("common.cancel")}
            </Button>
            <Button onClick={() => router.push(`/pricing`)}>
              {t("common.upgrade")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
