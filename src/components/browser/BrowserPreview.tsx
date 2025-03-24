
import React, { useState } from 'react';
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
  const browserInfo = getBrowserInfo();
  const [showWarning, setShowWarning] = useState(false);
  const [privacyMode, setPrivacyMode] = useState<boolean | null>(null);

  // Check for privacy mode
  const checkPrivacyMode = async () => {
    const result = await isPrivateMode();
    setPrivacyMode(result);
    toast.info(result ? 'Private browsing detected' : 'Standard browsing mode detected');
  };

  // Test localStorage
  const testLocalStorage = () => {
    const testKey = 'browser-test';
    const success = safeStorage.setItem(testKey, 'This is a test value');
    if (success) {
      const value = safeStorage.getItem(testKey);
      toast.success(`Storage test successful: "${value}" was stored and retrieved`);
      safeStorage.removeItem(testKey);
    } else {
      toast.error('Storage test failed. Local storage may be restricted or disabled.');
    }
  };

  // Toggle warning for demo purposes
  const toggleWarning = () => {
    setShowWarning(!showWarning);
  };

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
                    <Badge variant={isTouchDevice() ? "success" : "outline"} className="px-3 py-1">
                      {isTouchDevice() ? 'Available' : 'Not Available'}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-semibold">Privacy Mode:</span>
                    <Badge variant={privacyMode === null ? "outline" : (privacyMode ? "warning" : "success")} className="px-3 py-1">
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
