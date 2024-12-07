import React from 'react';
import { VectorMap } from '@react-jvectormap/core';
import { worldMill } from '@react-jvectormap/world';

const WorldSalesMap = () => {
  // Sample data - country codes mapped to values
  const salesData = {
    FR: 74, // France
    MC: 14, // Monaco
    AU: 5,  // Australia
    US: 25, // USA
    GB: 30, // UK
    DE: 45, // Germany
  };

  return (
    <div className="bg-white p-6 rounded-lg">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-lg font-semibold">Sales distribution by Area</h3>
          <p className="text-sm text-gray-500">Geographical distribution of sales volume</p>
        </div>
        <select className="border rounded-lg px-3 py-2 text-sm">
          <option>Last 12 Months</option>
          <option>Last 6 Months</option>
          <option>Last 30 Days</option>
        </select>
      </div>

      <div style={{ height: "500px", width: "100%" }}>
        <VectorMap
          map={worldMill}
          backgroundColor="white"
          series={{
            regions: [{
              values: salesData,
              scale: ['#C8EBFB', '#0EA5E9'],
              normalizeFunction: 'polynomial',
              min: 0,
              max: 75
            }]
          }}
          onRegionTipShow={(e, el, code) => {
            el.html(
              el.html() + ' (Sales: ' + (salesData[code] || 0) + '%)'
            );
          }}
          regionStyle={{
            initial: {
              fill: '#e4e4e4',
              "fill-opacity": 1,
              stroke: 'none',
              "stroke-width": 0,
              "stroke-opacity": 1
            },
            hover: {
              "fill-opacity": 0.8,
              cursor: 'pointer'
            },
            selected: {
              fill: '#2938bc'
            },
            selectedHover: {}
          }}
        />
      </div>

      <div className="mt-6">
        <div className="flex justify-between items-center mb-4">
          <h4 className="font-medium">Top Countries by Sales</h4>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#C8EBFB]"></div>
            <div className="w-3 h-3 rounded-full bg-[#7AC7EC]"></div>
            <div className="w-3 h-3 rounded-full bg-[#0EA5E9]"></div>
            <span className="text-sm text-gray-500">Sales Volume</span>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {Object.entries(salesData)
            .sort(([,a], [,b]) => b - a)
            .slice(0, 3)
            .map(([code, value]) => (
              <div key={code} className="bg-gray-50 p-4 rounded-lg">
                <div className="text-sm text-gray-500">Country</div>
                <div className="font-semibold">{code}</div>
                <div className="text-sm text-gray-500 mt-2">Sales</div>
                <div className="font-semibold">{value}%</div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default WorldSalesMap;