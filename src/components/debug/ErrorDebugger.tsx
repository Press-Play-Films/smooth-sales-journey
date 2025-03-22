
import React, { useState, useEffect } from 'react';
import { getCollectedErrors, clearCollectedErrors, exportErrorReport, downloadErrorReport } from '@/utils/errorCollector';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { debug, LogLevel, getBrowserInfo } from '@/utils/debugUtils';

interface ErrorDebuggerProps {
  position?: 'top-right' | 'bottom-right' | 'top-left' | 'bottom-left';
  showOnLoad?: boolean;
}

const ErrorDebugger: React.FC<ErrorDebuggerProps> = ({ 
  position = 'bottom-right',
  showOnLoad = false 
}) => {
  const [isOpen, setIsOpen] = useState(showOnLoad);
  const [errors, setErrors] = useState<any[]>([]);
  const [browserInfo, setBrowserInfo] = useState<any>(null);

  useEffect(() => {
    // Collect browser info
    const info = getBrowserInfo();
    setBrowserInfo(info);
    
    // Set up an interval to refresh errors
    const intervalId = setInterval(() => {
      setErrors(getCollectedErrors());
    }, 1000);
    
    // Log component initialized
    debug('ErrorDebugger initialized', { position, showOnLoad }, LogLevel.DEBUG);
    
    return () => {
      clearInterval(intervalId);
      debug('ErrorDebugger destroyed', null, LogLevel.DEBUG);
    };
  }, [position, showOnLoad]);
  
  // Position styling
  const positionStyles: Record<string, string> = {
    'top-right': 'top-4 right-4',
    'bottom-right': 'bottom-4 right-4',
    'top-left': 'top-4 left-4',
    'bottom-left': 'bottom-4 left-4'
  };
  
  // Copy error report to clipboard
  const copyErrorReport = () => {
    const report = exportErrorReport();
    navigator.clipboard.writeText(report)
      .then(() => {
        debug('Error report copied to clipboard', null, LogLevel.INFO);
        alert('Error report copied to clipboard');
      })
      .catch(err => {
        debug('Failed to copy error report', err, LogLevel.ERROR);
        alert('Failed to copy error report: ' + err.message);
      });
  };
  
  // Download error report as JSON file
  const handleDownloadReport = () => {
    downloadErrorReport();
  };
  
  // Clear all errors
  const handleClearErrors = () => {
    clearCollectedErrors();
    setErrors([]);
  };
  
  if (!isOpen) {
    return (
      <button 
        className={`fixed ${positionStyles[position]} bg-red-500 text-white p-2 rounded-full shadow-lg z-50`}
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
    <div className={`fixed ${positionStyles[position]} z-50 w-96 max-h-[80vh] overflow-hidden shadow-xl rounded-lg`}>
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
                onClick={handleDownloadReport}
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
                      debug('Test error triggered', err, LogLevel.ERROR);
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

export default ErrorDebugger;
