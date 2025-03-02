
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

// Import products data from the Products page
// In a real application, this would come from an API or database
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

// Extract unique categories
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
  
  // New state for tracking if price was manually changed
  const [isPriceManuallyChanged, setIsPriceManuallyChanged] = useState(false);
  const [originalPrice, setOriginalPrice] = useState(0);
  
  // Reference to print iframe
  const printFrameRef = useRef<HTMLIFrameElement | null>(null);
  
  // Filter products by selected category
  const filteredProducts = products.filter(
    product => currentWarranty.productCategory === '' || 
    product.category === currentWarranty.productCategory
  );
  
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
    
    // Reset price modified flag if we're changing product or category
    if (field === 'productCategory' || field === 'productName') {
      setIsPriceManuallyChanged(false);
    }
    
    // If manually changing price
    if (field === 'price' && !isPriceManuallyChanged && originalPrice !== 0 && originalPrice !== Number(value)) {
      setIsPriceManuallyChanged(true);
      toast.warning('You have manually changed the price from the default value.');
    }
  };
  
  // Handle product category selection
  const handleCategoryChange = (value: string) => {
    setCurrentWarranty(prev => ({
      ...prev,
      productCategory: value,
      productName: '' // Reset product name when category changes
    }));
  };
  
  // Handle product selection
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
      
      // After generating, disable form and save the current warranty state
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
    }
  };
  
  const handlePrint = () => {
    if (generatedPdfUrl) {
      printPDF(generatedPdfUrl);
      toast.success('Warranty sent to printer');
    } else if (currentWarranty.customerName && currentWarranty.productName) {
      // If we don't have a PDF yet, but we have enough info, generate one and then print
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
    // Validate required fields
    if (!currentWarranty.customerName) {
      toast.error('Customer name is required');
      return;
    }
    
    if (!currentWarranty.productName) {
      toast.error('Product name is required');
      return;
    }
    
    try {
      // In a real app, here you would save to a database
      // For now, we'll just simulate saving
      
      // If we have already generated a PDF and the data changed, regenerate it
      if (generatedPdfUrl && savedWarranty && 
          JSON.stringify(savedWarranty) !== JSON.stringify(currentWarranty)) {
        const pdfUrl = await fillWarrantyPDF(settings.warranty.templateUrl || '', currentWarranty);
        setGeneratedPdfUrl(pdfUrl);
        setSavedWarranty({...currentWarranty});
        toast.success('Warranty certificate updated and saved successfully!');
      } else if (!generatedPdfUrl) {
        // If no PDF yet, generate one
        const pdfUrl = await fillWarrantyPDF(settings.warranty.templateUrl || '', currentWarranty);
        setGeneratedPdfUrl(pdfUrl);
        setSavedWarranty({...currentWarranty});
        toast.success('Warranty certificate saved successfully!');
      } else {
        // Nothing changed, just acknowledge save
        toast.success('Warranty certificate saved successfully!');
      }
      
      // After saving, disable form
      setFormDisabled(true);
    } catch (error) {
      console.error('Error saving warranty:', error);
      toast.error('Failed to save warranty certificate. Please try again.');
    }
  };
  
  const handleEdit = () => {
    // Enable form for editing
    setFormDisabled(false);
    toast.info('You can now edit the warranty certificate');
  };
  
  const directPrint = () => {
    if (generatedPdfUrl) {
      // If we already have a PDF, just print it
      printPDF(generatedPdfUrl);
    } else {
      // Generate PDF first, then print
      handleSave().then(() => {
        if (generatedPdfUrl) {
          printPDF(generatedPdfUrl);
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
                      disabled={formDisabled}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Purchase Date</label>
                    <Input 
                      type="date"
                      value={currentWarranty.purchaseDate}
                      onChange={(e) => handleInputChange('purchaseDate', e.target.value)}
                      disabled={formDisabled}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Warranty Period</label>
                    <select 
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary/50 focus:border-primary"
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
              <div className="border-b pb-4">
                <h2 className="text-lg font-semibold mb-4">Customer Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Customer Name</label>
                    <Input 
                      value={currentWarranty.customerName}
                      onChange={(e) => handleInputChange('customerName', e.target.value)}
                      placeholder="John Doe"
                      disabled={formDisabled}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                    <Input 
                      value={currentWarranty.customerCity}
                      onChange={(e) => handleInputChange('customerCity', e.target.value)}
                      placeholder="Paris"
                      disabled={formDisabled}
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
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
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
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
                    <Input 
                      type="number"
                      value={currentWarranty.quantity}
                      onChange={(e) => handleInputChange('quantity', parseInt(e.target.value) || 1)}
                      min="1"
                      disabled={formDisabled}
                    />
                  </div>
                  <div>
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
                  <div>
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
