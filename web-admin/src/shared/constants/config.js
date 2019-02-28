const devMode = process.env.NODE_ENV !== 'development';

export default {
  // App Details
  appName: 'Dragorhast Bike Sharing',

  // Build Configuration - eg. Debug or Release?
  DEV: devMode,

  // Google Analytics - uses a 'dev' account while we're testing
  gaTrackingId: devMode ? 'UA-84284256-2' : 'UA-84284256-1',

  firebaseAPIKey: 'AIzaSyB4teiiZNG0hujsd2rEe6lNorm0tFAi2aY',

  apiBaseURL: 'http://localhost:8080/api/v1',

  googleApiKey: 'AIzaSyBbX_wWlxR8qX-Fih6UPrHvZY7k3Wp_M7c',
};
