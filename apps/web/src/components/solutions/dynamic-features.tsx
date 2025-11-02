import React from "react";
import * as LucideIcons from "lucide-react";

interface FeatureItem {
  icon: string;
  title: string;
  description: string;
}

interface FeaturesData {
  title: string;
  subtitle: string;
  subheadline?: string;
  items: FeatureItem[];
}

interface DynamicFeaturesProps {
  data: FeaturesData;
}

const DynamicFeatures: React.FC<DynamicFeaturesProps> = ({ data }) => {
  const getIcon = (iconName: string) => {
    const IconComponent = (LucideIcons as any)[iconName];
    return IconComponent || LucideIcons.Circle;
  };

  return (
    <section className="py-16 sm:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            {data.title}
          </h2>
          {data.subheadline && (
            <h4 className="text-xl sm:text-xl font-bold text-gray-900 mb-4">
              {data.subheadline}
            </h4>
          )}
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {data.subtitle}
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.items.map((feature, index) => {
            const Icon = getIcon(feature.icon);

            return (
              <div
                key={index}
                className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default DynamicFeatures;
