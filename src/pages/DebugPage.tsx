
import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { debug, LogLevel, getBrowserInfo, debugConfig, debugServiceWorker } from '@/utils/debugUtils';

const DebugPage: React.FC = () => {
  const [browserInfo, setBrowserInfo] = useState<any>(null);
  const [serviceWorkerStatus, setServiceWorkerStatus] = useState<string>('Unknown');
  const [networkStatus, setNetworkStatus] = useState<string>(navigator.onLine ? 'Online' : 'Offline');
  const [cacheContents, setCacheContents] = useState<string[]>([]);
  const [memoryUsage, setMemoryUsage] = useState<any>(null);
  const [routingEnabled, setRoutingEnabled] = useState<boolean>(true);
  
  // Get browser info on mount
  useEffect(() => {
    const info = getBrowserInfo();
    setBrowserInfo(info);
    
    // Check service worker status
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.getRegistration().then(registration => {
        if (registration) {
          setServiceWorkerStatus(`Registered (Scope: ${registration.scope})`);
        } else {
          setServiceWorkerStatus('Not registered');
        }
      }).catch(err => {
        setServiceWorkerStatus(`Error: ${err.message}`);
      });
    } else {
      setServiceWorkerStatus('Not supported');
    }
    
    // Listen for online/offline events
    const handleOnline = () => setNetworkStatus('Online');
    const handleOffline = () => setNetworkStatus('Offline');
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    // Get memory usage if available
    if ('memory' in performance) {
      // TypeScript doesn't know about this API yet
      const memory = (performance as any).memory;
      if (memory) {
        setMemoryUsage({
          jsHeapSizeLimit: formatBytes(memory.jsHeapSizeLimit),
          totalJSHeapSize: formatBytes(memory.totalJSHeapSize),
          usedJSHeapSize: formatBytes(memory.usedJSHeapSize)
        });
      }
    }
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);
  
  // Get cache contents
  useEffect(() => {
    if ('caches' in window) {
      caches.keys().then(cacheNames => {
        const promises = cacheNames.map(name => {
          return caches.open(name).then(cache => {
            return cache.keys().then(requests => {
              return requests.map(request => request.url);
            });
          });
        });
        
        Promise.all(promises).then(results => {
          const allUrls = results.flat();
          setCacheContents(allUrls);
        }).catch(err => {
          debug('Error getting cache contents', err, LogLevel.ERROR);
        });
      });
    }
  }, []);
  
  // Format bytes to human-readable
  const formatBytes = (bytes: number, decimals = 2) => {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  };
  
  // Force a JavaScript error for testing
  const triggerError = () => {
    try {
      // @ts-ignore - intentional error
      const obj = null;
      obj.nonExistentMethod();
    } catch (err) {
      debug('Manually triggered error', err, LogLevel.ERROR);
      throw err;
    }
  };
  
  // Test service worker communication
  const testServiceWorker = () => {
    if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
      debug('Testing service worker communication', null, LogLevel.INFO);
      
      // Create a message channel
      const messageChannel = new MessageChannel();
      
      // Set up message handler
      messageChannel.port1.onmessage = (event) => {
        debug('Received response from service worker', event.data, LogLevel.INFO);
        alert(`Service worker responded: ${JSON.stringify(event.data)}`);
      };
      
      // Send message
      navigator.serviceWorker.controller.postMessage(
        { type: 'PING', timestamp: Date.now() },
        [messageChannel.port2]
      );
    } else {
      alert('Service worker not active');
    }
  };
  
  // Toggle routing for debugging SPA issues
  const toggleRouting = () => {
    setRoutingEnabled(!routingEnabled);
    debug(`${routingEnabled ? 'Disabled' : 'Enabled'} client-side routing`, null, LogLevel.INFO);
    
    // Apply the change to all link elements
    document.querySelectorAll('a').forEach(link => {
      if (!routingEnabled) {
        // Enable routing by removing data attribute
        link.removeAttribute('data-no-routing');
      } else {
        // Disable routing
        link.setAttribute('data-no-routing', 'true');
      }
    });
  };
  
  // Clear browser cache
  const clearCache = () => {
    if ('caches' in window) {
      debug('Clearing all caches', null, LogLevel.INFO);
      
      caches.keys().then(cacheNames => {
        return Promise.all(
          cacheNames.map(cache => {
            debug(`Deleting cache: ${cache}`, null, LogLevel.DEBUG);
            return caches.delete(cache);
          })
        );
      }).then(() => {
        debug('All caches cleared', null, LogLevel.INFO);
        alert('Browser caches cleared');
        // Refresh cache list
        setCacheContents([]);
      });
    } else {
      alert('Cache API not supported');
    }
  };
  
  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-bold text-brio-navy">Debug Console</h2>
          <div className="flex space-x-2">
            <Button variant="outline" onClick={() => window.location.reload()}>
              Reload Page
            </Button>
            <Button variant="destructive" onClick={clearCache}>
              Clear Cache
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue="system">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="system">System Info</TabsTrigger>
            <TabsTrigger value="network">Network</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="tests">Debug Tests</TabsTrigger>
          </TabsList>
          
          <TabsContent value="system" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Browser Information</CardTitle>
              </CardHeader>
              <CardContent>
                {browserInfo && (
                  <div className="space-y-2">
                    <div className="grid grid-cols-2 gap-2">
                      <div className="text-sm font-medium">User Agent:</div>
                      <div className="text-sm">{browserInfo.userAgent}</div>
                      
                      <div className="text-sm font-medium">Platform:</div>
                      <div className="text-sm">{browserInfo.platform}</div>
                      
                      <div className="text-sm font-medium">Vendor:</div>
                      <div className="text-sm">{browserInfo.vendor}</div>
                      
                      <div className="text-sm font-medium">Language:</div>
                      <div className="text-sm">{browserInfo.language}</div>
                      
                      <div className="text-sm font-medium">Cookies Enabled:</div>
                      <div className="text-sm">{browserInfo.cookiesEnabled ? 'Yes' : 'No'}</div>
                      
                      <div className="text-sm font-medium">Online Status:</div>
                      <div className="text-sm">{networkStatus}</div>
                      
                      <div className="text-sm font-medium">Screen Size:</div>
                      <div className="text-sm">
                        {browserInfo.screenSize.width}x{browserInfo.screenSize.height}
                      </div>
                      
                      <div className="text-sm font-medium">Viewport:</div>
                      <div className="text-sm">
                        {browserInfo.viewport.width}x{browserInfo.viewport.height}
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Service Worker</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="text-sm font-medium">Status:</div>
                    <div className="text-sm">{serviceWorkerStatus}</div>
                  </div>
                  
                  <Button onClick={testServiceWorker}>
                    Test Service Worker
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            {memoryUsage && (
              <Card>
                <CardHeader>
                  <CardTitle>Memory Usage</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="text-sm font-medium">JS Heap Size Limit:</div>
                    <div className="text-sm">{memoryUsage.jsHeapSizeLimit}</div>
                    
                    <div className="text-sm font-medium">Total JS Heap Size:</div>
                    <div className="text-sm">{memoryUsage.totalJSHeapSize}</div>
                    
                    <div className="text-sm font-medium">Used JS Heap Size:</div>
                    <div className="text-sm">{memoryUsage.usedJSHeapSize}</div>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>
          
          <TabsContent value="network" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Network Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="text-sm font-medium">Connection:</div>
                    <div className="text-sm">{networkStatus}</div>
                    
                    {/* @ts-ignore - Navigator connection API not well-supported in TypeScript */}
                    {navigator.connection && (
                      <>
                        <div className="text-sm font-medium">Connection Type:</div>
                        {/* @ts-ignore */}
                        <div className="text-sm">{navigator.connection.effectiveType || 'Unknown'}</div>
                      </>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Cache Contents</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-sm">
                    {cacheContents.length === 0 ? (
                      <p>No cached items found</p>
                    ) : (
                      <div className="max-h-60 overflow-y-auto">
                        <ul className="list-disc list-inside space-y-1">
                          {cacheContents.map((url, index) => (
                            <li key={index} className="text-xs truncate">{url}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                  
                  <Button variant="outline" onClick={clearCache}>
                    Clear Caches
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Routing</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="text-sm font-medium">Client-side Routing:</div>
                    <div className="text-sm">{routingEnabled ? 'Enabled' : 'Disabled'}</div>
                  </div>
                  
                  <Button onClick={toggleRouting}>
                    {routingEnabled ? 'Disable' : 'Enable'} Routing
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="performance" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Performance Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {performance.timing && (
                    <div className="grid grid-cols-2 gap-2">
                      <div className="text-sm font-medium">Page Load Time:</div>
                      <div className="text-sm">
                        {performance.timing.loadEventEnd - performance.timing.navigationStart}ms
                      </div>
                      
                      <div className="text-sm font-medium">DOM Content Loaded:</div>
                      <div className="text-sm">
                        {performance.timing.domContentLoadedEventEnd - performance.timing.navigationStart}ms
                      </div>
                      
                      <div className="text-sm font-medium">First Paint:</div>
                      <div className="text-sm">
                        {performance.getEntriesByType('paint').find(entry => entry.name === 'first-paint')
                          ? Math.round((performance.getEntriesByType('paint').find(
                              entry => entry.name === 'first-paint'
                            ) as PerformanceEntry).startTime)
                          : 'Not available'}ms
                      </div>
                    </div>
                  )}
                  
                  <Button
                    onClick={() => {
                      if (window.confirm('This will collect detailed performance data and may slow down the app momentarily. Continue?')) {
                        // Force browser to collect performance data
                        console.log('Collecting performance data...');
                        setTimeout(() => {
                          const entries = performance.getEntries();
                          debug('Performance entries collected', entries, LogLevel.DEBUG);
                          alert(`Collected ${entries.length} performance entries. Check console for details.`);
                        }, 1000);
                      }
                    }}
                  >
                    Analyze Performance
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="tests" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Debug Tests</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Button variant="destructive" onClick={triggerError}>
                    Trigger Error
                  </Button>
                  
                  <Button 
                    onClick={() => {
                      debug('Manual debug message', { timestamp: Date.now() }, LogLevel.INFO);
                      alert('Debug message logged. Check console.');
                    }}
                  >
                    Log Debug Message
                  </Button>
                  
                  <Button 
                    onClick={() => {
                      // Create a demo video element to test video analysis
                      const videoEl = document.createElement('video');
                      videoEl.width = 640;
                      videoEl.height = 480;
                      document.body.appendChild(videoEl);
                      
                      // Try to get user media
                      navigator.mediaDevices.getUserMedia({ video: true })
                        .then(stream => {
                          videoEl.srcObject = stream;
                          videoEl.play();
                          debug('Video stream created for testing', null, LogLevel.INFO);
                          alert('Video stream created. Check permissions if no camera activates.');
                          
                          // Clean up after 5 seconds
                          setTimeout(() => {
                            stream.getTracks().forEach(track => track.stop());
                            videoEl.remove();
                            debug('Video stream test completed', null, LogLevel.INFO);
                          }, 5000);
                        })
                        .catch(err => {
                          debug('Error creating video stream', err, LogLevel.ERROR);
                          alert(`Error: ${err.message}`);
                          videoEl.remove();
                        });
                    }}
                  >
                    Test Camera Access
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default DebugPage;
