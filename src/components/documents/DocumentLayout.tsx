
import React, { ReactNode } from 'react';
import { Plus, Printer, Save, Edit } from 'lucide-react';

interface DocumentLayoutProps {
  title: string;
  subtitle: string;
  icon: ReactNode;
  children: ReactNode;
}

export default function DocumentLayout({ title, subtitle, icon, children }: DocumentLayoutProps) {
  return (
    <div className="space-y-5 animate-fadeIn">
      <div className="flex justify-between items-center flex-wrap gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            {icon}
          </div>
          <div>
            <h1 className="text-2xl font-bold">{title}</h1>
            <p className="text-sm text-gray-500">{subtitle}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 text-white bg-primary rounded-lg hover:bg-primary/90 transition-colors">
            <Plus size={18} />
            <span>Create New</span>
          </button>
        </div>
      </div>
      
      {children}
      
      <div className="fixed bottom-6 right-6 flex gap-3">
        <button className="flex items-center justify-center w-12 h-12 bg-green-500 text-white rounded-full shadow-lg hover:bg-green-600 transition-colors">
          <Save size={20} />
        </button>
        <button className="flex items-center justify-center w-12 h-12 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 transition-colors">
          <Edit size={20} />
        </button>
        <button className="flex items-center justify-center w-12 h-12 bg-purple-500 text-white rounded-full shadow-lg hover:bg-purple-600 transition-colors">
          <Printer size={20} />
        </button>
      </div>
    </div>
  );
}
