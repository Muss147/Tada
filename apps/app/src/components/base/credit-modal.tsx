"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@tada/ui/components/button";
import { Input } from "@tada/ui/components/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@tada/ui/components/dialog";
import { useScopedI18n } from "@/locales/client";
import { useBillingStore } from "@/hooks/use-billing-store";

type Plan = {
  id: string;
  name: string;
  description: string | null;
  price: number;
  currency: string;
  interval: string;
  features: any;
  maxMissions: number | null;
  addOn: number;
  maxUsers: number | null;
  maxResponses: number | null;
};

type SubscriptionResponse =
  | {
      subscription: {
        id: string;
        status: string;
        organizationId: string;
        planId: string;
        stripeCustomerId: string | null;
        stripeSubscriptionId: string | null;
        stripePriceId: string | null;
        currentPeriodStart: string;
        currentPeriodEnd: string;
        cancelAtPeriodEnd: boolean;
        trialEnd: string | null;
        metadata: unknown | null;
        createdAt: string;
        updatedAt: string;
      };
      plan: Plan;
    }
  | { subscription: null; plan: null };

export function CreditsModal({
  open = true,
  toggleOpen = () => {},
  handleAsYouGo = () => {},
  organizationId,
}: {
  open?: boolean;
  toggleOpen?: () => void;
  handleAsYouGo?: () => void;
  organizationId: string;
}) {
  const commonT = useScopedI18n("common");
  const t = useScopedI18n("creditsModal");

  // Utilisation du store Zustand
  const {
    credits,
    setField,
    setAllFields,
    unitPrice,
    organizationId: storeOrganizationId,
  } = useBillingStore();
  const total = (credits * unitPrice).toFixed(2);

  const [loadingPlan, setLoadingPlan] = React.useState<boolean>(false);
  const [plan, setPlan] = React.useState<Plan | null>(null);
  const [notFound, setNotFound] = React.useState<boolean>(false);

  // Synchroniser l'organizationId avec le store
  React.useEffect(() => {
    if (organizationId && organizationId !== storeOrganizationId) {
      setField("organizationId", organizationId);
    }
  }, [organizationId, storeOrganizationId, setField]);

  React.useEffect(() => {
    if (!organizationId) return;

    let isMounted = true;
    setLoadingPlan(true);

    fetch(`/api/organizations/${organizationId}/subscription`)
      .then(async (res) => {
        if (res.status === 404) {
          if (!isMounted) return;
          setNotFound(true);
          setPlan(null);
          return;
        }
        const data: SubscriptionResponse = await res.json();

        if (!isMounted) return;
        if ("plan" in data && data.plan) {
          setPlan(data.plan);
          setField("unitPrice", plan?.addOn || 13);
        } else {
          setPlan(null);
          setNotFound(true);
        }
      })
      .catch(() => {
        if (!isMounted) return;
        setPlan(null);
        setNotFound(true);
      })
      .finally(() => {
        if (!isMounted) return;
        setLoadingPlan(false);
      });

    return () => {
      isMounted = false;
    };
  }, [organizationId]);

  // Handler pour la mise à jour des crédits
  const handleCreditsChange = (value: string) => {
    const numericValue = Number.parseInt(value || "0");
    setField("credits", Number.isNaN(numericValue) ? 0 : numericValue);
  };

  // Handler amélioré pour "As you go" qui passe les données du store
  const handleEnhancedAsYouGo = () => {
    // Vous pouvez ajouter ici d'autres données du store si nécessaire
    const billingData = {
      credits,
      organizationId: storeOrganizationId || organizationId,
      total: parseFloat(total),
      unitPrice,
    };

    console.log("Billing data:", billingData); // Pour debug
    handleAsYouGo(); // Passer les données si la fonction les accepte
  };

  return (
    <Dialog open={open} onOpenChange={toggleOpen}>
      <DialogContent className="sm:max-w-5xl p-0 rounded-lg max-h-[90vh] overflow-y-auto flex flex-col">
        <DialogHeader className="px-6 py-4 border-b flex flex-row items-center justify-between flex-shrink-0">
          <DialogTitle className="text-lg font-semibold">
            {t("title")}
          </DialogTitle>
        </DialogHeader>

        <div className="p-6 space-y-6 flex-grow">
          {/* Brands */}
          <div className="bg-[#F5F5F5] py-5 rounded-xl">
            <div className="mb-6 text-center text-gray-500 text-sm">
              {t("approvedBy")}
            </div>
            <div className="flex justify-center gap-6 mb-8 flex-wrap items-center">
              {["cocacola", "pepsico", "unicef", "toyota"].map((brand, i) => (
                <Image
                  key={i}
                  src={`/images/${brand}.png`}
                  alt={brand}
                  width={120}
                  height={60}
                  className="h-8 w-auto"
                />
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Plan "As you go" */}
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold text-center text-xl mb-1">
                {t("researchAsYouGo.title")}
              </h3>
              <p className="text-sm text-center text-gray-500 mb-4">
                {t("researchAsYouGo.price")}
              </p>

              <div className="space-y-2">
                <label className="text-sm text-gray-600">
                  {t("researchAsYouGo.creditCount")}
                </label>
                <Input
                  type="number"
                  value={Number.isNaN(credits) ? 0 : credits}
                  onChange={(e) => handleCreditsChange(e.target.value)}
                  className="h-9"
                  min="0"
                  step="1"
                />
                <div className="text-sm text-gray-600">
                  {t("researchAsYouGo.totalHT")} <strong>€ {total}</strong>
                </div>

                {/* Informations supplémentaires basées sur les crédits */}
                {credits > 0 && (
                  <div className="text-xs text-gray-500 space-y-1">
                    <div>Prix unitaire : € {unitPrice} / crédit</div>
                  </div>
                )}
              </div>

              <Button
                className="mt-4 w-full"
                onClick={handleEnhancedAsYouGo}
                disabled={credits <= 0}
              >
                {commonT("next")}
              </Button>
            </div>

            {/* Right column: Active plan or fallback */}
            <div className="border rounded-lg p-4 flex flex-col justify-between">
              {loadingPlan ? (
                <div className="space-y-2 animate-pulse">
                  <div className="h-6 w-1/3 bg-gray-200 rounded" />
                  <div className="h-4 w-1/2 bg-gray-200 rounded" />
                  <div className="h-4 w-2/3 bg-gray-200 rounded" />
                  <div className="h-4 w-1/3 bg-gray-200 rounded" />
                </div>
              ) : plan ? (
                <PlanDetails plan={plan} toggleOpen={toggleOpen} />
              ) : (
                <NoPlanFallback toggleOpen={toggleOpen} />
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function PlanDetails({
  plan,
  toggleOpen,
}: {
  plan: Plan;
  toggleOpen: () => void;
}) {
  const tPlan = useScopedI18n("creditsModal.plan");
  const price = new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: plan.currency || "EUR",
    maximumFractionDigits: 0,
  }).format(plan.price);

  const features: any = Array.isArray(plan.features) ? plan.features : [];

  return (
    <div className="flex flex-col h-full">
      <div>
        <h3 className="font-semibold text-xl text-center mb-1">{plan.name}</h3>
        {plan.description ? (
          <p className="text-sm text-center text-gray-500 mb-4">
            {plan.description}
          </p>
        ) : null}
        <p className="text-center text-2xl font-semibold mb-4">
          {price}
          <span className="text-sm text-gray-500 font-normal">
            {" "}
            / {plan.interval}
          </span>
        </p>

        <ul className="text-sm text-gray-600 space-y-1 mb-4">
          {Array.isArray(features) &&
            features
              .filter((f) => f.included)
              .map((f, i) => <li key={i}>• {f.text}</li>)}
        </ul>
      </div>
      <Link href="/pricing">
        <Button
          variant="outline"
          className="w-full mt-auto"
          onClick={toggleOpen}
        >
          {tPlan("manageSubscription")}
        </Button>
      </Link>
    </div>
  );
}

function NoPlanFallback({ toggleOpen }: { toggleOpen: () => void }) {
  const tNoPlan = useScopedI18n("creditsModal.noPlan");
  return (
    <div className="flex flex-col h-full">
      <div>
        <h3 className="font-semibold text-xl text-center mb-2">
          {tNoPlan("title")}
        </h3>
        <p className="text-sm text-center text-gray-600 mb-4">
          {tNoPlan("description")}
        </p>
      </div>
      <Button asChild variant="outline" className="w-full mt-auto">
        <Link href="/pricing" onClick={toggleOpen}>
          {tNoPlan("seePricing")}
        </Link>
      </Button>
    </div>
  );
}
