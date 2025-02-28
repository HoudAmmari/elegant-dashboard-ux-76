
import { CalendarDays, Filter, Search } from 'lucide-react';
import { formatCurrency } from '../utils/currency';

// Sample orders
const orders = [
  {
    id: '#56787',
    date: '15 Mar 2023',
    customer: 'Rajesh Kumar',
    items: 2,
    total: 25598,
    payment: 'Paid',
    status: 'Delivered',
  },
  {
    id: '#56970',
    date: '14 Mar 2023',
    customer: 'Sasidaran T',
    items: 3,
    total: 11799,
    payment: 'Pending',
    status: 'Processing',
  },
  {
    id: '#56871',
    date: '13 Mar 2023',
    customer: 'Sasidaran T',
    items: 3,
    total: 11799,
    payment: 'Pending',
    status: 'Shipped',
  },
  {
    id: '#56123',
    date: '12 Mar 2023',
    customer: 'Amit Patel',
    items: 1,
    total: 8599,
    payment: 'Paid',
    status: 'Delivered',
  },
  {
    id: '#55987',
    date: '11 Mar 2023',
    customer: 'Priya Singh',
    items: 4,
    total: 32450,
    payment: 'Paid',
    status: 'Delivered',
  },
];

const getStatusColor = (status: string) => {
  switch(status) {
    case 'Delivered':
      return 'bg-green-100 text-green-700';
    case 'Processing':
      return 'bg-orange-100 text-orange-700';
    case 'Shipped':
      return 'bg-blue-100 text-blue-700';
    default:
      return 'bg-gray-100 text-gray-700';
  }
};

const getPaymentColor = (payment: string) => {
  switch(payment) {
    case 'Paid':
      return 'text-green-500';
    case 'Pending':
      return 'text-orange-500';
    default:
      return 'text-gray-500';
  }
};

export default function Orders() {
  return (
    <div className="space-y-5 animate-fadeIn">
      <div className="flex justify-between items-center flex-wrap gap-4">
        <h1 className="text-2xl font-bold">Orders</h1>
        
        <div className="flex items-center gap-3">
          <div className="flex items-center space-x-2 bg-white rounded-lg p-2 card-shadow">
            <CalendarDays className="w-4 h-4 text-gray-500" />
            <span className="text-sm font-medium">10 Mar - 16 Mar</span>
          </div>
          
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="w-4 h-4 text-gray-400" />
            </div>
            <input 
              type="search" 
              className="block w-full py-2 pl-10 pr-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/30 focus:border-primary"
              placeholder="Search orders..." 
            />
          </div>
          
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors card-shadow">
            <Filter size={18} />
            <span>Filter</span>
          </button>
        </div>
      </div>
      
      <div className="bg-white rounded-lg card-shadow p-5">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-sm text-gray-500 border-b">
                <th className="pb-3 font-medium">Order ID</th>
                <th className="pb-3 font-medium">Date</th>
                <th className="pb-3 font-medium">Customer</th>
                <th className="pb-3 font-medium">Items</th>
                <th className="pb-3 font-medium">Total</th>
                <th className="pb-3 font-medium">Payment</th>
                <th className="pb-3 font-medium">Status</th>
                <th className="pb-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="stagger-animation">
              {orders.map((order) => (
                <tr key={order.id} className="border-b last:border-b-0 hover:bg-gray-50 animate-slideIn opacity-0">
                  <td className="py-4 font-medium">{order.id}</td>
                  <td className="py-4 text-sm">{order.date}</td>
                  <td className="py-4 text-sm">{order.customer}</td>
                  <td className="py-4 text-sm">{order.items}</td>
                  <td className="py-4 text-sm font-medium">{formatCurrency(order.total)}</td>
                  <td className="py-4 text-sm">
                    <span className={getPaymentColor(order.payment)}>
                      {order.payment}
                    </span>
                  </td>
                  <td className="py-4 text-sm">
                    <span className={`inline-block px-2 py-1 rounded-full text-xs ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="py-4 text-sm">
                    <div className="flex gap-2">
                      <button className="px-3 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded-full transition-colors">
                        Edit
                      </button>
                      <button className="px-3 py-1 text-xs text-white bg-primary hover:bg-primary/90 rounded-full transition-colors">
                        View
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="flex justify-between items-center mt-6 text-sm">
          <div className="text-gray-500">Showing 5 of 25 orders</div>
          <div className="flex gap-1">
            <button className="w-8 h-8 flex items-center justify-center bg-primary text-white rounded-md">1</button>
            <button className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-md">2</button>
            <button className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-md">3</button>
            <button className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-md">→</button>
          </div>
        </div>
      </div>
    </div>
  );
}
