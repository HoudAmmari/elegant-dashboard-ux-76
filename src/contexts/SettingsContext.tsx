
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'sonner';

// Define the shape of our settings
type DocumentFieldSettings = {
  [field: string]: boolean;
};

type DocumentSettings = {
  fields: DocumentFieldSettings;
  taxRate?: number;
};

type DocumentsSettings = {
  invoice: DocumentSettings;
  delivery: DocumentSettings;
  warranty: DocumentSettings;
  quote: DocumentSettings;
};

// Define the shape of our context
interface SettingsContextType {
  settings: DocumentsSettings;
  updateSettings: (newSettings: DocumentsSettings) => void;
  updateDocumentSettings: (
    docType: keyof DocumentsSettings, 
    newSettings: DocumentSettings
  ) => void;
}

// Create the context with a default value
const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

// Default settings
const defaultSettings: DocumentsSettings = {
  invoice: {
    fields: {
      invoiceNumber: true,
      customerName: true,
      customerAddress: true,
      productDetails: true,
      tax: true,
      termsConditions: true
    },
    taxRate: 18
  },
  delivery: {
    fields: {
      deliveryNumber: true,
      customerName: true,
      customerAddress: true,
      productDetails: true,
      deliveryDate: true,
      signature: true
    }
  },
  warranty: {
    fields: {
      warrantyNumber: true,
      customerName: true,
      productDetails: true,
      warrantyPeriod: true,
      purchaseDate: true,
      termsConditions: true
    }
  },
  quote: {
    fields: {
      quoteNumber: true,
      customerName: true,
      customerAddress: true,
      productDetails: true,
      tax: true,
      validityPeriod: true,
      termsConditions: true
    },
    taxRate: 18
  }
};

// Storage key for localStorage
const SETTINGS_STORAGE_KEY = 'maestro_document_settings';

export const SettingsProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  // Initialize state from localStorage or default
  const [settings, setSettings] = useState<DocumentsSettings>(() => {
    const savedSettings = localStorage.getItem(SETTINGS_STORAGE_KEY);
    return savedSettings ? JSON.parse(savedSettings) : defaultSettings;
  });

  // Save settings to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings));
  }, [settings]);

  // Update all settings
  const updateSettings = (newSettings: DocumentsSettings) => {
    setSettings(newSettings);
    toast.success('Settings updated successfully!');
  };

  // Update settings for a specific document type
  const updateDocumentSettings = (
    docType: keyof DocumentsSettings, 
    newSettings: DocumentSettings
  ) => {
    setSettings(prevSettings => ({
      ...prevSettings,
      [docType]: newSettings
    }));
    toast.success(`${docType.charAt(0).toUpperCase() + docType.slice(1)} settings updated successfully!`);
  };

  return (
    <SettingsContext.Provider value={{ settings, updateSettings, updateDocumentSettings }}>
      {children}
    </SettingsContext.Provider>
  );
};

// Custom hook to use the settings context
export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};
