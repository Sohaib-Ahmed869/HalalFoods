import React, { useState, useEffect } from "react";
import Graph from "../../../../../assets/graph.png";
import { FaArrowTrendUp } from "react-icons/fa6";

const ProgressBar = ({ productGoal, earnings }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Calculate the percentage of earnings relative to the product goal
    const progressPercentage = (earnings / productGoal) * 100;
    setProgress(progressPercentage);
  }, [productGoal, earnings]);

  return (
    <div className="w-full bg-red-500 h-5 rounded-full mt-5 relative">
      <div
        className="h-5 bg-green-500 rounded-full"
        style={{ width: `${progress}%` }}
      ></div>
      <div className={`absolute top-0 right-0 transform translate-x-1/2 bg-white text-red-500 text-xs font-semibold rounded-full px-2 py-0.5 shadow-lg`}>
        {progress}%
      </div>
    </div>
  );
};

const ProductGoalCard = ({ productGoal, achieved }) => {
  return (
    <div className="h-auto lg:w-1/3 w-full bg-blue-500 text-white rounded-lg p-5 shadow-lg relative">
      <div className="text-2xl font-bold">${productGoal}</div>
      <div className="text-sm opacity-80">Product Goal</div>
      <div className="relative mt-4">
        <div className="h-2 w-full bg-blue-300 rounded-full">
          <div
            className="h-2 bg-white rounded-full"
            style={{ width: `${(achieved / productGoal) * 100}%` }}
          ></div>
        </div>
        <div
          className={`absolute top-0  transform -translate-x-1/2 -translate-y-full bg-white text-blue-500 text-xs font-semibold rounded-full px-2 py-0.5 shadow-lg left-[${
            (achieved / productGoal) * 100
          }%]`}
          style={{ marginTop: "-10px" }}
        >
          {(achieved / productGoal) * 100}%
        </div>
      </div>
      <div className="absolute top-4 right-4 bg-white text-blue-500 rounded-full p-2 shadow-md cursor-pointer">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-4 h-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8 10h.01M16 10h.01M12 14h.01M6 18h12a2 2 0 002-2V8a2 2 0 00-2-2H6a2 2 0 00-2 2v8a2 2 0 002 2z"
          />
        </svg>
      </div>
    </div>
  );
};

const EarningsCard = ({ earnings }) => {
  return (
    <div className="h-auto lg:w-2/3 w-full bg-white text-gray-800 rounded-lg p-5 shadow-lg flex items-center justify-between">
      <div>
        <div className="text-2xl font-bold">${earnings}</div>
        <div className="text-sm opacity-80">Earnings</div>
        <div className="flex items-center">
          <div className="rounded-full p-1 bg-green-100 w-min">
            <FaArrowTrendUp className="text-green-800 text-sm" />
          </div>
          <div className="text-green-800 text-sm ml-2">+20%</div>
        </div>
      </div>
      <img src={Graph} alt="graph" className="h-10" />
    </div>
  );
};

const Top = ({
  company,
  setCompany,
  cash,
  credit,
  cheque,
  paymentsPending,
  productGoal,
  achieved,
  earnings,
  loss,
}) => {
  return (
    <>
      <div className="flex justify-end">
        <select
          className="bg-blue-50 border border-gray-300 text-gray-700 text-sm rounded-lg  mb-5 input w-full lg:w-48"
          onChange={(e) => setCompany(e.target.value)}
          value={company}
        >
          <option value="">Select Company</option>
          <option value="1">Company 1</option>
          <option value="2">Company 2</option>
          <option value="3">Company 3</option>
        </select>
      </div>
      <h1 className="text-2xl font-semibold mb-2">Analytics</h1>
      <p className="text-gray-500 mb-5 lg:mb-10">
        Your current sales summary and activity.
      </p>
      <div className="w-full border-gray-100 border-2"></div>
      <div className="flex justify-between">
        <div className="bg-white p-5 rounded-lg w-1/4 text-left">
          <h1 className="text-sm">Cash</h1>
          <p className="text-xl font-semibold">${cash}</p>
        </div>
        <div className="bg-white p-5 rounded-lg w-1/4 text-left">
          <h1 className="text-sm">Credit</h1>
          <p className="text-xl font-semibold">${credit}</p>
        </div>
        <div className="bg-white p-5 rounded-lg w-1/4 text-left">
          <h1 className="text-sm">Cheque</h1>
          <p className="text-xl font-semibold">${cheque}</p>
        </div>
        <div className="bg-white p-5 rounded-lg w-1/4 text-left">
          <h1 className="text-sm">Payments Pending</h1>
          <p className="text-xl font-semibold">{paymentsPending}</p>
        </div>
      </div>
      <div className="mt-10 flex gap-2 flex-col lg:flex-row">
        <ProductGoalCard productGoal={productGoal} achieved={achieved} />
        <EarningsCard earnings={earnings} />
      </div>
      <div className="mt-10">
        <ProgressBar productGoal={productGoal} earnings={earnings} />
      </div>
    </>
  );
};

export default Top;
