
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
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    
    // Define text options
    const textSize = 12;
    const textColor = rgb(0, 0, 0);
    
    // Define positions for field values (these would need to be adjusted based on the actual template)
    const positions = {
      warrantyNumber: { x: 400, y: 750 },
      customerName: { x: 150, y: 650 },
      customerCity: { x: 150, y: 630 },
      productCategory: { x: 150, y: 550 },
      productName: { x: 150, y: 530 },
      quantity: { x: 400, y: 530 },
      price: { x: 450, y: 530 },
      total: { x: 500, y: 500 },
      discount: { x: 500, y: 480 },
      warrantyPeriod: { x: 150, y: 400 },
      purchaseDate: { x: 400, y: 400 },
    };
    
    // Fill in fields
    page.drawText(data.warrantyNumber, {
      x: positions.warrantyNumber.x,
      y: positions.warrantyNumber.y,
      size: textSize,
      font,
      color: textColor,
    });
    
    page.drawText(data.customerName, {
      x: positions.customerName.x,
      y: positions.customerName.y,
      size: textSize,
      font,
      color: textColor,
    });
    
    page.drawText(data.customerCity, {
      x: positions.customerCity.x,
      y: positions.customerCity.y,
      size: textSize,
      font,
      color: textColor,
    });
    
    page.drawText(data.productCategory, {
      x: positions.productCategory.x,
      y: positions.productCategory.y,
      size: textSize,
      font,
      color: textColor,
    });
    
    page.drawText(data.productName, {
      x: positions.productName.x,
      y: positions.productName.y,
      size: textSize,
      font,
      color: textColor,
    });
    
    page.drawText(data.quantity.toString(), {
      x: positions.quantity.x,
      y: positions.quantity.y,
      size: textSize,
      font,
      color: textColor,
    });
    
    page.drawText(data.price.toFixed(2), {
      x: positions.price.x,
      y: positions.price.y,
      size: textSize,
      font,
      color: textColor,
    });
    
    page.drawText(data.total.toFixed(2), {
      x: positions.total.x,
      y: positions.total.y,
      size: textSize,
      font,
      color: textColor,
    });
    
    page.drawText(data.discount.toFixed(2), {
      x: positions.discount.x,
      y: positions.discount.y,
      size: textSize,
      font,
      color: textColor,
    });
    
    page.drawText(data.warrantyPeriod, {
      x: positions.warrantyPeriod.x,
      y: positions.warrantyPeriod.y,
      size: textSize,
      font,
      color: textColor,
    });
    
    page.drawText(data.purchaseDate, {
      x: positions.purchaseDate.x,
      y: positions.purchaseDate.y,
      size: textSize,
      font,
      color: textColor,
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
