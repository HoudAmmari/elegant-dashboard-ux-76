
import { ArrowDownRight, ArrowUpRight, Package, ShoppingCart, Truck } from 'lucide-react';

interface CardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  change: {
    value: number;
    positive: boolean;
  };
  color: string;
}

const Card = ({ title, value, icon, change, color }: CardProps) => {
  return (
    <div className="flex flex-col p-5 bg-white rounded-lg card-shadow animate-scaleIn">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-sm font-medium text-gray-500">{title}</h3>
        <div className={`p-2 rounded-full ${color}`}>
          {icon}
        </div>
      </div>
      <div className="mb-1">
        <span className="text-2xl font-bold">{value}</span>
      </div>
      <div className="flex items-center">
        <div className={`flex items-center ${change.positive ? 'text-green-500' : 'text-red-500'}`}>
          {change.positive ? (
            <ArrowUpRight size={14} className="mr-1" />
          ) : (
            <ArrowDownRight size={14} className="mr-1" />
          )}
          <span className="text-xs font-medium">{change.value}%</span>
        </div>
        <span className="text-xs text-gray-500 ml-1">from last week</span>
      </div>
    </div>
  );
};

export default function DashboardCards() {
  const cards = [
    {
      title: 'Inventory Value',
      value: '₹2,54,890',
      icon: <Package size={18} className="text-white" />,
      change: { value: 14.6, positive: true },
      color: 'bg-primary',
    },
    {
      title: 'Total Orders',
      value: '2,656',
      icon: <ShoppingCart size={18} className="text-white" />,
      change: { value: 7.6, positive: true },
      color: 'bg-secondary',
    },
    {
      title: 'New Orders',
      value: '769',
      icon: <ShoppingCart size={18} className="text-white" />,
      change: { value: 12.5, positive: true },
      color: 'bg-warning',
    },
    {
      title: 'Delivered',
      value: '367',
      icon: <Truck size={18} className="text-white" />,
      change: { value: 7.8, positive: false },
      color: 'bg-primary',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
      {cards.map((card, index) => (
        <Card key={index} {...card} />
      ))}
    </div>
  );
}
