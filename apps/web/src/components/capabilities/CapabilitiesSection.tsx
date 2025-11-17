// apps/web/src/components/capabilities/CapabilitiesSection.tsx
"use client";
import CapabilityCard from "./CapabilityCard";
import { capabilities } from "./data";
import { useI18n } from "@/locales/client";

export default function CapabilitiesSection() {
  const t = useI18n();
  
  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <p className="mt-2 text-2xl md:text-5xl font-bold mb-4">
            {t("home.capabilities.title")}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {capabilities.map((cap) => (
            <CapabilityCard key={cap.id} {...cap} />
            ))}
        </div>
    </div>
  );
}