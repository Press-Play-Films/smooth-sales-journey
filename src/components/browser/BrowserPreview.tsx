
import React, { useState, useEffect } from 'react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getBrowserInfo } from '@/utils/browser/detection';
import { checkWebGLSupport, checkCanvasSupport, isTouchDevice } from '@/utils/browser/capabilities';
import { isPrivateMode } from '@/utils/browser/privacyMode';
import { safeStorage } from '@/utils/browser/storage';
import { toast } from 'sonner';
import CompatibilityWarning from '../providers/CompatibilityWarning';
import CapabilityList from './CapabilityList';

const BrowserPreview: React.FC = () => {
  const [browserInfo, setBrowserInfo] = useState<ReturnType<typeof getBrowserInfo> | null>(null);
  const [showWarning, setShowWarning] = useState(false);
  const [privacyMode, setPrivacyMode] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('info');

  useEffect(() => {
    try {
      // Safely get browser info
      const info = getBrowserInfo();
      setBrowserInfo(info);
      setIsLoading(false);
      
      // Skip toast notification on initial load for better UX
    } catch (err) {
      console.error("Error loading browser info:", err);
      setError("Could not load browser information");
      setIsLoading(false);
    }
  }, []);

  // Check for privacy mode
  const checkPrivacyMode = async () => {
    try {
      const result = await isPrivateMode();
      setPrivacyMode(result);
      toast.info(result ? 'Private browsing detected' : 'Standard browsing mode detected');
    } catch (err) {
      console.error("Error checking privacy mode:", err);
      toast.error("Could not check privacy mode");
    }
  };

  // Test localStorage
  const testLocalStorage = () => {
    try {
      const testKey = 'browser-test';
      const success = safeStorage.setItem(testKey, 'This is a test value');
      if (success) {
        const value = safeStorage.getItem(testKey);
        toast.success(`Storage test successful: "${value}" was stored and retrieved`);
        safeStorage.removeItem(testKey);
      } else {
        toast.error('Storage test failed. Local storage may be restricted or disabled.');
      }
    } catch (err) {
      console.error("Error testing localStorage:", err);
      toast.error("An error occurred while testing storage");
    }
  };

  // Toggle warning for demo purposes
  const toggleWarning = () => {
    setShowWarning(!showWarning);
  };

  if (isLoading) {
    return (
      <div className="border rounded-md p-6 bg-white shadow-sm my-4">
        <div className="flex justify-center items-center min-h-[200px]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          <span className="ml-3 text-lg">Loading browser information...</span>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="border rounded-md p-6 bg-red-50 text-red-800 my-4 shadow-sm">
        <h3 className="font-bold text-lg">Error Loading Browser Information</h3>
        <p className="my-2">{error}</p>
        <Button 
          variant="outline" 
          className="mt-2" 
          onClick={() => window.location.reload()}
        >
          Retry
        </Button>
      </div>
    );
  }

  if (!browserInfo) {
    return (
      <div className="border rounded-md p-6 bg-yellow-50 text-yellow-800 my-4 shadow-sm">
        <h3 className="font-bold text-lg">Browser Information Unavailable</h3>
        <p className="my-2">We couldn't detect your browser information. This could be due to privacy settings or browser restrictions.</p>
      </div>
    );
  }

  const getBrowserIconColor = () => {
    const browserName = browserInfo?.name?.toLowerCase() || '';
    if (browserName.includes('chrome')) return 'text-green-500';
    if (browserName.includes('firefox')) return 'text-orange-500';
    if (browserName.includes('safari')) return 'text-blue-500';
    if (browserName.includes('edge')) return 'text-blue-600';
    return 'text-gray-500';
  };

  return (
    <>
      {showWarning && (
        <CompatibilityWarning 
          message="This is a sample compatibility warning for demonstration purposes."
          onContinue={() => setShowWarning(false)}
        />
      )}

      <div className="rounded-lg shadow-md bg-white overflow-hidden border border-gray-200">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-4 flex items-center text-white">
          <div className={`mr-3 ${getBrowserIconColor()}`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
            </svg>
          </div>
          <div>
            <h1 className="text-2xl font-bold">
              {browserInfo.name} {browserInfo.version}
            </h1>
            <p className="text-sm opacity-90">
              {browserInfo.isMobile ? 'Mobile' : 'Desktop'} • 
              {browserInfo.isIOS ? ' iOS' : browserInfo.isAndroid ? ' Android' : ' Other OS'}
            </p>
          </div>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="px-4 pt-4">
            <TabsList className="grid grid-cols-3 mb-4 w-full">
              <TabsTrigger value="info">Browser Info</TabsTrigger>
              <TabsTrigger value="capabilities">Capabilities</TabsTrigger>
              <TabsTrigger value="tests">Run Tests</TabsTrigger>
            </TabsList>
          </div>
          
          <div className="p-4 pt-0">
            <TabsContent value="info">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Browser Details</CardTitle>
                  <CardDescription>Detailed information about your current browser</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold">Browser:</span>
                      <Badge variant="outline" className="px-3 py-1 bg-blue-50">{browserInfo.name} {browserInfo.version}</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-semibold">Device Type:</span>
                      <Badge variant={browserInfo.isMobile ? "default" : "outline"} className="px-3 py-1">
                        {browserInfo.isMobile ? 'Mobile' : 'Desktop'}
                      </Badge>
                    </div>
                    {browserInfo.isIOS && (
                      <div className="flex items-center justify-between">
                        <span className="font-semibold">iOS Device:</span>
                        <Badge variant="secondary" className="px-3 py-1">iOS</Badge>
                      </div>
                    )}
                    {browserInfo.isAndroid && (
                      <div className="flex items-center justify-between">
                        <span className="font-semibold">Android Device:</span>
                        <Badge variant="secondary" className="px-3 py-1">Android</Badge>
                      </div>
                    )}
                    <div className="flex items-center justify-between">
                      <span className="font-semibold">Touch Support:</span>
                      <Badge 
                        variant="outline" 
                        className={`px-3 py-1 ${isTouchDevice() ? 'bg-green-100 text-green-800 border-green-200' : ''}`}
                      >
                        {isTouchDevice() ? 'Available' : 'Not Available'}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-semibold">Privacy Mode:</span>
                      <Badge 
                        variant="outline" 
                        className={`px-3 py-1 ${
                          privacyMode === null 
                            ? '' 
                            : (privacyMode 
                                ? 'bg-yellow-100 text-yellow-800 border-yellow-200' 
                                : 'bg-green-100 text-green-800 border-green-200')
                        }`}
                      >
                        {privacyMode === null ? 'Not Checked' : (privacyMode ? 'Private Browsing' : 'Standard Mode')}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-semibold">User Agent:</span>
                      <div className="text-xs text-gray-500 max-w-[250px] truncate">
                        {browserInfo.userAgent}
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={checkPrivacyMode} variant="outline" size="sm" className="mr-2">
                    Check Privacy Mode
                  </Button>
                  <Button onClick={() => setActiveTab('tests')} variant="default" size="sm">
                    Run Tests
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="capabilities">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Browser Capabilities</CardTitle>
                  <CardDescription>Features and APIs available in your current browser</CardDescription>
                </CardHeader>
                <CardContent>
                  <CapabilityList />
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="tests">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Compatibility Tests</CardTitle>
                  <CardDescription>Test browser compatibility features</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="rounded-md bg-slate-50 p-4 border border-slate-100">
                    <h3 className="font-medium mb-2">Storage Test</h3>
                    <p className="text-sm text-gray-600 mb-3">
                      Test if localStorage is available and working in your browser.
                    </p>
                    <Button onClick={testLocalStorage} variant="outline" size="sm">
                      Test localStorage
                    </Button>
                  </div>

                  <div className="rounded-md bg-slate-50 p-4 border border-slate-100">
                    <h3 className="font-medium mb-2">Compatibility Warning Demo</h3>
                    <p className="text-sm text-gray-600 mb-3">
                      Show a sample compatibility warning message.
                    </p>
                    <Button onClick={toggleWarning} variant="outline" size="sm">
                      {showWarning ? 'Hide' : 'Show'} Warning
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </div>
        </Tabs>
        
        <div className="bg-gray-50 p-3 border-t border-gray-200 text-center text-sm text-gray-500">
          This tool helps identify compatibility issues before they affect your experience.
        </div>
      </div>
    </>
  );
};

export default BrowserPreview;
