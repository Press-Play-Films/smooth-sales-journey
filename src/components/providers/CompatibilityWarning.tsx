
import React from 'react';

interface CompatibilityWarningProps {
  message: string;
  onContinue: () => void;
}

const CompatibilityWarning: React.FC<CompatibilityWarningProps> = ({ 
  message, 
  onContinue 
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-slate-900 text-white p-6">
      <div className="max-w-md p-6 bg-slate-800 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Browser Compatibility Issue</h2>
        <p className="mb-4">{message}</p>
        <p className="text-sm opacity-80">You can continue anyway, but some features may not work correctly.</p>
        <button 
          onClick={onContinue}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Continue Anyway
        </button>
      </div>
    </div>
  );
};

export default CompatibilityWarning;
