import React from 'react';

/**
 * ShapeGlyphIcon renders SVG vector thumbnails for all 26 badge shape options
 * matching the DECO reference shape grid.
 */
export function ShapeGlyphIcon({ type, className = '' }) {
  const fill = '#94a3b8'; // crisp grey matching reference

  switch (type) {
    case 'rect':
      return (
        <svg width="24" height="14" viewBox="0 0 24 14" fill="none" className={className}>
          <rect width="24" height="14" rx="2" fill={fill} />
        </svg>
      );
    case 'circle':
      return (
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className={className}>
          <circle cx="9" cy="9" r="9" fill={fill} />
        </svg>
      );
    case 'scallop':
      return (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className={className}>
          <path d="M10 0L12.3 2.5L15.6 1.8L16.4 5.1L19.5 6.5L18.6 9.8L20 13L16.8 14.2L15.4 17.3L12.1 16.7L10 19L7.9 16.7L4.6 17.3L3.2 14.2L0 13L1.4 9.8L0.5 6.5L3.6 5.1L4.4 1.8L7.7 2.5Z" fill={fill} />
        </svg>
      );
    case 'flag-left':
      return (
        <svg width="24" height="14" viewBox="0 0 24 14" fill="none" className={className}>
          <path d="M0 0H24L20 7L24 14H0V0Z" fill={fill} />
        </svg>
      );
    case 'pointer-left':
      return (
        <svg width="24" height="14" viewBox="0 0 24 14" fill="none" className={className}>
          <path d="M5 0H24V14H5L0 7L5 0Z" fill={fill} />
        </svg>
      );
    case 'pointer-right':
      return (
        <svg width="24" height="14" viewBox="0 0 24 14" fill="none" className={className}>
          <path d="M0 0H19L24 7L19 14H0V0Z" fill={fill} />
        </svg>
      );
    case 'ribbon-diag-left':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className={className}>
          <path d="M0 8L8 0H16L0 16V8Z" fill={fill} />
          <path d="M0 16L16 0H24L0 24V16Z" fill={fill} />
        </svg>
      );
    case 'ribbon-diag-right':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className={className}>
          <path d="M24 8L16 0H8L24 16V8Z" fill={fill} />
          <path d="M24 16L8 0H0L24 24V16Z" fill={fill} />
        </svg>
      );
    case 'triangle-left':
      return (
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" className={className}>
          <path d="M0 0H22L0 22V0Z" fill={fill} />
        </svg>
      );
    case 'triangle-right':
      return (
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" className={className}>
          <path d="M0 0H22V22L0 0Z" fill={fill} />
        </svg>
      );
    case 'round-top-left':
      return (
        <svg width="24" height="14" viewBox="0 0 24 14" fill="none" className={className}>
          <path d="M10 0H24V14H0V10C0 4.47715 4.47715 0 10 0Z" fill={fill} />
        </svg>
      );
    case 'round-top-right':
      return (
        <svg width="24" height="14" viewBox="0 0 24 14" fill="none" className={className}>
          <path d="M0 0H14C19.5228 0 24 4.47715 24 10V14H0V0Z" fill={fill} />
        </svg>
      );
    case 'double-notch':
      return (
        <svg width="24" height="14" viewBox="0 0 24 14" fill="none" className={className}>
          <path d="M4 0H20L24 7L20 14H4L0 7L4 0Z" fill={fill} />
        </svg>
      );
    case 'arrow-notch':
      return (
        <svg width="24" height="14" viewBox="0 0 24 14" fill="none" className={className}>
          <path d="M0 0H20L24 7L20 14H0L4 7L0 0Z" fill={fill} />
        </svg>
      );
    case 'fold-left':
      return (
        <svg width="24" height="14" viewBox="0 0 24 14" fill="none" className={className}>
          <path d="M0 0H24V14H4L0 10V0Z" fill={fill} />
        </svg>
      );
    case 'fold-right':
      return (
        <svg width="24" height="14" viewBox="0 0 24 14" fill="none" className={className}>
          <path d="M0 0H24V10L20 14H0V0Z" fill={fill} />
        </svg>
      );
    case 'round-diag1':
      return (
        <svg width="24" height="14" viewBox="0 0 24 14" fill="none" className={className}>
          <rect width="24" height="14" rx="6" fill={fill} />
        </svg>
      );
    case 'round-diag2':
      return (
        <svg width="24" height="14" viewBox="0 0 24 14" fill="none" className={className}>
          <path d="M8 0H24V14H8C3.58172 14 0 10.4183 0 6V0H8Z" fill={fill} />
        </svg>
      );
    case 'capsule-full':
      return (
        <svg width="24" height="14" viewBox="0 0 24 14" fill="none" className={className}>
          <rect width="24" height="14" rx="7" fill={fill} />
        </svg>
      );
    case 'capsule-left':
      return (
        <svg width="24" height="14" viewBox="0 0 24 14" fill="none" className={className}>
          <path d="M7 0H24V14H7C3.13401 14 0 10.866 0 7C0 3.13401 3.13401 0 7 0Z" fill={fill} />
        </svg>
      );
    case 'capsule-right':
      return (
        <svg width="24" height="14" viewBox="0 0 24 14" fill="none" className={className}>
          <path d="M0 0H17C20.866 0 24 3.13401 24 7C24 10.866 20.866 14 17 14H0V0Z" fill={fill} />
        </svg>
      );
    case 'trapezoid-top':
      return (
        <svg width="24" height="14" viewBox="0 0 24 14" fill="none" className={className}>
          <path d="M3 0H21L24 14H0L3 0Z" fill={fill} />
        </svg>
      );
    case 'trapezoid-bottom':
      return (
        <svg width="24" height="14" viewBox="0 0 24 14" fill="none" className={className}>
          <path d="M0 0H24L21 14H3L0 0Z" fill={fill} />
        </svg>
      );
    case 'slanted-left':
      return (
        <svg width="24" height="14" viewBox="0 0 24 14" fill="none" className={className}>
          <path d="M4 0H24L20 14H0L4 0Z" fill={fill} />
        </svg>
      );
    case 'slanted-right':
      return (
        <svg width="24" height="14" viewBox="0 0 24 14" fill="none" className={className}>
          <path d="M0 0H20L24 14H4L0 0Z" fill={fill} />
        </svg>
      );
    case 'hexagon':
      return (
        <svg width="22" height="16" viewBox="0 0 22 16" fill="none" className={className}>
          <path d="M5.5 0H16.5L22 8L16.5 16H5.5L0 8L5.5 0Z" fill={fill} />
        </svg>
      );
    default:
      return (
        <svg width="24" height="14" viewBox="0 0 24 14" fill="none" className={className}>
          <rect width="24" height="14" rx="2" fill={fill} />
        </svg>
      );
  }
}

export default ShapeGlyphIcon;
