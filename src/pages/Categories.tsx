
import { Plus } from 'lucide-react';

// Sample categories
const categories = [
  { id: 1, name: 'Chairs', products: 24, icon: '🪑' },
  { id: 2, name: 'Tables', products: 18, icon: '🪑' },
  { id: 3, name: 'Sofas', products: 15, icon: '🪑' },
  { id: 4, name: 'Beds', products: 12, icon: '🪑' },
  { id: 5, name: 'Cabinets', products: 20, icon: '🪑' },
  { id: 6, name: 'Outdoor', products: 8, icon: '🪑' },
];

export default function Categories() {
  return (
    <div className="space-y-5 animate-fadeIn">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Product Categories</h1>
        
        <button className="flex items-center gap-2 px-4 py-2 text-white bg-primary rounded-lg hover:bg-primary/90 transition-colors">
          <Plus size={18} />
          <span>Add Category</span>
        </button>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 stagger-animation">
        {categories.map((category) => (
          <div key={category.id} className="bg-white rounded-lg card-shadow p-5 hover:shadow-md transition-shadow animate-scaleIn opacity-0">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold mb-1">{category.name}</h3>
                <p className="text-sm text-gray-500">{category.products} products</p>
              </div>
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-lg">
                {category.icon}
              </div>
            </div>
            
            <div className="flex gap-2 mt-4">
              <button className="flex-1 px-3 py-2 text-xs bg-gray-100 hover:bg-gray-200 rounded-md transition-colors">
                Edit
              </button>
              <button className="flex-1 px-3 py-2 text-xs text-white bg-primary hover:bg-primary/90 rounded-md transition-colors">
                View Products
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
