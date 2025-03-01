
import { useState, useEffect } from 'react';
import { Receipt } from 'lucide-react';
import DocumentLayout from '../../components/documents/DocumentLayout';
import { formatCurrency } from '../../utils/currency';
import { useSettings } from '../../contexts/SettingsContext';
import { toast } from 'sonner';

export default function Invoices() {
  const { settings } = useSettings();
  const [items, setItems] = useState([{ name: '', description: '', quantity: 1, price: 0, total: 0 }]);
  const [subtotal, setSubtotal] = useState(0);
  const [tax, setTax] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [total, setTotal] = useState(0);
  
  // Calculate totals when items or tax rate change
  useEffect(() => {
    const newSubtotal = items.reduce((sum, item) => sum + (item.quantity * item.price), 0);
    const newTax = settings.invoice.fields.tax ? (newSubtotal * settings.invoice.taxRate / 100) : 0;
    const newTotal = newSubtotal + newTax - discount;
    
    setSubtotal(newSubtotal);
    setTax(newTax);
    setTotal(newTotal);
  }, [items, settings.invoice.taxRate, settings.invoice.fields.tax, discount]);
  
  const handleItemChange = (index, field, value) => {
    const newItems = [...items];
    
    if (field === 'quantity' || field === 'price') {
      value = parseFloat(value) || 0;
      newItems[index][field] = value;
      newItems[index].total = newItems[index].quantity * newItems[index].price;
    } else {
      newItems[index][field] = value;
    }
    
    setItems(newItems);
  };
  
  const addItem = () => {
    setItems([...items, { name: '', description: '', quantity: 1, price: 0, total: 0 }]);
  };
  
  const handleDiscountChange = (value) => {
    setDiscount(parseFloat(value) || 0);
  };
  
  const saveInvoice = () => {
    toast.success('Invoice saved successfully!');
  };

  return (
    <DocumentLayout 
      title="Factures (Invoices)" 
      subtitle="Create, edit and manage your invoice documents"
      icon={<Receipt size={20} className="text-primary" />}
    >
      <div className="bg-white rounded-lg card-shadow p-5">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {settings.invoice.fields.invoiceNumber && (
              <div className="border-b pb-4">
                <h2 className="text-lg font-semibold mb-4">Invoice Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Invoice Number</label>
                    <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary/50 focus:border-primary" placeholder="INV-0001" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                    <input type="date" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary/50 focus:border-primary" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
                    <input type="date" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary/50 focus:border-primary" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Reference</label>
                    <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary/50 focus:border-primary" placeholder="PO-12345" />
                  </div>
                </div>
              </div>
            )}
            
            {settings.invoice.fields.customerName && (
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
                  {settings.invoice.fields.customerAddress && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                      <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary/50 focus:border-primary" placeholder="123 Main St, City" />
                    </div>
                  )}
                </div>
              </div>
            )}
            
            {settings.invoice.fields.productDetails && (
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
                      {items.map((item, index) => (
                        <tr key={index} className="border-b">
                          <td className="py-3">
                            <input 
                              type="text" 
                              value={item.name}
                              onChange={(e) => handleItemChange(index, 'name', e.target.value)}
                              className="w-full px-2 py-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary/50 focus:border-primary" 
                              placeholder="Item name" 
                            />
                          </td>
                          <td className="py-3">
                            <input 
                              type="text" 
                              value={item.description}
                              onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                              className="w-full px-2 py-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary/50 focus:border-primary" 
                              placeholder="Description" 
                            />
                          </td>
                          <td className="py-3">
                            <input 
                              type="number" 
                              value={item.quantity}
                              onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
                              className="w-full px-2 py-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary/50 focus:border-primary" 
                              placeholder="1" 
                            />
                          </td>
                          <td className="py-3">
                            <input 
                              type="number" 
                              value={item.price}
                              onChange={(e) => handleItemChange(index, 'price', e.target.value)}
                              className="w-full px-2 py-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary/50 focus:border-primary" 
                              placeholder="0.00" 
                            />
                          </td>
                          <td className="py-3 font-medium">{formatCurrency(item.total)}</td>
                        </tr>
                      ))}
                      <tr>
                        <td colSpan={5} className="py-3">
                          <button 
                            onClick={addItem}
                            className="text-sm text-primary font-medium hover:underline"
                          >
                            + Add Item
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
          
          <div>
            <div className="bg-gray-50 rounded-lg p-5 sticky top-20">
              <h2 className="text-lg font-semibold mb-4">Summary</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">{formatCurrency(subtotal)}</span>
                </div>
                {settings.invoice.fields.tax && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax ({settings.invoice.taxRate}%)</span>
                    <span className="font-medium">{formatCurrency(tax)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-gray-600">Discount</span>
                  <span className="font-medium">{formatCurrency(discount)}</span>
                </div>
                <div className="border-t pt-3 flex justify-between">
                  <span className="font-semibold">Total</span>
                  <span className="font-semibold text-lg">{formatCurrency(total)}</span>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Payment Terms</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary/50 focus:border-primary">
                    <option>Net 30 days</option>
                    <option>Net 15 days</option>
                    <option>Due on receipt</option>
                  </select>
                </div>
                {settings.invoice.fields.termsConditions && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                    <textarea className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary/50 focus:border-primary" rows={3} placeholder="Additional notes..."></textarea>
                  </div>
                )}
                <div className="pt-2">
                  <button
                    onClick={saveInvoice} 
                    className="w-full px-6 py-2 text-white bg-primary rounded-md hover:bg-primary/90 transition-colors"
                  >
                    Create Invoice
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DocumentLayout>
  );
}
