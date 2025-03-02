
import { toast } from 'sonner';

// Adding pdfmake types
declare global {
  interface Window {
    pdfMake: any;
  }
}

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
 * Format a date string to a more readable format
 */
const formatDate = (dateString: string): string => {
  if (!dateString) return '';
  
  const date = new Date(dateString);
  return date.toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

/**
 * Format currency to display with proper decimal places
 */
const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2
  }).format(value);
};

/**
 * Load pdfmake scripts dynamically if not already loaded
 */
const loadPdfMakeScripts = async (): Promise<void> => {
  if (window.pdfMake) return;

  return new Promise((resolve, reject) => {
    // Load pdfmake.min.js
    const pdfMakeScript = document.createElement('script');
    pdfMakeScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.2.7/pdfmake.min.js';
    pdfMakeScript.onload = () => {
      // Load vfs_fonts.js after pdfmake is loaded
      const vfsFontsScript = document.createElement('script');
      vfsFontsScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.2.7/vfs_fonts.js';
      vfsFontsScript.onload = () => resolve();
      vfsFontsScript.onerror = () => reject(new Error('Failed to load vfs_fonts.js'));
      document.head.appendChild(vfsFontsScript);
    };
    pdfMakeScript.onerror = () => reject(new Error('Failed to load pdfmake.min.js'));
    document.head.appendChild(pdfMakeScript);
  });
};

/**
 * Fill a PDF template with warranty data using pdfmake
 * @param templateUrl No longer used as we're generating the PDF from scratch
 * @param data The warranty data to fill in the PDF
 * @returns A URL to the filled PDF
 */
