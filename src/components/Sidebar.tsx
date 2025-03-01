
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  Tags, 
  ClipboardList, 
  ShoppingCart, 
  Truck, 
  BarChart3, 
  Users, 
  User, 
  Settings, 
  LogOut,
  FileText,
  ChevronDown,
  ChevronRight,
  Receipt,
  FileCheck,
  Shield,
  MessageSquare,
  X
} from 'lucide-react';
import { useMobile } from '@/hooks/use-mobile';

interface SidebarProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function Sidebar({ open, setOpen }: SidebarProps) {
  const location = useLocation();
  const [documentsOpen, setDocumentsOpen] = useState(false);
  const isMobile = useMobile();
  
  // Auto open documents section if current path is in documents
  useEffect(() => {
    if (location.pathname.includes('/documents')) {
      setDocumentsOpen(true);
    }
  }, [location.pathname]);
  
  const menuItems = [
    { name: 'Dashboard', path: '/', icon: LayoutDashboard },
    { name: 'Products', path: '/products', icon: Package },
    { name: 'Categories', path: '/categories', icon: Tags },
    { name: 'Orders', path: '/orders', icon: ClipboardList },
    { name: 'Purchases', path: '/purchases', icon: ShoppingCart },
    { name: 'Transfer', path: '/transfer', icon: Truck },
    { name: 'Reports', path: '/reports', icon: BarChart3 },
    { name: 'Suppliers', path: '/suppliers', icon: Users },
    { name: 'Users', path: '/users', icon: User },
    { name: 'Settings', path: '/settings', icon: Settings },
  ];

  const documentItems = [
    { name: 'Factures', path: '/documents/invoices', icon: Receipt },
    { name: 'Bon de livraison', path: '/documents/delivery-receipts', icon: Truck },
    { name: 'Attestation de garantie', path: '/documents/warranty-certificates', icon: Shield },
    { name: 'Devis', path: '/documents/quotes', icon: MessageSquare },
  ];

  const isDocumentPage = location.pathname.includes('/documents');

  return (
    <aside 
      className={`
        fixed inset-y-0 left-0 z-50 flex flex-col bg-sidebar-bg 
        transition-all duration-300 ease-in-out
        ${open ? 'w-64' : 'w-0 md:w-20'} 
        ${isMobile && !open ? '-translate-x-full' : 'translate-x-0'}
      `}
    >
      {/* Logo and close button for mobile */}
      <div className="flex items-center justify-between h-16 px-4 md:px-6 border-b border-white/10">
        <div className="font-bold text-2xl text-white flex gap-1 items-center">
          <span className="bg-primary h-8 w-8 flex items-center justify-center rounded-md">MF</span>
          <span className={`${open ? 'opacity-100' : 'opacity-0 md:hidden'} transition-opacity duration-200`}>
            Maestro Furniture
          </span>
        </div>
        
        {/* Close button only on mobile */}
        {isMobile && open && (
          <button 
            onClick={() => setOpen(false)}
            className="text-white/80 hover:text-white p-1.5 rounded-md hover:bg-white/10"
            aria-label="Close sidebar"
          >
            <X size={18} />
          </button>
        )}
      </div>
      
      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto scrollbar-none">
        <div className="space-y-1 stagger-animation">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`sidebar-link ${location.pathname === item.path ? 'active' : ''} ${!open && 'justify-center md:px-2'}`}
              onClick={() => isMobile && setOpen(false)}
            >
              <item.icon size={20} />
              <span className={`${open ? 'opacity-100' : 'opacity-0 md:hidden'} transition-opacity duration-200`}>
                {item.name}
              </span>
            </Link>
          ))}
          
          {/* Documents Section */}
          <div>
            <button
              onClick={() => setDocumentsOpen(!documentsOpen)}
              className={`sidebar-link w-full ${isDocumentPage ? 'active' : ''} ${!open && 'justify-center md:px-2'}`}
            >
              <FileText size={20} />
              {open && (
                <>
                  <span className="flex-1 opacity-100 transition-opacity duration-200">Documents</span>
                  {documentsOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                </>
              )}
            </button>
            
            {/* Document Submenu */}
            {open && documentsOpen && (
              <div className="pl-8 mt-1 space-y-1">
                {documentItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`sidebar-link text-sm py-2 ${location.pathname === item.path ? 'active' : ''}`}
                    onClick={() => isMobile && setOpen(false)}
                  >
                    <item.icon size={16} />
                    <span className="opacity-100 transition-opacity duration-200">{item.name}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </nav>
      
      {/* Logout */}
      <div className="p-3 mt-auto border-t border-white/10">
        <Link to="/logout" className={`sidebar-link ${!open && 'justify-center md:px-2'}`}>
          <LogOut size={20} />
          <span className={`${open ? 'opacity-100' : 'opacity-0 md:hidden'} transition-opacity duration-200`}>
            Logout
          </span>
        </Link>
      </div>
    </aside>
  );
}
