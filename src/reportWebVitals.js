// Define a function named reportWebVitals that takes onPerfEntry as a parameter
const reportWebVitals = onPerfEntry => {
    // Check if onPerfEntry is provided and is a function
    if (onPerfEntry && typeof onPerfEntry === 'function') {
      // Dynamically import web-vitals module
      import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
        // Call each web vitals function with onPerfEntry callback
        getCLS(onPerfEntry);
        getFID(onPerfEntry);
        getFCP(onPerfEntry);
        getLCP(onPerfEntry);
        getTTFB(onPerfEntry);
      });
    }
  };
  
  // Export the reportWebVitals function to make it accessible from other modules
  export default reportWebVitals;
  