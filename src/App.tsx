
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner'; 
import Layout from './components/Layout';
import Products from './pages/Products';
import Categories from './pages/Categories';
import Suppliers from './pages/Suppliers';
import Purchases from './pages/Purchases';
import Orders from './pages/Orders';
import Transfer from './pages/Transfer';
import Reports from './pages/Reports';
import Users from './pages/Users';
import Settings from './pages/Settings';
import Index from './pages/Index';
import NotFound from './pages/NotFound';
import Invoices from './pages/documents/Invoices';
import Quotes from './pages/documents/Quotes';
import DeliveryReceipts from './pages/documents/DeliveryReceipts';
import WarrantyCertificates from './pages/documents/WarrantyCertificates';
import { SettingsProvider } from './contexts/SettingsContext';

import './App.css';

function App() {
  return (
    <SettingsProvider>
      <BrowserRouter>
        <Toaster position="top-right" />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Index />} />
            <Route path="products" element={<Products />} />
            <Route path="categories" element={<Categories />} />
            <Route path="suppliers" element={<Suppliers />} />
            <Route path="purchases" element={<Purchases />} />
            <Route path="orders" element={<Orders />} />
            <Route path="transfer" element={<Transfer />} />
            <Route path="reports" element={<Reports />} />
            <Route path="users" element={<Users />} />
            <Route path="settings" element={<Settings />} />
            <Route path="documents/invoices" element={<Invoices />} />
            <Route path="documents/quotes" element={<Quotes />} />
            <Route path="documents/delivery-receipts" element={<DeliveryReceipts />} />
            <Route path="documents/warranty-certificates" element={<WarrantyCertificates />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </SettingsProvider>
  );
}

export default App;
