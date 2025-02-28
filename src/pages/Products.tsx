
import { Plus, Search } from 'lucide-react';

// Sample products
const products = [
  { 
    id: 1,
    image: '/lovable-uploads/f4ddfc1e-5234-4910-a77e-ccc4cb1bc157.png',
    name: 'Grace Accent Chair',
    category: 'Chairs',
    price: '₹12,799',
    stock: 50,
    orders: 34
  },
  { 
    id: 2,
    image: '/lovable-uploads/f4ddfc1e-5234-4910-a77e-ccc4cb1bc157.png',
    name: 'Carven Lounge Chair',
    category: 'Chairs',
    price: '₹11,799',
    stock: 417,
    orders: 28
  },
  { 
    id: 3,
    image: '/lovable-uploads/f4ddfc1e-5234-4910-a77e-ccc4cb1bc157.png',
    name: 'Paine Chair',
    category: 'Chairs',
    price: '₹4,799',
    stock: 357,
    orders: 20
  },
  { 
    id: 4,
    image: '/lovable-uploads/f4ddfc1e-5234-4910-a77e-ccc4cb1bc157.png',
    name: 'Caria Patio Table',
    category: 'Tables',
    price: '₹5,399',
    stock: 490,
    orders: 18
  },
  { 
    id: 5,
    image: '/lovable-uploads/f4ddfc1e-5234-4910-a77e-ccc4cb1bc157.png',
    name: 'Wooden Dining Table',
    category: 'Tables',
    price: '₹8,599',
    stock: 125,
    orders: 15
  }
];

export default function Products() {
  return (
    <div className="space-y-5 animate-fadeIn">
      <div className="flex justify-between items-center flex-wrap gap-4">
        <h1 className="text-2xl font-bold">Products</h1>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="w-4 h-4 text-gray-400" />
            </div>
            <input 
              type="search" 
              className="block w-full py-2 pl-10 pr-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/30 focus:border-primary"
              placeholder="Search products..." 
            />
          </div>
          
          <button className="flex items-center gap-2 px-4 py-2 text-white bg-primary rounded-lg hover:bg-primary/90 transition-colors">
            <Plus size={18} />
            <span>Add Product</span>
          </button>
        </div>
      </div>
      
      <div className="bg-white rounded-lg card-shadow p-5">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-sm text-gray-500 border-b">
                <th className="pb-3 font-medium">
                  <input type="checkbox" className="rounded text-primary focus:ring-primary"/>
                </th>
                <th className="pb-3 font-medium">Product</th>
                <th className="pb-3 font-medium">Category</th>
                <th className="pb-3 font-medium">Price</th>
                <th className="pb-3 font-medium">Stock</th>
                <th className="pb-3 font-medium">Orders</th>
                <th className="pb-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="stagger-animation">
              {products.map((product) => (
                <tr key={product.id} className="border-b last:border-b-0 hover:bg-gray-50 animate-slideIn opacity-0">
                  <td className="py-4">
                    <input type="checkbox" className="rounded text-primary focus:ring-primary"/>
                  </td>
                  <td className="py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-md bg-gray-100 overflow-hidden flex items-center justify-center">
                        <img 
                          src={product.image} 
                          alt={product.name}
                          className="w-10 h-10 object-contain"
                        />
                      </div>
                      <span className="font-medium">{product.name}</span>
                    </div>
                  </td>
                  <td className="py-4 text-sm">{product.category}</td>
                  <td className="py-4 text-sm font-medium">{product.price}</td>
                  <td className="py-4 text-sm">{product.stock}</td>
                  <td className="py-4 text-sm">{product.orders}</td>
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
          <div className="text-gray-500">Showing 5 of 25 products</div>
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
