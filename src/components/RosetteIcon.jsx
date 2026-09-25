import React from 'react';

/**
 * RosetteIcon renders a crisp scalloped badge icon matching the reference images.
 * Type: 'text' (Aa) or 'image' (landscape photo)
 * Color: 'blue' or 'red'
 */
export function RosetteIcon({ type = 'text', color = 'blue', size = 48, className = '' }) {
  // Scalloped 12-point star/rosette path
  const rosettePath = "M24 2 C26.5 2 28.5 4 30.5 4.5 C32.5 5 35 4 37 5 C39 6.2 40 8.5 41.5 10 C43 11.5 45.5 12.5 46.5 14.5 C47.5 16.5 46.5 19 47 21 C47.5 23 49 25 49 27.5 C49 30 47.5 32 47 34 C46.5 36 47.5 38.5 46.5 40.5 C45.5 42.5 43 43.5 41.5 45 C40 46.5 39 48.8 37 50 C35 51 32.5 50 30.5 50.5 C28.5 51 26.5 53 24 53 C21.5 53 19.5 51 17.5 50.5 C15.5 50 13 51 11 50 C9 48.8 8 46.5 6.5 45 C5 43.5 2.5 42.5 1.5 40.5 C0.5 38.5 1.5 36 1 34 C0.5 32 -1 30 -1 27.5 C-1 25 0.5 23 1 21 C1.5 19 0.5 16.5 1.5 14.5 C2.5 12.5 5 11.5 6.5 10 C8 8.5 9 6.2 11 5 C13 4 15.5 5 17.5 4.5 C19.5 4 21.5 2 24 2 Z";

  const isBlue = color === 'blue';
  const mainColor = isBlue ? '#1d70f5' : '#c2410c';
  const ringColor = isBlue ? '#60a5fa' : '#f87171';

  return (
    <svg
      width={size}
      height={size}
      viewBox="-4 -4 56 62"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Outer subtle glow/ring */}
      <path
        d={rosettePath}
        fill={ringColor}
        opacity="0.3"
        transform="scale(1.08) translate(-1.8, -1.8)"
      />
      {/* Main Scalloped Rosette Body */}
      <path
        d={rosettePath}
        fill={mainColor}
      />

      {/* Center Icon */}
      {type === 'text' ? (
        <g transform="translate(13, 16)" fill="#ffffff">
          {/* "Aa" text & underline */}
          <text
            x="9"
            y="11"
            fill="#ffffff"
            fontSize="14.5"
            fontWeight="700"
            fontFamily="Inter, system-ui, sans-serif"
            textAnchor="middle"
            letterSpacing="-0.5"
          >
            Aa
          </text>
          <line
            x1="3"
            y1="16"
            x2="15"
            y2="16"
            stroke="#ffffff"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </g>
      ) : (
        <g transform="translate(14, 17)" stroke="#ffffff" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
          {/* Landscape / Image icon */}
          <rect x="0" y="0" width="20" height="17" rx="3" fill="none" stroke="#ffffff" strokeWidth="2" />
          <circle cx="5.5" cy="5.5" r="1.5" fill="#ffffff" stroke="none" />
          <path d="M19 13.5L14 8L7 15" stroke="#ffffff" strokeWidth="2" fill="none" />
        </g>
      )}
    </svg>
  );
}
export default RosetteIcon;
