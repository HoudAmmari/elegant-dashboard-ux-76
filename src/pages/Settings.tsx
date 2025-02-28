
import { useState } from 'react';
import { Bell, Globe, Lock, Moon, Sun, User } from 'lucide-react';

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
                          value="Admin"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                        <input 
                          type="text" 
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary/50 focus:border-primary"
                          value="User"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <input 
                        type="email" 
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary/50 focus:border-primary"
                        value="admin@maestrofurniture.com"
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
            
            {activeTab !== 'profile' && activeTab !== 'appearance' && (
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
