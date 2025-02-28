
import { Eye, Pencil, Trash2 } from 'lucide-react';
import { formatCurrency } from '../../utils/currency';

const orders = [
  {
    id: '#56787',
    product: 'Grace Accent Chair',
    customer: 'Rajesh Kumar',
    quantity: 2,
    amount: 25598,
    payment: 'Paid',
    status: 'Delivered',
    image: '/lovable-uploads/f4ddfc1e-5234-4910-a77e-ccc4cb1bc157.png',
  },
  {
    id: '#56970',
    product: 'Carven Lounge Chair',
    customer: 'Sasidaran T',
    quantity: 3,
    amount: 11799,
    payment: 'Pending',
    status: 'Processing',
    image: '/lovable-uploads/f4ddfc1e-5234-4910-a77e-ccc4cb1bc157.png',
  },
  {
    id: '#56871',
    product: 'Lounge Chair',
    customer: 'Sasidaran T',
    quantity: 3,
    amount: 11799,
    payment: 'Pending',
    status: 'Shipped',
    image: '/lovable-uploads/f4ddfc1e-5234-4910-a77e-ccc4cb1bc157.png',
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

export default function RecentOrders() {
  return (
    <div className="p-5 bg-white rounded-lg card-shadow mt-5 animate-fadeIn">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold">Recent Orders</h2>
        <button className="text-sm text-primary font-medium hover:underline">
          View All
        </button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left text-sm text-gray-500 border-b">
              <th className="pb-3 font-medium whitespace-nowrap w-6">
                <input type="checkbox" className="rounded text-primary focus:ring-primary"/>
              </th>
              <th className="pb-3 font-medium">Product</th>
              <th className="pb-3 font-medium">Order ID</th>
              <th className="pb-3 font-medium">Customer Name</th>
              <th className="pb-3 font-medium">Quantity</th>
              <th className="pb-3 font-medium">Amount</th>
              <th className="pb-3 font-medium">Payment</th>
              <th className="pb-3 font-medium">Status</th>
              <th className="pb-3 font-medium">Action</th>
            </tr>
          </thead>
          <tbody className="stagger-animation">
            {orders.map((order) => (
              <tr key={order.id} className="border-b last:border-b-0 hover:bg-gray-50 animate-slideIn opacity-0">
                <td className="py-4 whitespace-nowrap">
                  <input type="checkbox" className="rounded text-primary focus:ring-primary"/>
                </td>
                <td className="py-4 whitespace-nowrap">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-md bg-gray-100 overflow-hidden flex items-center justify-center">
                      <img 
                        src={order.image} 
                        alt={order.product}
                        className="w-8 h-8 object-contain"
                      />
                    </div>
                    <span className="font-medium">{order.product}</span>
                  </div>
                </td>
                <td className="py-4 text-sm whitespace-nowrap">{order.id}</td>
                <td className="py-4 text-sm whitespace-nowrap">{order.customer}</td>
                <td className="py-4 text-sm whitespace-nowrap">{order.quantity}</td>
                <td className="py-4 text-sm whitespace-nowrap">{formatCurrency(order.amount)}</td>
                <td className="py-4 text-sm whitespace-nowrap">
                  <span className={getPaymentColor(order.payment)}>
                    {order.payment}
                  </span>
                </td>
                <td className="py-4 text-sm whitespace-nowrap">
                  <span className={`inline-block px-2 py-1 rounded-full text-xs ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                </td>
                <td className="py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <button className="p-1 text-gray-500 hover:text-primary">
                      <Eye size={16} />
                    </button>
                    <button className="p-1 text-gray-500 hover:text-primary">
                      <Pencil size={16} />
                    </button>
                    <button className="p-1 text-gray-500 hover:text-primary">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
