
import { useState, useEffect } from 'react';
import { Award, Download, Printer } from 'lucide-react';
import DocumentLayout from '../../components/documents/DocumentLayout';
import { useSettings } from '../../contexts/SettingsContext';
import { formatCurrency } from '../../utils/currency';
import { fillWarrantyPDF, downloadPDF, printPDF, type WarrantyData } from '../../utils/pdfUtils';
import { Button } from '../../components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../../components/ui/dialog';
import { Input } from '../../components/ui/input';
import { toast } from 'sonner';

export default function WarrantyCertificates() {
  const { settings } = useSettings();
  const [currentWarranty, setCurrentWarranty] = useState<WarrantyData>({
    warrantyNumber: 'WAR-' + Math.floor(10000 + Math.random() * 90000).toString(),
    customerName: '',
    customerCity: '',
    productCategory: '',
    productName: '',
    quantity: 1,
    price: 0,
    total: 0,
    discount: 0,
    warrantyPeriod: '2 years',
    purchaseDate: new Date().toISOString().split('T')[0],
  });
  
  const [generatedPdfUrl, setGeneratedPdfUrl] = useState<string | null>(null);
  const [previewDialogOpen, setPreviewDialogOpen] = useState(false);
  
  // Update total when price or quantity changes
  useEffect(() => {
    setCurrentWarranty(prev => ({
      ...prev,
      total: prev.price * prev.quantity - prev.discount
    }));
  }, [currentWarranty.price, currentWarranty.quantity, currentWarranty.discount]);
  
  const handleInputChange = (field: keyof WarrantyData, value: string | number) => {
    setCurrentWarranty(prev => ({
      ...prev,
      [field]: value
    }));
  };
  
  const generatePDF = async () => {
    // Validate required fields
    if (!currentWarranty.customerName) {
      toast.error('Customer name is required');
      return;
    }
    
    if (!currentWarranty.productName) {
      toast.error('Product name is required');
      return;
    }
    
    if (!settings.warranty.templateUrl) {
      toast.error('No warranty template has been uploaded. Please upload a template in Settings.');
      return;
    }
    
    try {
      // Generate PDF
      const pdfUrl = await fillWarrantyPDF(settings.warranty.templateUrl, currentWarranty);
      setGeneratedPdfUrl(pdfUrl);
      setPreviewDialogOpen(true);
      toast.success('Warranty certificate generated successfully!');
    } catch (error) {
      console.error('Error generating PDF:', error);
      toast.error('Failed to generate warranty certificate. Please try again.');
    }
  };
  
  const handleDownload = () => {
    if (generatedPdfUrl) {
      downloadPDF(generatedPdfUrl, `warranty-${currentWarranty.warrantyNumber}.pdf`);
    }
  };
  
  const handlePrint = () => {
    if (generatedPdfUrl) {
      printPDF(generatedPdfUrl);
    }
  };
  
  return (
    <DocumentLayout 
      title="Attestation de garantie (Warranty Certificates)" 
      subtitle="Create, edit and manage your warranty certificate documents"
      icon={<Award size={20} className="text-primary" />}
    >
      <div className="bg-white rounded-lg card-shadow p-5">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {settings.warranty.fields.warrantyNumber && (
              <div className="border-b pb-4">
                <h2 className="text-lg font-semibold mb-4">Warranty Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Warranty Number</label>
                    <Input 
                      value={currentWarranty.warrantyNumber}
                      onChange={(e) => handleInputChange('warrantyNumber', e.target.value)}
                      placeholder="WAR-12345"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Purchase Date</label>
                    <Input 
                      type="date"
                      value={currentWarranty.purchaseDate}
                      onChange={(e) => handleInputChange('purchaseDate', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Warranty Period</label>
                    <select 
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary/50 focus:border-primary"
                      value={currentWarranty.warrantyPeriod}
                      onChange={(e) => handleInputChange('warrantyPeriod', e.target.value)}
                    >
                      <option value="1 year">1 year</option>
                      <option value="2 years">2 years</option>
                      <option value="3 years">3 years</option>
                      <option value="5 years">5 years</option>
                      <option value="Lifetime">Lifetime</option>
                    </select>
                  </div>
                </div>
              </div>
            )}
            
            {settings.warranty.fields.customerName && (
              <div className="border-b pb-4">
                <h2 className="text-lg font-semibold mb-4">Customer Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Customer Name</label>
                    <Input 
                      value={currentWarranty.customerName}
                      onChange={(e) => handleInputChange('customerName', e.target.value)}
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                    <Input 
                      value={currentWarranty.customerCity}
                      onChange={(e) => handleInputChange('customerCity', e.target.value)}
                      placeholder="Paris"
                    />
                  </div>
                </div>
              </div>
            )}
            
            {settings.warranty.fields.productDetails && (
              <div>
                <h2 className="text-lg font-semibold mb-4">Product Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Product Category</label>
                    <Input 
                      value={currentWarranty.productCategory}
                      onChange={(e) => handleInputChange('productCategory', e.target.value)}
                      placeholder="Furniture"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                    <Input 
                      value={currentWarranty.productName}
                      onChange={(e) => handleInputChange('productName', e.target.value)}
                      placeholder="Leather Sofa"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
                    <Input 
                      type="number"
                      value={currentWarranty.quantity}
                      onChange={(e) => handleInputChange('quantity', parseInt(e.target.value) || 1)}
                      min="1"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                    <Input 
                      type="number"
                      value={currentWarranty.price}
                      onChange={(e) => handleInputChange('price', parseFloat(e.target.value) || 0)}
                      min="0"
                      step="0.01"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Discount</label>
                    <Input 
                      type="number"
                      value={currentWarranty.discount}
                      onChange={(e) => handleInputChange('discount', parseFloat(e.target.value) || 0)}
                      min="0"
                      step="0.01"
                    />
                  </div>
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
                  <span className="font-medium">{formatCurrency(currentWarranty.price * currentWarranty.quantity)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Discount</span>
                  <span className="font-medium">{formatCurrency(currentWarranty.discount)}</span>
                </div>
                <div className="border-t pt-3 flex justify-between">
                  <span className="font-semibold">Total</span>
                  <span className="font-semibold text-lg">{formatCurrency(currentWarranty.total)}</span>
                </div>
              </div>
              
              <div className="space-y-4">
                {settings.warranty.templateUrl ? (
                  <div className="p-3 bg-green-50 border border-green-200 rounded-md mb-4">
                    <p className="text-sm text-green-800">Template loaded: {settings.warranty.templateName}</p>
                  </div>
                ) : (
                  <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-md mb-4">
                    <p className="text-sm text-yellow-800">No template uploaded. Please upload a template in Settings.</p>
                  </div>
                )}
                
                <Button
                  onClick={generatePDF}
                  className="w-full"
                  disabled={!settings.warranty.templateUrl}
                >
                  Generate Warranty Certificate
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Dialog open={previewDialogOpen} onOpenChange={setPreviewDialogOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Warranty Certificate Preview</DialogTitle>
            <DialogDescription>
              Preview your warranty certificate before downloading or printing
            </DialogDescription>
          </DialogHeader>
          
          <div className="h-[60vh] overflow-auto border rounded-md">
            {generatedPdfUrl && (
              <iframe src={generatedPdfUrl} className="w-full h-full" title="Warranty Certificate Preview"></iframe>
            )}
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={handlePrint} className="flex items-center gap-2">
              <Printer size={16} />
              Print
            </Button>
            <Button onClick={handleDownload} className="flex items-center gap-2">
              <Download size={16} />
              Download
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DocumentLayout>
  );
}
