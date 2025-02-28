
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Index from './pages/Index';
import Products from './pages/Products';
import Categories from './pages/Categories';
import Orders from './pages/Orders';
import Purchases from './pages/Purchases';
import Transfer from './pages/Transfer';
import Reports from './pages/Reports';
import Suppliers from './pages/Suppliers';
import Users from './pages/Users';
import Settings from './pages/Settings';
import NotFound from './pages/NotFound';
import Invoices from './pages/documents/Invoices';
import DeliveryReceipts from './pages/documents/DeliveryReceipts';
import WarrantyCertificates from './pages/documents/WarrantyCertificates';
import Quotes from './pages/documents/Quotes';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Index />} />
          <Route path="products" element={<Products />} />
          <Route path="categories" element={<Categories />} />
          <Route path="orders" element={<Orders />} />
          <Route path="purchases" element={<Purchases />} />
          <Route path="transfer" element={<Transfer />} />
          <Route path="reports" element={<Reports />} />
          <Route path="suppliers" element={<Suppliers />} />
          <Route path="users" element={<Users />} />
          <Route path="settings" element={<Settings />} />
          
          {/* Document Routes */}
          <Route path="documents/invoices" element={<Invoices />} />
          <Route path="documents/delivery-receipts" element={<DeliveryReceipts />} />
          <Route path="documents/warranty-certificates" element={<WarrantyCertificates />} />
          <Route path="documents/quotes" element={<Quotes />} />
          
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
