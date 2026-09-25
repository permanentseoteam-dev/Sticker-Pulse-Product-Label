import React from 'react';

export function AppLogo({ size = 'md', showBadge = true }) {
  const isSm = size === 'sm';
  const iconDim = isSm ? 28 : 34;

  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: isSm ? '8px' : '10px' }}>
      {/* Brand Icon Badge with Framer Gradient & Glowing Shadow */}
      <div
        style={{
          width: `${iconDim}px`,
          height: `${iconDim}px`,
          borderRadius: isSm ? '8px' : '10px',
          background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 12px rgba(37, 99, 235, 0.35)',
          flexShrink: 0
        }}
      >
        {/* Layered Vector Emblem */}
        <svg
          width={isSm ? '16' : '20'}
          height={isSm ? '16' : '20'}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Label Badge Silhouette */}
          <path
            d="M4 6C4 4.89543 4.89543 4 6 4H14.5858C15.1162 4 15.6249 4.21071 16 4.58579L20.4142 9C20.7893 9.3751 21 9.88378 21 10.4142V18C21 19.1046 20.1046 20 19 20H6C4.89543 20 4 19.1046 4 18V6Z"
            fill="white"
            fillOpacity="0.25"
            stroke="white"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          {/* Badge Hole */}
          <circle cx="9" cy="9" r="1.75" fill="white" />
          {/* Spark Star Pulse */}
          <path
            d="M15 11L16.2 13.8L19 15L16.2 16.2L15 19L13.8 16.2L11 15L13.8 13.8L15 11Z"
            fill="white"
          />
        </svg>
      </div>

      {/* Brand Title Typography */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span
          style={{
            fontSize: isSm ? '15px' : '17.5px',
            fontWeight: 800,
            background: 'linear-gradient(135deg, #0f172a 0%, #1e40af 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            letterSpacing: '-0.4px'
          }}
        >
          StickerPulse
        </span>
        {showBadge && (
          <span
            style={{
              background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
              color: '#ffffff',
              fontWeight: 800,
              fontSize: '10px',
              padding: '2px 7px',
              borderRadius: '6px',
              letterSpacing: '0.6px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.12)'
            }}
          >
            PRO
          </span>
        )}
      </div>
    </div>
  );
}

export default AppLogo;
