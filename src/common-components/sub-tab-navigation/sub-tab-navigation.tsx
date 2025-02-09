import Button from "common-components/button/button";
import { useState } from "react";

interface TabNavigationProps {
  tabs: string[];
  defaultTab?: string;
  onTabChange: (tab: string) => void;
}

const SubTabNavigation: React.FC<TabNavigationProps> = ({ tabs, defaultTab, onTabChange }) => {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]);

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    onTabChange(tab);
  };

  return (
    <div className="flex">
      {tabs.map((tab, index) => (
        <Button
          key={tab}
          className={`rounded-none py-2 px-[18px] ${index === 0 ? "rounded-l-md" : index === tabs.length - 1 ? "rounded-r-md" : ""
            } ${activeTab === tab ? "bg-primary-600 text-[#fff] font-medium" : "border border-gray-200 text-primary-500"}`}
          onClick={() => handleTabClick(tab)}
        >
          {tab}
        </Button>
      ))}
    </div>
  );
};

export default SubTabNavigation;
