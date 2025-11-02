import React from "react";
import * as LucideIcons from "lucide-react";

interface UseCase {
  icon: string;
  title: string;
  description: string;
  benefits: string[];
  subheadline?: string;
}

interface UseCasesData {
  title: string;
  subtitle: string;
  cases: UseCase[];
}

interface DynamicUseCasesProps {
  data: UseCasesData;
}

const DynamicUseCases: React.FC<DynamicUseCasesProps> = ({ data }) => {
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
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {data.subtitle}
          </p>
        </div>

        {/* Use Cases Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {data.cases.map((useCase, index) => {
            const Icon = getIcon(useCase.icon);

            return (
              <div
                key={index}
                className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {useCase.title}
                </h3>

                {useCase.subheadline && (
                  <h6 className="text-md font-semibold text-gray-900 mb-4">
                    {useCase.subheadline}
                  </h6>
                )}

                <p className="text-gray-600 mb-6 leading-relaxed">
                  {useCase.description}
                </p>
                <ul className="space-y-2">
                  {useCase.benefits.map((benefit, benefitIndex) => (
                    <li
                      key={benefitIndex}
                      className="flex items-center text-sm text-gray-600"
                    >
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mr-3"></div>
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default DynamicUseCases;
