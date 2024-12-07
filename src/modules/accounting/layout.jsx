import React, { useState } from "react";
import Sidebar from "./sidebar";
import { BiMenu } from "react-icons/bi";
import Dashboard from "./analysis/Dashboard";
import SalesDashboard from "./tags/salesDashboard";
import PurchasesDashboard from "./tags/purchaseDashboard";
import DiscrepanciesList from "./PendingResolutions";
import Overview from "./Overview";
import InvoiceList from "./Invoices";
import HelpCenter from "./Help";
import ProfileSettings from "./Settings";
import CustomerList from "./customersList";

import Logo from "../../assets/logo.png";

const Layout = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeOption, setActiveOption] = useState("Dashboard");

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex">
      <Sidebar
        isOpen={isOpen}
        toggle={toggleSidebar}
        activeOption={activeOption}
        setActiveOption={setActiveOption}
      />
      <div className="fixed ">
        <button onClick={toggleSidebar} className="btn bg-transparent border-0">
          <BiMenu className="text-3xl" />
        </button>
      </div>

      <div className="p-5 w-full">
        {activeOption === "Dashboard" && <Dashboard />}
        {activeOption === "Pending Resolutions" && <DiscrepanciesList />}
        {activeOption === "Sales by Tags" && <SalesDashboard />}
        {activeOption === "Purchase by Tags" && <PurchasesDashboard />}
        {activeOption === "Overview" && <Overview />}
        {activeOption === "Invoices" && <InvoiceList />}
        {activeOption === "Help" && <HelpCenter />}
        {activeOption === "Customers" && <CustomerList />}
        {activeOption === "Settings" && <ProfileSettings />}
      </div>
    </div>
  );
};

export default Layout;
