import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { MoreHorizontal, ExternalLink, FileText } from "lucide-react";
import image from "../../assets/woman.jpg";

const lineChartData = [
  { month: "Feb", value: 30000, value2: 25000 },
  { month: "Mar", value: 32000, value2: 28000 },
  { month: "Apr", value: 31000, value2: 27000 },
  { month: "May", value: 35000, value2: 30000 },
  { month: "Jun", value: 45591, value2: 40000 },
  { month: "Jul", value: 42000, value2: 38000 },
  { month: "Aug", value: 43000, value2: 39000 },
  { month: "Sep", value: 44000, value2: 40000 },
  { month: "Oct", value: 45000, value2: 41000 },
  { month: "Nov", value: 47000, value2: 42000 },
  { month: "Dec", value: 48000, value2: 43000 },
  { month: "Jan", value: 49000, value2: 44000 },
];

const StatCard = ({ title, value, percentage, trend }) => (
  <div className="bg-white p-6 rounded-xl shadow-sm">
    <div className="text-gray-500 text-sm mb-2">{title}</div>
    <div className="text-2xl font-semibold mb-2">{value}</div>
    <div
      className={`text-sm ${
        trend === "up" ? "text-green-500" : "text-red-500"
      }`}
    >
      {trend === "up" ? "+" : ""}
      {percentage}% {trend === "up" ? "↑" : "↓"}
    </div>
  </div>
);

const PaymentBar = ({ label, value, maxValue }) => {
  const percentage = (value / maxValue) * 100;
  return (
    <div className="mb-4">
      <div className="flex justify-between mb-1">
        <span className="text-gray-700">{label}</span>
        <span className="text-gray-900 font-medium">
          {value.toLocaleString()}
        </span>
      </div>
      <div className="h-2 bg-gray-100 rounded-full">
        <div
          className="h-full bg-blue-600 rounded-full"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

const Transaction = ({
  status,
  cardType,
  cardNumber,
  amount,
  date,
  company,
}) => (
  <div className="py-4 border-b flex items-center justify-between">
    <div>
      <div className="flex items-center gap-3">
        <span
          className={`px-3 py-1 rounded-full text-xs
          ${
            status === "Completed"
              ? "bg-green-100 text-green-800"
              : status === "Pending"
              ? "bg-yellow-100 text-yellow-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {status}
        </span>
        <span className="text-gray-900">
          {cardType} {cardNumber}
        </span>
      </div>
      <div className="text-sm text-gray-500 mt-1">Card payment</div>
    </div>
    <div className="text-right">
      <div className="text-gray-900">${amount}</div>
      <div className="text-sm text-gray-500">{date}</div>
    </div>
    <div className="text-gray-500">{company}</div>
    <button className="text-gray-400 hover:text-gray-600">
      <MoreHorizontal className="w-5 h-5" />
    </button>
  </div>
);

const CustomerRow = ({ name, email, amount, location, avatar }) => (
  <div className="flex items-center justify-between py-3">
    <div className="flex items-center gap-3">
      <img
        src={avatar || image}
        alt="avatar"
        className="w-10 h-10 rounded-full object-cover"
      />
      <div>
        <div className="text-gray-900">{name}</div>
        <div className="text-sm text-gray-500">{email}</div>
      </div>
    </div>
    <div className="text-right">
      <div className="text-gray-900">${amount.toLocaleString()}</div>
      <div className="text-sm text-gray-500">{location}</div>
    </div>
  </div>
);

const Overview = () => {
  return (
    <div className="p-6 space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-6">
        <StatCard
          title="TODAY'S SALE"
          value="$12,426"
          percentage="36"
          trend="up"
        />
        <StatCard
          title="TOTAL SALES"
          value="$2,38,485"
          percentage="14"
          trend="down"
        />
        <StatCard
          title="TOTAL PURCHASES"
          value="$1,84,382"
          percentage="36"
          trend="up"
        />
        <StatCard
          title="TOTAL CUSTOMERS"
          value="33,493"
          percentage="36"
          trend="up"
        />
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Sales Report */}
        <div className="col-span-2 bg-white rounded-xl shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold">Sales Report</h2>
            <div className="flex gap-3">
              <div className="flex gap-2">
                <button className="px-4 py-2 bg-gray-100 rounded-lg text-gray-700 text-sm font-medium">
                  12 Months
                </button>
                <button className="px-4 py-2 text-gray-500 text-sm">
                  6 Months
                </button>
                <button className="px-4 py-2 text-gray-500 text-sm">
                  30 Days
                </button>
                <button className="px-4 py-2 text-gray-500 text-sm">
                  7 Days
                </button>
              </div>
              <button className="flex items-center gap-2 px-4 py-2 border rounded-lg text-gray-700">
                <FileText className="w-4 h-4" />
                Export PDF
              </button>
            </div>
          </div>

          <div style={{ height: "300px" }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={lineChartData}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#4F46E5"
                  strokeWidth={2}
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="value2"
                  stroke="#818CF8"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Payment Correlation */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold">Payment Correlation</h2>
            <select className="text-sm text-gray-500 border-none">
              <option>Last 7 Days</option>
            </select>
          </div>
          <div className="space-y-6">
            <PaymentBar
              label="Own companies"
              value={143382}
              maxValue={143382}
            />
            <PaymentBar
              label="Collection sales"
              value={87974}
              maxValue={143382}
            />
            <PaymentBar
              label="Delivery Sales"
              value={45211}
              maxValue={143382}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Recent Transactions */}
        <div className="col-span-2 bg-white rounded-xl shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-lg font-semibold">
                Recent Imported Transactions
              </h2>
              <p className="text-sm text-gray-500">
                Latest imported transactions
              </p>
            </div>
            <button className="text-blue-600 text-sm flex items-center gap-1">
              See All Transactions
              <ExternalLink className="w-4 h-4" />
            </button>
          </div>
          <div className="space-y-2">
            <Transaction
              status="Completed"
              cardType="Visa card"
              cardNumber="****4831"
              amount="182.94"
              date="Jan 17, 2022"
              company="Amazon"
            />
            <Transaction
              status="Completed"
              cardType="Mastercard"
              cardNumber="****6442"
              amount="99.00"
              date="Jan 17, 2022"
              company="Facebook"
            />
            <Transaction
              status="Pending"
              cardType="Account"
              cardNumber="****882"
              amount="249.94"
              date="Jan 17, 2022"
              company="Netflix"
            />
            <Transaction
              status="Canceled"
              cardType="Amex card"
              cardNumber="****5666"
              amount="199.24"
              date="Jan 17, 2022"
              company="Amazon Prime"
            />
          </div>
        </div>

        {/* Top Customers */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-lg font-semibold">Top Customers</h2>
              <p className="text-sm text-gray-500">Top Sales by Customers</p>
            </div>
          </div>
          <div className="space-y-4">
            <CustomerRow
              name="Jenny Wilson"
              email="w.lawson@example.com"
              amount={11234}
              location="Paris"
            />
            <CustomerRow
              name="Devon Lane"
              email="dat.roberts@example.com"
              amount={11159}
              location="Paris"
            />
            <CustomerRow
              name="Jane Cooper"
              email="jgraham@example.com"
              amount={10483}
              location="Monaco"
            />
            <CustomerRow
              name="Dianne Russell"
              email="curtis.d@example.com"
              amount={9084}
              location="Lille"
            />
          </div>
          <button className="w-full mt-4 text-gray-500 text-sm flex items-center justify-center gap-1">
            SEE ALL CUSTOMERS
            <ExternalLink className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Overview;
