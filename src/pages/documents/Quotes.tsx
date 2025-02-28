
import { MessageSquare } from 'lucide-react';
import DocumentLayout from '../../components/documents/DocumentLayout';
import { formatCurrency } from '../../utils/currency';

export default function Quotes() {
  return (
    <DocumentLayout 
      title="Devis (Quotes)" 
      subtitle="Create, edit and manage your quote documents"
      icon={<MessageSquare size={20} className="text-primary" />}
    >
      <div className="bg-white rounded-lg card-shadow p-5">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="border-b pb-4">
              <h2 className="text-lg font-semibold mb-4">Quote Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Quote Number</label>
                  <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary/50 focus:border-primary" placeholder="QT-0001" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                  <input type="date" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary/50 focus:border-primary" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                  <input type="date" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary/50 focus:border-primary" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Reference</label>
                  <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary/50 focus:border-primary" placeholder="REF-12345" />
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input type="email" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary/50 focus:border-primary" placeholder="john@example.com" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input type="tel" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary/50 focus:border-primary" placeholder="+1 (555) 123-4567" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                  <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary/50 focus:border-primary" placeholder="123 Main St, City" />
                </div>
              </div>
            </div>
            
            <div>
              <h2 className="text-lg font-semibold mb-4">Items</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-sm text-gray-500 border-b">
                      <th className="pb-3 font-medium">Item</th>
                      <th className="pb-3 font-medium">Description</th>
                      <th className="pb-3 font-medium">Quantity</th>
                      <th className="pb-3 font-medium">Price</th>
                      <th className="pb-3 font-medium">Total</th>
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
                        <input type="number" className="w-full px-2 py-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary/50 focus:border-primary" placeholder="0.00" />
                      </td>
                      <td className="py-3 font-medium">0.00 DH</td>
                    </tr>
                    <tr>
                      <td colSpan={5} className="py-3">
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
              <h2 className="text-lg font-semibold mb-4">Summary</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">0.00 DH</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax (18%)</span>
                  <span className="font-medium">0.00 DH</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Discount</span>
                  <span className="font-medium">0.00 DH</span>
                </div>
                <div className="border-t pt-3 flex justify-between">
                  <span className="font-semibold">Total</span>
                  <span className="font-semibold text-lg">0.00 DH</span>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Quote Validity</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary/50 focus:border-primary">
                    <option>30 days</option>
                    <option>60 days</option>
                    <option>90 days</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Terms & Conditions</label>
                  <textarea className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary/50 focus:border-primary" rows={3} placeholder="Terms and conditions..."></textarea>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                  <textarea className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary/50 focus:border-primary" rows={2} placeholder="Additional notes..."></textarea>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DocumentLayout>
  );
}
