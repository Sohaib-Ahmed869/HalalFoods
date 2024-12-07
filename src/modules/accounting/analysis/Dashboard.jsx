import React, { useEffect, useState } from "react";
import Options from "./components/options";
import BeginAnalysis from "./components/beginAnalysis";
import DashboardMain from "./components/dashboardMain";
import DataRetrieval from "./components/DataRetrieval";
import PostAnalysis from "./components/postAnalysis";
import AnalyticsDashboard from "./components/dashboardCreated";
const Dashboard = () => {
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [company, setCompany] = useState("");
  const [activeStep, setActiveStep] = useState(1);

  useEffect(() => {
    console.log("Active Step:", activeStep);
  }, [activeStep]);

  return (
    <div className="p-5 lg:p-20 min-h-screen flex flex-col justify-center">
      {activeStep === 1 && (
        <Options setStep={setActiveStep} step={activeStep} />
      )}
      {activeStep === 2 && (
        <BeginAnalysis
          start={start}
          setStart={setStart}
          end={end}
          setEnd={setEnd}
          setStep={setActiveStep}
          step={activeStep}
        />
      )}
      {activeStep === 3 && (
        <DataRetrieval
          start={start}
          end={end}
          setStep={setActiveStep}
          step={activeStep}
        />
      )}
      {activeStep === 4 && (
        <PostAnalysis setStep={setActiveStep} step={activeStep} />
      )}
      {activeStep === 5 && (
        <AnalyticsDashboard setStep={setActiveStep} step={activeStep} />
      )}

      {activeStep === 6 && (
        <DashboardMain
          start={start}
          setStart={setStart}
          end={end}
          setEnd={setEnd}
          setStep={setActiveStep}
          step={activeStep}
          company={company}
          setCompany={setCompany}
        />
      )}
    </div>
  );
};

export default Dashboard;
