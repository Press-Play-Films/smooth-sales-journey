
/**
 * Browser detection utilities
 */
import { isBrowser } from './core';
import { checkWebGLSupport, checkCanvasSupport, isTouchDevice } from './capabilities';

// Get current browser information (only works in browser)
export const getBrowserInfo = () => {
  if (!isBrowser) {
    return {
      name: 'Server',
      version: 'N/A',
      isMobile: false,
      isDesktop: false,
      isIOS: false,
      isAndroid: false,
    };
  }

  const userAgent = navigator.userAgent;
  let browserName = 'Unknown';
  let browserVersion = 'Unknown';
  
  // Detect browser name and version
  if (/firefox|fxios/i.test(userAgent)) {
    browserName = 'Firefox';
    browserVersion = userAgent.match(/(?:firefox|fxios)[ \/](\d+(\.\d+)?)/i)?.[1] || 'Unknown';
  } else if (/chrome|chromium|crios/i.test(userAgent) && !/edg/i.test(userAgent)) {
    browserName = 'Chrome';
    browserVersion = userAgent.match(/(?:chrome|chromium|crios)[ \/](\d+(\.\d+)?)/i)?.[1] || 'Unknown';
  } else if (/safari/i.test(userAgent) && !/chrome|chromium|crios/i.test(userAgent)) {
    browserName = 'Safari';
    browserVersion = userAgent.match(/version[ \/](\d+(\.\d+)?)/i)?.[1] || 'Unknown';
  } else if (/edg/i.test(userAgent)) {
    browserName = 'Edge';
    browserVersion = userAgent.match(/edg[ \/](\d+(\.\d+)?)/i)?.[1] || 'Unknown';
  } else if (/opr\//i.test(userAgent)) {
    browserName = 'Opera';
    browserVersion = userAgent.match(/opr[ \/](\d+(\.\d+)?)/i)?.[1] || 'Unknown';
  } else if (/trident/i.test(userAgent)) {
    browserName = 'Internet Explorer';
    browserVersion = userAgent.match(/trident[ \/](\d+(\.\d+)?)/i)?.[1] || 'Unknown';
  }
  
  // Check if mobile or desktop
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
  
  return {
    name: browserName,
    version: browserVersion,
    isMobile,
    isDesktop: !isMobile,
    isIOS: /iPhone|iPad|iPod/i.test(userAgent),
    isAndroid: /Android/i.test(userAgent),
    userAgent,
    hasWebGL: checkWebGLSupport(),
    hasCanvas: checkCanvasSupport(),
    hasWebWorker: typeof Worker !== 'undefined',
    hasSpeechSynthesis: 'speechSynthesis' in window,
    hasGeolocation: 'geolocation' in navigator,
    hasNotifications: 'Notification' in window,
    hasTouchScreen: isTouchDevice(),
  };
};
