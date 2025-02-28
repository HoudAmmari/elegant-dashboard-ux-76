
// Currency format utility
export const formatCurrency = (value: number | string): string => {
  // Convert string to number if needed
  const numValue = typeof value === 'string' ? parseFloat(value.replace(/[^\d.-]/g, '')) : value;
  
  // Format with the DH currency symbol
  return `${numValue.toLocaleString('fr-MA')} DH`;
};

// Parse a currency string into a number
export const parseCurrency = (currencyString: string): number => {
  // Remove currency symbol and non-numeric characters, then parse
  return parseFloat(currencyString.replace(/[^\d.-]/g, ''));
};
