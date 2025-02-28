
const stockAlerts = [
  {
    id: 1,
    product: 'Grace Accent Chair',
    productId: '#34567S',
    warehouse: 'Warehouse 01',
    quantity: '05',
    image: '/lovable-uploads/f4ddfc1e-5234-4910-a77e-ccc4cb1bc157.png',
  },
  {
    id: 2,
    product: 'Carven Lounge Chair',
    productId: '#45687Q2',
    warehouse: 'Warehouse 02',
    quantity: '09',
    image: '/lovable-uploads/f4ddfc1e-5234-4910-a77e-ccc4cb1bc157.png',
  },
  {
    id: 3,
    product: 'Lounge Chair',
    productId: '#44367Q7',
    warehouse: 'Warehouse 03',
    quantity: '10',
    image: '/lovable-uploads/f4ddfc1e-5234-4910-a77e-ccc4cb1bc157.png',
  },
];

export default function StockAlert() {
  return (
    <div className="p-5 bg-white rounded-lg card-shadow mt-5 animate-scaleIn">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold">Stock Alert</h2>
        <button className="text-sm text-primary font-medium hover:underline">
          View All
        </button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left text-sm text-gray-500 border-b">
              <th className="pb-3 font-medium">Product</th>
              <th className="pb-3 font-medium">Product ID</th>
              <th className="pb-3 font-medium">Warehouse</th>
              <th className="pb-3 font-medium">Remaining Quantity</th>
            </tr>
          </thead>
          <tbody className="stagger-animation">
            {stockAlerts.map((item) => (
              <tr key={item.id} className="border-b last:border-b-0 hover:bg-gray-50 animate-slideIn opacity-0">
                <td className="py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-md bg-gray-100 overflow-hidden flex items-center justify-center">
                      <img 
                        src={item.image} 
                        alt={item.product}
                        className="w-8 h-8 object-contain"
                      />
                    </div>
                    <span className="font-medium">{item.product}</span>
                  </div>
                </td>
                <td className="py-4 text-sm">{item.productId}</td>
                <td className="py-4 text-sm">{item.warehouse}</td>
                <td className="py-4 text-sm text-red-500 font-medium">{item.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
