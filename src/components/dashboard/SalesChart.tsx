
import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Sample data
const data = [
  { name: 'Mon', sales: 12000, purchases: 6500 },
  { name: 'Tue', sales: 19000, purchases: 8900 },
  { name: 'Wed', sales: 14000, purchases: 7500 },
  { name: 'Thu', sales: 18000, purchases: 9900 },
  { name: 'Fri', sales: 13000, purchases: 8500 },
  { name: 'Sat', sales: 17000, purchases: 9200 },
  { name: 'Sun', sales: 15000, purchases: 8100 },
];

export default function SalesChart() {
  const [filter, setFilter] = useState('Week');
  
  return (
    <div className="p-5 bg-white rounded-lg card-shadow animate-fadeIn">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold">Sales & Purchase</h2>
        <div className="relative">
          <select 
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="py-1 pl-3 pr-8 text-sm bg-gray-100 border-none rounded-lg appearance-none cursor-pointer focus:ring-2 focus:ring-primary/50"
          >
            <option>Week</option>
            <option>Month</option>
            <option>Year</option>
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </div>
        </div>
      </div>
      
      <div className="text-xs text-gray-500 mb-3">
        Total sales and purchases statistics on week
      </div>
      
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            barGap={8}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f5f5f5" />
            <XAxis dataKey="name" axisLine={false} tickLine={false} />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tickFormatter={(value) => `${value} DH`} 
              domain={[0, 25000]}
              ticks={[0, 5000, 10000, 15000, 20000, 25000]}
            />
            <Tooltip 
              formatter={(value) => [`${value} DH`, undefined]}
              contentStyle={{ borderRadius: '0.5rem', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)', border: 'none' }}
            />
            <Bar dataKey="sales" fill="hsl(252, 54%, 57%)" radius={[4, 4, 0, 0]} />
            <Bar dataKey="purchases" fill="#e2e8f0" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
