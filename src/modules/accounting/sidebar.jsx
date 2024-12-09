import React, { useEffect, useState } from "react";
import logo from "../../assets/logo.png";
import { MdDashboard } from "react-icons/md";
import { FaPeopleGroup } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import { MdPayments } from "react-icons/md";
import { LiaFileInvoiceSolid } from "react-icons/lia";
import { IoHelpCircleSharp } from "react-icons/io5";
import { IoSettings } from "react-icons/io5";
import { BiGlobe } from "react-icons/bi";

const Sidebar = ({ isOpen, toggle, activeOption, setActiveOption }) => {
  useEffect(() => {
    console.log("Sidebar rendered", isOpen);
  }, [isOpen]);
  const [options] = useState([
    {
      name: "Overview",
      icon: <BiGlobe />,
    },
    {
      name: "Dashboard",
      icon: <MdDashboard />,
    },
    {
      name: "Pending Resolutions",
      icon: <FaPeopleGroup />,
    },
    {
      name: "Customers",
      icon: <FaPeopleGroup />,
    },
    {
      name: "Sales by Tags",
      icon: <FaShoppingCart />,
    },
    {
      name: "Purchase by Tags",
      icon: <LiaFileInvoiceSolid />,
    },
    {
      name: "Invoices",
      icon: <MdPayments />,
    },
    {
      name: "Help",
      icon: <IoHelpCircleSharp />,
    },
    {
      name: "Settings",
      icon: <IoSettings />,
    },
  ]);

  return (
    <div
      className={`${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } transform top-0 left-0 w-64 bg-[#E0FBFC] h-full fixed overflow-y-auto ease-in-out transition-all duration-300 z-30`}
    >
      <div className="flex justify-between items-center p-4 border-b border-gray-200">
        <img src={logo} alt="logo" className="h-10" />
        <button onClick={toggle}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
      <div className="">
        {options.map((option, index) => (
          <div
            key={index}
            className={`flex items-center gap-4 p-2 cursor-pointer hover:bg-blue-200 ${
              activeOption === option.name ? "bg-blue-200" : ""
            }`}
            onClick={() => setActiveOption(option.name)}
          >
            <div className="p-3 text-xl rounded-lg">{option.icon}</div>
            <p>{option.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
