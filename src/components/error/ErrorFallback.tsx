
import React from 'react';

interface ErrorFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}

const ErrorFallback: React.FC<ErrorFallbackProps> = ({ error, resetErrorBoundary }) => {
  // Log the error when it occurs
  React.useEffect(() => {
    console.error('Error boundary caught an error:', error);
  }, [error]);
  
  return (
    <div className="flex items-center justify-center h-screen bg-white">
      <div className="text-center p-6 max-w-md">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Something went wrong</h2>
        <p className="text-gray-700 mb-4">{error.message}</p>
        <div className="bg-gray-100 p-4 rounded mb-4 text-left overflow-auto max-h-60">
          <pre className="text-xs text-gray-800">{error.stack}</pre>
        </div>
        <button
          onClick={() => {
            console.log('Error boundary reset attempted');
            resetErrorBoundary();
          }}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
        >
          Try again
        </button>
      </div>
    </div>
  );
};

export default ErrorFallback;
