
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

  useEffect(() => {
    try {
      // Safely get browser info
      const info = getBrowserInfo();
      setBrowserInfo(info);
      setIsLoading(false);
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
    return <div className="flex justify-center items-center min-h-[200px]">Loading browser information...</div>;
  }
  
  if (error) {
    return <div className="p-4 bg-red-50 text-red-800 rounded-md">{error}</div>;
  }

  if (!browserInfo) {
    return <div className="p-4 bg-yellow-50 text-yellow-800 rounded-md">Browser information not available</div>;
  }

  return (
    <>
      {showWarning && (
        <CompatibilityWarning 
          message="This is a sample compatibility warning for demonstration purposes."
          onContinue={() => setShowWarning(false)}
        />
      )}

      <div className="container mx-auto py-6">
        <h1 className="text-3xl font-bold mb-6">Browser Compatibility Preview</h1>
        
        <Tabs defaultValue="info" className="w-full">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="info">Browser Info</TabsTrigger>
            <TabsTrigger value="capabilities">Capabilities</TabsTrigger>
            <TabsTrigger value="tests">Compatibility Tests</TabsTrigger>
          </TabsList>
          
          <TabsContent value="info">
            <Card>
              <CardHeader>
                <CardTitle>Browser Detection</CardTitle>
                <CardDescription>Information detected about your current browser</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold">Browser:</span>
                    <Badge variant="outline" className="px-3 py-1">{browserInfo.name} {browserInfo.version}</Badge>
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
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={checkPrivacyMode} variant="outline" size="sm">
                  Check Privacy Mode
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="capabilities">
            <Card>
              <CardHeader>
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
              <CardHeader>
                <CardTitle>Compatibility Tests</CardTitle>
                <CardDescription>Test browser compatibility features</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-md bg-slate-50 p-4">
                  <h3 className="font-medium mb-2">Storage Test</h3>
                  <p className="text-sm text-gray-600 mb-3">
                    Test if localStorage is available and working in your browser.
                  </p>
                  <Button onClick={testLocalStorage} variant="outline" size="sm">
                    Test localStorage
                  </Button>
                </div>

                <div className="rounded-md bg-slate-50 p-4">
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
        </Tabs>
      </div>
    </>
  );
};

export default BrowserPreview;
