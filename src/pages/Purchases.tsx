
import { CalendarDays, Filter, Plus, Search } from 'lucide-react';

export default function Purchases() {
  return (
    <div className="space-y-5 animate-fadeIn">
      <div className="flex justify-between items-center flex-wrap gap-4">
        <h1 className="text-2xl font-bold">Purchases</h1>
        
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
              placeholder="Search purchases..." 
            />
          </div>
          
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors card-shadow">
            <Filter size={18} />
            <span>Filter</span>
          </button>
          
          <button className="flex items-center gap-2 px-4 py-2 text-white bg-primary rounded-lg hover:bg-primary/90 transition-colors">
            <Plus size={18} />
            <span>New Purchase</span>
          </button>
        </div>
      </div>
      
      <div className="bg-white rounded-lg card-shadow p-8 flex flex-col items-center justify-center min-h-[300px]">
        <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-4">
          <ShoppingCart size={32} className="text-primary" />
        </div>
        <h2 className="text-xl font-semibold mb-2">No purchases recorded yet</h2>
        <p className="text-gray-500 mb-6 text-center max-w-md">
          Start adding purchase records to track your inventory acquisitions and manage your stock efficiently.
        </p>
        <button className="flex items-center gap-2 px-4 py-2 text-white bg-primary rounded-lg hover:bg-primary/90 transition-colors">
          <Plus size={18} />
          <span>Create First Purchase</span>
        </button>
      </div>
    </div>
  );
}

// Import the ShoppingCart icon
function ShoppingCart({ size = 24, className = "" }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <circle cx="8" cy="21" r="1"/>
      <circle cx="19" cy="21" r="1"/>
      <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/>
    </svg>
  );
}
