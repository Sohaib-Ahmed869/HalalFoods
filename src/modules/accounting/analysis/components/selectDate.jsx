import React from "react";

const SelectDate = ({ start, setStart, end, setEnd }) => {
  return (
    <div
      id="date-range-picker"
      data-rangepicker
      className="flex items-center w-full lg:flex-row flex-col gap-5"
    >
      <input
        name="start"
        type="date"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full lg:w-1/2 input"
        placeholder="Select date start"
        value={start}
        onChange={(e) => setStart(e.target.value)}
      />
      <span className="mx-4 text-gray-500">to</span>
      <input
        name="end"
        type="date"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full lg:w-1/2 input"
        placeholder="Select date end"
        value={end}
        onChange={(e) => setEnd(e.target.value)}
      />
    </div>
  );
};

export default SelectDate;
