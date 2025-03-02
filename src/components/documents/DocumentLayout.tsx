
import React, { ReactNode } from 'react';
import { Plus, Printer, Save, Edit } from 'lucide-react';
import { Button } from '../ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';
import { toast } from 'sonner';

interface DocumentLayoutProps {
  title: string;
  subtitle: string;
  icon: ReactNode;
  children: ReactNode;
  onSave?: () => void;
  onEdit?: () => void;
  onPrint?: () => void;
}

export default function DocumentLayout({ 
  title, 
  subtitle, 
  icon, 
  children,
  onSave,
  onEdit,
  onPrint 
}: DocumentLayoutProps) {
  return (
    <div className="space-y-5 animate-fadeIn">
      <div className="flex justify-between items-center flex-wrap gap-4 print:hidden">
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
      
      {/* Main content wrapper with print styles */}
      <div className="print:m-0 print:p-0 print:shadow-none">
        {children}
      </div>
      
      <div className="fixed bottom-6 right-6 flex gap-3 print:hidden">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="default" 
                onClick={onSave ? () => {
                  onSave();
                  if (!onSave.toString().includes('toast')) {
                    toast.success("Changes saved successfully");
                  }
                } : undefined}
                className="flex items-center justify-center w-12 h-12 bg-green-500 text-white rounded-full shadow-lg hover:bg-green-600 transition-colors"
                disabled={!onSave}
              >
                <Save size={20} />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Save changes</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="default" 
                onClick={onEdit ? () => {
                  onEdit();
                  if (!onEdit.toString().includes('toast')) {
                    toast.info("Edit mode enabled");
                  }
                } : undefined}
                className="flex items-center justify-center w-12 h-12 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 transition-colors"
                disabled={!onEdit}
              >
                <Edit size={20} />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Edit document</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="default" 
                onClick={onPrint ? () => {
                  onPrint();
                  if (!onPrint.toString().includes('toast')) {
                    toast.success("Printing document");
                  }
                } : undefined}
                className="flex items-center justify-center w-12 h-12 bg-purple-500 text-white rounded-full shadow-lg hover:bg-purple-600 transition-colors"
                disabled={!onPrint}
              >
                <Printer size={20} />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Print document</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      {/* Print-specific styles */}
      <style jsx global>{`
        @media print {
          body {
            background: white !important;
            font-size: 12pt;
            margin: 0;
            padding: 0;
          }
          
          .print\\:hidden {
            display: none !important;
          }
          
          .card-shadow {
            box-shadow: none !important;
            border: none !important;
          }
          
          /* Ensure page breaks properly */
          .page-break {
            page-break-before: always;
          }
          
          /* Adjust table styles for printing */
          table {
            width: 100%;
            border-collapse: collapse;
          }
          
          th, td {
            padding: 8px;
            text-align: left;
            border: 1px solid #ddd;
          }
          
          /* Ensure proper margins */
          @page {
            size: A4;
            margin: 1.5cm;
          }
        }
      `}</style>
    </div>
  );
}
