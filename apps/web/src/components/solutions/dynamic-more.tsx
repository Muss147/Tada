"use client";

import React from "react";
import { useI18n } from "@/locales/client";
import SolutionCard from "./../solution-card";

import {
  featuresByUseCase,
  featuresByIndustry,
} from "@/components/solutions/data";

interface DynamicMoreProps {
  title: string;
  category?: string;
  family?: string;
}

const DynamicMore: React.FC<DynamicMoreProps> = ({ title, category, family }) => {
  const t = useI18n();

  // Filtrage des features à afficher
  const filteredSolutions = family === "industry" 
    ? featuresByIndustry.filter(
      (feature) => feature.title !== title
    )
    : featuresByUseCase.filter(
      (feature) => feature.category === category && feature.title !== title
    );

  // Vérification de sécurité
  if (!filteredSolutions || !Array.isArray(filteredSolutions) || filteredSolutions.length === 0) {
    return null;
  }

  return (
    <section className="py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            {family === "industry" 
              ? t("solutions.featuresByIndustry.more_solution_title") +" "+ t(title as any, {})
              : t("solutions.featuresByUseCase.more_solution_title")
            }
          </h2>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredSolutions.map((feature) => {
            const translationKey = family === "industry" 
              ? `solutions.featuresByIndustry.${feature.id}`
              : `solutions.featuresByUseCase.${feature.id}`;

            return (
              <SolutionCard
                key={feature.id}
                title={t(`${translationKey}.title` as any, {})}
                description={t(`${translationKey}.description` as any, {})}
                image={feature.image}
                link={feature.link}
                solutionFamily={family ?? "use-case"}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default DynamicMore;