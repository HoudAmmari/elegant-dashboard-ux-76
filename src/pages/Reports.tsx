
import { BarChart, Calendar, CalendarDays, Download, PieChart } from 'lucide-react';
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPieChart, Pie, Cell, Legend } from 'recharts';

// Sample data for charts
const salesData = [
  { name: 'Jan', sales: 12000 },
  { name: 'Feb', sales: 19000 },
  { name: 'Mar', sales: 14000 },
  { name: 'Apr', sales: 18000 },
  { name: 'May', sales: 13000 },
  { name: 'Jun', sales: 17000 },
];

const categoryData = [
  { name: 'Chairs', value: 40 },
  { name: 'Tables', value: 25 },
  { name: 'Sofas', value: 15 },
  { name: 'Beds', value: 10 },
  { name: 'Others', value: 10 },
];

const COLORS = ['#6C5DD3', '#4ECDC4', '#FF8C42', '#7367F0', '#F8B400'];

export default function Reports() {
  return (
    <div className="space-y-5 animate-fadeIn">
      <div className="flex justify-between items-center flex-wrap gap-4">
        <h1 className="text-2xl font-bold">Reports</h1>
        
        <div className="flex items-center gap-3">
          <div className="flex items-center space-x-2 bg-white rounded-lg p-2 card-shadow">
            <CalendarDays className="w-4 h-4 text-gray-500" />
            <span className="text-sm font-medium">Jan - Jun 2023</span>
          </div>
          
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors card-shadow">
            <Download size={18} />
            <span>Export</span>
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Sales Report */}
        <div className="bg-white rounded-lg card-shadow p-5 animate-scaleIn">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2">
              <BarChart size={20} className="text-primary" />
              <h2 className="text-lg font-semibold">Sales Report</h2>
            </div>
            <div className="relative">
              <select 
                className="py-1 pl-3 pr-8 text-sm bg-gray-100 border-none rounded-lg appearance-none cursor-pointer focus:ring-2 focus:ring-primary/50"
                defaultValue="monthly"
              >
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="yearly">Yearly</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </div>
            </div>
          </div>
          
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsBarChart
                data={salesData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f5f5f5" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tickFormatter={(value) => `₹${value/1000}k`} 
                />
                <Tooltip 
                  formatter={(value) => [`₹${value}`, 'Sales']}
                  contentStyle={{ borderRadius: '0.5rem', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)', border: 'none' }}
                />
                <Bar dataKey="sales" fill="hsl(252, 54%, 57%)" radius={[4, 4, 0, 0]} />
              </RechartsBarChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* Category Distribution */}
        <div className="bg-white rounded-lg card-shadow p-5 animate-scaleIn">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2">
              <PieChart size={20} className="text-primary" />
              <h2 className="text-lg font-semibold">Category Distribution</h2>
            </div>
            <div className="relative">
              <select 
                className="py-1 pl-3 pr-8 text-sm bg-gray-100 border-none rounded-lg appearance-none cursor-pointer focus:ring-2 focus:ring-primary/50"
                defaultValue="sales"
              >
                <option value="sales">By Sales</option>
                <option value="quantity">By Quantity</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </div>
            </div>
          </div>
          
          <div className="h-72 flex justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsPieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Legend />
                <Tooltip formatter={(value) => [`${value}%`, undefined]} />
              </RechartsPieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      
      {/* Sales Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {['Total Sales', 'Total Profits', 'Average Order', 'Conversion Rate'].map((title, index) => (
          <div key={index} className="bg-white rounded-lg card-shadow p-5 animate-scaleIn">
            <h3 className="text-sm font-medium text-gray-500 mb-3">{title}</h3>
            <div className="mb-1">
              <span className="text-2xl font-bold">
                {index === 3 ? '67.8%' : index === 2 ? '₹4,890' : `₹${(120000 + index * 50000).toLocaleString()}`}
              </span>
            </div>
            <div className="flex items-center text-green-500">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
              </svg>
              <span className="text-xs font-medium">{8.5 + index * 2.1}%</span>
              <span className="text-xs text-gray-500 ml-1">vs. last period</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
