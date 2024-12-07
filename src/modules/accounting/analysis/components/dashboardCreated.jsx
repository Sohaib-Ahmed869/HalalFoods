import React from "react";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { BiSearch, BiFilter } from "react-icons/bi";

import WorldSalesMap from "./SalesHeatMap";

const topProductsData = [
  { name: "French", value: 450 },
  { name: "Chicken", value: 300 },
  { name: "Fries", value: 250 },
  { name: "Calendar", value: 350 },
  { name: "Stationary", value: 280 },
];

const paymentMethodData = [
  { name: "Card", value: 300 },
  { name: "Cash", value: 150 },
  { name: "Online", value: 50 },
];

const COLORS = ["#6366f1", "#22c55e", "#06b6d4"];

const salesByArea = [
  { country: "France", percentage: 74 },
  { country: "Monaco", percentage: 14 },
  { country: "Australia", percentage: 5 },
];

const AnalyticsDashboard = () => {
  return (
    <div className="p-6 bg-gray-50">
      {/* Header */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-2xl font-bold mb-1">Analytics</h1>
          <p className="text-gray-600">
            Your current sales summary and activity.
          </p>
        </div>
        <div className="flex gap-4">
          <select className="px-4 py-2 border rounded-lg">
            <option>Select Company</option>
          </select>
          <div className="relative">
            <BiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search"
              className="pl-10 pr-4 py-2 border rounded-lg"
            />
          </div>
          <select className="px-4 py-2 border rounded-lg">
            <option>Monthly</option>
          </select>
          <button className="px-4 py-2 border rounded-lg flex items-center gap-2">
            <BiFilter />
            Filter
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        <div>
          <div className="text-gray-600 mb-1">Cash</div>
          <div className="text-2xl font-bold mb-1">52%</div>
          <div className="text-green-500 text-sm">↑ 10.78%</div>
        </div>
        <div>
          <div className="text-gray-600 mb-1">Credit</div>
          <div className="text-2xl font-bold mb-1">12%</div>
          <div className="text-green-500 text-sm">↑ 1.08%</div>
        </div>
        <div>
          <div className="text-gray-600 mb-1">Online</div>
          <div className="text-2xl font-bold mb-1">30%</div>
          <div className="text-green-500 text-sm">↑ 5.90%</div>
        </div>
        <div>
          <div className="text-gray-600 mb-1">Payments pending</div>
          <div className="text-2xl font-bold mb-1">10%</div>
          <div className="text-red-500 text-sm">↓ 3.90%</div>
        </div>
      </div>

      {/* Revenue Card */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        <div className="bg-blue-600 text-white p-6 rounded-lg">
          <div className="flex justify-between items-start">
            <div>
              <div className="text-lg mb-1">3767</div>
              <div className="text-sm opacity-75">Product Goal</div>
            </div>
            <div className="bg-blue-500 p-2 rounded-lg">42%</div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg">
          <div className="text-gray-600 mb-1">Earning</div>
          <div className="text-2xl font-bold">$500,458</div>
          <div className="text-green-500 text-sm">↑ 8.67%</div>
        </div>
      </div>

      {/* Profit/Loss Bar */}
      <div className="bg-white p-6 rounded-lg mb-8">
        <div className="flex justify-between mb-4">
          <div>
            <div className="font-medium">Profit (80%)</div>
            <div className="text-xl font-bold">$2000</div>
          </div>
          <div className="text-right">
            <div className="font-medium">Loss (20%)</div>
            <div className="text-xl font-bold">$400</div>
          </div>
        </div>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div className="h-full bg-green-500 w-4/5"></div>
          <div className="h-full bg-red-500 w-1/5"></div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* Payment Method Chart */}
        <div className="bg-white p-6 rounded-lg">
          <h3 className="font-medium mb-4">Division by Payment Method</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={paymentMethodData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {paymentMethodData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-4 mt-4">
            {paymentMethodData.map((entry, index) => (
              <div key={entry.name} className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: COLORS[index] }}
                ></div>
                <span>{entry.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Products Chart */}
        <div className="bg-white p-6 rounded-lg">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium">Top Products</h3>
            <select className="border rounded px-2 py-1 text-sm">
              <option>Quantity</option>
            </select>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topProductsData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#6366f1" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Top 3 Areas */}
      <div className="mt-8 bg-white p-6 rounded-lg">
        <h3 className="font-medium mb-4">Top 3 Areas by Sales</h3>
        <div className="space-y-4">
          {salesByArea.map((area) => (
            <div key={area.country}>
              <div className="flex justify-between mb-1">
                <span>{area.country}</span>
                <span>{area.percentage}%</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-500 rounded-full"
                  style={{ width: `${area.percentage}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* World Map Visualization would go here */}
      <div className="mt-8 bg-white p-6 rounded-lg">
        <h3 className="font-medium mb-4">Sales distribution by Area</h3>

        <WorldSalesMap />
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
