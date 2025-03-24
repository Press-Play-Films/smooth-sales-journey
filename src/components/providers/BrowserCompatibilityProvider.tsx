
import React, { useEffect, useState } from 'react';
import { debug, LogLevel } from '@/utils/debugUtils';
import { isBrowser } from '@/utils/browser';
import CompatibilityWarning from './CompatibilityWarning';
import { 
  checkBrowserCompatibility, 
  applyEmailClientStyles, 
  applyCrossBrowserSupport, 
  addPolyfills 
} from '@/utils/browser/compatibility';

const BrowserCompatibilityProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [isCompatibilityChecked, setIsCompatibilityChecked] = useState(false);
  const [compatibilityIssue, setCompatibilityIssue] = useState<string | null>(null);

  useEffect(() => {
    if (!isBrowser) return;
    
    // Initialize browser compatibility features
    const initBrowserCompatibility = () => {
      // Check for compatibility issues
      const issue = checkBrowserCompatibility();
      
      if (issue) {
        setCompatibilityIssue(issue);
        debug('Browser compatibility checks failed', issue, LogLevel.WARN);
      } else {
        // Apply browser-specific features and fixes
        applyEmailClientStyles();
        applyCrossBrowserSupport();
        addPolyfills();
        debug('Browser compatibility checks passed', null, LogLevel.INFO);
      }
      
      setIsCompatibilityChecked(true);
    };
    
    initBrowserCompatibility();
  }, []);
  
  if (compatibilityIssue) {
    return (
      <CompatibilityWarning
        message={compatibilityIssue}
        onContinue={() => setCompatibilityIssue(null)}
      />
    );
  }
  
  return <>{children}</>;
};

export default BrowserCompatibilityProvider;