export async function fillWarrantyPDF(_templateUrl: string, data: WarrantyData): Promise<string> {
  try {
    // Load pdfmake scripts if not already loaded
    await loadPdfMakeScripts();

    // Create document definition for pdfmake
    const docDefinition = {
      pageSize: 'A4',
      pageMargins: [40, 60, 40, 60],
      content: [
        { text: 'Maestro Furniture', style: 'header' },
        { text: 'Vente et Achat de meubles de luxe', style: 'subheader' },
        { text: 'ATTESTATION DE GARANTIE', style: 'title', margin: [0, 10, 0, 15] },
        
        // Warranty info and customer section in a table
        {
          layout: 'lightHorizontalLines',
          table: {
            widths: ['50%', '50%'],
            body: [
              [
                { text: 'Informations de Garantie', style: 'sectionHeader', colSpan: 2, alignment: 'left' },
                {}
              ],
              [
                { text: `N° de Garantie: ${data.warrantyNumber}`, bold: false },
                { text: `Date d'achat: ${formatDate(data.purchaseDate)}`, bold: false }
              ],
              [
                { text: `Durée de Garantie: ${data.warrantyPeriod}`, bold: false, colSpan: 2 },
                {}
              ],
              [
                { text: 'Informations Client', style: 'sectionHeader', colSpan: 2, alignment: 'left', margin: [0, 10, 0, 0] },
                {}
              ],
              [
                { text: `Client(e): ${data.customerName}`, bold: false },
                { text: `Ville: ${data.customerCity}`, bold: false }
              ]
            ]
          },
          margin: [0, 0, 0, 20]
        },
        
        // Product information section
        { text: 'DÉSIGNATION', style: 'sectionHeader', margin: [0, 10, 0, 10] },
        {
          layout: {
            hLineWidth: (i: number, node: any) => (i === 0 || i === node.table.body.length) ? 1 : 1,
            vLineWidth: (i: number) => 1,
            hLineColor: (i: number) => '#aaaaaa',
            vLineColor: (i: number) => '#aaaaaa',
            paddingLeft: (i: number) => 8,
            paddingRight: (i: number) => 8,
            paddingTop: (i: number) => 8,
            paddingBottom: (i: number) => 8,
          },
          table: {
            headerRows: 1,
            widths: ['40%', '15%', '20%', '25%'],
            body: [
              [
                { text: 'Produit', style: 'tableHeader' }, 
                { text: 'QTE', style: 'tableHeader', alignment: 'center' }, 
                { text: 'Prix Unitaire', style: 'tableHeader', alignment: 'right' }, 
                { text: 'Montant Total', style: 'tableHeader', alignment: 'right' }
              ],
              [
                { text: `${data.productName} (${data.productCategory})` }, 
                { text: `${data.quantity}`, alignment: 'center' }, 
                { text: formatCurrency(data.price), alignment: 'right' }, 
                { text: formatCurrency(data.total), alignment: 'right', bold: true }
              ]
            ]
          },
          margin: [0, 0, 0, 20]
        },
        
        // Summary section
        {
          columns: [
            { width: '60%', text: '' },
            {
              width: '40%',
              table: {
                widths: ['50%', '50%'],
                body: [
                  [
                    { text: 'Sous-total:', alignment: 'left' },
                    { text: formatCurrency(data.price * data.quantity), alignment: 'right' }
                  ],
                  [
                    { text: 'Remise:', alignment: 'left' },
                    { text: formatCurrency(data.discount), alignment: 'right' }
                  ],
                  [
                    { text: 'Total:', alignment: 'left', bold: true },
                    { text: formatCurrency(data.total), alignment: 'right', bold: true }
                  ]
                ]
              },
              layout: 'lightHorizontalLines'
            }
          ]
        },
        
        // Terms and conditions
        { text: 'Conditions de garantie:', style: 'sectionHeader', margin: [0, 30, 0, 10] },
        {
          ul: [
            'Cette garantie couvre uniquement les défauts de fabrication.',
            'La garantie est valable uniquement avec une preuve d\'achat.',
            'Les dommages causés par une mauvaise utilisation ou l\'usure normale ne sont pas couverts.',
            'Pour toute demande de service, contactez notre support client à support@maestrofurniture.com'
          ],
          style: 'listItem'
        },
        
        // Signature section
        {
          columns: [
            { 
              width: '50%',
              text: 'Signature du client:',
              style: 'signatureLabel',
              margin: [0, 40, 0, 0]
            },
            { 
              width: '50%',
              stack: [
                { text: 'Signature et Cachet:', style: 'signatureLabel', alignment: 'right' },
                { text: 'Pour Maestro Furniture', alignment: 'right', margin: [0, 40, 0, 0] }
              ]
            }
          ],
          margin: [0, 30, 0, 0]
        }
      ],
      styles: {
        header: { fontSize: 18, bold: true, alignment: 'center', color: '#4a2d8d' },
        subheader: { fontSize: 12, alignment: 'center', color: '#666666', margin: [0, 5, 0, 10] },
        title: { fontSize: 16, bold: true, alignment: 'center', color: '#333333' },
        sectionHeader: { fontSize: 12, bold: true, color: '#4a2d8d', margin: [0, 5, 0, 5] },
        tableHeader: { fontSize: 11, bold: true, color: '#333333' },
        listItem: { fontSize: 10, color: '#333333' },
        signatureLabel: { fontSize: 11, bold: true, color: '#333333' }
      },
      defaultStyle: {
        fontSize: 10,
        color: '#333333'
      },
      info: {
        title: `Attestation de Garantie - ${data.warrantyNumber}`,
        author: 'Maestro Furniture',
        subject: 'Attestation de Garantie',
        keywords: 'warranty, guarantee, furniture',
      },
    };

    // Create and return the PDF as an object URL
    return new Promise((resolve) => {
      const pdfDocGenerator = window.pdfMake.createPdf(docDefinition);
      pdfDocGenerator.getBlob((blob: Blob) => {
        const url = URL.createObjectURL(blob);
        resolve(url);
      });
    });
  } catch (error) {
    console.error('Error generating PDF:', error);
    toast.error('Failed to generate warranty certificate');
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
