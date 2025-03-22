
import React from 'react';

const BrowserCompatibilityProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  // Simplified provider with no initialization that could cause errors
  return <>{children}</>;
};

export default BrowserCompatibilityProvider;
