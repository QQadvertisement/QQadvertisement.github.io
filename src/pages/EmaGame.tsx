import React, { useEffect } from "react";

export default function EmaGame() {
  // Add CSS to document head to ensure no margins/padding affect the iframe
  useEffect(() => {
    // Create style element to override any default margins/padding
    const style = document.createElement('style');
    style.innerHTML = `
      body, html {
        margin: 0;
        padding: 0;
        overflow: hidden;
        height: 100%;
        width: 100%;
      }
      .unity-game-container {
        margin: 0 !important;
        padding: 0 !important;
        width: 100% !important;
        height: 100% !important;
        overflow: visible !important;
      }
      .unity-game-iframe {
        margin: 0 !important;
        padding: 0 !important;
        border: 0 !important;
        overflow: visible !important;
      }
    `;
    document.head.appendChild(style);
    
    // Clean up style when component unmounts
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    // Simple full-height, full-width container with minimal styling
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column',
      width: '100vw', 
      height: '100vh',
      margin: 0,
      padding: 0,
      overflow: 'hidden',
    }}>
      {/* Game container with no margins or padding */}
      <div className="unity-game-container" style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        margin: 0,
        padding: 0,
        overflow: 'visible',
      }}>
        <iframe
          src="/ema_webgl/index.html"
          title="Ema Kneading Game"
          className="unity-game-iframe"
          style={{
            flex: 1,
            width: '100%',
            height: '100%',
            border: 'none',
            margin: 0,
            padding: 0,
            overflow: 'visible',
          }}
          scrolling="no"
          frameBorder="0"
          allow="fullscreen"
        />
      </div>
      
      {/* Fixed back button in the top corner */}
      <div style={{
        position: 'fixed',
        top: '16px',
        left: '16px',
        zIndex: 1000,
      }}>
        <a
          href="/"
          className="inline-block bg-teal-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-teal-700 transition"
        >
          Back to Home
        </a>
      </div>
    </div>
  );
} 