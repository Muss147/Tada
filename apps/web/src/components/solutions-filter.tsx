"use client";

import { useState } from "react";
import TabNavigation from "./ui/tab-navigation";
import Link from "next/link";
import Image from "next/image";
import SolutionCard from "./solution-card";

export default function SolutionsFilter({
  features,
  categories,
}: {
  features: any[];
  categories: string[];
}) {
  const [activeTab, setActiveTab] = useState("All");

  const filteredFeatures =
    activeTab === "All"
      ? features
      : features.filter((feature) => feature.category === activeTab);

  return (
    <div>
      <TabNavigation
        categories={categories}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredFeatures.map((feature) => (
          <SolutionCard
            key={feature.id}
            title={feature.title}
            description={feature.description}
            image={feature.image}
            link={feature.link}
          />
        ))}
      </div>
    </div>
  );
}
