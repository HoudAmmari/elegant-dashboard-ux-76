
import { Plus, Truck } from 'lucide-react';

export default function Transfer() {
  return (
    <div className="space-y-5 animate-fadeIn">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Stock Transfers</h1>
        
        <button className="flex items-center gap-2 px-4 py-2 text-white bg-primary rounded-lg hover:bg-primary/90 transition-colors">
          <Plus size={18} />
          <span>New Transfer</span>
        </button>
      </div>
      
      <div className="bg-white rounded-lg card-shadow p-8 flex flex-col items-center justify-center min-h-[300px]">
        <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-4">
          <Truck size={32} className="text-primary" />
        </div>
        <h2 className="text-xl font-semibold mb-2">No transfers recorded yet</h2>
        <p className="text-gray-500 mb-6 text-center max-w-md">
          Start creating stock transfers to move inventory between warehouses and manage your stock efficiently.
        </p>
        <button className="flex items-center gap-2 px-4 py-2 text-white bg-primary rounded-lg hover:bg-primary/90 transition-colors">
          <Plus size={18} />
          <span>Create First Transfer</span>
        </button>
      </div>
    </div>
  );
}
