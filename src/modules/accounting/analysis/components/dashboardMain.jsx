import React, { useState } from "react";
import Top from "./dashboardComponents/top";

const DashboardMain = ({
  start,
  setStart,
  end,
  setEnd,
  setStep,
  step,
  company,
  setCompany,
}) => {
  const [cash, setCash] = useState(200000);
  const [credit, setCredit] = useState(300000);
  const [cheque, setCheque] = useState(400000);
  const [paymentsPending, setPaymentsPending] = useState(2);
  const [productGoal, setProductGoal] = useState(1000000);
  const [achieved, setAchieved] = useState(650000);
  const [earnings, setEarnings] = useState(800000);

  return (
    <div className="min-h-screen">
      <Top
        company={company}
        setCompany={setCompany}
        cash={cash}
        credit={credit}
        cheque={cheque}
        paymentsPending={paymentsPending}
        productGoal={productGoal}
        achieved={achieved}
        earnings={earnings}
        loss={productGoal - achieved}
      />
    </div>
  );
};

export default DashboardMain;
