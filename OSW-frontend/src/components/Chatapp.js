import React, { useEffect, useState } from 'react';
// import './Chatapp.css';

const Chatapp = () => {
  const [iframeWidth, setIframeWidth] = useState('10000px'); // Initial width
  const [iframeHeight, setIframeHeight] = useState('100vh'); // Initial height

  // Function to update iframe dimensions based on window size
  const updateIframeDimensions = () => {
    const newWidth = window.innerWidth - 100; // Adjust the value as needed
    const newHeight = window.innerHeight - 100; // Adjust the value as needed
    setIframeWidth(`${newWidth}px`);
    setIframeHeight(`${newHeight}px`);
  };

  // Listen for window resize events and update iframe dimensions
  useEffect(() => {
    window.addEventListener('resize', updateIframeDimensions);
    updateIframeDimensions(); // Set initial dimensions

    return () => {
      // Clean up the event listener when the component unmounts
      window.removeEventListener('resize', updateIframeDimensions);
    };
  }, []);

  return (
    <>
      <div>
        <section className="chat__section">
          <iframe
            src="http://localhost:9000" // Replace with the URL of your chat app
            title="Chat Application"
            width={iframeWidth}// Use the dynamic width here
            height={iframeHeight} // Use the dynamic height here
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              border: 'none',
            }}
          ></iframe>
        </section>
      </div>
    </>

  );
};

export default Chatapp;
