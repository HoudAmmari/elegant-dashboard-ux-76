
import { useState } from 'react';

const products = [
  {
    id: 1,
    name: 'Grace Accent Chair',
    price: '₹12,799',
    orders: 34,
    stock: 50,
    image: '/lovable-uploads/f4ddfc1e-5234-4910-a77e-ccc4cb1bc157.png',
  },
  {
    id: 2,
    name: 'Carven Lounge Chair',
    price: '₹11,799',
    orders: 28,
    stock: 417,
    image: '/lovable-uploads/f4ddfc1e-5234-4910-a77e-ccc4cb1bc157.png',
  },
  {
    id: 3,
    name: 'Paine Chair',
    price: '₹4,799',
    orders: 20,
    stock: 357,
    image: '/lovable-uploads/f4ddfc1e-5234-4910-a77e-ccc4cb1bc157.png',
  },
  {
    id: 4,
    name: 'Caria Patio Table',
    price: '₹5,399',
    orders: 18,
    stock: 490,
    image: '/lovable-uploads/f4ddfc1e-5234-4910-a77e-ccc4cb1bc157.png',
  },
];

export default function TopProducts() {
  const [filter, setFilter] = useState('Today');
  
  return (
    <div className="p-5 bg-white rounded-lg card-shadow animate-scaleIn">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold">Top Selling Products</h2>
        <div className="relative">
          <select 
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="py-1 pl-3 pr-8 text-sm bg-gray-100 border-none rounded-lg appearance-none cursor-pointer focus:ring-2 focus:ring-primary/50"
          >
            <option>Today</option>
            <option>Week</option>
            <option>Month</option>
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </div>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left text-sm text-gray-500 border-b">
              <th className="pb-3 font-medium">Product</th>
              <th className="pb-3 font-medium">Price</th>
              <th className="pb-3 font-medium">Orders</th>
              <th className="pb-3 font-medium">Stock</th>
            </tr>
          </thead>
          <tbody className="stagger-animation">
            {products.map((product) => (
              <tr key={product.id} className="border-b last:border-b-0 animate-slideIn opacity-0">
                <td className="py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-md bg-gray-100 overflow-hidden flex items-center justify-center">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-8 h-8 object-contain"
                      />
                    </div>
                    <span className="font-medium">{product.name}</span>
                  </div>
                </td>
                <td className="py-4 text-sm">{product.price}</td>
                <td className="py-4 text-sm">{product.orders}</td>
                <td className="py-4 text-sm">{product.stock}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="flex justify-between items-center mt-4 text-sm text-gray-500">
        <div>Showing 04 of 12 Results</div>
        <div className="flex gap-1">
          <button className="w-8 h-8 flex items-center justify-center bg-primary text-white rounded-md">1</button>
          <button className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-md">2</button>
          <button className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-md">3</button>
          <button className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-md">→</button>
        </div>
      </div>
    </div>
  );
}
