import React, { useState, useEffect } from "react";
import DiscrepanciesList from "./discrepenciesStep";
import PurchasesTable from "./purchases";
import SalesTable from "./sales";
const PostAnalysis = ({ setStep, step }) => {
  const [activeTab, setActiveTab] = useState("Discrepancies");
  const [tab, setTab] = useState(activeTab);

  const onTabChange = (tab) => {
    setTab(tab);
  };

  const Tabs = [
    {
      name: "Discrepancies",
      component: <DiscrepanciesList />,
    },
    {
      name: "Purchases",
      component: <PurchasesTable />,
    },
    {
      name: "Sales",
      component: <SalesTable />,
    },
  ];

  return (
    <div className="w-full">
      <div className="grid grid-cols-3 gap-4">
        {Tabs.map((tab, index) => (
          <button
            key={index}
            className={`cursor-pointer btn hover:bg-primary 
               ${
                 tab.name === activeTab
                   ? "border-b-2 text-white bg-primary"
                   : "bg-secondary text-white"
               }`}
            onClick={() => setActiveTab(tab.name)}
          >
            {tab.name}
          </button>
        ))}
      </div>
      <div className="mt-10">
        {activeTab === "Discrepancies" ? (
          <DiscrepanciesList />
        ) : activeTab === "Purchases" ? (
          <PurchasesTable />
        ) : (
          <SalesTable />
        )}
      </div>
      <div className="flex justify-end mt-10">
        <button
          className="btn bg-secondary text-white"
          onClick={() => setStep(step - 1)}
        >
          Back
        </button>
        <button
          className="btn bg-primary text-white ml-4"
          onClick={() => setStep(step + 1)}
        >
          Proceed to Review Analytics
        </button>
      </div>
    </div>
  );
};

export default PostAnalysis;
