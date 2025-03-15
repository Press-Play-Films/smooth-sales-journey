
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { handleAuthCallback } from '@/services/salesforce/salesforceApi';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';

const SalesforceCallback: React.FC = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState<'processing' | 'success' | 'error'>('processing');
  const [countdown, setCountdown] = useState(3);
  
  useEffect(() => {
    // Process the callback from Salesforce
    try {
      const success = handleAuthCallback();
      setStatus(success ? 'success' : 'error');
      
      // If successful, redirect after a short delay to show success message
      if (success) {
        const timer = setInterval(() => {
          setCountdown((prev) => {
            if (prev <= 1) {
              clearInterval(timer);
              navigate('/presentations');
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
        
        return () => clearInterval(timer);
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
              <div className="flex justify-center mb-4">
                <Loader2 className="h-12 w-12 text-blue-500 animate-spin" />
              </div>
              <h1 className="text-2xl font-bold">Processing Authentication</h1>
              <p className="mt-2 text-gray-600">
                Completing your Salesforce connection...
              </p>
            </>
          )}
          
          {status === 'success' && (
            <>
              <div className="flex justify-center mb-4">
                <CheckCircle className="h-12 w-12 text-green-500" />
              </div>
              <h1 className="text-2xl font-bold text-green-600">Connection Successful!</h1>
              <p className="mt-2 text-gray-600">
                Your Salesforce account has been connected successfully.
              </p>
              <div className="mt-4 text-gray-500">
                <p>Redirecting in <span className="font-medium">{countdown}</span> seconds...</p>
                <div className="mt-2">
                  <Button 
                    onClick={() => navigate('/presentations')} 
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    Go to Presentations
                  </Button>
                </div>
              </div>
            </>
          )}
          
          {status === 'error' && (
            <>
              <div className="flex justify-center mb-4">
                <XCircle className="h-12 w-12 text-red-500" />
              </div>
              <h1 className="text-2xl font-bold text-red-600">Connection Failed</h1>
              <p className="mt-2 text-gray-600">
                There was a problem connecting to your Salesforce account.
              </p>
              <div className="mt-4">
                <Button
                  onClick={() => navigate('/presentations')}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Return to Presentations
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
