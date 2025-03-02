
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';

export type WarrantyData = {
  warrantyNumber: string;
  customerName: string;
  customerCity: string;
  productCategory: string;
  productName: string;
  quantity: number;
  price: number;
  total: number;
  discount: number;
  warrantyPeriod: string;
  purchaseDate: string;
};

/**
 * Fill a PDF template with warranty data
 * @param templateUrl The URL of the PDF template
 * @param data The warranty data to fill in the PDF
 * @returns A URL to the filled PDF
 */
export async function fillWarrantyPDF(templateUrl: string, data: WarrantyData): Promise<string> {
  try {
    // Fetch the template PDF
    const templateBytes = await fetch(templateUrl).then(res => res.arrayBuffer());
    const pdfDoc = await PDFDocument.load(templateBytes);
    
    // Get the first page
    const page = pdfDoc.getPages()[0];
    
    // Get a standard font
    const font = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    const regularFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
    
    // Define text options for headings
    const headingTextSize = 12;
    const textSize = 11;
    const textColor = rgb(0, 0, 0);
    
    // Define positions for field values (these would need to be adjusted based on the actual template)
    // Using more precise positioning for better alignment
    const positions = {
      // Header section
      warrantyNumber: { x: 450, y: 750, font: font, size: headingTextSize },
      
      // Customer Information section
      customerName: { x: 150, y: 650, font: regularFont, size: textSize },
      customerCity: { x: 150, y: 630, font: regularFont, size: textSize },
      
      // Product Information section - Left aligned
      productCategory: { x: 150, y: 550, font: regularFont, size: textSize },
      productName: { x: 150, y: 530, font: regularFont, size: textSize },
      
      // Product Information section - Right aligned numeric values
      quantity: { x: 420, y: 530, font: regularFont, size: textSize },
      price: { x: 480, y: 530, font: regularFont, size: textSize },
      
      // Totals section - Right aligned
      total: { x: 480, y: 500, font: font, size: textSize },
      discount: { x: 480, y: 480, font: regularFont, size: textSize },
      
      // Warranty details
      warrantyPeriod: { x: 150, y: 400, font: regularFont, size: textSize },
      purchaseDate: { x: 400, y: 400, font: regularFont, size: textSize },
    };
    
    // Fill in fields with proper formatting
    Object.entries(positions).forEach(([key, position]) => {
      const value = data[key as keyof WarrantyData];
      
      // Format numeric values with proper decimal places and alignment
      let displayValue = String(value);
      
      if (key === 'price' || key === 'total' || key === 'discount') {
        // Format currency values
        displayValue = typeof value === 'number' ? value.toFixed(2) : String(value);
      }
      
      page.drawText(displayValue, {
        x: position.x,
        y: position.y,
        size: position.size,
        font: position.font,
        color: textColor,
      });
    });
    
    // Save the PDF
    const pdfBytes = await pdfDoc.save();
    
    // Convert to a Blob and then URL
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    
    return url;
  } catch (error) {
    console.error('Error filling PDF:', error);
    throw error;
  }
}

/**
 * Print a PDF from a URL
 * @param pdfUrl The URL of the PDF to print
 */
export function printPDF(pdfUrl: string): void {
  const printWindow = window.open(pdfUrl);
  if (printWindow) {
    printWindow.addEventListener('load', () => {
      printWindow.print();
    });
  }
}

/**
 * Download a PDF from a URL
 * @param pdfUrl The URL of the PDF to download
 * @param filename The filename to save the PDF as
 */
export function downloadPDF(pdfUrl: string, filename: string): void {
  const link = document.createElement('a');
  link.href = pdfUrl;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/**
 * Direct print of warranty document from DOM
 * This is used when printing the warranty directly from the page
 */
export function printWarrantyDocument(): void {
  // Save the current body classes
  const originalBodyClasses = document.body.className;
  
  // Add print-specific class to body
  document.body.classList.add('printing-warranty');
  
  // Print
  window.print();
  
  // Restore original body classes after print dialog closes
  setTimeout(() => {
    document.body.className = originalBodyClasses;
  }, 1000);
}
