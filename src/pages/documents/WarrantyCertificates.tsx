
import { useState, useEffect, useRef } from 'react';
import { Award, Download, Printer, AlertTriangle } from 'lucide-react';
import DocumentLayout from '../../components/documents/DocumentLayout';
import { useSettings } from '../../contexts/SettingsContext';
import { formatCurrency } from '../../utils/currency';
import { fillWarrantyPDF, downloadPDF, printPDF, type WarrantyData } from '../../utils/pdfUtils';
import { Button } from '../../components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../../components/ui/dialog';
import { Input } from '../../components/ui/input';
import { toast } from 'sonner';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/select';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../../components/ui/tooltip';

const products = [
  { 
    id: 1,
    image: '/lovable-uploads/f4ddfc1e-5234-4910-a77e-ccc4cb1bc157.png',
    name: 'Grace Accent Chair',
    category: 'Chairs',
    price: 12799,
    stock: 50,
    orders: 34
  },
  { 
    id: 2,
    image: '/lovable-uploads/f4ddfc1e-5234-4910-a77e-ccc4cb1bc157.png',
    name: 'Carven Lounge Chair',
    category: 'Chairs',
    price: 11799,
    stock: 417,
    orders: 28
  },
  { 
    id: 3,
    image: '/lovable-uploads/f4ddfc1e-5234-4910-a77e-ccc4cb1bc157.png',
    name: 'Paine Chair',
    category: 'Chairs',
    price: 4799,
    stock: 357,
    orders: 20
  },
  { 
    id: 4,
    image: '/lovable-uploads/f4ddfc1e-5234-4910-a77e-ccc4cb1bc157.png',
    name: 'Caria Patio Table',
    category: 'Tables',
    price: 5399,
    stock: 490,
    orders: 18
  },
  { 
    id: 5,
    image: '/lovable-uploads/f4ddfc1e-5234-4910-a77e-ccc4cb1bc157.png',
    name: 'Wooden Dining Table',
    category: 'Tables',
    price: 8599,
    stock: 125,
    orders: 15
  }
];

