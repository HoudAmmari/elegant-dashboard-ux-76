
import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import { Bell, ChevronDown, Menu, Search } from 'lucide-react';

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();
  
  // Extract page title from current path
  const getPageTitle = () => {
    const path = location.pathname.split('/')[1];
    if (path === '') return 'Dashboard';
    return path.charAt(0).toUpperCase() + path.slice(1);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      
      {/* Main Content */}
      <div className="flex flex-col flex-1 overflow-x-hidden overflow-y-auto">
        {/* Header */}
        <header className="sticky top-0 z-10 flex items-center justify-between p-4 bg-white dark:bg-gray-800 card-shadow">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <Menu size={20} />
            </button>
            <h1 className="text-2xl font-semibold">{getPageTitle()}</h1>
          </div>
          
          <div className="flex items-center gap-6">
            {/* Search Bar */}
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
              <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                <Bell size={20} />
                <span className="absolute top-0 right-0 w-2 h-2 bg-primary rounded-full"></span>
              </button>
            </div>
            
            {/* User Profile */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 overflow-hidden rounded-full">
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
              <ChevronDown size={16} className="text-gray-400" />
            </div>
          </div>
        </header>
        
        {/* Page Content */}
        <main className="flex-1 p-4 md:p-6">
          <div className="animate-fadeIn">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
