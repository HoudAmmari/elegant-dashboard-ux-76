import { useState } from 'react';
import { Bell, FileText, Globe, Lock, Moon, Sun, User, Upload } from 'lucide-react';
import { useSettings } from '../contexts/SettingsContext';
import { toast } from 'sonner';
import { Button } from '../components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../components/ui/dialog';
import { Input } from '../components/ui/input';

export default function Settings() {
  const [activeTab, setActiveTab] = useState('profile');
  
  return (
    <div className="space-y-5 animate-fadeIn">
      <h1 className="text-2xl font-bold">Settings</h1>
      
      <div className="bg-white rounded-lg card-shadow">
        <div className="flex flex-col md:flex-row">
          {/* Tabs */}
          <div className="md:w-64 border-b md:border-b-0 md:border-r border-gray-200">
            <nav className="p-4 space-y-1">
              {[
                { id: 'profile', name: 'Profile', icon: User },
                { id: 'appearance', name: 'Appearance', icon: Moon },
                { id: 'documents', name: 'Documents Settings', icon: FileText },
                { id: 'notifications', name: 'Notifications', icon: Bell },
                { id: 'security', name: 'Security', icon: Lock },
                { id: 'language', name: 'Language', icon: Globe },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-3 w-full px-4 py-3 rounded-md transition-colors ${
                    activeTab === tab.id
                      ? 'bg-primary/10 text-primary'
                      : 'hover:bg-gray-100 text-gray-700'
                  }`}
                >
                  <tab.icon size={18} />
                  <span className="font-medium">{tab.name}</span>
                </button>
              ))}
            </nav>
          </div>
          
          {/* Content */}
          <div className="flex-1 p-6">
            {activeTab === 'profile' && (
              <div className="animate-fadeIn">
                <h2 className="text-xl font-semibold mb-6">Profile Settings</h2>
                
                <div className="flex flex-col md:flex-row gap-6 items-start">
                  <div className="flex flex-col items-center">
                    <div className="w-24 h-24 rounded-full overflow-hidden mb-4">
                      <img 
                        src="https://ui-avatars.com/api/?name=Admin+User&background=6C5DD3&color=fff&size=128" 
                        alt="Profile" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <button className="px-4 py-2 text-sm text-primary border border-primary rounded-md hover:bg-primary/10 transition-colors">
                      Change Picture
                    </button>
                  </div>
                  
                  <div className="flex-1 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                        <input 
                          type="text" 
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary/50 focus:border-primary"
                          defaultValue="Admin"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                        <input 
                          type="text" 
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary/50 focus:border-primary"
                          defaultValue="User"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <input 
                        type="email" 
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary/50 focus:border-primary"
                        defaultValue="admin@maestrofurniture.com"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary/50 focus:border-primary">
                        <option>Manager</option>
                        <option>Admin</option>
                        <option>Inventory</option>
                        <option>Sales</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                      <textarea 
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary/50 focus:border-primary"
                        rows={4}
                        placeholder="Write a short bio..."
                      ></textarea>
                    </div>
                    
                    <div className="pt-4">
                      <button className="px-6 py-2 text-white bg-primary rounded-md hover:bg-primary/90 transition-colors">
                        Save Changes
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'appearance' && (
              <div className="animate-fadeIn">
                <h2 className="text-xl font-semibold mb-6">Appearance Settings</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-4">Theme</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="border border-gray-200 rounded-lg p-4 flex items-center gap-4 cursor-pointer hover:border-primary">
                        <Sun size={24} className="text-gray-700" />
                        <div>
                          <p className="font-medium">Light</p>
                          <p className="text-sm text-gray-500">Default light theme</p>
                        </div>
                      </div>
                      
                      <div className="border border-primary rounded-lg p-4 flex items-center gap-4 cursor-pointer bg-primary/5">
                        <Moon size={24} className="text-gray-700" />
                        <div>
                          <p className="font-medium">Dark</p>
                          <p className="text-sm text-gray-500">Dark theme for night</p>
                        </div>
                      </div>
                      
                      <div className="border border-gray-200 rounded-lg p-4 flex items-center gap-4 cursor-pointer hover:border-primary">
                        <Sun size={24} className="text-gray-700" />
                        <div>
                          <p className="font-medium">System</p>
                          <p className="text-sm text-gray-500">Follow system settings</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-4">Sidebar</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Collapsed Sidebar</p>
                          <p className="text-sm text-gray-500">Show only icons in sidebar</p>
                        </div>
                        <div className="relative inline-block w-12 align-middle select-none">
                          <input type="checkbox" name="toggle" id="sidebar-toggle" className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 border-gray-300 appearance-none cursor-pointer" />
                          <label htmlFor="sidebar-toggle" className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"></label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'documents' && (
              <DocumentsSettings />
            )}
            
            {activeTab !== 'profile' && activeTab !== 'appearance' && activeTab !== 'documents' && (
              <div className="flex items-center justify-center h-64">
                <p className="text-gray-500">This section is under development.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function DocumentsSettings() {
  const [activeDocType, setActiveDocType] = useState('invoice');
  const { settings, updateDocumentSettings } = useSettings();
  const [pdfUploadOpen, setPdfUploadOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFieldChange = (docType, field, value) => {
    updateDocumentSettings(docType, {
      ...settings[docType],
      fields: {
        ...settings[docType].fields,
        [field]: value
      }
    });
  };

  const handleTaxRateChange = (docType, value) => {
    updateDocumentSettings(docType, {
      ...settings[docType],
      taxRate: value
    });
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleFileUpload = () => {
    if (!selectedFile) {
      toast.error("Please select a file first");
      return;
    }

    const fileUrl = URL.createObjectURL(selectedFile);
    
    const docType = activeDocType as keyof DocumentsSettings;
    
    updateDocumentSettings(docType, {
      ...settings[docType],
      templateUrl: fileUrl,
      templateName: selectedFile.name
    });

    setPdfUploadOpen(false);
    setSelectedFile(null);
    toast.success(`Template for ${activeDocType} updated successfully!`);
  };

  const handleSaveChanges = () => {
    toast.success('All document settings saved successfully!');
  };

  return (
    <div className="animate-fadeIn">
      <h2 className="text-xl font-semibold mb-6">Documents Settings</h2>
      
      <div className="mb-6 border-b">
        <div className="flex space-x-4">
          {[
            { id: 'invoice', name: 'Factures (Invoices)' },
            { id: 'delivery', name: 'Bon de livraison' },
            { id: 'warranty', name: 'Attestation de garantie' },
            { id: 'quote', name: 'Devis (Quotes)' }
          ].map((docType) => (
            <button
              key={docType.id}
              onClick={() => setActiveDocType(docType.id)}
              className={`px-4 py-2 font-medium transition-colors border-b-2 ${
                activeDocType === docType.id
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {docType.name}
            </button>
          ))}
        </div>
      </div>
      
      {activeDocType === 'invoice' && (
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-4">Invoice Field Display Options</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <SettingsCheckbox 
                label="Invoice Number" 
                checked={settings.invoice.fields.invoiceNumber}
                onChange={(checked) => handleFieldChange('invoice', 'invoiceNumber', checked)}
              />
              <SettingsCheckbox 
                label="Customer Name" 
                checked={settings.invoice.fields.customerName}
                onChange={(checked) => handleFieldChange('invoice', 'customerName', checked)}
              />
              <SettingsCheckbox 
                label="Customer Address" 
                checked={settings.invoice.fields.customerAddress}
                onChange={(checked) => handleFieldChange('invoice', 'customerAddress', checked)}
              />
              <SettingsCheckbox 
                label="Product Details" 
                checked={settings.invoice.fields.productDetails}
                onChange={(checked) => handleFieldChange('invoice', 'productDetails', checked)}
              />
              <SettingsCheckbox 
                label="Tax" 
                checked={settings.invoice.fields.tax}
                onChange={(checked) => handleFieldChange('invoice', 'tax', checked)}
              />
              <SettingsCheckbox 
                label="Terms & Conditions" 
                checked={settings.invoice.fields.termsConditions}
                onChange={(checked) => handleFieldChange('invoice', 'termsConditions', checked)}
              />
            </div>
          </div>
          
          <div className="border-t pt-4">
            <h3 className="text-lg font-medium mb-4">Tax Settings</h3>
            <div className="max-w-xs">
              <label className="block text-sm font-medium text-gray-700 mb-1">Tax Rate (%)</label>
              <input 
                type="number" 
                min="0"
                max="100"
                value={settings.invoice.taxRate}
                onChange={(e) => handleTaxRateChange('invoice', parseInt(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary/50 focus:border-primary"
              />
              <p className="mt-1 text-sm text-gray-500">This rate will be applied to all invoices by default.</p>
            </div>
          </div>
        </div>
      )}
      
      {activeDocType === 'delivery' && (
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-4">Delivery Receipt Field Display Options</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <SettingsCheckbox 
                label="Delivery Number" 
                checked={settings.delivery.fields.deliveryNumber}
                onChange={(checked) => handleFieldChange('delivery', 'deliveryNumber', checked)}
              />
              <SettingsCheckbox 
                label="Customer Name" 
                checked={settings.delivery.fields.customerName}
                onChange={(checked) => handleFieldChange('delivery', 'customerName', checked)}
              />
              <SettingsCheckbox 
                label="Customer Address" 
                checked={settings.delivery.fields.customerAddress}
                onChange={(checked) => handleFieldChange('delivery', 'customerAddress', checked)}
              />
              <SettingsCheckbox 
                label="Product Details" 
                checked={settings.delivery.fields.productDetails}
                onChange={(checked) => handleFieldChange('delivery', 'productDetails', checked)}
              />
              <SettingsCheckbox 
                label="Delivery Date" 
                checked={settings.delivery.fields.deliveryDate}
                onChange={(checked) => handleFieldChange('delivery', 'deliveryDate', checked)}
              />
              <SettingsCheckbox 
                label="Signature Requirement" 
                checked={settings.delivery.fields.signature}
                onChange={(checked) => handleFieldChange('delivery', 'signature', checked)}
              />
            </div>
          </div>
        </div>
      )}
      
      {activeDocType === 'warranty' && (
        <div className="space-y-6">
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Warranty Certificate Field Display Options</h3>
              <Button 
                variant="outline" 
                onClick={() => setPdfUploadOpen(true)}
                className="flex items-center gap-2"
              >
                <Upload size={16} />
                Upload Template
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <SettingsCheckbox 
                label="Warranty Number" 
                checked={settings.warranty.fields.warrantyNumber}
                onChange={(checked) => handleFieldChange('warranty', 'warrantyNumber', checked)}
              />
              <SettingsCheckbox 
                label="Customer Name" 
                checked={settings.warranty.fields.customerName}
                onChange={(checked) => handleFieldChange('warranty', 'customerName', checked)}
              />
              <SettingsCheckbox 
                label="Product Details" 
                checked={settings.warranty.fields.productDetails}
                onChange={(checked) => handleFieldChange('warranty', 'productDetails', checked)}
              />
              <SettingsCheckbox 
                label="Warranty Period" 
                checked={settings.warranty.fields.warrantyPeriod}
                onChange={(checked) => handleFieldChange('warranty', 'warrantyPeriod', checked)}
              />
              <SettingsCheckbox 
                label="Purchase Date" 
                checked={settings.warranty.fields.purchaseDate}
                onChange={(checked) => handleFieldChange('warranty', 'purchaseDate', checked)}
              />
              <SettingsCheckbox 
                label="Terms & Conditions" 
                checked={settings.warranty.fields.termsConditions}
                onChange={(checked) => handleFieldChange('warranty', 'termsConditions', checked)}
              />
            </div>
          </div>

          {settings.warranty.templateUrl && (
            <div className="p-4 bg-primary/5 rounded-md border border-primary/20">
              <h4 className="font-medium mb-2">Current Template</h4>
              <p className="text-sm mb-2">{settings.warranty.templateName}</p>
              <a 
                href={settings.warranty.templateUrl} 
                target="_blank" 
                rel="noreferrer"
                className="text-sm text-primary hover:underline"
              >
                Preview Template
              </a>
            </div>
          )}
        </div>
      )}
      
      {activeDocType === 'quote' && (
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-4">Quote Field Display Options</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <SettingsCheckbox 
                label="Quote Number" 
                checked={settings.quote.fields.quoteNumber}
                onChange={(checked) => handleFieldChange('quote', 'quoteNumber', checked)}
              />
              <SettingsCheckbox 
                label="Customer Name" 
                checked={settings.quote.fields.customerName}
                onChange={(checked) => handleFieldChange('quote', 'customerName', checked)}
              />
              <SettingsCheckbox 
                label="Customer Address" 
                checked={settings.quote.fields.customerAddress}
                onChange={(checked) => handleFieldChange('quote', 'customerAddress', checked)}
              />
              <SettingsCheckbox 
                label="Product Details" 
                checked={settings.quote.fields.productDetails}
                onChange={(checked) => handleFieldChange('quote', 'productDetails', checked)}
              />
              <SettingsCheckbox 
                label="Tax" 
                checked={settings.quote.fields.tax}
                onChange={(checked) => handleFieldChange('quote', 'tax', checked)}
              />
              <SettingsCheckbox 
                label="Validity Period" 
                checked={settings.quote.fields.validityPeriod}
                onChange={(checked) => handleFieldChange('quote', 'validityPeriod', checked)}
              />
              <SettingsCheckbox 
                label="Terms & Conditions" 
                checked={settings.quote.fields.termsConditions}
                onChange={(checked) => handleFieldChange('quote', 'termsConditions', checked)}
              />
            </div>
          </div>
          
          <div className="border-t pt-4">
            <h3 className="text-lg font-medium mb-4">Tax Settings</h3>
            <div className="max-w-xs">
              <label className="block text-sm font-medium text-gray-700 mb-1">Tax Rate (%)</label>
              <input 
                type="number" 
                min="0"
                max="100"
                value={settings.quote.taxRate}
                onChange={(e) => handleTaxRateChange('quote', parseInt(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary/50 focus:border-primary"
              />
              <p className="mt-1 text-sm text-gray-500">This rate will be applied to all quotes by default.</p>
            </div>
          </div>
        </div>
      )}
      
      <div className="mt-8 pt-4 border-t">
        <button 
          onClick={handleSaveChanges}
          className="px-6 py-2 text-white bg-primary rounded-md hover:bg-primary/90 transition-colors"
        >
          Save Changes
        </button>
      </div>

      <Dialog open={pdfUploadOpen} onOpenChange={setPdfUploadOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Upload PDF Template</DialogTitle>
            <DialogDescription>
              Upload a PDF template for {activeDocType === 'warranty' ? 'Attestation de Garantie' : activeDocType}. 
              The system will use this template to automatically generate documents.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="pdfTemplate" className="text-right col-span-1">
                PDF Template
              </label>
              <Input
                id="pdfTemplate"
                type="file"
                accept=".pdf"
                onChange={handleFileChange}
                className="col-span-3"
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setPdfUploadOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleFileUpload}>
              Upload Template
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function SettingsCheckbox({ label, checked, onChange }) {
  return (
    <div className="flex items-center">
      <input
        type="checkbox"
        id={`setting-${label.replace(/\s+/g, '-').toLowerCase()}`}
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
      />
      <label 
        htmlFor={`setting-${label.replace(/\s+/g, '-').toLowerCase()}`}
        className="ml-2 text-sm font-medium text-gray-700"
      >
        {label}
      </label>
    </div>
  );
}
