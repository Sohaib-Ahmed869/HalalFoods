import React from "react";
import { CiCircleAlert } from "react-icons/ci";
import { RxResume } from "react-icons/rx";
import { MdRestartAlt } from "react-icons/md";

const Buttons = [
  {
    option: "Resume any analysis",
    icon: <MdRestartAlt />,
  },
  {
    option: "Start a new analysis",
    icon: <RxResume />,
  },
];

const Options = ({ step,setStep }) => {
  return (
    <div className="mx-auto flex flex-col justify-center items-center">
      <h1 className="text-2xl font-bold text-center mb-10">
        Which option do you want to proceed with?
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Buttons.map((button, index) => (
          <div
            key={index}
            className="bg-[#E0FBFC] hover:bg-[#9dc8c9] p-20 rounded-lg shadow-md flex flex-col items-center justify-center space-y-3 cursor-pointer hover:opacity-90"
            onClick={() => setStep(step + 1)}
          >
            <span className="text-6xl">{button.icon}</span>
            <p className="text-center font-medium">{button.option}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Options;
