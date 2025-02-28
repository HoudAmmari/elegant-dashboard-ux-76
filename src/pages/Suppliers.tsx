
import { Filter, Plus, Search, Star } from 'lucide-react';

// Sample suppliers
const suppliers = [
  { 
    id: 1,
    name: 'Elegant Furnishings',
    contact: 'John Smith',
    email: 'john@elegantfurnishings.com',
    phone: '+91 9876543210',
    products: 24,
    rating: 4.5
  },
  { 
    id: 2,
    name: 'Premium Woods',
    contact: 'Sarah Johnson',
    email: 'sarah@premiumwoods.com',
    phone: '+91 9876543211',
    products: 18,
    rating: 4.8
  },
  { 
    id: 3,
    name: 'Modern Designs',
    contact: 'Arjun Patel',
    email: 'arjun@moderndesigns.com',
    phone: '+91 9876543212',
    products: 15,
    rating: 4.2
  },
  { 
    id: 4,
    name: 'Comfort Creations',
    contact: 'Priya Singh',
    email: 'priya@comfortcreations.com',
    phone: '+91 9876543213',
    products: 12,
    rating: 4.7
  },
  { 
    id: 5,
    name: 'Urban Living',
    contact: 'Rahul Sharma',
    email: 'rahul@urbanliving.com',
    phone: '+91 9876543214',
    products: 20,
    rating: 3.9
  },
];

// Star rating component
const StarRating = ({ rating }: { rating: number }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  
  return (
    <div className="flex items-center">
      {[...Array(5)].map((_, index) => {
        if (index < fullStars) {
          return <Star key={index} size={16} className="text-yellow-400 fill-yellow-400" />;
        } else if (index === fullStars && hasHalfStar) {
          return (
            <div key={index} className="relative">
              <Star size={16} className="text-yellow-400" />
              <div className="absolute inset-0 overflow-hidden w-1/2">
                <Star size={16} className="text-yellow-400 fill-yellow-400" />
              </div>
            </div>
          );
        } else {
          return <Star key={index} size={16} className="text-yellow-400" />;
        }
      })}
      <span className="ml-2 text-gray-700">{rating.toFixed(1)}</span>
    </div>
  );
};

export default function Suppliers() {
  return (
    <div className="space-y-5 animate-fadeIn">
      <div className="flex justify-between items-center flex-wrap gap-4">
        <h1 className="text-2xl font-bold">Suppliers</h1>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="w-4 h-4 text-gray-400" />
            </div>
            <input 
              type="search" 
              className="block w-full py-2 pl-10 pr-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/30 focus:border-primary"
              placeholder="Search suppliers..." 
            />
          </div>
          
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors card-shadow">
            <Filter size={18} />
            <span>Filter</span>
          </button>
          
          <button className="flex items-center gap-2 px-4 py-2 text-white bg-primary rounded-lg hover:bg-primary/90 transition-colors">
            <Plus size={18} />
            <span>Add Supplier</span>
          </button>
        </div>
      </div>
      
      <div className="bg-white rounded-lg card-shadow p-5">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-sm text-gray-500 border-b">
                <th className="pb-3 font-medium">Supplier</th>
                <th className="pb-3 font-medium">Contact Person</th>
                <th className="pb-3 font-medium">Email</th>
                <th className="pb-3 font-medium">Phone</th>
                <th className="pb-3 font-medium">Products</th>
                <th className="pb-3 font-medium">Rating</th>
                <th className="pb-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="stagger-animation">
              {suppliers.map((supplier) => (
                <tr key={supplier.id} className="border-b last:border-b-0 hover:bg-gray-50 animate-slideIn opacity-0">
                  <td className="py-4 font-medium">{supplier.name}</td>
                  <td className="py-4 text-sm">{supplier.contact}</td>
                  <td className="py-4 text-sm">{supplier.email}</td>
                  <td className="py-4 text-sm">{supplier.phone}</td>
                  <td className="py-4 text-sm">{supplier.products}</td>
                  <td className="py-4">
                    <StarRating rating={supplier.rating} />
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
          <div className="text-gray-500">Showing 5 of 12 suppliers</div>
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