const categories = [...new Set(products.map(product => product.category))];

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
  const [formDisabled, setFormDisabled] = useState(false);
  const [savedWarranty, setSavedWarranty] = useState<WarrantyData | null>(null);
  
  const [isPriceManuallyChanged, setIsPriceManuallyChanged] = useState(false);
  const [originalPrice, setOriginalPrice] = useState(0);
  
  const printFrameRef = useRef<HTMLIFrameElement | null>(null);
  
  const filteredProducts = products.filter(
    product => currentWarranty.productCategory === '' || 
    product.category === currentWarranty.productCategory
  );
  
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
    
    if (field === 'productCategory' || field === 'productName') {
      setIsPriceManuallyChanged(false);
    }
    
    if (field === 'price' && !isPriceManuallyChanged && originalPrice !== 0 && originalPrice !== Number(value)) {
      setIsPriceManuallyChanged(true);
      toast.warning('You have manually changed the price from the default value.');
    }
  };
  
  const handleCategoryChange = (value: string) => {
    setCurrentWarranty(prev => ({
      ...prev,
      productCategory: value,
      productName: ''
    }));
  };
  
  const handleProductChange = (value: string) => {
    const selectedProduct = products.find(p => p.name === value);
    
    if (selectedProduct) {
      const productPrice = selectedProduct.price;
      setOriginalPrice(productPrice);
      
      setCurrentWarranty(prev => ({
        ...prev,
        productName: value,
        price: productPrice,
      }));
    }
  };
  
  const generatePDF = async () => {
    if (!currentWarranty.customerName) {
      toast.error('Customer name is required');
      return;
    }
    
    if (!currentWarranty.productName) {
      toast.error('Product name is required');
      return;
    }
    
    try {
      // We don't need the template URL anymore as we're generating the PDF from scratch
      const dummyTemplateUrl = ""; // Using an empty string instead of checking settings
      
      toast.loading('Generating warranty certificate...');
      const pdfUrl = await fillWarrantyPDF(dummyTemplateUrl, currentWarranty);
      setGeneratedPdfUrl(pdfUrl);
      setPreviewDialogOpen(true);
      toast.success('Warranty certificate generated successfully!');
      
      setFormDisabled(true);
      setSavedWarranty({...currentWarranty});
    } catch (error) {
      console.error('Error generating PDF:', error);
      toast.error('Failed to generate warranty certificate. Please try again.');
    }
  };
  
  const handleDownload = () => {
    if (generatedPdfUrl) {
      downloadPDF(generatedPdfUrl, `warranty-${currentWarranty.warrantyNumber}.pdf`);
      toast.success('Warranty certificate downloaded successfully');
    }
  };
  
  const handlePrint = () => {
    if (generatedPdfUrl) {
      printPDF(generatedPdfUrl);
      toast.success('Warranty sent to printer');
    } else if (currentWarranty.customerName && currentWarranty.productName) {
      generatePDF().then(() => {
        if (generatedPdfUrl) {
          printPDF(generatedPdfUrl);
          toast.success('Warranty sent to printer');
        }
      });
    } else {
      toast.error('Please fill out the required fields before printing');
    }
  };
  
  const handleSave = async () => {
    if (!currentWarranty.customerName) {
      toast.error('Customer name is required');
      return;
    }
    
    if (!currentWarranty.productName) {
      toast.error('Product name is required');
      return;
    }
    
    try {
      // We don't need the template URL anymore as we're generating the PDF from scratch
      const dummyTemplateUrl = ""; // Using an empty string instead of checking settings
      
      if (generatedPdfUrl && savedWarranty && 
          JSON.stringify(savedWarranty) !== JSON.stringify(currentWarranty)) {
        toast.loading('Updating warranty certificate...');
        const pdfUrl = await fillWarrantyPDF(dummyTemplateUrl, currentWarranty);
        setGeneratedPdfUrl(pdfUrl);
        setSavedWarranty({...currentWarranty});
        toast.success('Warranty certificate updated and saved successfully!');
      } else if (!generatedPdfUrl) {
        toast.loading('Saving warranty certificate...');
        const pdfUrl = await fillWarrantyPDF(dummyTemplateUrl, currentWarranty);
        setGeneratedPdfUrl(pdfUrl);
        setSavedWarranty({...currentWarranty});
        toast.success('Warranty certificate saved successfully!');
      } else {
        toast.success('Warranty certificate saved successfully!');
      }
      
      setFormDisabled(true);
    } catch (error) {
      console.error('Error saving warranty:', error);
      toast.error('Failed to save warranty certificate. Please try again.');
    }
  };
  
  const handleEdit = () => {
    setFormDisabled(false);
    toast.info('You can now edit the warranty certificate');
  };
  
  const directPrint = () => {
    if (generatedPdfUrl) {
      printPDF(generatedPdfUrl);
      toast.success('Printing warranty certificate');
    } else {
      toast.loading('Preparing warranty certificate for printing...');
      handleSave().then(() => {
        if (generatedPdfUrl) {
          printPDF(generatedPdfUrl);
          toast.success('Printing warranty certificate');
        }
      });
    }
  };
  
  return (
    <DocumentLayout 
      title="Attestation de garantie (Warranty Certificates)" 
      subtitle="Create, edit and manage your warranty certificate documents"
      icon={<Award size={20} className="text-primary" />}
      onSave={handleSave}
      onEdit={handleEdit}
      onPrint={directPrint}
    >
      <div className="bg-white rounded-lg card-shadow p-5 print:p-0 print:border-0 print:shadow-none">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 print:grid-cols-1 print:gap-2">
          <div className="lg:col-span-2 space-y-6">
            <div className="print:text-center print:border-b print:pb-4 print:mb-6">
              <h1 className="text-2xl font-bold print:text-3xl">Attestation de Garantie</h1>
              <p className="text-sm text-gray-500 print:text-base">Warranty Certificate</p>
              {currentWarranty.warrantyNumber && (
                <p className="print:text-right print:font-bold print:text-lg">
                  No: {currentWarranty.warrantyNumber}
                </p>
              )}
            </div>

            {settings.warranty.fields.warrantyNumber && (
              <div className="border-b pb-4 print:pb-2 print:mb-4">
                <h2 className="text-lg font-semibold mb-4 print:text-xl">Warranty Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 print:gap-2">
                  <div className="print:mb-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1 print:font-bold">Warranty Number</label>
                    <Input 
                      value={currentWarranty.warrantyNumber}
                      onChange={(e) => handleInputChange('warrantyNumber', e.target.value)}
                      placeholder="WAR-12345"
                      disabled={formDisabled}
                      className="print:border-0 print:p-0 print:text-black print:bg-transparent"
                    />
                  </div>
                  <div className="print:mb-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1 print:font-bold">Purchase Date</label>
                    <Input 
                      type="date"
                      value={currentWarranty.purchaseDate}
                      onChange={(e) => handleInputChange('purchaseDate', e.target.value)}
                      disabled={formDisabled}
                      className="print:border-0 print:p-0 print:text-black print:bg-transparent"
                    />
                  </div>
                  <div className="print:mb-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1 print:font-bold">Warranty Period</label>
                    <select 
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary/50 focus:border-primary print:border-0 print:p-0 print:text-black print:bg-transparent"
                      value={currentWarranty.warrantyPeriod}
                      onChange={(e) => handleInputChange('warrantyPeriod', e.target.value)}
                      disabled={formDisabled}
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
              <div className="border-b pb-4 print:pb-2 print:mb-4">
                <h2 className="text-lg font-semibold mb-4 print:text-xl">Customer Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 print:gap-2">
                  <div className="print:mb-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1 print:font-bold">Customer Name</label>
                    <Input 
                      value={currentWarranty.customerName}
                      onChange={(e) => handleInputChange('customerName', e.target.value)}
                      placeholder="John Doe"
                      disabled={formDisabled}
                      className="print:border-0 print:p-0 print:text-black print:bg-transparent"
                    />
                  </div>
                  <div className="print:mb-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1 print:font-bold">City</label>
                    <Input 
                      value={currentWarranty.customerCity}
                      onChange={(e) => handleInputChange('customerCity', e.target.value)}
                      placeholder="Paris"
                      disabled={formDisabled}
                      className="print:border-0 print:p-0 print:text-black print:bg-transparent"
                    />
                  </div>
                </div>
              </div>
            )}
            
            {settings.warranty.fields.productDetails && (
              <div className="print:pb-2 print:mb-4">
                <h2 className="text-lg font-semibold mb-4 print:text-xl">Product Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 print:gap-2">
                  <div className="print:mb-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1 print:font-bold">Product Category</label>
                    <div className="print:hidden">
                      <Select 
                        value={currentWarranty.productCategory} 
                        onValueChange={handleCategoryChange}
                        disabled={formDisabled}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="hidden print:block print:text-black">{currentWarranty.productCategory}</div>
                  </div>
                  <div className="print:mb-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1 print:font-bold">Product Name</label>
                    <div className="print:hidden">
                      <Select 
                        value={currentWarranty.productName} 
                        onValueChange={handleProductChange}
                        disabled={!currentWarranty.productCategory || formDisabled}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder={currentWarranty.productCategory ? "Select a product" : "Select a category first"} />
                        </SelectTrigger>
                        <SelectContent>
                          {filteredProducts.map((product) => (
                            <SelectItem key={product.id} value={product.name}>
                              {product.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="hidden print:block print:text-black">{currentWarranty.productName}</div>
                  </div>
                  
                  <div className="hidden print:block print:col-span-2 print:mt-4 print:mb-8">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="bg-gray-100">
                          <th className="border border-gray-300 p-2 text-left">Description</th>
                          <th className="border border-gray-300 p-2 text-right">Quantity</th>
                          <th className="border border-gray-300 p-2 text-right">Unit Price</th>
                          <th className="border border-gray-300 p-2 text-right">Discount</th>
                          <th className="border border-gray-300 p-2 text-right">Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border border-gray-300 p-2">{currentWarranty.productName}</td>
                          <td className="border border-gray-300 p-2 text-right">{currentWarranty.quantity}</td>
                          <td className="border border-gray-300 p-2 text-right">{formatCurrency(currentWarranty.price)}</td>
                          <td className="border border-gray-300 p-2 text-right">{formatCurrency(currentWarranty.discount)}</td>
                          <td className="border border-gray-300 p-2 text-right font-bold">{formatCurrency(currentWarranty.total)}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  
                  <div className="print:hidden">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
                    <Input 
                      type="number"
                      value={currentWarranty.quantity}
                      onChange={(e) => handleInputChange('quantity', parseInt(e.target.value) || 1)}
                      min="1"
                      disabled={formDisabled}
                    />
                  </div>
                  <div className="print:hidden">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Price
                      {isPriceManuallyChanged && (
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger>
                              <AlertTriangle size={16} className="ml-2 text-amber-500 inline" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Price has been manually modified from the original value of {formatCurrency(originalPrice)}</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      )}
                    </label>
                    <Input 
                      type="number"
                      value={currentWarranty.price}
                      onChange={(e) => handleInputChange('price', parseFloat(e.target.value) || 0)}
                      min="0"
                      step="0.01"
                      className={isPriceManuallyChanged ? "border-amber-300 focus:ring-amber-300" : ""}
                      disabled={formDisabled}
                    />
                  </div>
                  <div className="print:hidden">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Discount</label>
                    <Input 
                      type="number"
                      value={currentWarranty.discount}
                      onChange={(e) => handleInputChange('discount', parseFloat(e.target.value) || 0)}
                      min="0"
                      step="0.01"
                      disabled={formDisabled}
                    />
                  </div>
                </div>
              </div>
            )}
            
            <div className="hidden print:block print:mt-12 print:border-t print:pt-4">
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <p className="font-bold mb-1">Terms & Conditions:</p>
                  <ol className="text-sm pl-4">
                    <li>This warranty covers manufacturing defects only.</li>
                    <li>Warranty is valid only with proof of purchase.</li>
                    <li>Damage due to misuse or normal wear and tear is not covered.</li>
                    <li>For service, contact our customer support at support@maestrofurniture.com</li>
                  </ol>
                </div>
                <div className="text-right">
                  <p className="font-bold mb-6">Authorized Signature:</p>
                  <div className="border-t border-black pt-1 inline-block">
                    <p>For Maestro Furniture</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="print:hidden">
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
                  disabled={!settings.warranty.templateUrl || formDisabled}
                >
                  Generate Warranty Certificate
                </Button>
                
                {formDisabled && (
                  <Button
                    onClick={handleEdit}
                    variant="outline"
                    className="w-full mt-2"
                  >
                    Edit Information
                  </Button>
                )}
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
              <iframe 
                src={generatedPdfUrl} 
                className="w-full h-full" 
                title="Warranty Certificate Preview"
                ref={printFrameRef}
              ></iframe>
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
