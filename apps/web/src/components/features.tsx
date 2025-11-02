"use client";

import FeatureBlock from "./feature-block";
import { useI18n } from "@/locales/client";
export const Features: React.FC = () => {
  const t = useI18n();
  return (
    <section className="py-20 px-6 bg-gray-100">
      <div className="max-w-7xl mx-auto">
        <p className="text-4xl md:text-5xl font-bold text-center mb-16 text-black">
          {t("home.what_sets_tada_apart.title")}
        </p>
        <p className="text-center text-gray-600 mb-10">
          {t("home.what_sets_tada_apart.description")}
        </p>

        <div className="grid lg:grid-cols-2 gap-x-24 gap-y-12">
          <FeatureBlock
            icon="/images/global-network.svg"
            title={t("home.what_sets_tada_apart.features.title")}
            description={t("home.what_sets_tada_apart.features.description")}
          />

          <FeatureBlock
            icon="/images/dashboard.svg"
            title={t("home.what_sets_tada_apart.features.title_2")}
            description={t("home.what_sets_tada_apart.features.description_2")}
          />

          <FeatureBlock
            icon="/images/mobile-app.svg"
            title={t("home.what_sets_tada_apart.features.title_3")}
            description={t("home.what_sets_tada_apart.features.description_3")}
          />

          <FeatureBlock
            icon="/images/ai-powerd.svg"
            title={t("home.what_sets_tada_apart.features.title_4")}
            description={t("home.what_sets_tada_apart.features.description_4")}
          />
        </div>
      </div>
    </section>
  );
};
