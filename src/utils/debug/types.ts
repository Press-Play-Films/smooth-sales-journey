
// Debugging levels
export enum LogLevel {
  INFO = 'info',
  WARN = 'warn',
  ERROR = 'error',
  DEBUG = 'debug'
}

// Debug configuration
export const debugConfig = {
  enabled: true,
  logLevel: LogLevel.DEBUG,
  logNetworkRequests: true,
  logComponentRenders: true,
  logRouteChanges: true,
  logStateChanges: true
};
