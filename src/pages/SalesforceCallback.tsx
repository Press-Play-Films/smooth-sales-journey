
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { handleAuthCallback } from '@/services/salesforce/salesforceApi';
import { Button } from '@/components/ui/button';

const SalesforceCallback: React.FC = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState<'processing' | 'success' | 'error'>('processing');
  
  useEffect(() => {
    // Process the callback from Salesforce
    try {
      const success = handleAuthCallback();
      setStatus(success ? 'success' : 'error');
      
      // If successful, redirect after a short delay to show success message
      if (success) {
        const timer = setTimeout(() => {
          navigate('/');
        }, 3000);
        
        return () => clearTimeout(timer);
      }
    } catch (error) {
      console.error('Failed to process Salesforce auth callback:', error);
      setStatus('error');
    }
  }, [navigate]);
  
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50">
      <div className="mx-auto max-w-md space-y-6 p-6 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/f/f9/Salesforce.com_logo.svg" 
            alt="Salesforce Logo" 
            className="h-10 mx-auto mb-4"
          />
          
          {status === 'processing' && (
            <>
              <h1 className="text-2xl font-bold">Processing Authentication</h1>
              <p className="mt-2 text-gray-600">
                Completing your Salesforce connection...
              </p>
              <div className="mt-4 flex justify-center">
                <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-t-2 border-blue-500"></div>
              </div>
            </>
          )}
          
          {status === 'success' && (
            <>
              <h1 className="text-2xl font-bold text-green-600">Connection Successful!</h1>
              <p className="mt-2 text-gray-600">
                Your Salesforce account has been connected successfully.
              </p>
              <p className="mt-1 text-gray-500 text-sm">
                Redirecting you back to the dashboard...
              </p>
            </>
          )}
          
          {status === 'error' && (
            <>
              <h1 className="text-2xl font-bold text-red-600">Connection Failed</h1>
              <p className="mt-2 text-gray-600">
                There was a problem connecting to your Salesforce account.
              </p>
              <div className="mt-4">
                <Button
                  onClick={() => navigate('/')}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Return to Dashboard
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SalesforceCallback;
