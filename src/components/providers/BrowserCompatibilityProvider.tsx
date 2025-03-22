
import React from 'react';

const BrowserCompatibilityProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  return <>{children}</>;
};

export default BrowserCompatibilityProvider;
