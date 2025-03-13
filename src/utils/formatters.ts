
/**
 * Formats a date to a time string (e.g., 2:30 PM)
 */
export const formatTime = (date: Date): string => {
  return date.toLocaleTimeString('en-US', { 
    hour: 'numeric', 
    minute: '2-digit', 
    hour12: true 
  });
};

/**
 * Formats a date to a relative time string (e.g., 2 hours ago)
 */
export const formatTimeAgo = (date: Date): string => {
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
  
  let interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + ' hours ago';
  }
  
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + ' minutes ago';
  }
  
  return Math.floor(seconds) + ' seconds ago';
};
