import React from "react";

interface TabNavigationProps {
  categories: Record<string, string>;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const TabNavigation: React.FC<TabNavigationProps> = ({
  categories,
  activeTab,
  setActiveTab,
}) => {
  return (
    <div className="border-b border-gray-200 mb-8">
      <nav className="-mb-px flex justify-center space-x-8">
        {Object.entries(categories).map(([key, label]) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={`
              whitespace-nowrap py-4 px-1 border-b-2 font-medium text-xl transition-colors duration-200
              ${
                activeTab === key
                  ? "border-primary text-primary"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }
            `}
          >
            {label}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default TabNavigation;
