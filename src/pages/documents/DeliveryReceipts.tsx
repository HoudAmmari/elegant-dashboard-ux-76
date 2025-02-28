
import { Truck } from 'lucide-react';
import DocumentLayout from '../../components/documents/DocumentLayout';

export default function DeliveryReceipts() {
  return (
    <DocumentLayout 
      title="Bon de livraison (Delivery Receipts)" 
      subtitle="Create, edit and manage your delivery receipt documents"
      icon={<Truck size={20} className="text-primary" />}
    >
      <div className="bg-white rounded-lg card-shadow p-5">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="border-b pb-4">
              <h2 className="text-lg font-semibold mb-4">Delivery Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Delivery Number</label>
                  <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary/50 focus:border-primary" placeholder="DEL-0001" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                  <input type="date" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary/50 focus:border-primary" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Order Reference</label>
                  <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary/50 focus:border-primary" placeholder="ORD-12345" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Delivery Method</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary/50 focus:border-primary">
                    <option>Standard Delivery</option>
                    <option>Express Delivery</option>
                    <option>Self-pickup</option>
                  </select>
                </div>
              </div>
            </div>
            
            <div className="border-b pb-4">
              <h2 className="text-lg font-semibold mb-4">Customer Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Customer Name</label>
                  <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary/50 focus:border-primary" placeholder="John Doe" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input type="tel" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary/50 focus:border-primary" placeholder="+1 (555) 123-4567" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Delivery Address</label>
                  <textarea className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary/50 focus:border-primary" rows={2} placeholder="Full delivery address"></textarea>
                </div>
              </div>
            </div>
            
            <div>
              <h2 className="text-lg font-semibold mb-4">Items for Delivery</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-sm text-gray-500 border-b">
                      <th className="pb-3 font-medium">Item</th>
                      <th className="pb-3 font-medium">Description</th>
                      <th className="pb-3 font-medium">Quantity</th>
                      <th className="pb-3 font-medium">Unit</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="py-3">
                        <input type="text" className="w-full px-2 py-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary/50 focus:border-primary" placeholder="Item name" />
                      </td>
                      <td className="py-3">
                        <input type="text" className="w-full px-2 py-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary/50 focus:border-primary" placeholder="Description" />
                      </td>
                      <td className="py-3">
                        <input type="number" className="w-full px-2 py-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary/50 focus:border-primary" placeholder="1" />
                      </td>
                      <td className="py-3">
                        <select className="w-full px-2 py-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary/50 focus:border-primary">
                          <option>Each</option>
                          <option>Box</option>
                          <option>Set</option>
                        </select>
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={4} className="py-3">
                        <button className="text-sm text-primary font-medium hover:underline">+ Add Item</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          
          <div>
            <div className="bg-gray-50 rounded-lg p-5 sticky top-20">
              <h2 className="text-lg font-semibold mb-4">Delivery Details</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Expected Delivery Date</label>
                  <input type="date" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary/50 focus:border-primary" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Carrier</label>
                  <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary/50 focus:border-primary" placeholder="Carrier name" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tracking Number</label>
                  <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary/50 focus:border-primary" placeholder="Tracking number" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Special Instructions</label>
                  <textarea className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary/50 focus:border-primary" rows={3} placeholder="Any special delivery instructions..."></textarea>
                </div>
                <div className="pt-4 border-t">
                  <div className="flex items-center space-x-2">
                    <input id="confirmation" type="checkbox" className="rounded text-primary focus:ring-primary"/>
                    <label htmlFor="confirmation" className="text-sm text-gray-700">Require signature on delivery</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DocumentLayout>
  );
}
