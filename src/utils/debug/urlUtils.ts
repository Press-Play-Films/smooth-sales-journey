
// Create a debugging URL parameter helper
export const isDebugMode = () => {
  try {
    return window.location.search.includes('debug=true');
  } catch (error) {
    return false;
  }
};
