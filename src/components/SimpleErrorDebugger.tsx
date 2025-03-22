
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// Error types and utilities
interface ErrorEntry {
  timestamp: number;
  message: string;
  source: string;
  stack?: string;
  additionalData?: any;
}

// Simple logging function
const logMessage = (message: string, data?: any, type: 'info' | 'warn' | 'error' = 'info') => {
  const prefix = `[Brio:${type.toUpperCase()}]`;
  
  switch (type) {
    case 'error':
      console.error(`${prefix} ${message}`, data || '');
      break;
    case 'warn':
      console.warn(`${prefix} ${message}`, data || '');
      break;
    case 'info':
    default:
      console.log(`${prefix} ${message}`, data || '');
  }
};

// Global error store - accessible from this component
const errorStore: ErrorEntry[] = [];

// Add an error to the store
const collectError = (
  message: string,
  source: string,
  additionalData?: any,
  stack?: string,
): void => {
  const errorEntry: ErrorEntry = {
    timestamp: Date.now(),
    message,
    source,
    stack,
    additionalData
  };

  errorStore.push(errorEntry);
  logMessage(`Error collected: ${message}`, errorEntry, 'error');
};

// Initialize error listeners
const initErrorCollection = (): () => void => {
  // Global error handler
  const errorHandler = (event: ErrorEvent) => {
    collectError(
      event.message,
      'window.onerror',
      { filename: event.filename, lineno: event.lineno, colno: event.colno },
      event.error?.stack
    );
  };

  // Promise rejection handler
  const rejectionHandler = (event: PromiseRejectionEvent) => {
    collectError(
      event.reason?.message || 'Unhandled Promise Rejection',
      'unhandledrejection',
      event.reason,
      event.reason?.stack
    );
  };

  window.addEventListener('error', errorHandler);
  window.addEventListener('unhandledrejection', rejectionHandler);
  
  // Return cleanup function
  return () => {
    window.removeEventListener('error', errorHandler);
    window.removeEventListener('unhandledrejection', rejectionHandler);
  };
};

// Generate error report
const exportErrorReport = (): string => {
  const report = {
    timestamp: new Date().toISOString(),
    errors: errorStore,
    browserInfo: {
      userAgent: navigator.userAgent,
      platform: navigator.platform,
      language: navigator.language
    }
  };
  
  return JSON.stringify(report, null, 2);
};

// Download error report
const downloadErrorReport = (): void => {
  const report = exportErrorReport();
  const blob = new Blob([report], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  
  const a = document.createElement('a');
  a.href = url;
  a.download = `error-report-${new Date().toISOString().slice(0, 19).replace(/:/g, '-')}.json`;
  document.body.appendChild(a);
  a.click();
  
  // Clean up
  setTimeout(() => {
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, 100);
};

// Clear errors
const clearErrors = (): void => {
  errorStore.length = 0;
  logMessage('Error store cleared', null, 'info');
};

// Main component
const SimpleErrorDebugger: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [errors, setErrors] = useState<ErrorEntry[]>([]);

  // Initialize error collection and refresh errors periodically
  useEffect(() => {
    // Set up error listeners
    const cleanup = initErrorCollection();
    
    // Set up an interval to refresh errors
    const intervalId = setInterval(() => {
      setErrors([...errorStore]);
    }, 1000);
    
    return () => {
      cleanup();
      clearInterval(intervalId);
    };
  }, []);
  
  // Copy error report to clipboard
  const copyErrorReport = () => {
    const report = exportErrorReport();
    navigator.clipboard.writeText(report)
      .then(() => {
        alert('Error report copied to clipboard');
      })
      .catch(err => {
        alert('Failed to copy error report: ' + err.message);
      });
  };
  
  // Handle clear errors
  const handleClearErrors = () => {
    clearErrors();
    setErrors([]);
  };
  
  if (!isOpen) {
    return (
      <button 
        className="fixed bottom-4 right-4 bg-red-500 text-white p-2 rounded-full shadow-lg z-50"
        onClick={() => setIsOpen(true)}
        aria-label="Open error debugger"
      >
        <span className="text-xs font-bold">DEBUG</span>
        {errors.length > 0 && (
          <span className="absolute -top-1 -right-1 bg-white text-red-500 text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {errors.length}
          </span>
        )}
      </button>
    );
  }
  
  return (
    <div className="fixed bottom-4 right-4 z-50 w-96 max-h-[80vh] overflow-hidden shadow-xl rounded-lg">
      <Card className="border-red-200">
        <CardHeader className="bg-red-500 text-white py-2 px-4">
          <div className="flex justify-between items-center">
            <CardTitle className="text-sm font-medium">Error Debugger</CardTitle>
            <div className="flex space-x-2">
              <button 
                onClick={copyErrorReport}
                className="text-xs bg-white text-red-500 px-2 py-1 rounded"
              >
                Copy
              </button>
              <button 
                onClick={downloadErrorReport}
                className="text-xs bg-white text-red-500 px-2 py-1 rounded"
              >
                Download
              </button>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-xs bg-white text-red-500 px-2 py-1 rounded"
              >
                Minimize
              </button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="bg-white p-3 overflow-y-auto max-h-[60vh]">
          <div className="space-y-4">
            <div className="space-y-2">
              <h3 className="text-xs font-bold">Collected Errors ({errors.length})</h3>
              {errors.length === 0 ? (
                <p className="text-xs text-gray-500">No errors detected yet</p>
              ) : (
                <div className="space-y-3">
                  {errors.map((error, idx) => (
                    <div key={idx} className="border-l-2 border-red-500 pl-2 text-xs">
                      <p className="font-medium text-red-600">{error.message}</p>
                      <p className="text-gray-500">Source: {error.source}</p>
                      <p className="text-gray-400 text-xs">
                        {new Date(error.timestamp).toLocaleTimeString()}
                      </p>
                      {error.stack && (
                        <details className="mt-1">
                          <summary className="text-xs cursor-pointer">Stack trace</summary>
                          <pre className="text-xs mt-1 bg-gray-50 p-1 overflow-x-auto">
                            {error.stack}
                          </pre>
                        </details>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            <div className="border-t pt-2">
              <div className="flex justify-between">
                <Button 
                  variant="destructive" 
                  size="sm" 
                  onClick={handleClearErrors}
                  className="text-xs"
                >
                  Clear Errors
                </Button>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    // Force an error for testing
                    try {
                      // @ts-ignore - intentional error
                      const obj = null;
                      obj.nonExistentMethod();
                    } catch (err: any) {
                      throw err;
                    }
                  }}
                  className="text-xs"
                >
                  Test Error
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SimpleErrorDebugger;
