import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Search, Filter, MoreVertical, ArrowUp, ArrowDown } from 'lucide-react';

const data = [
  { month: 'Jan', ownCompany: 10000, cash: 2000, delivery: 3000 },
  { month: 'Feb', ownCompany: 12000, cash: 2500, delivery: 3500 },
  { month: 'Mar', ownCompany: 14000, cash: 3000, delivery: 4000 },
  { month: 'Apr', ownCompany: 11000, cash: 2200, delivery: 3200 },
  { month: 'May', ownCompany: 15000, cash: 3500, delivery: 4500 },
  { month: 'Jun', ownCompany: 16000, cash: 3800, delivery: 4800 },
  { month: 'Jul', ownCompany: 17000, cash: 4000, delivery: 5000 },
  { month: 'Aug', ownCompany: 18000, cash: 4200, delivery: 5200 },
  { month: 'Sep', ownCompany: 16500, cash: 3900, delivery: 4900 },
  { month: 'Oct', ownCompany: 15500, cash: 3600, delivery: 4600 },
  { month: 'Nov', ownCompany: 14500, cash: 3300, delivery: 4300 },
  { month: 'Dec', ownCompany: 13500, cash: 3000, delivery: 4000 },
];

const StatCard = ({ title, value, percentage, trend }) => (
  <div className="bg-white p-6 rounded-lg shadow">
    <div className="text-gray-600 text-sm uppercase mb-2">{title}</div>
    <div className="text-2xl font-bold mb-2">{value}</div>
    <div className={`flex items-center text-sm ${trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
      {trend === 'up' ? '+' : ''}{percentage}%
      {trend === 'up' ? <ArrowUp className="w-4 h-4 ml-1" /> : <ArrowDown className="w-4 h-4 ml-1" />}
    </div>
  </div>
);

const SalesDashboard = () => {
  return (
    <div className="p-6 bg-gray-50">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h1 className="text-2xl font-bold mb-1">Sales by Tags</h1>
          <p className="text-gray-600">Your current sales summary and activity.</p>
        </div>
        <button className="text-gray-400 hover:text-gray-600">
          <MoreVertical className="w-6 h-6" />
        </button>
      </div>

      <div className="grid grid-cols-3 gap-8 mb-8">
        <div>
          <div className="text-gray-600 mb-2">Own Company</div>
          <div className="text-3xl font-bold mb-1">62%</div>
          <div className="text-green-500 text-sm flex items-center">
            <ArrowUp className="w-4 h-4 mr-1" /> 10.78%
          </div>
        </div>
        <div>
          <div className="text-gray-600 mb-2">Cash and Carry</div>
          <div className="text-3xl font-bold mb-1">12%</div>
          <div className="text-green-500 text-sm flex items-center">
            <ArrowUp className="w-4 h-4 mr-1" /> 1.08%
          </div>
        </div>
        <div>
          <div className="text-gray-600 mb-2">Delivery</div>
          <div className="text-3xl font-bold mb-1">30%</div>
          <div className="text-green-500 text-sm flex items-center">
            <ArrowUp className="w-4 h-4 mr-1" /> 5.90%
          </div>
        </div>
      </div>

      <div className="flex justify-between mb-8">
        <div className="relative w-64">
          <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search"
            className="w-full pl-10 pr-4 py-2 border rounded-lg"
          />
        </div>
        <div className="flex gap-4">
          <select className="px-4 py-2 border rounded-lg bg-gray-50">
            <option>Monthly</option>
            <option>Weekly</option>
            <option>Daily</option>
          </select>
          <button className="px-4 py-2 border rounded-lg bg-gray-50 flex items-center gap-2">
            <Filter className="w-4 h-4" />
            Filter
          </button>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow mb-8" style={{ height: '400px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="delivery" stackId="a" fill="#4ade80" />
            <Bar dataKey="cash" stackId="a" fill="#22c55e" />
            <Bar dataKey="ownCompany" stackId="a" fill="#16a34a" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-4 gap-6">
        <StatCard title="TODAY'S SALE" value="$12,426" percentage="36" trend="up" />
        <StatCard title="TOTAL SALES" value="$2,38,485" percentage="14" trend="down" />
        <StatCard title="TOTAL PURCHASES" value="$1,84,382" percentage="36" trend="up" />
        <StatCard title="TOTAL CUSTOMERS" value="33,493" percentage="36" trend="up" />
      </div>
    </div>
  );
};

export default SalesDashboard;