
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
  LogOut 
} from 'lucide-react';

interface SidebarProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function Sidebar({ open, setOpen }: SidebarProps) {
  const location = useLocation();
  
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

  return (
    <aside 
      className={`${
        open ? 'translate-x-0 w-64' : '-translate-x-full w-0 md:w-20 md:translate-x-0'
      } fixed inset-y-0 left-0 z-50 flex flex-col bg-sidebar-bg overflow-hidden transition-all duration-300 ease-in-out`}
    >
      {/* Logo */}
      <div className="flex items-center h-16 px-6 space-x-3">
        <div className="font-bold text-2xl text-white flex gap-1 items-center">
          <span className="bg-primary h-8 w-8 flex items-center justify-center rounded-md">MF</span>
          <span className={`${open ? 'opacity-100' : 'opacity-0 md:hidden'} transition-opacity duration-200`}>
            Maestro Furniture
          </span>
        </div>
      </div>
      
      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto scrollbar-none">
        <div className="space-y-1 stagger-animation">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`sidebar-link ${location.pathname === item.path ? 'active' : ''} ${!open && 'justify-center md:px-2'}`}
            >
              <item.icon size={20} />
              <span className={`${open ? 'opacity-100' : 'opacity-0 md:hidden'} transition-opacity duration-200`}>
                {item.name}
              </span>
            </Link>
          ))}
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
