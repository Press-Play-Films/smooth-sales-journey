
import React from 'react';

const LoadingFallback: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-[400px] bg-white">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
        <p className="mt-4 text-blue-600 font-medium">Loading content...</p>
      </div>
    </div>
  );
};

export default LoadingFallback;
