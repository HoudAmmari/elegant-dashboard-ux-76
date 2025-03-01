
import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import { Bell, ChevronDown, Menu, Search } from 'lucide-react';
import { useMobile } from '@/hooks/use-mobile';

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();
  const isMobile = useMobile();
  
  // Auto-close sidebar on mobile devices
  useEffect(() => {
    if (isMobile) {
      setSidebarOpen(false);
    } else {
      setSidebarOpen(true);
    }
  }, [isMobile]);

  // Close sidebar when route changes on mobile
  useEffect(() => {
    if (isMobile) {
      setSidebarOpen(false);
    }
  }, [location.pathname, isMobile]);
  
  // Extract page title from current path
  const getPageTitle = () => {
    const path = location.pathname.split('/')[1];
    if (path === '') return 'Dashboard';
    return path.charAt(0).toUpperCase() + path.slice(1);
  };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar - Overlay for mobile when open */}
      {isMobile && sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40" 
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      
      {/* Main Content - Responsive margins based on sidebar state and screen size */}
      <div 
        className={`
          flex flex-col flex-1 w-full transition-all duration-300 ease-in-out
          ${sidebarOpen && !isMobile ? 'lg:ml-64 md:ml-56' : 'ml-0 md:ml-20'}
        `}
      >
        {/* Header */}
        <header className="sticky top-0 z-10 flex items-center justify-between p-3 md:p-4 bg-white dark:bg-gray-800 card-shadow">
          <div className="flex items-center gap-2 md:gap-3">
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              aria-label="Toggle sidebar"
            >
              <Menu size={20} />
            </button>
            <h1 className="text-lg md:text-2xl font-semibold truncate">{getPageTitle()}</h1>
          </div>
          
          <div className="flex items-center gap-3 md:gap-6">
            {/* Search Bar - Hidden on small screens */}
            <div className="relative hidden md:block">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search className="w-4 h-4 text-gray-400" />
              </div>
              <input 
                type="search" 
                className="block w-full py-2 pl-10 pr-3 bg-gray-100 border-none rounded-lg dark:bg-gray-700 focus:ring-2 focus:ring-primary/50"
                placeholder="Search..." 
              />
            </div>
            
            {/* Notifications */}
            <div className="relative">
              <button 
                className="p-1.5 md:p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                aria-label="Notifications"
              >
                <Bell size={isMobile ? 18 : 20} />
                <span className="absolute top-0 right-0 w-2 h-2 bg-primary rounded-full"></span>
              </button>
            </div>
            
            {/* User Profile */}
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 md:w-8 md:h-8 overflow-hidden rounded-full">
                <img 
                  src="https://ui-avatars.com/api/?name=Admin+User&background=6C5DD3&color=fff" 
                  alt="Profile" 
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="hidden md:block">
                <p className="text-sm font-medium">Admin User</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Manager</p>
              </div>
              <ChevronDown size={16} className="text-gray-400 hidden md:block" />
            </div>
          </div>
        </header>
        
        {/* Page Content - With scrolling and padding adjustments */}
        <main className="flex-1 p-3 md:p-4 lg:p-6 overflow-y-auto">
          <div className="animate-fadeIn max-w-[1600px] mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
