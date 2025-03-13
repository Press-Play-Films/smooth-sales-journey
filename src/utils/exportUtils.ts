
import { format } from 'date-fns';

interface ExportOptions {
  filename?: string;
  timeframe?: string;
  includeClientData?: boolean;
  includeSalesData?: boolean;
  includeTeamData?: boolean;
}

/**
 * Convert JSON data to CSV format
 */
const jsonToCsv = (data: any[]): string => {
  if (!data.length) return '';
  
  const headers = Object.keys(data[0]);
  const csvRows = [];
  
  // Add header row
  csvRows.push(headers.join(','));
  
  // Add data rows
  for (const row of data) {
    const values = headers.map(header => {
      const value = row[header];
      // Handle strings with commas by wrapping in quotes
      if (typeof value === 'string' && value.includes(',')) {
        return `"${value}"`;
      }
      return value;
    });
    csvRows.push(values.join(','));
  }
  
  return csvRows.join('\n');
};

/**
 * Generate downloadable Excel file (CSV format)
 */
export const generateExcelReport = (data: any[], options: ExportOptions = {}): void => {
  const {
    filename = `brio-report-${format(new Date(), 'yyyy-MM-dd')}`,
    timeframe = 'all-time'
  } = options;
  
  // Convert data to CSV
  const csv = jsonToCsv(data);
  
  // Create a Blob containing the CSV data
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  
  // Create a download link
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `${filename}-${timeframe}.csv`);
  document.body.appendChild(link);
  
  // Trigger download
  link.click();
  
  // Clean up
  setTimeout(() => {
    URL.revokeObjectURL(url);
    document.body.removeChild(link);
  }, 100);
};

/**
 * Generate PDF report (simplified version)
 */
export const generatePdfReport = (data: any[], options: ExportOptions = {}): void => {
  const {
    filename = `brio-report-${format(new Date(), 'yyyy-MM-dd')}`,
    timeframe = 'all-time'
  } = options;

  // In a real application, this would use a library like jsPDF
  // For the demo, we'll just show an alert
  alert(`PDF Report "${filename}-${timeframe}.pdf" would be generated in a production environment.`);
};
