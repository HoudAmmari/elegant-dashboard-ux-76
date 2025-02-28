
import { CalendarDays } from 'lucide-react';
import DashboardCards from '@/components/dashboard/DashboardCards';
import SalesChart from '@/components/dashboard/SalesChart';
import TopProducts from '@/components/dashboard/TopProducts';
import RecentOrders from '@/components/dashboard/RecentOrders';
import StockAlert from '@/components/dashboard/StockAlert';
import ProductSummary from '@/components/dashboard/ProductSummary';

export default function Index() {
  return (
    <div className="space-y-5">
      {/* Activity Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-5">
        <h2 className="text-xl font-semibold mb-2 sm:mb-0">Activity</h2>
        <div className="flex items-center space-x-2 bg-white rounded-lg p-2 card-shadow">
          <CalendarDays className="w-4 h-4 text-gray-500" />
          <span className="text-sm font-medium">10 Mar - 16 Mar</span>
        </div>
      </div>
      
      {/* Dashboard Cards */}
      <DashboardCards />
      
      {/* Sales Chart and Top Products */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-5">
        <SalesChart />
        <TopProducts />
      </div>
      
      {/* Recent Orders */}
      <RecentOrders />
      
      {/* Stock Alert and Product Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <StockAlert />
        <ProductSummary />
      </div>
    </div>
  );
}
