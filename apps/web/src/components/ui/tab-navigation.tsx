import React from "react";

interface TabNavigationProps {
  categories: string[];
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
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveTab(category)}
            className={`
              whitespace-nowrap py-4 px-1 border-b-2 font-medium text-xl transition-colors duration-200
              ${
                activeTab === category
                  ? "border-primary text-primary"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }
            `}
          >
            {category}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default TabNavigation;
