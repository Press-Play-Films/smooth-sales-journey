
import React from 'react';
import { getBrowserInfo } from '@/utils/browser/detection';
import { checkWebGLSupport, checkCanvasSupport, isTouchDevice } from '@/utils/browser/capabilities';

const CapabilityList: React.FC = () => {
  const browserInfo = getBrowserInfo();
  
  // Define capabilities to test
  const capabilities = [
    { name: 'WebGL Support', available: checkWebGLSupport(), description: 'Required for 3D graphics and advanced visualizations' },
    { name: 'Canvas Support', available: checkCanvasSupport(), description: 'Required for 2D graphics and image manipulation' },
    { name: 'Touch Support', available: isTouchDevice(), description: 'Enables touch interactions on supported devices' },
    { name: 'Web Workers', available: browserInfo.hasWebWorker, description: 'Allows running scripts in background threads' },
    { name: 'Geolocation', available: browserInfo.hasGeolocation, description: 'Provides location information if permitted' },
    { name: 'Notifications', available: browserInfo.hasNotifications, description: 'Enables push notifications if permitted' },
    { name: 'Speech Synthesis', available: browserInfo.hasSpeechSynthesis, description: 'Enables text-to-speech capabilities' },
    { name: 'Local Storage', available: typeof localStorage !== 'undefined', description: 'Allows persistent client-side storage' },
    { name: 'Session Storage', available: typeof sessionStorage !== 'undefined', description: 'Allows temporary session storage' },
    { name: 'IndexedDB', available: typeof indexedDB !== 'undefined', description: 'Provides client-side database capabilities' },
    { name: 'Service Workers', available: 'serviceWorker' in navigator, description: 'Enables offline functionality and background sync' },
    { name: 'Web Sockets', available: 'WebSocket' in window, description: 'Provides real-time bidirectional communication' },
  ];

  return (
    <div className="grid gap-3">
      {capabilities.map((capability, index) => (
        <div key={index} className="flex items-start p-3 border rounded-md">
          <div className={`w-3 h-3 mt-1.5 rounded-full ${capability.available ? 'bg-green-500' : 'bg-red-500'}`} />
          <div className="ml-3">
            <h3 className="font-semibold">{capability.name}</h3>
            <p className="text-sm text-gray-600">{capability.description}</p>
            <p className="text-xs mt-1 font-medium">
              {capability.available ? (
                <span className="text-green-600">Available</span>
              ) : (
                <span className="text-red-600">Not Available</span>
              )}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CapabilityList;
