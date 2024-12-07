import React, { useState } from "react";
import SelectDate from "./selectDate";

const BeginAnalysis = ({ start, setStart, end, setEnd, setStep, step }) => {
  const onClickSubmit = () => {
    setStep(step + 1);
  };
  return (
    <>
      <div className="flex justify-end">
        <select
          className="bg-blue-50 border border-gray-300 text-gray-700 text-sm rounded-lg  mb-5 input w-full lg:w-48"
          onChange={(e) => setCompany(e.target.value)}
        >
          <option value="">Select Company</option>
          <option value="1">Company 1</option>
          <option value="2">Company 2</option>
          <option value="3">Company 3</option>
        </select>
      </div>
      <h1 className="text-2xl lg:text-4xl font-semibold mb-2">Analytics</h1>
      <p className="text-gray-500 mb-5 lg:mb-10">
        Kindly select the dates for which you want to perform the analysis for
      </p>

      <SelectDate start={start} setStart={setStart} end={end} setEnd={setEnd} />
      <div className="flex justify-end mt-5 lg:mt-10">
        <button
          className="btn bg-primary text-white lg:w-48 w-full hover:bg-blue-600"
          onClick={onClickSubmit}
        >
          Begin Analysis
        </button>
      </div>
    </>
  );
};

export default BeginAnalysis;
