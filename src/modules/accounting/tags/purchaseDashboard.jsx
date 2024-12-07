import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Search, Filter, MoreVertical, ArrowUp, ArrowDown } from 'lucide-react';

const data = [
  { month: 'Jan', vendors: 5000, diesel: 6000, salaries: 4000 },
  { month: 'Feb', vendors: 6000, diesel: 8000, salaries: 3000 },
  { month: 'Mar', vendors: 5500, diesel: 9000, salaries: 4500 },
  { month: 'Apr', vendors: 7000, diesel: 5000, salaries: 3000 },
  { month: 'May', vendors: 8000, diesel: 7000, salaries: 5000 },
  { month: 'Jun', vendors: 7500, diesel: 8000, salaries: 6000 },
  { month: 'Jul', vendors: 10000, diesel: 7000, salaries: 6500 },
  { month: 'Aug', vendors: 9500, diesel: 9000, salaries: 7000 },
  { month: 'Sep', vendors: 9000, diesel: 8500, salaries: 5500 },
  { month: 'Oct', vendors: 7000, diesel: 4000, salaries: 7000 },
  { month: 'Nov', vendors: 6500, diesel: 5000, salaries: 4000 },
  { month: 'Dec', vendors: 6000, diesel: 4000, salaries: 2500 },
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

const PurchasesDashboard = () => {
  return (
    <div className="p-6 bg-gray-50">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h1 className="text-2xl font-bold mb-1">Purchases by Tags</h1>
          <p className="text-gray-600">Your current sales summary and activity.</p>
        </div>
        <button className="text-gray-400 hover:text-gray-600">
          <MoreVertical className="w-6 h-6" />
        </button>
      </div>

      <div className="grid grid-cols-3 gap-8 mb-8">
        <div>
          <div className="text-gray-600 mb-2">Diesel</div>
          <div className="text-3xl font-bold mb-1">62%</div>
          <div className="text-green-500 text-sm flex items-center">
            <ArrowUp className="w-4 h-4 mr-1" /> 10.78%
          </div>
        </div>
        <div>
          <div className="text-gray-600 mb-2">Vendors</div>
          <div className="text-3xl font-bold mb-1">12%</div>
          <div className="text-green-500 text-sm flex items-center">
            <ArrowUp className="w-4 h-4 mr-1" /> 1.08%
          </div>
        </div>
        <div>
          <div className="text-gray-600 mb-2">Salaries</div>
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
            <Bar dataKey="salaries" stackId="a" fill="#f97316" name="Salaries" />
            <Bar dataKey="diesel" stackId="a" fill="#0ea5e9" name="Diesel" />
            <Bar dataKey="vendors" stackId="a" fill="#15803d" name="Vendors" />
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

export default PurchasesDashboard;