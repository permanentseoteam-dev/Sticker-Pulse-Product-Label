import React, { useState } from 'react';
import ImageGalleryModal from './ImageGalleryModal';
import ShapeGlyphIcon from './ShapeGlyphIcon';

// Common fonts
const FONT_OPTIONS = [
  'Inter',
  'Alata',
  'Roboto',
  'Montserrat',
  'Poppins',
  'Open Sans',
  'Playfair Display',
  'Lato',
  'Oswald'
];

// Complete 26 Badge Shape Presets matching DECO reference screenshots 1 & 2
export const SHAPE_PRESETS = [
  // Row 1
  { id: 'rect', name: 'Rectangle', type: 'rect' },
  { id: 'circle', name: 'Circle', type: 'circle' },
  { id: 'scallop', name: 'Starburst Scallop', type: 'scallop' },
  { id: 'flag-left', name: 'Ribbon Flag Left', type: 'flag-left' },
  { id: 'pointer-left', name: 'Pointer Left', type: 'pointer-left' },
  { id: 'pointer-right', name: 'Pointer Right', type: 'pointer-right' },
  { id: 'corner-ribbon-left', name: 'Diagonal Ribbon Left', type: 'ribbon-diag-left' },
  { id: 'corner-ribbon-right', name: 'Diagonal Ribbon Right', type: 'ribbon-diag-right' },
  { id: 'corner-triangle-left', name: 'Triangle Corner Left', type: 'triangle-left' },
  { id: 'corner-triangle-right', name: 'Triangle Corner Right', type: 'triangle-right' },
  { id: 'round-top-left', name: 'Round Top Left', type: 'round-top-left' },
  { id: 'round-top-right', name: 'Round Top Right', type: 'round-top-right' },
  { id: 'double-notch', name: 'Double Notch Ribbon', type: 'double-notch' },
  { id: 'arrow-notch', name: 'Arrow Notch Ribbon', type: 'arrow-notch' },
  { id: 'fold-left', name: 'Fold Ribbon Left', type: 'fold-left' },
  { id: 'fold-right', name: 'Fold Ribbon Right', type: 'fold-right' },
  // Row 2
  { id: 'round-diag1', name: 'Round Diag 1', type: 'round-diag1' },
  { id: 'round-diag2', name: 'Round Diag 2', type: 'round-diag2' },
  { id: 'capsule-full', name: 'Full Capsule', type: 'capsule-full' },
  { id: 'capsule-left', name: 'Capsule Left', type: 'capsule-left' },
  { id: 'capsule-right', name: 'Capsule Right', type: 'capsule-right' },
  { id: 'trapezoid-top', name: 'Trapezoid Top', type: 'trapezoid-top' },
  { id: 'trapezoid-bottom', name: 'Trapezoid Bottom', type: 'trapezoid-bottom' },
  { id: 'slanted-left', name: 'Slanted Banner Left', type: 'slanted-left' },
  { id: 'slanted-right', name: 'Slanted Banner Right', type: 'slanted-right' },
  { id: 'hexagon', name: 'Hexagon', type: 'hexagon' }
];

// Reusable Armchair Illustration SVG (matching DECO reference design)
function ArmchairSvg({ style = {}, className = "chair-svg" }) {
  return (
    <svg
      viewBox="0 0 200 240"
      className={className}
      style={style}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g fill="#D1D5DB">
        {/* Chair back */}
        <path d="M60 40 C60 30, 140 30, 140 40 L140 140 C140 150, 60 150, 60 140 Z" fill="#E5E7EB" />
        {/* Chair cushion */}
        <path d="M45 120 C45 110, 155 110, 155 120 L155 160 C155 168, 45 168, 45 160 Z" fill="#D1D5DB" />
        {/* Left armrest */}
        <path d="M35 100 C35 90, 55 90, 55 100 L55 155 C55 162, 35 162, 35 155 Z" fill="#9CA3AF" />
        {/* Right armrest */}
        <path d="M145 100 C145 90, 165 90, 165 100 L165 155 C165 162, 145 162, 145 155 Z" fill="#9CA3AF" />
        {/* Legs */}
        <line x1="55" y1="165" x2="45" y2="210" stroke="#6B7280" strokeWidth="6" strokeLinecap="round" />
        <line x1="80" y1="165" x2="75" y2="195" stroke="#9CA3AF" strokeWidth="5" strokeLinecap="round" />
        <line x1="145" y1="165" x2="155" y2="210" stroke="#6B7280" strokeWidth="6" strokeLinecap="round" />
        <line x1="120" y1="165" x2="125" y2="195" stroke="#9CA3AF" strokeWidth="5" strokeLinecap="round" />
      </g>
    </svg>
  );
}

export function TextLabelEditor({ labelType = 'text', initialData = null, onSave, onBack }) {
  const isImageType = (initialData?.type || labelType) === 'image';

  // Modal Gallery state
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [selectedImageUrl, setSelectedImageUrl] = useState(initialData?.selectedImageUrl || 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 40"><rect width="120" height="40" rx="6" fill="%23FF3B30"/><text x="60" y="26" fill="white" font-family="sans-serif" font-weight="900" font-size="20" text-anchor="middle">SALE!</text></svg>');

  // Image specific size states
  const [imageSize, setImageSize] = useState(initialData?.imageSize || 30);
  const [imageUnit, setImageUnit] = useState(initialData?.imageUnit || '%');
  const [lockAspectRatio, setLockAspectRatio] = useState(initialData?.lockAspectRatio !== undefined ? initialData.lockAspectRatio : true);

  // Top bar states
  const [labelName, setLabelName] = useState(initialData?.name || (isImageType ? 'StickerPulse Image Label' : 'StickerPulse Text Label'));
  const [activeTab, setActiveTab] = useState('Design');
  const [previewPage, setPreviewPage] = useState('collection');
  const [deviceView, setDeviceView] = useState('desktop');
  const [isActive, setIsActive] = useState(initialData?.isActive !== undefined ? initialData.isActive : true);

  // Section 1: Fill & Shape
  const [fillMode, setFillMode] = useState(initialData?.fillMode || 'solid');
  const [bgColor, setBgColor] = useState(initialData?.bgColor || '#B02947');
  const [selectedShape, setSelectedShape] = useState(initialData?.selectedShape || 'rect');

  // Section 2: Position
  const [positionMode, setPositionMode] = useState(initialData?.positionMode || 'inside');
  const [anchor, setAnchor] = useState(initialData?.anchor || 'top-left');
  const [manualAdjust, setManualAdjust] = useState(false);
  const [offsetX, setOffsetX] = useState(initialData?.offsetX || 0);
  const [offsetY, setOffsetY] = useState(initialData?.offsetY || 0);

  // Section 3: Content & Icons
  const [isBold, setIsBold] = useState(initialData?.isBold !== undefined ? initialData.isBold : true);
  const [isItalic, setIsItalic] = useState(initialData?.isItalic || false);
  const [isUnderline, setIsUnderline] = useState(initialData?.isUnderline || false);
  const [textContent, setTextContent] = useState(initialData?.textContent || 'SAVE 20%');
  const [fontFamily, setFontFamily] = useState(initialData?.fontFamily || 'Alata');
  const [textColor, setTextColor] = useState(initialData?.textColor || '#ffffff');
  const [badgeIcon, setBadgeIcon] = useState(initialData?.badgeIcon || '🔥');
  const [iconPosition, setIconPosition] = useState(initialData?.iconPosition || 'left');

  // Section 4: Size
  const [sizeMode, setSizeMode] = useState('same');
  const [widthPercent, setWidthPercent] = useState(initialData?.widthPercent || 30);
  const [heightPercent, setHeightPercent] = useState(initialData?.heightPercent || 10);
  const [textSizePercent, setTextSizePercent] = useState(initialData?.textSizePercent || 41);
  const [letterSpacing, setLetterSpacing] = useState(initialData?.letterSpacing || 2);

  // Section 5: Adjustment
  const [hasBorder, setHasBorder] = useState(initialData?.hasBorder || false);
  const [borderColor, setBorderColor] = useState(initialData?.borderColor || '#ffffff');
  const [borderWidth, setBorderWidth] = useState(initialData?.borderWidth || 1);
  const [hasRoundCorner, setHasRoundCorner] = useState(initialData?.hasRoundCorner || false);
  const [borderRadius, setBorderRadius] = useState(initialData?.borderRadius || 4);

  // DISPLAY TAB STATES (Matching DECO reference screenshots)
  const [pageDisplay, setPageDisplay] = useState(
    initialData?.pageDisplay || {
      productPage: true,
      collectionPage: true,
      homepage: true,
      searchPage: true,
      cartPage: false,
      specificPages: false
    }
  );
  const [deviceDisplay, setDeviceDisplay] = useState(initialData?.deviceDisplay || 'all'); // 'all' | 'desktop' | 'mobile'
  const [showMultipleLabelsPreview, setShowMultipleLabelsPreview] = useState(initialData?.showMultipleLabelsPreview || false);
  const [targetMode, setTargetMode] = useState(initialData?.targetMode || 'all'); // 'all' | 'tags'
  const [targetTags, setTargetTags] = useState(initialData?.targetTags || 'eco-friendly');

  // Gallery Target ('primary' | 'secondary')
  const [galleryTarget, setGalleryTarget] = useState('primary');

  // SECONDARY LABEL STATES (Configured when Multi-Label Support is toggled ON)
  const [secondLabelType, setSecondLabelType] = useState(initialData?.secondLabelType || 'text'); // 'text' | 'image'
  const [secondSelectedImageUrl, setSecondSelectedImageUrl] = useState(
    initialData?.secondSelectedImageUrl ||
    'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 40"><rect width="120" height="40" rx="6" fill="%2310B981"/><text x="60" y="26" fill="white" font-family="sans-serif" font-weight="900" font-size="16" text-anchor="middle">NEW IN</text></svg>'
  );
  const [secondImageSize, setSecondImageSize] = useState(initialData?.secondImageSize || 26);
  const [secondImageUnit, setSecondImageUnit] = useState(initialData?.secondImageUnit || '%');
  const [secondLockAspectRatio, setSecondLockAspectRatio] = useState(initialData?.secondLockAspectRatio !== undefined ? initialData.secondLockAspectRatio : true);

  // Second Label: Fill & Shape
  const [secondFillMode, setSecondFillMode] = useState(initialData?.secondFillMode || 'solid');
  const [secondBgColor, setSecondBgColor] = useState(initialData?.secondBgColor || '#10b981');
  const [secondSelectedShape, setSecondSelectedShape] = useState(initialData?.secondSelectedShape || 'capsule-full');

  // Second Label: Position
  const [secondPositionMode, setSecondPositionMode] = useState(initialData?.secondPositionMode || 'inside');
  const [secondAnchor, setSecondAnchor] = useState(initialData?.secondAnchor || 'top-right');
  const [secondManualAdjust, setSecondManualAdjust] = useState(initialData?.secondManualAdjust || false);
  const [secondOffsetX, setSecondOffsetX] = useState(initialData?.secondOffsetX || 0);
  const [secondOffsetY, setSecondOffsetY] = useState(initialData?.secondOffsetY || 0);

  // Second Label: Content & Icons
  const [secondIsBold, setSecondIsBold] = useState(initialData?.secondIsBold !== undefined ? initialData.secondIsBold : true);
  const [secondIsItalic, setSecondIsItalic] = useState(initialData?.secondIsItalic || false);
  const [secondIsUnderline, setSecondIsUnderline] = useState(initialData?.secondIsUnderline || false);
  const [secondTextContent, setSecondTextContent] = useState(initialData?.secondTextContent || 'NEW ARRIVAL');
  const [secondFontFamily, setSecondFontFamily] = useState(initialData?.secondFontFamily || 'Inter');
  const [secondTextColor, setSecondTextColor] = useState(initialData?.secondTextColor || '#ffffff');
  const [secondBadgeIcon, setSecondBadgeIcon] = useState(initialData?.secondBadgeIcon || '⭐');
  const [secondIconPosition, setSecondIconPosition] = useState(initialData?.secondIconPosition || 'left');

  // Second Label: Size
  const [secondSizeMode, setSecondSizeMode] = useState(initialData?.secondSizeMode || 'same');
  const [secondWidthPercent, setSecondWidthPercent] = useState(initialData?.secondWidthPercent || 28);
  const [secondHeightPercent, setSecondHeightPercent] = useState(initialData?.secondHeightPercent || 9);
  const [secondTextSizePercent, setSecondTextSizePercent] = useState(initialData?.secondTextSizePercent || 38);
  const [secondLetterSpacing, setSecondLetterSpacing] = useState(initialData?.secondLetterSpacing || 1);

  // Second Label: Adjustment
  const [secondHasBorder, setSecondHasBorder] = useState(initialData?.secondHasBorder || false);
  const [secondBorderColor, setSecondBorderColor] = useState(initialData?.secondBorderColor || '#ffffff');
  const [secondBorderWidth, setSecondBorderWidth] = useState(initialData?.secondBorderWidth || 1);
  const [secondHasRoundCorner, setSecondHasRoundCorner] = useState(initialData?.secondHasRoundCorner !== undefined ? initialData.secondHasRoundCorner : true);
  const [secondBorderRadius, setSecondBorderRadius] = useState(initialData?.secondBorderRadius || 6);

  // Handle image upload from file input
  const handleDirectImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (galleryTarget === 'secondary') {
          setSecondSelectedImageUrl(event.target.result);
        } else {
          setSelectedImageUrl(event.target.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Quick AutoText insert helper
  const handleInsertAutoText = (token, isSecond = false) => {
    if (isSecond) {
      setSecondTextContent((prev) => `${prev} ${token}`);
    } else {
      setTextContent((prev) => `${prev} ${token}`);
    }
  };

  // Shopify library template selector helper (applies text, shape, colors, and icon)
  const handleSelectShopifyTemplate = (template) => {
    if (galleryTarget === 'secondary') {
      if (template.text) setSecondTextContent(template.text);
      if (template.bgColor) setSecondBgColor(template.bgColor);
      if (template.textColor) setSecondTextColor(template.textColor);
      if (template.shape) setSecondSelectedShape(template.shape);
      if (template.icon) {
        setSecondBadgeIcon(template.icon);
        setSecondIconPosition('left');
      }
      if (template.url) setSecondSelectedImageUrl(template.url);
    } else {
      if (template.text) setTextContent(template.text);
      if (template.bgColor) setBgColor(template.bgColor);
      if (template.textColor) setTextColor(template.textColor);
      if (template.shape) setSelectedShape(template.shape);
      if (template.icon) {
        setBadgeIcon(template.icon);
        setIconPosition('left');
      }
      if (template.url) setSelectedImageUrl(template.url);
    }
  };

  // Helper to render badge text content with optional icon
  const renderBadgeContent = () => {
    const hasIcon = badgeIcon && iconPosition !== 'none';
    if (!hasIcon) {
      return <span style={{ whiteSpace: 'nowrap' }}>{textContent}</span>;
    }
    const iconElem = (
      <span style={{ fontSize: '1.15em', lineHeight: 1, display: 'inline-flex', alignItems: 'center', flexShrink: 0 }}>
        {badgeIcon}
      </span>
    );
    if (iconPosition === 'left') {
      return (
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', whiteSpace: 'nowrap', maxWidth: '100%' }}>
          {iconElem}
          <span style={{ whiteSpace: 'nowrap' }}>{textContent}</span>
        </span>
      );
    }
    return (
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', whiteSpace: 'nowrap', maxWidth: '100%' }}>
        <span style={{ whiteSpace: 'nowrap' }}>{textContent}</span>
        {iconElem}
      </span>
    );
  };

  // Coordinate mapper for 9-point grid
  function getAnchorCoordinates() {
    const margin = 8;
    const coords = {};

    // Vertical positioning
    if (anchor.startsWith('top')) {
      coords.top = `${margin + offsetY}px`;
    } else if (anchor.startsWith('bottom')) {
      coords.bottom = `${margin - offsetY}px`;
    } else if (anchor.startsWith('middle')) {
      coords.top = `calc(50% + ${offsetY}px)`;
    }

    // Horizontal positioning
    if (anchor.endsWith('left')) {
      coords.left = `${margin + offsetX}px`;
      if (anchor.startsWith('middle')) {
        coords.transform = 'translateY(-50%)';
      }
    } else if (anchor.endsWith('right')) {
      coords.right = `${margin - offsetX}px`;
      if (anchor.startsWith('middle')) {
        coords.transform = 'translateY(-50%)';
      }
    } else if (anchor.endsWith('center')) {
      coords.left = `calc(50% + ${offsetX}px)`;
      if (anchor.startsWith('middle')) {
        coords.transform = 'translate(-50%, -50%)';
      } else {
        coords.transform = 'translateX(-50%)';
      }
    }

    return coords;
  }

  // Check if label should render on current page & device
  const isLabelVisibleOnCurrentPage = () => {
    // Page target evaluation
    if (previewPage === 'collection' && !pageDisplay.collectionPage) return false;
    if (previewPage === 'product' && !pageDisplay.productPage) return false;
    if (previewPage === 'homepage' && !pageDisplay.homepage) return false;
    if (previewPage === 'search' && !pageDisplay.searchPage) return false;
    if (previewPage === 'cart' && !pageDisplay.cartPage) return false;

    // Device target evaluation
    if (deviceDisplay === 'desktop' && deviceView !== 'desktop') return false;
    if (deviceDisplay === 'mobile' && deviceView !== 'mobile') return false;

    return true;
  };

  const getHiddenReasonMessage = () => {
    if (deviceDisplay === 'desktop' && deviceView !== 'desktop') {
      return `Label is configured for Desktop devices only under Device Display.`;
    }
    if (deviceDisplay === 'mobile' && deviceView !== 'mobile') {
      return `Label is configured for Mobile devices only under Device Display.`;
    }
    return `Label is configured to be hidden on ${previewPage} page under Page Display settings.`;
  };

  // Compute live style for Image Labels (applying size, lock aspect ratio, border, and rounded corners)
  const getImageBadgeStyle = (isInside = (positionMode === 'inside')) => {
    const dimVal = imageUnit === '%' ? `${imageSize}%` : `${imageSize}px`;

    const style = {
      width: dimVal,
      minWidth: imageUnit === '%' ? 'auto' : `${imageSize}px`,
      maxWidth: '92%',
      height: lockAspectRatio ? 'auto' : dimVal,
      objectFit: lockAspectRatio ? 'contain' : 'fill',
      maxHeight: '80%',
      zIndex: 10,
      transition: 'all 0.15s ease',
      boxSizing: 'border-box'
    };

    if (hasBorder) {
      style.border = `${borderWidth}px solid ${borderColor}`;
    }

    if (hasRoundCorner) {
      style.borderRadius = `${borderRadius}px`;
      style.overflow = 'hidden';
    } else {
      style.borderRadius = '0px';
    }

    if (isInside) {
      return {
        position: 'absolute',
        ...getAnchorCoordinates(),
        ...style
      };
    }

    return {
      position: 'relative',
      ...style
    };
  };

  // Compute live badge style for Text Labels (Auto-adapting width to icons + text)
  const getBadgeStyle = (isInside = (positionMode === 'inside')) => {
    // Dynamic font size calculation cleanly scaling from textSizePercent (20-80%) and heightPercent (5-50%)
    const baseFontSize = Math.max(9, Math.round(8 + (textSizePercent / 100) * 22 + (heightPercent / 100) * 6));
    
    // Dynamic padding scaling logically with height and width
    const vPadding = Math.max(3, Math.round(heightPercent * 0.35));
    const hPadding = Math.max(8, Math.round(widthPercent * 0.3));

    const baseStyle = {
      backgroundColor: bgColor,
      color: textColor,
      fontFamily: fontFamily,
      fontWeight: isBold ? 700 : 400,
      fontStyle: isItalic ? 'italic' : 'normal',
      textDecoration: isUnderline ? 'underline' : 'none',
      letterSpacing: `${letterSpacing}px`,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      userSelect: 'none',
      zIndex: 10,
      width: 'auto',
      minWidth: `${Math.max(36, widthPercent * 1.6)}px`,
      maxWidth: '92%',
      minHeight: `${Math.max(22, heightPercent * 2.5)}px`,
      fontSize: `${baseFontSize}px`,
      padding: `${vPadding}px ${hPadding}px`,
      boxSizing: 'border-box',
      whiteSpace: 'nowrap',
      transition: 'all 0.15s ease'
    };

    if (hasBorder) {
      baseStyle.border = `${borderWidth}px solid ${borderColor}`;
    }

    if (hasRoundCorner) {
      baseStyle.borderRadius = `${borderRadius}px`;
      baseStyle.overflow = 'hidden';
    } else {
      baseStyle.borderRadius = '0px';
    }

    // Apply 9-point grid coordinates when inside
    const coords = isInside ? getAnchorCoordinates() : {};
    const posStyle = isInside ? { position: 'absolute', ...coords } : { position: 'relative' };

    // Content-length aware dimensions for auto-adapting circle and scallop shapes
    const hasIcon = badgeIcon && iconPosition !== 'none';
    const textStr = textContent || '';
    const estTextWidth = textStr.length * (baseFontSize * 0.62) + (hasIcon ? 28 : 0) + 24;

    // Apply shape specific clips and styles
    switch (selectedShape) {
      case 'corner-ribbon-left':
        return {
          ...baseStyle,
          ...posStyle,
          width: `${Math.max(90, widthPercent * 3.5)}px`,
          height: `${Math.max(22, heightPercent * 1.5)}px`,
          transform: (posStyle.transform || '') + ' rotate(-45deg)',
          fontSize: `${Math.max(9, baseFontSize - 2)}px`,
          textTransform: 'uppercase'
        };
      case 'corner-ribbon-right':
        return {
          ...baseStyle,
          ...posStyle,
          width: `${Math.max(90, widthPercent * 3.5)}px`,
          height: `${Math.max(22, heightPercent * 1.5)}px`,
          transform: (posStyle.transform || '') + ' rotate(45deg)',
          fontSize: `${Math.max(9, baseFontSize - 2)}px`,
          textTransform: 'uppercase'
        };
      case 'corner-triangle-left':
        return {
          ...baseStyle,
          ...posStyle,
          clipPath: 'polygon(0 0, 100% 0, 0 100%)',
          width: `${Math.max(44, widthPercent * 1.8)}px`,
          height: `${Math.max(44, heightPercent * 2.8)}px`,
          padding: '2px 0 0 2px'
        };
      case 'corner-triangle-right':
        return {
          ...baseStyle,
          ...posStyle,
          clipPath: 'polygon(0 0, 100% 0, 100% 100%)',
          width: `${Math.max(44, widthPercent * 1.8)}px`,
          height: `${Math.max(44, heightPercent * 2.8)}px`,
          padding: '2px 2px 0 0'
        };
      case 'circle': {
        const circleDim = Math.max(estTextWidth, Math.max(52, widthPercent * 2.2));
        return {
          ...baseStyle,
          ...posStyle,
          borderRadius: '50%',
          width: `${circleDim}px`,
          height: `${circleDim}px`,
          minHeight: `${circleDim}px`,
          padding: '8px',
          overflow: 'hidden'
        };
      }
      case 'scallop': {
        const scallopDim = Math.max(estTextWidth, Math.max(52, widthPercent * 2.2));
        return {
          ...baseStyle,
          ...posStyle,
          borderRadius: '40%',
          transform: (posStyle.transform || '') + ' rotate(45deg)',
          width: `${scallopDim}px`,
          height: `${scallopDim}px`,
          minHeight: `${scallopDim}px`,
          padding: '8px',
          overflow: 'hidden'
        };
      }
      case 'flag-left':
        return {
          ...baseStyle,
          ...posStyle,
          clipPath: 'polygon(0% 0%, 100% 0%, 85% 50%, 100% 100%, 0% 100%)',
          paddingRight: '18px'
        };
      case 'pointer-left':
        return {
          ...baseStyle,
          ...posStyle,
          clipPath: 'polygon(15% 0%, 100% 0%, 100% 100%, 15% 100%, 0% 50%)',
          paddingLeft: '16px'
        };
      case 'pointer-right':
        return {
          ...baseStyle,
          ...posStyle,
          clipPath: 'polygon(0% 0%, 85% 0%, 100% 50%, 85% 100%, 0% 100%)',
          paddingRight: '16px'
        };
      case 'double-notch':
        return {
          ...baseStyle,
          ...posStyle,
          clipPath: 'polygon(15% 0%, 85% 0%, 100% 50%, 85% 100%, 15% 100%, 0% 50%)',
          paddingLeft: '14px',
          paddingRight: '14px'
        };
      case 'arrow-notch':
        return {
          ...baseStyle,
          ...posStyle,
          clipPath: 'polygon(0% 0%, 85% 0%, 100% 50%, 85% 100%, 0% 100%, 15% 50%)',
          paddingLeft: '14px',
          paddingRight: '16px'
        };
      case 'capsule-full':
        return {
          ...baseStyle,
          ...posStyle,
          borderRadius: '999px'
        };
      case 'capsule-left':
        return {
          ...baseStyle,
          ...posStyle,
          borderRadius: hasRoundCorner ? `${borderRadius}px 4px 4px ${borderRadius}px` : '999px 4px 4px 999px'
        };
      case 'capsule-right':
        return {
          ...baseStyle,
          ...posStyle,
          borderRadius: hasRoundCorner ? `4px ${borderRadius}px ${borderRadius}px 4px` : '4px 999px 999px 4px'
        };
      case 'round-top-left':
        return {
          ...baseStyle,
          ...posStyle,
          borderRadius: hasRoundCorner ? `${borderRadius}px 4px 4px 4px` : '14px 4px 4px 4px'
        };
      case 'round-top-right':
        return {
          ...baseStyle,
          ...posStyle,
          borderRadius: hasRoundCorner ? `4px ${borderRadius}px 4px 4px` : '4px 14px 4px 4px'
        };
      case 'round-diag1':
        return {
          ...baseStyle,
          ...posStyle,
          borderRadius: hasRoundCorner ? `${borderRadius}px 4px ${borderRadius}px 4px` : '14px 4px 14px 4px'
        };
      case 'round-diag2':
        return {
          ...baseStyle,
          ...posStyle,
          borderRadius: hasRoundCorner ? `4px ${borderRadius}px ${borderRadius}px 4px` : '4px 14px 4px 14px'
        };
      case 'slanted-left':
        return {
          ...baseStyle,
          ...posStyle,
          transform: (posStyle.transform || '') + ' skewX(-15deg)'
        };
      case 'slanted-right':
        return {
          ...baseStyle,
          ...posStyle,
          transform: (posStyle.transform || '') + ' skewX(15deg)'
        };
      case 'fold-left':
        return {
          ...baseStyle,
          ...posStyle,
          clipPath: 'polygon(8px 0%, 100% 0%, 100% 100%, 0% 100%, 0% 8px)',
          paddingLeft: '14px'
        };
      case 'fold-right':
        return {
          ...baseStyle,
          ...posStyle,
          clipPath: 'polygon(0% 0%, calc(100% - 8px) 0%, 100% 8px, 100% 100%, 0% 100%)',
          paddingRight: '14px'
        };
      case 'trapezoid-top':
        return {
          ...baseStyle,
          ...posStyle,
          clipPath: 'polygon(10% 0%, 90% 0%, 100% 100%, 0% 100%)',
          paddingLeft: '14px',
          paddingRight: '14px'
        };
      case 'trapezoid-bottom':
        return {
          ...baseStyle,
          ...posStyle,
          clipPath: 'polygon(0% 0%, 100% 0%, 90% 100%, 10% 100%)',
          paddingLeft: '14px',
          paddingRight: '14px'
        };
      case 'hexagon':
        return {
          ...baseStyle,
          ...posStyle,
          clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)'
        };
      default:
        return {
          ...baseStyle,
          ...posStyle
        };
    }
  };

  // Render badge helper (inside or outside)
  const renderLabelBadge = (isInsideSlot = true) => {
    if (!isActive || !isLabelVisibleOnCurrentPage()) return null;
    if (isInsideSlot && positionMode !== 'inside') return null;
    if (!isInsideSlot && positionMode !== 'outside') return null;

    if (isImageType) {
      return (
        <img
          src={selectedImageUrl}
          alt="Image Label"
          style={getImageBadgeStyle(isInsideSlot)}
        />
      );
    }

    return (
      <div className="live-rendered-badge" style={getBadgeStyle(isInsideSlot)}>
        {renderBadgeContent()}
      </div>
    );
  };

  // Outside badge slot between Title and Price
  const renderOutsideBadgeSlot = () => {
    if (positionMode !== 'outside' || !isActive || !isLabelVisibleOnCurrentPage()) return null;
    return (
      <div
        className="outside-badge-slot"
        style={{
          display: 'flex',
          justifyContent: anchor.endsWith('right') ? 'flex-end' : anchor.endsWith('center') ? 'center' : 'flex-start',
          marginTop: '6px',
          marginBottom: '6px'
        }}
      >
        {renderLabelBadge(false)}
      </div>
    );
  };

  // SECONDARY LABEL RENDERING HELPERS
  const renderSecondBadgeContent = () => {
    const hasIcon = secondBadgeIcon && secondIconPosition !== 'none';
    if (!hasIcon) {
      return <span style={{ whiteSpace: 'nowrap' }}>{secondTextContent}</span>;
    }
    const iconElem = (
      <span style={{ fontSize: '1.15em', lineHeight: 1, display: 'inline-flex', alignItems: 'center', flexShrink: 0 }}>
        {secondBadgeIcon}
      </span>
    );
    if (secondIconPosition === 'left') {
      return (
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', whiteSpace: 'nowrap', maxWidth: '100%' }}>
          {iconElem}
          <span style={{ whiteSpace: 'nowrap' }}>{secondTextContent}</span>
        </span>
      );
    }
    return (
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', whiteSpace: 'nowrap', maxWidth: '100%' }}>
        <span style={{ whiteSpace: 'nowrap' }}>{secondTextContent}</span>
        {iconElem}
      </span>
    );
  };

  function getSecondAnchorCoordinates() {
    const margin = 8;
    const coords = {};

    if (secondAnchor.startsWith('top')) {
      coords.top = `${margin + secondOffsetY}px`;
    } else if (secondAnchor.startsWith('bottom')) {
      coords.bottom = `${margin - secondOffsetY}px`;
    } else if (secondAnchor.startsWith('middle')) {
      coords.top = `calc(50% + ${secondOffsetY}px)`;
    }

    if (secondAnchor.endsWith('left')) {
      coords.left = `${margin + secondOffsetX}px`;
      if (secondAnchor.startsWith('middle')) {
        coords.transform = 'translateY(-50%)';
      }
    } else if (secondAnchor.endsWith('right')) {
      coords.right = `${margin - secondOffsetX}px`;
      if (secondAnchor.startsWith('middle')) {
        coords.transform = 'translateY(-50%)';
      }
    } else if (secondAnchor.endsWith('center')) {
      coords.left = `calc(50% + ${secondOffsetX}px)`;
      if (secondAnchor.startsWith('middle')) {
        coords.transform = 'translate(-50%, -50%)';
      } else {
        coords.transform = 'translateX(-50%)';
      }
    }

    return coords;
  }

  const getSecondImageBadgeStyle = (isInside = (secondPositionMode === 'inside')) => {
    const dimVal = secondImageUnit === '%' ? `${secondImageSize}%` : `${secondImageSize}px`;

    const style = {
      width: dimVal,
      minWidth: secondImageUnit === '%' ? 'auto' : `${secondImageSize}px`,
      maxWidth: '92%',
      height: secondLockAspectRatio ? 'auto' : dimVal,
      objectFit: secondLockAspectRatio ? 'contain' : 'fill',
      maxHeight: '80%',
      zIndex: 9,
      transition: 'all 0.15s ease',
      boxSizing: 'border-box'
    };

    if (secondHasBorder) {
      style.border = `${secondBorderWidth}px solid ${secondBorderColor}`;
    }

    if (secondHasRoundCorner) {
      style.borderRadius = `${secondBorderRadius}px`;
      style.overflow = 'hidden';
    } else {
      style.borderRadius = '0px';
    }

    if (isInside) {
      return {
        position: 'absolute',
        ...getSecondAnchorCoordinates(),
        ...style
      };
    }

    return {
      position: 'relative',
      ...style
    };
  };

  const getSecondBadgeStyle = (isInside = (secondPositionMode === 'inside')) => {
    const baseFontSize = Math.max(9, Math.round(8 + (secondTextSizePercent / 100) * 22 + (secondHeightPercent / 100) * 6));
    const vPadding = Math.max(3, Math.round(secondHeightPercent * 0.35));
    const hPadding = Math.max(8, Math.round(secondWidthPercent * 0.3));

    const baseStyle = {
      backgroundColor: secondBgColor,
      color: secondTextColor,
      fontFamily: secondFontFamily,
      fontWeight: secondIsBold ? 700 : 400,
      fontStyle: secondIsItalic ? 'italic' : 'normal',
      textDecoration: secondIsUnderline ? 'underline' : 'none',
      letterSpacing: `${secondLetterSpacing}px`,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      userSelect: 'none',
      zIndex: 9,
      width: 'auto',
      minWidth: `${Math.max(36, secondWidthPercent * 1.6)}px`,
      maxWidth: '92%',
      minHeight: `${Math.max(22, secondHeightPercent * 2.5)}px`,
      fontSize: `${baseFontSize}px`,
      padding: `${vPadding}px ${hPadding}px`,
      boxSizing: 'border-box',
      whiteSpace: 'nowrap',
      transition: 'all 0.15s ease'
    };

    if (secondHasBorder) {
      baseStyle.border = `${secondBorderWidth}px solid ${secondBorderColor}`;
    }

    if (secondHasRoundCorner) {
      baseStyle.borderRadius = `${secondBorderRadius}px`;
      baseStyle.overflow = 'hidden';
    } else {
      baseStyle.borderRadius = '0px';
    }

    const coords = isInside ? getSecondAnchorCoordinates() : {};
    const posStyle = isInside ? { position: 'absolute', ...coords } : { position: 'relative' };

    const hasIcon = secondBadgeIcon && secondIconPosition !== 'none';
    const textStr = secondTextContent || '';
    const estTextWidth = textStr.length * (baseFontSize * 0.62) + (hasIcon ? 28 : 0) + 24;

    switch (secondSelectedShape) {
      case 'corner-ribbon-left':
        return {
          ...baseStyle,
          ...posStyle,
          width: `${Math.max(90, secondWidthPercent * 3.5)}px`,
          height: `${Math.max(22, secondHeightPercent * 1.5)}px`,
          transform: (posStyle.transform || '') + ' rotate(-45deg)',
          fontSize: `${Math.max(9, baseFontSize - 2)}px`,
          textTransform: 'uppercase'
        };
      case 'corner-ribbon-right':
        return {
          ...baseStyle,
          ...posStyle,
          width: `${Math.max(90, secondWidthPercent * 3.5)}px`,
          height: `${Math.max(22, secondHeightPercent * 1.5)}px`,
          transform: (posStyle.transform || '') + ' rotate(45deg)',
          fontSize: `${Math.max(9, baseFontSize - 2)}px`,
          textTransform: 'uppercase'
        };
      case 'corner-triangle-left':
        return {
          ...baseStyle,
          ...posStyle,
          clipPath: 'polygon(0 0, 100% 0, 0 100%)',
          width: `${Math.max(44, secondWidthPercent * 1.8)}px`,
          height: `${Math.max(44, secondHeightPercent * 2.8)}px`,
          padding: '2px 0 0 2px'
        };
      case 'corner-triangle-right':
        return {
          ...baseStyle,
          ...posStyle,
          clipPath: 'polygon(0 0, 100% 0, 100% 100%)',
          width: `${Math.max(44, secondWidthPercent * 1.8)}px`,
          height: `${Math.max(44, secondHeightPercent * 2.8)}px`,
          padding: '2px 2px 0 0'
        };
      case 'circle': {
        const circleDim = Math.max(estTextWidth, Math.max(52, secondWidthPercent * 2.2));
        return {
          ...baseStyle,
          ...posStyle,
          borderRadius: '50%',
          width: `${circleDim}px`,
          height: `${circleDim}px`,
          minHeight: `${circleDim}px`,
          padding: '8px',
          overflow: 'hidden'
        };
      }
      case 'scallop': {
        const scallopDim = Math.max(estTextWidth, Math.max(52, secondWidthPercent * 2.2));
        return {
          ...baseStyle,
          ...posStyle,
          borderRadius: '40%',
          transform: (posStyle.transform || '') + ' rotate(45deg)',
          width: `${scallopDim}px`,
          height: `${scallopDim}px`,
          minHeight: `${scallopDim}px`,
          padding: '8px',
          overflow: 'hidden'
        };
      }
      case 'flag-left':
        return {
          ...baseStyle,
          ...posStyle,
          clipPath: 'polygon(0% 0%, 100% 0%, 85% 50%, 100% 100%, 0% 100%)',
          paddingRight: '18px'
        };
      case 'pointer-left':
        return {
          ...baseStyle,
          ...posStyle,
          clipPath: 'polygon(15% 0%, 100% 0%, 100% 100%, 15% 100%, 0% 50%)',
          paddingLeft: '16px'
        };
      case 'pointer-right':
        return {
          ...baseStyle,
          ...posStyle,
          clipPath: 'polygon(0% 0%, 85% 0%, 100% 50%, 85% 100%, 0% 100%)',
          paddingRight: '16px'
        };
      case 'double-notch':
        return {
          ...baseStyle,
          ...posStyle,
          clipPath: 'polygon(15% 0%, 85% 0%, 100% 50%, 85% 100%, 15% 100%, 0% 50%)',
          paddingLeft: '14px',
          paddingRight: '14px'
        };
      case 'arrow-notch':
        return {
          ...baseStyle,
          ...posStyle,
          clipPath: 'polygon(0% 0%, 85% 0%, 100% 50%, 85% 100%, 0% 100%, 15% 50%)',
          paddingLeft: '14px',
          paddingRight: '16px'
        };
      case 'capsule-full':
        return {
          ...baseStyle,
          ...posStyle,
          borderRadius: '999px'
        };
      case 'capsule-left':
        return {
          ...baseStyle,
          ...posStyle,
          borderRadius: secondHasRoundCorner ? `${secondBorderRadius}px 4px 4px ${secondBorderRadius}px` : '999px 4px 4px 999px'
        };
      case 'capsule-right':
        return {
          ...baseStyle,
          ...posStyle,
          borderRadius: secondHasRoundCorner ? `4px ${secondBorderRadius}px ${secondBorderRadius}px 4px` : '4px 999px 999px 4px'
        };
      case 'round-top-left':
        return {
          ...baseStyle,
          ...posStyle,
          borderRadius: secondHasRoundCorner ? `${secondBorderRadius}px 4px 4px 4px` : '14px 4px 4px 4px'
        };
      case 'round-top-right':
        return {
          ...baseStyle,
          ...posStyle,
          borderRadius: secondHasRoundCorner ? `4px ${secondBorderRadius}px ${secondBorderRadius}px 4px` : '4px 14px 4px 4px'
        };
      case 'round-diag1':
        return {
          ...baseStyle,
          ...posStyle,
          borderRadius: secondHasRoundCorner ? `${secondBorderRadius}px 4px ${secondBorderRadius}px 4px` : '14px 4px 14px 4px'
        };
      case 'round-diag2':
        return {
          ...baseStyle,
          ...posStyle,
          borderRadius: secondHasRoundCorner ? `4px ${secondBorderRadius}px ${secondBorderRadius}px 4px` : '4px 14px 4px 14px'
        };
      case 'slanted-left':
        return {
          ...baseStyle,
          ...posStyle,
          transform: (posStyle.transform || '') + ' skewX(-15deg)'
        };
      case 'slanted-right':
        return {
          ...baseStyle,
          ...posStyle,
          transform: (posStyle.transform || '') + ' skewX(15deg)'
        };
      case 'fold-left':
        return {
          ...baseStyle,
          ...posStyle,
          clipPath: 'polygon(8px 0%, 100% 0%, 100% 100%, 0% 100%, 0% 8px)',
          paddingLeft: '14px'
        };
      case 'fold-right':
        return {
          ...baseStyle,
          ...posStyle,
          clipPath: 'polygon(0% 0%, calc(100% - 8px) 0%, 100% 8px, 100% 100%, 0% 100%)',
          paddingRight: '14px'
        };
      case 'trapezoid-top':
        return {
          ...baseStyle,
          ...posStyle,
          clipPath: 'polygon(10% 0%, 90% 0%, 100% 100%, 0% 100%)',
          paddingLeft: '14px',
          paddingRight: '14px'
        };
      case 'trapezoid-bottom':
        return {
          ...baseStyle,
          ...posStyle,
          clipPath: 'polygon(0% 0%, 100% 0%, 90% 100%, 10% 100%)',
          paddingLeft: '14px',
          paddingRight: '14px'
        };
      case 'hexagon':
        return {
          ...baseStyle,
          ...posStyle,
          clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)'
        };
      default:
        return {
          ...baseStyle,
          ...posStyle
        };
    }
  };

  const renderSecondBadge = (isInsideSlot = true) => {
    if (!showMultipleLabelsPreview || !isActive || !isLabelVisibleOnCurrentPage()) return null;
    if (isInsideSlot && secondPositionMode !== 'inside') return null;
    if (!isInsideSlot && secondPositionMode !== 'outside') return null;

    if (secondLabelType === 'image') {
      return (
        <img
          src={secondSelectedImageUrl}
          alt="Second Image Label"
          style={getSecondImageBadgeStyle(isInsideSlot)}
        />
      );
    }

    return (
      <div className="live-rendered-badge second-live-badge" style={getSecondBadgeStyle(isInsideSlot)}>
        {renderSecondBadgeContent()}
      </div>
    );
  };

  const renderSecondOutsideBadgeSlot = () => {
    if (!showMultipleLabelsPreview || secondPositionMode !== 'outside' || !isActive || !isLabelVisibleOnCurrentPage()) return null;
    return (
      <div
        className="outside-badge-slot second-outside-badge"
        style={{
          display: 'flex',
          justifyContent: secondAnchor.endsWith('right') ? 'flex-end' : secondAnchor.endsWith('center') ? 'center' : 'flex-start',
          marginTop: '4px',
          marginBottom: '4px'
        }}
      >
        {renderSecondBadge(false)}
      </div>
    );
  };

  return (
    <div className="editor-container">
      {/* Top Application Bar */}
      <header className="editor-top-nav">
        <div className="top-nav-left">
          <button type="button" className="btn-back" onClick={onBack} title="Back to labels">
            ← Create label
          </button>

          {/* Top Nav Tabs (Design & Display - Products tab removed as requested) */}
          <div className="nav-tabs">
            {[
              {
                id: 'Design',
                label: 'Design',
                icon: (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '5px', verticalAlign: '-1px' }}>
                    <path d="M12 20h9"/>
                    <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
                  </svg>
                )
              },
              {
                id: 'Display',
                label: 'Display',
                icon: (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '5px', verticalAlign: '-1px' }}>
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                    <line x1="3" y1="9" x2="21" y2="9"/>
                    <line x1="9" y1="21" x2="9" y2="9"/>
                  </svg>
                )
              }
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                className={`nav-tab-btn ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="top-nav-center">
          <label className="name-input-group">
            <span className="name-label">Name:</span>
            <input
              type="text"
              value={labelName}
              onChange={(e) => setLabelName(e.target.value)}
              className="name-input"
            />
          </label>
        </div>

        <div className="top-nav-right">
          <select
            value={previewPage}
            onChange={(e) => setPreviewPage(e.target.value)}
            className="preview-select"
          >
            <option value="collection">Collection page ˅</option>
            <option value="product">Product page ˅</option>
            <option value="homepage">Homepage ˅</option>
            <option value="search">Search page ˅</option>
            <option value="cart">Cart page ˅</option>
          </select>

          <div className="device-switcher">
            <button
              type="button"
              className={`device-btn ${deviceView === 'desktop' ? 'active' : ''}`}
              onClick={() => setDeviceView('desktop')}
              title="Desktop view"
            >
              🖥️
            </button>
            <button
              type="button"
              className={`device-btn ${deviceView === 'mobile' ? 'active' : ''}`}
              onClick={() => setDeviceView('mobile')}
              title="Mobile view"
            >
              📱
            </button>
          </div>

          <div className="status-toggle-group">
            <button
              type="button"
              className={`status-btn active-state ${isActive ? 'selected' : ''}`}
              onClick={() => setIsActive(true)}
            >
              Active
            </button>
            <button
              type="button"
              className={`status-btn inactive-state ${!isActive ? 'selected' : ''}`}
              onClick={() => setIsActive(false)}
            >
              Inactive
            </button>
          </div>

          <button
            type="button"
            className="btn-primary"
            style={{ padding: '5px 14px', fontSize: '13px' }}
            onClick={() => {
              if (onSave) {
                onSave({
                  id: initialData?.id || Date.now(),
                  name: labelName,
                  type: isImageType ? 'image' : 'text',
                  positionMode,
                  anchor,
                  offsetX,
                  offsetY,
                  fillMode,
                  isActive,
                  textContent,
                  fontFamily,
                  isBold,
                  isItalic,
                  isUnderline,
                  selectedImageUrl,
                  selectedShape,
                  bgColor,
                  textColor,
                  badgeIcon,
                  iconPosition,
                  widthPercent,
                  heightPercent,
                  textSizePercent,
                  letterSpacing,
                  imageSize,
                  imageUnit,
                  lockAspectRatio,
                  hasBorder,
                  borderColor,
                  borderWidth,
                  hasRoundCorner,
                  borderRadius,
                  pageDisplay,
                  deviceDisplay,
                  targetMode,
                  targetTags,
                  showMultipleLabelsPreview,
                  secondLabelType,
                  secondSelectedImageUrl,
                  secondImageSize,
                  secondImageUnit,
                  secondLockAspectRatio,
                  secondFillMode,
                  secondBgColor,
                  secondSelectedShape,
                  secondPositionMode,
                  secondAnchor,
                  secondManualAdjust,
                  secondOffsetX,
                  secondOffsetY,
                  secondIsBold,
                  secondIsItalic,
                  secondIsUnderline,
                  secondTextContent,
                  secondFontFamily,
                  secondTextColor,
                  secondBadgeIcon,
                  secondIconPosition,
                  secondSizeMode,
                  secondWidthPercent,
                  secondHeightPercent,
                  secondTextSizePercent,
                  secondLetterSpacing,
                  secondHasBorder,
                  secondBorderColor,
                  secondBorderWidth,
                  secondHasRoundCorner,
                  secondBorderRadius
                });
              }
            }}
          >
            Save Label
          </button>
        </div>
      </header>

      {/* Main Workspace: Left Settings + Right Live Preview */}
      <div className="editor-main-body">
        {/* Left Settings Sidebar */}
        <aside className="editor-sidebar">
          {activeTab === 'Design' ? (
            <>
              {/* DESIGN TAB SECTIONS */}
              {/* 1. LABEL SHAPE / IMAGE SECTION */}
              {isImageType ? (
                <section className="settings-section">
                  <div className="section-header">
                    <span className="toggle-arrow">▾</span>
                    <h4>Image Label</h4>
                  </div>

                  <div className="image-label-picker-card">
                    <div className="image-badge-preview-box">
                      <img
                        src={selectedImageUrl}
                        alt="Selected Label"
                        className="badge-preview-img"
                        style={{
                          width: imageUnit === '%' ? `${imageSize}%` : `${imageSize}px`,
                          maxHeight: '100%',
                          objectFit: lockAspectRatio ? 'contain' : 'fill',
                          boxSizing: 'border-box',
                          ...(hasBorder ? { border: `${borderWidth}px solid ${borderColor}` } : {}),
                          ...(hasRoundCorner ? { borderRadius: `${borderRadius}px`, overflow: 'hidden' } : { borderRadius: '0px' })
                        }}
                      />
                    </div>
                    <div className="image-badge-actions">
                      <button
                        type="button"
                        className="btn-library-primary"
                        onClick={() => {
                          setGalleryTarget('primary');
                          setIsGalleryOpen(true);
                        }}
                      >
                        Choose from library
                      </button>
                      <label className="upload-link-label">
                        Upload image
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            setGalleryTarget('primary');
                            handleDirectImageUpload(e);
                          }}
                          className="hidden-file-input"
                        />
                      </label>
                    </div>
                  </div>

                  {/* AI Generator Banner */}
                  <div className="ai-generator-banner">
                    <div className="ai-banner-header">
                      <span className="ai-icon">✨</span>
                      <span className="ai-title">AI Label Generator</span>
                      <span className="badge-chip starter">Starter</span>
                    </div>
                    <div className="ai-banner-actions">
                      <button
                        type="button"
                        className="btn-ai-create"
                        onClick={() => {
                          setGalleryTarget('primary');
                          setIsGalleryOpen(true);
                        }}
                      >
                        Create with AI
                      </button>
                      <button
                        type="button"
                        className="btn-ai-template"
                        onClick={() => {
                          setGalleryTarget('primary');
                          setIsGalleryOpen(true);
                        }}
                      >
                        My AI templates
                      </button>
                    </div>
                  </div>
                </section>
              ) : (
                <section className="settings-section">
                  <div className="section-header">
                    <span className="toggle-arrow">▾</span>
                    <h4>Text Label</h4>
                  </div>

                  {/* Fill Mode Switcher */}
                  <div className="segmented-control">
                    <button
                      type="button"
                      className={`seg-btn ${fillMode === 'solid' ? 'active' : ''}`}
                      onClick={() => setFillMode('solid')}
                    >
                      Solid fill
                    </button>
                    <button
                      type="button"
                      className={`seg-btn ${fillMode === 'gradient' ? 'active' : ''}`}
                      onClick={() => setFillMode('gradient')}
                    >
                      Gradient fill
                    </button>
                    <button
                      type="button"
                      className={`seg-btn ${fillMode === 'background' ? 'active' : ''}`}
                      onClick={() => setFillMode('background')}
                    >
                      Background
                    </button>
                  </div>

                  {/* Color Swatch Picker */}
                  <div className="color-picker-row">
                    <input
                      type="color"
                      id="bg-color-picker"
                      value={bgColor}
                      onChange={(e) => setBgColor(e.target.value)}
                      className="color-circle-input"
                    />
                    <label htmlFor="bg-color-picker" className="color-label-group">
                      <span className="color-title">Background</span>
                      <span className="color-hex">{bgColor.toUpperCase()}</span>
                    </label>
                  </div>

                  {/* Shape Featured Box */}
                  <div className="shape-preview-card">
                    <div
                      className="shape-sample-display"
                      style={{
                        ...getBadgeStyle(),
                        position: 'relative',
                        top: 0,
                        left: 0,
                        right: 'auto',
                        bottom: 'auto',
                        transform: selectedShape.includes('slanted')
                          ? (selectedShape === 'slanted-left' ? 'skewX(-15deg)' : 'skewX(15deg)')
                          : selectedShape.includes('ribbon')
                          ? (selectedShape.includes('left') ? 'rotate(-45deg)' : 'rotate(45deg)')
                          : 'none',
                        width: 'auto',
                        minWidth: '90px',
                        maxWidth: '100%'
                      }}
                    >
                      {renderBadgeContent()}
                    </div>
                    <button
                      type="button"
                      className="btn-library"
                      onClick={() => {
                        setGalleryTarget('primary');
                        setIsGalleryOpen(true);
                      }}
                    >
                      Choose from library
                    </button>
                  </div>

                  {/* Shape Selector Grid */}
                  <div className="shape-grid">
                    {SHAPE_PRESETS.map((shape) => (
                      <button
                        key={shape.id}
                        type="button"
                        className={`shape-thumb-btn ${selectedShape === shape.id ? 'selected' : ''}`}
                        onClick={() => setSelectedShape(shape.id)}
                        title={shape.name}
                      >
                        <ShapeGlyphIcon type={shape.type} />
                      </button>
                    ))}
                  </div>
                </section>
              )}


              {/* 2. POSITION */}
              <section className="settings-section">
                <div className="section-header">
                  <span className="toggle-arrow">▾</span>
                  <h4>Position</h4>
                </div>

                {/* Inside vs Outside Product Image */}
                <div className="position-mode-cards">
                  <div
                    className={`pos-card ${positionMode === 'inside' ? 'selected' : ''}`}
                    onClick={() => setPositionMode('inside')}
                  >
                    <div className="pos-thumb-box inside">
                      <div className="mock-badge-block"></div>
                    </div>
                    <span className="pos-card-label">Inside product image</span>
                  </div>

                  <div
                    className={`pos-card ${positionMode === 'outside' ? 'selected' : ''}`}
                    onClick={() => setPositionMode('outside')}
                  >
                    <div className="pos-thumb-box outside" style={{ display: 'flex', alignItems: 'center', padding: '6px', gap: '8px' }}>
                      <div style={{ width: '36px', height: '44px', background: '#e2e8f0', borderRadius: '4px', flexShrink: 0 }}></div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', flex: 1 }}>
                        <div style={{ width: '30px', height: '10px', background: '#334155', borderRadius: '3px' }}></div>
                        <div style={{ width: '100%', height: '5px', background: '#cbd5e1', borderRadius: '2px' }}></div>
                        <div style={{ width: '60%', height: '5px', background: '#cbd5e1', borderRadius: '2px' }}></div>
                      </div>
                    </div>
                    <span className="pos-card-label">Outside product image</span>
                  </div>
                </div>

                {/* 9-Point Alignment Grid */}
                <div className="alignment-grid-box">
                  {[
                    { id: 'top-left', label: '↖' },
                    { id: 'top-center', label: '↑' },
                    { id: 'top-right', label: '↗' },
                    { id: 'middle-left', label: '←' },
                    { id: 'middle-center', label: '✛' },
                    { id: 'middle-right', label: '→' },
                    { id: 'bottom-left', label: '↙' },
                    { id: 'bottom-center', label: '↓' },
                    { id: 'bottom-right', label: '↘' }
                  ].map((point) => (
                    <button
                      key={point.id}
                      type="button"
                      className={`grid-point-btn ${anchor === point.id ? 'active' : ''}`}
                      onClick={() => setAnchor(point.id)}
                    >
                      {point.label}
                    </button>
                  ))}
                </div>

                <div className="helper-toggles">
                  <button
                    type="button"
                    className="link-toggle-btn"
                    onClick={() => setManualAdjust(!manualAdjust)}
                  >
                    Adjust position manually {manualAdjust ? '▲' : '▼'}
                  </button>
                </div>

                {manualAdjust && (
                  <div className="manual-adjust-box">
                    <div className="field-row">
                      <span>Offset X (px):</span>
                      <input
                        type="range"
                        min="-40"
                        max="40"
                        value={offsetX}
                        onChange={(e) => setOffsetX(Number(e.target.value))}
                      />
                      <span>{offsetX}px</span>
                    </div>
                    <div className="field-row">
                      <span>Offset Y (px):</span>
                      <input
                        type="range"
                        min="-40"
                        max="40"
                        value={offsetY}
                        onChange={(e) => setOffsetY(Number(e.target.value))}
                      />
                      <span>{offsetY}px</span>
                    </div>
                  </div>
                )}
              </section>

              {/* 3. CONTENT (Text Label Only) */}
              {!isImageType && (
                <section className="settings-section">
                  <div className="section-header">
                    <span className="toggle-arrow">▾</span>
                    <h4>Content</h4>
                  </div>

                  <label className="field-caption">Label content</label>
                  {/* Formatting Toolbar */}
                  <div className="formatting-toolbar">
                    <div className="format-tools-left">
                      <button
                        type="button"
                        className={`tool-btn ${isBold ? 'active' : ''}`}
                        onClick={() => setIsBold(!isBold)}
                        title="Bold"
                      >
                        B
                      </button>
                      <button
                        type="button"
                        className={`tool-btn ${isItalic ? 'active' : ''}`}
                        onClick={() => setIsItalic(!isItalic)}
                        title="Italic"
                      >
                        I
                      </button>
                      <button
                        type="button"
                        className={`tool-btn ${isUnderline ? 'active' : ''}`}
                        onClick={() => setIsUnderline(!isUnderline)}
                        title="Underline"
                      >
                        U
                      </button>
                      <button
                        type="button"
                        className="tool-btn"
                        onClick={() => handleInsertAutoText('🔥')}
                        title="Emoji"
                      >
                        🙂
                      </button>
                    </div>

                    <button
                      type="button"
                      className="btn-autotext"
                      onClick={() => handleInsertAutoText('{SAVE_PERCENT}%')}
                    >
                      ✨ AutoText
                    </button>
                  </div>

                  {/* Content Textarea */}
                  <textarea
                    className="content-textarea"
                    rows={2}
                    value={textContent}
                    onChange={(e) => setTextContent(e.target.value)}
                    placeholder="e.g. SAVE 20% or NEW ARRIVAL"
                  />

                  {/* Badge Icon Selector */}
                  <div className="form-group" style={{ marginTop: '12px' }}>
                    <label className="field-caption">Badge Icon</label>
                    <div className="icon-selector-row" style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap', marginBottom: '8px' }}>
                      {['🔥', '⭐', '🏷️', '⚡', '🎁', '💥', '🚚', '🌿', '💎', '❤️', 'None'].map((ic) => (
                        <button
                          key={ic}
                          type="button"
                          className={`icon-chip-btn ${badgeIcon === ic || (ic === 'None' && iconPosition === 'none') ? 'selected' : ''}`}
                          style={{
                            padding: '4px 8px',
                            borderRadius: '6px',
                            border: '1px solid #d0d3d6',
                            background: (badgeIcon === ic && iconPosition !== 'none') ? '#eff6ff' : (ic === 'None' && iconPosition === 'none') ? '#f1f2f4' : '#ffffff',
                            borderColor: (badgeIcon === ic && iconPosition !== 'none') ? '#2563eb' : '#d0d3d6',
                            cursor: 'pointer',
                            fontSize: '13px'
                          }}
                          onClick={() => {
                            if (ic === 'None') {
                              setIconPosition('none');
                            } else {
                              setBadgeIcon(ic);
                              if (iconPosition === 'none') setIconPosition('left');
                            }
                          }}
                        >
                          {ic}
                        </button>
                      ))}
                    </div>

                    {iconPosition !== 'none' && (
                      <div className="segmented-control" style={{ marginTop: '6px' }}>
                        <button
                          type="button"
                          className={`seg-btn ${iconPosition === 'left' ? 'active' : ''}`}
                          onClick={() => setIconPosition('left')}
                        >
                          Icon Left
                        </button>
                        <button
                          type="button"
                          className={`seg-btn ${iconPosition === 'right' ? 'active' : ''}`}
                          onClick={() => setIconPosition('right')}
                        >
                          Icon Right
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Font Picker */}
                  <div className="form-group" style={{ marginTop: '12px' }}>
                    <label className="field-caption">Font</label>
                    <select
                      className="standard-select"
                      value={fontFamily}
                      onChange={(e) => setFontFamily(e.target.value)}
                    >
                      {FONT_OPTIONS.map((font) => (
                        <option key={font} value={font}>
                          {font}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Text Color Swatch */}
                  <div className="color-picker-row" style={{ marginTop: '12px' }}>
                    <input
                      type="color"
                      id="text-color-picker"
                      value={textColor}
                      onChange={(e) => setTextColor(e.target.value)}
                      className="color-circle-input"
                    />
                    <label htmlFor="text-color-picker" className="color-label-group">
                      <span className="color-title">Text color</span>
                      <span className="color-hex">{textColor.toUpperCase()}</span>
                    </label>
                  </div>
                </section>
              )}

              {/* 4. SIZE */}
              <section className="settings-section">
                <div className="section-header">
                  <span className="toggle-arrow">▾</span>
                  <h4>Size</h4>
                </div>

                <div className="form-group">
                  <select
                    className="standard-select"
                    value={sizeMode}
                    onChange={(e) => setSizeMode(e.target.value)}
                  >
                    <option value="same">Same size on all screens</option>
                    <option value="responsive">Responsive auto-scale</option>
                  </select>
                </div>

                {isImageType ? (
                  <>
                    {/* Single Image Size Slider */}
                    <div className="slider-control-group">
                      <div className="slider-label-row">
                        <span>Size</span>
                        <div className="slider-value-badge">
                          <input
                            type="number"
                            value={imageSize}
                            onChange={(e) => setImageSize(Number(e.target.value))}
                            className="slider-num-input"
                          />
                          <select
                            value={imageUnit}
                            onChange={(e) => setImageUnit(e.target.value)}
                            className="unit-inline-select"
                          >
                            <option value="%">%</option>
                            <option value="px">px</option>
                          </select>
                        </div>
                      </div>
                      <input
                        type="range"
                        min="10"
                        max="80"
                        value={imageSize}
                        onChange={(e) => setImageSize(Number(e.target.value))}
                        className="range-slider"
                      />
                    </div>

                    {/* Lock Aspect Ratio Checkbox */}
                    <div className="checkbox-row">
                      <label className="checkbox-label">
                        <input
                          type="checkbox"
                          checked={lockAspectRatio}
                          onChange={(e) => setLockAspectRatio(e.target.checked)}
                        />
                        <span>Lock aspect ratio</span>
                      </label>
                    </div>
                  </>
                ) : (
                  <>
                    {/* Width Slider */}
                    <div className="slider-control-group">
                      <div className="slider-label-row">
                        <span>Width</span>
                        <div className="slider-value-badge">
                          <input
                            type="number"
                            value={widthPercent}
                            onChange={(e) => setWidthPercent(Number(e.target.value))}
                            className="slider-num-input"
                          />
                          <span>%</span>
                        </div>
                      </div>
                      <input
                        type="range"
                        min="10"
                        max="90"
                        value={widthPercent}
                        onChange={(e) => setWidthPercent(Number(e.target.value))}
                        className="range-slider"
                      />
                    </div>

                    {/* Height Slider */}
                    <div className="slider-control-group">
                      <div className="slider-label-row">
                        <span>Height</span>
                        <div className="slider-value-badge">
                          <input
                            type="number"
                            value={heightPercent}
                            onChange={(e) => setHeightPercent(Number(e.target.value))}
                            className="slider-num-input"
                          />
                          <span>%</span>
                        </div>
                      </div>
                      <input
                        type="range"
                        min="5"
                        max="50"
                        value={heightPercent}
                        onChange={(e) => setHeightPercent(Number(e.target.value))}
                        className="range-slider"
                      />
                    </div>

                    {/* Text size (% background height) */}
                    <div className="slider-control-group">
                      <div className="slider-label-row">
                        <span>Text size (% background height)</span>
                        <span className="plain-val">{textSizePercent}</span>
                      </div>
                      <input
                        type="range"
                        min="20"
                        max="80"
                        value={textSizePercent}
                        onChange={(e) => setTextSizePercent(Number(e.target.value))}
                        className="range-slider"
                      />
                    </div>

                    {/* Space between letters */}
                    <div className="slider-control-group">
                      <div className="slider-label-row">
                        <span>Space between letters (% background height)</span>
                        <span className="plain-val">{letterSpacing}</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="10"
                        value={letterSpacing}
                        onChange={(e) => setLetterSpacing(Number(e.target.value))}
                        className="range-slider"
                      />
                    </div>
                  </>
                )}
              </section>


              {/* 5. ADJUSTMENT */}
              <section className="settings-section">
                <div className="section-header">
                  <span className="toggle-arrow">▾</span>
                  <h4>Adjustment</h4>
                </div>

                <div className="checkbox-row">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={hasBorder}
                      onChange={(e) => setHasBorder(e.target.checked)}
                    />
                    <span>Add border around label</span>
                  </label>
                </div>

                {hasBorder && (
                  <div className="nested-settings-box">
                    <div className="field-row">
                      <span>Border Color:</span>
                      <input
                        type="color"
                        value={borderColor}
                        onChange={(e) => setBorderColor(e.target.value)}
                      />
                    </div>
                    <div className="field-row">
                      <span>Border Width (px):</span>
                      <input
                        type="range"
                        min="1"
                        max="6"
                        value={borderWidth}
                        onChange={(e) => setBorderWidth(Number(e.target.value))}
                      />
                      <span>{borderWidth}px</span>
                    </div>
                  </div>
                )}

                <div className="checkbox-row">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={hasRoundCorner}
                      onChange={(e) => setHasRoundCorner(e.target.checked)}
                    />
                    <span>Round corner</span>
                  </label>
                </div>

                {hasRoundCorner && (
                  <div className="nested-settings-box">
                    <div className="field-row">
                      <span>Corner Radius (px):</span>
                      <input
                        type="range"
                        min="2"
                        max="24"
                        value={borderRadius}
                        onChange={(e) => setBorderRadius(Number(e.target.value))}
                      />
                      <span>{borderRadius}px</span>
                    </div>
                  </div>
                )}
              </section>
            </>
          ) : (
            <>
              {/* DISPLAY TAB SECTIONS (Matching DECO Reference Screenshot) */}
              {/* 1. Page Display */}
              <section className="settings-section">
                <div className="section-header">
                  <span className="toggle-arrow">▾</span>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '6px', color: '#334155' }}>
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                    <polyline points="14 2 14 8 20 8"/>
                    <line x1="16" y1="13" x2="8" y2="13"/>
                    <line x1="16" y1="17" x2="8" y2="17"/>
                  </svg>
                  <h4>Page display</h4>
                </div>

                <div className="display-options-list" style={{ display: 'flex', flexDirection: 'column', gap: '10px', paddingLeft: '4px' }}>
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={pageDisplay.productPage}
                      onChange={(e) => setPageDisplay({ ...pageDisplay, productPage: e.target.checked })}
                    />
                    <span>Product page</span>
                  </label>

                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={pageDisplay.collectionPage}
                      onChange={(e) => setPageDisplay({ ...pageDisplay, collectionPage: e.target.checked })}
                    />
                    <span>Collection page</span>
                  </label>

                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={pageDisplay.homepage}
                      onChange={(e) => setPageDisplay({ ...pageDisplay, homepage: e.target.checked })}
                    />
                    <span>Homepage</span>
                  </label>

                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={pageDisplay.searchPage}
                      onChange={(e) => setPageDisplay({ ...pageDisplay, searchPage: e.target.checked })}
                    />
                    <span>Search page</span>
                  </label>

                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={pageDisplay.cartPage}
                      onChange={(e) => setPageDisplay({ ...pageDisplay, cartPage: e.target.checked })}
                    />
                    <span>Cart page</span>
                  </label>

                  <label className="checkbox-label" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <input
                      type="checkbox"
                      checked={pageDisplay.specificPages}
                      onChange={(e) => setPageDisplay({ ...pageDisplay, specificPages: e.target.checked })}
                    />
                    <span style={{ color: '#94a3b8' }}>Specific pages</span>
                    <span className="badge-chip starter" style={{ background: '#dbeafe', color: '#1d4ed8' }}>Growth</span>
                  </label>
                </div>
              </section>

              {/* 2. Device Display */}
              <section className="settings-section">
                <div className="section-header">
                  <span className="toggle-arrow">▾</span>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '6px', color: '#334155' }}>
                    <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
                    <line x1="8" y1="21" x2="16" y2="21"/>
                    <line x1="12" y1="17" x2="12" y2="21"/>
                  </svg>
                  <h4>Device display</h4>
                </div>

                <div className="display-options-list" style={{ display: 'flex', flexDirection: 'column', gap: '10px', paddingLeft: '4px' }}>
                  <label className="checkbox-label">
                    <input
                      type="radio"
                      name="deviceDisplay"
                      value="all"
                      checked={deviceDisplay === 'all'}
                      onChange={() => setDeviceDisplay('all')}
                    />
                    <span>All devices</span>
                  </label>

                  <label className="checkbox-label">
                    <input
                      type="radio"
                      name="deviceDisplay"
                      value="desktop"
                      checked={deviceDisplay === 'desktop'}
                      onChange={() => {
                        setDeviceDisplay('desktop');
                        setDeviceView('desktop');
                      }}
                    />
                    <span>Desktop</span>
                  </label>

                  <label className="checkbox-label">
                    <input
                      type="radio"
                      name="deviceDisplay"
                      value="mobile"
                      checked={deviceDisplay === 'mobile'}
                      onChange={() => {
                        setDeviceDisplay('mobile');
                        setDeviceView('mobile');
                      }}
                    />
                    <span>Mobile</span>
                  </label>
                </div>
              </section>

              {/* 3. Product Targeting (Tags / All Products) */}
              <section className="settings-section">
                <div className="section-header">
                  <span className="toggle-arrow">▾</span>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '6px', color: '#334155' }}>
                    <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/>
                    <line x1="7" y1="7" x2="7.01" y2="7"/>
                  </svg>
                  <h4>Product targeting</h4>
                </div>

                <div className="display-options-list" style={{ display: 'flex', flexDirection: 'column', gap: '10px', paddingLeft: '4px' }}>
                  <label className="checkbox-label">
                    <input
                      type="radio"
                      name="targetMode"
                      value="all"
                      checked={targetMode === 'all'}
                      onChange={() => setTargetMode('all')}
                    />
                    <span>All products</span>
                  </label>

                  <label className="checkbox-label">
                    <input
                      type="radio"
                      name="targetMode"
                      value="tags"
                      checked={targetMode === 'tags'}
                      onChange={() => setTargetMode('tags')}
                    />
                    <span>Products with specific tags</span>
                  </label>

                  {targetMode === 'tags' && (
                    <div style={{ marginTop: '4px', padding: '12px', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                      <label style={{ fontSize: '12px', fontWeight: 600, color: '#334155', display: 'block', marginBottom: '6px' }}>
                        Target Product Tags
                      </label>
                      <input
                        type="text"
                        className="form-input"
                        style={{ width: '100%', fontSize: '13px', padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }}
                        placeholder="e.g. eco-friendly, organic, green"
                        value={targetTags}
                        onChange={(e) => setTargetTags(e.target.value)}
                      />
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '8px', alignItems: 'center' }}>
                        <span style={{ fontSize: '11px', color: '#64748b' }}>Suggestions:</span>
                        {['eco-friendly', 'organic', 'sale', 'new', 'bestseller'].map((tag) => (
                          <button
                            key={tag}
                            type="button"
                            onClick={() => {
                              const current = (targetTags || '').trim();
                              if (!current) {
                                setTargetTags(tag);
                              } else if (!current.toLowerCase().includes(tag.toLowerCase())) {
                                setTargetTags(`${current}, ${tag}`);
                              }
                            }}
                            style={{
                              fontSize: '11px',
                              padding: '2px 8px',
                              borderRadius: '12px',
                              background: '#e2e8f0',
                              border: 'none',
                              color: '#334155',
                              cursor: 'pointer'
                            }}
                          >
                            +{tag}
                          </button>
                        ))}
                      </div>
                      <p style={{ fontSize: '11.5px', color: '#64748b', marginTop: '8px', lineHeight: '1.4', marginBottom: 0 }}>
                        🏷️ The badge will only appear on store products tagged with <strong>{targetTags || 'the specified tag'}</strong>.
                      </p>
                    </div>
                  )}
                </div>
              </section>

              {/* 4. Multi-Label Stacking Logic */}
              <section className="settings-section">
                <div className="section-header">
                  <span className="toggle-arrow">▾</span>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '6px', color: '#334155' }}>
                    <polygon points="12 2 2 7 12 12 22 7 12 2"/>
                    <polyline points="2 17 12 22 22 17"/>
                    <polyline points="2 12 12 17 22 12"/>
                  </svg>
                  <h4>Multi-Label Support</h4>
                </div>

                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={showMultipleLabelsPreview}
                    onChange={(e) => setShowMultipleLabelsPreview(e.target.checked)}
                  />
                  <span style={{ fontWeight: 600 }}>Allow multiple labels per product</span>
                </label>
                <p style={{ fontSize: '12px', color: '#64748b', marginTop: '6px', lineHeight: '1.4' }}>
                  Enables stacking multiple active labels on the same product with independent design & position controls.
                </p>

                {/* When toggle is ON: Display all properties matching Design Tab */}
                {showMultipleLabelsPreview && (
                  <div className="secondary-label-builder-box">
                    <div className="second-label-banner-title">
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontSize: '16px' }}>🏷️</span>
                        <span style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a' }}>Secondary Label Design</span>
                      </div>
                      <span className="second-label-tag">● Live Preview Active</span>
                    </div>

                    {/* 1. Secondary Label Type Switcher */}
                    <div>
                      <label className="field-caption">Secondary Label Type</label>
                      <div className="segmented-control">
                        <button
                          type="button"
                          className={`seg-btn ${secondLabelType === 'text' ? 'active' : ''}`}
                          onClick={() => setSecondLabelType('text')}
                        >
                          🏷️ Text Label
                        </button>
                        <button
                          type="button"
                          className={`seg-btn ${secondLabelType === 'image' ? 'active' : ''}`}
                          onClick={() => setSecondLabelType('image')}
                        >
                          🖼️ Image Label
                        </button>
                      </div>
                    </div>

                    {secondLabelType === 'image' ? (
                      <>
                        {/* SECONDARY IMAGE LABEL SETTINGS */}
                        <div className="second-subsection-divider">
                          <label className="field-caption">Image Source</label>
                          <div className="image-label-picker-card" style={{ marginTop: '6px' }}>
                            <div className="image-badge-preview-box" style={{ height: '70px' }}>
                              <img
                                src={secondSelectedImageUrl}
                                alt="Selected Second Label"
                                className="badge-preview-img"
                                style={{
                                  width: secondImageUnit === '%' ? `${secondImageSize}%` : `${secondImageSize}px`,
                                  maxHeight: '100%',
                                  objectFit: secondLockAspectRatio ? 'contain' : 'fill',
                                  boxSizing: 'border-box',
                                  ...(secondHasBorder ? { border: `${secondBorderWidth}px solid ${secondBorderColor}` } : {}),
                                  ...(secondHasRoundCorner ? { borderRadius: `${secondBorderRadius}px`, overflow: 'hidden' } : { borderRadius: '0px' })
                                }}
                              />
                            </div>
                            <div className="image-badge-actions">
                              <button
                                type="button"
                                className="btn-library-primary"
                                onClick={() => {
                                  setGalleryTarget('secondary');
                                  setIsGalleryOpen(true);
                                }}
                              >
                                Choose from library
                              </button>
                              <label className="upload-link-label">
                                Upload image
                                <input
                                  type="file"
                                  accept="image/*"
                                  onChange={(e) => {
                                    setGalleryTarget('secondary');
                                    handleDirectImageUpload(e);
                                  }}
                                  className="hidden-file-input"
                                />
                              </label>
                            </div>
                          </div>
                        </div>

                        {/* Image Size */}
                        <div className="second-subsection-divider">
                          <label className="field-caption">Image Size</label>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                            <input
                              type="range"
                              min={secondImageUnit === '%' ? '10' : '30'}
                              max={secondImageUnit === '%' ? '90' : '200'}
                              value={secondImageSize}
                              onChange={(e) => setSecondImageSize(Number(e.target.value))}
                              className="range-slider"
                            />
                            <span style={{ fontSize: '13px', fontWeight: 600, minWidth: '40px', textAlign: 'right' }}>
                              {secondImageSize}{secondImageUnit}
                            </span>
                          </div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div className="segmented-control" style={{ width: '110px' }}>
                              <button
                                type="button"
                                className={`seg-btn ${secondImageUnit === '%' ? 'active' : ''}`}
                                onClick={() => {
                                  setSecondImageUnit('%');
                                  setSecondImageSize(26);
                                }}
                              >
                                %
                              </button>
                              <button
                                type="button"
                                className={`seg-btn ${secondImageUnit === 'px' ? 'active' : ''}`}
                                onClick={() => {
                                  setSecondImageUnit('px');
                                  setSecondImageSize(80);
                                }}
                              >
                                px
                              </button>
                            </div>
                            <label className="checkbox-label" style={{ fontSize: '12px' }}>
                              <input
                                type="checkbox"
                                checked={secondLockAspectRatio}
                                onChange={(e) => setSecondLockAspectRatio(e.target.checked)}
                              />
                              <span>Lock aspect ratio</span>
                            </label>
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        {/* SECONDARY TEXT LABEL SETTINGS */}
                        {/* 1. Fill & Shape */}
                        <div className="second-subsection-divider">
                          <label className="field-caption">Fill Mode & Background</label>
                          <div className="segmented-control" style={{ marginBottom: '10px' }}>
                            <button
                              type="button"
                              className={`seg-btn ${secondFillMode === 'solid' ? 'active' : ''}`}
                              onClick={() => setSecondFillMode('solid')}
                            >
                              Solid fill
                            </button>
                            <button
                              type="button"
                              className={`seg-btn ${secondFillMode === 'gradient' ? 'active' : ''}`}
                              onClick={() => setSecondFillMode('gradient')}
                            >
                              Gradient fill
                            </button>
                            <button
                              type="button"
                              className={`seg-btn ${secondFillMode === 'background' ? 'active' : ''}`}
                              onClick={() => setSecondFillMode('background')}
                            >
                              Background
                            </button>
                          </div>

                          <div className="color-picker-row" style={{ marginBottom: '12px' }}>
                            <input
                              type="color"
                              id="second-bg-color-picker"
                              value={secondBgColor}
                              onChange={(e) => setSecondBgColor(e.target.value)}
                              className="color-circle-input"
                            />
                            <label htmlFor="second-bg-color-picker" className="color-label-group">
                              <span className="color-title">Background color</span>
                              <span className="color-hex">{secondBgColor.toUpperCase()}</span>
                            </label>
                          </div>

                          <label className="field-caption">Badge Shape</label>
                          <div className="shape-preview-card" style={{ padding: '12px', marginBottom: '10px' }}>
                            <div
                              className="shape-sample-display"
                              style={{
                                ...getSecondBadgeStyle(false),
                                position: 'relative',
                                top: 0,
                                left: 0,
                                right: 'auto',
                                bottom: 'auto',
                                transform: secondSelectedShape.includes('slanted')
                                  ? (secondSelectedShape === 'slanted-left' ? 'skewX(-15deg)' : 'skewX(15deg)')
                                  : secondSelectedShape.includes('ribbon')
                                  ? (secondSelectedShape.includes('left') ? 'rotate(-45deg)' : 'rotate(45deg)')
                                  : 'none',
                                width: 'auto',
                                minWidth: '90px',
                                maxWidth: '100%'
                              }}
                            >
                              {renderSecondBadgeContent()}
                            </div>
                            <button
                              type="button"
                              className="btn-library"
                              onClick={() => {
                                setGalleryTarget('secondary');
                                setIsGalleryOpen(true);
                              }}
                            >
                              Choose from library
                            </button>
                          </div>

                          {/* AI Generator Banner for Secondary Text Label */}
                          <div className="ai-generator-banner" style={{ marginTop: '6px', marginBottom: '10px' }}>
                            <div className="ai-banner-header">
                              <span className="ai-icon">✨</span>
                              <span className="ai-title">AI Label Generator</span>
                              <span className="badge-chip starter">Starter</span>
                            </div>
                            <div className="ai-banner-actions">
                              <button
                                type="button"
                                className="btn-ai-create"
                                onClick={() => {
                                  setGalleryTarget('secondary');
                                  setIsGalleryOpen(true);
                                }}
                              >
                                Create with AI
                              </button>
                              <button
                                type="button"
                                className="btn-ai-template"
                                onClick={() => {
                                  setGalleryTarget('secondary');
                                  setIsGalleryOpen(true);
                                }}
                              >
                                My AI templates
                              </button>
                            </div>
                          </div>

                          <div className="shape-grid" style={{ gridTemplateColumns: 'repeat(5, 1fr)', maxHeight: '150px', overflowY: 'auto', padding: '4px' }}>
                            {SHAPE_PRESETS.map((preset) => (
                              <button
                                key={preset.id}
                                type="button"
                                className={`shape-thumb-btn ${secondSelectedShape === preset.id ? 'selected' : ''}`}
                                onClick={() => setSecondSelectedShape(preset.id)}
                                title={preset.name}
                              >
                                <ShapeGlyphIcon type={preset.type} />
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* 2. Content & Formatting */}
                        <div className="second-subsection-divider">
                          <label className="field-caption">Content & Text</label>
                          <div className="formatting-toolbar">
                            <div className="format-tools-left">
                              <button
                                type="button"
                                className={`tool-btn ${secondIsBold ? 'active' : ''}`}
                                onClick={() => setSecondIsBold(!secondIsBold)}
                                title="Bold"
                              >
                                B
                              </button>
                              <button
                                type="button"
                                className={`tool-btn ${secondIsItalic ? 'active' : ''}`}
                                onClick={() => setSecondIsItalic(!secondIsItalic)}
                                title="Italic"
                              >
                                I
                              </button>
                              <button
                                type="button"
                                className={`tool-btn ${secondIsUnderline ? 'active' : ''}`}
                                onClick={() => setSecondIsUnderline(!secondIsUnderline)}
                                title="Underline"
                              >
                                U
                              </button>
                              <button
                                type="button"
                                className="tool-btn"
                                onClick={() => handleInsertAutoText('🔥', true)}
                                title="Emoji"
                              >
                                🙂
                              </button>
                            </div>

                            <button
                              type="button"
                              className="btn-autotext"
                              onClick={() => handleInsertAutoText('{SAVE_PERCENT}%', true)}
                            >
                              ✨ AutoText
                            </button>
                          </div>

                          <textarea
                            className="content-textarea"
                            rows={2}
                            value={secondTextContent}
                            onChange={(e) => setSecondTextContent(e.target.value)}
                            placeholder="e.g. NEW ARRIVAL or 50% OFF"
                          />

                          {/* Badge Icon Selector */}
                          <div className="form-group" style={{ marginTop: '8px' }}>
                            <label className="field-caption">Badge Icon</label>
                            <div className="icon-selector-row" style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap', marginBottom: '8px' }}>
                              {['🔥', '⭐', '🏷️', '⚡', '🎁', '💥', '🚚', '🌿', '💎', '❤️', 'None'].map((ic) => (
                                <button
                                  key={ic}
                                  type="button"
                                  className={`icon-chip-btn ${secondBadgeIcon === ic || (ic === 'None' && secondIconPosition === 'none') ? 'selected' : ''}`}
                                  style={{
                                    padding: '3px 7px',
                                    borderRadius: '6px',
                                    border: '1px solid #d0d3d6',
                                    background: (secondBadgeIcon === ic && secondIconPosition !== 'none') ? '#eff6ff' : (ic === 'None' && secondIconPosition === 'none') ? '#f1f2f4' : '#ffffff',
                                    borderColor: (secondBadgeIcon === ic && secondIconPosition !== 'none') ? '#2563eb' : '#d0d3d6',
                                    cursor: 'pointer',
                                    fontSize: '12.5px'
                                  }}
                                  onClick={() => {
                                    if (ic === 'None') {
                                      setSecondIconPosition('none');
                                    } else {
                                      setSecondBadgeIcon(ic);
                                      if (secondIconPosition === 'none') setSecondIconPosition('left');
                                    }
                                  }}
                                >
                                  {ic}
                                </button>
                              ))}
                            </div>

                            {secondIconPosition !== 'none' && (
                              <div className="segmented-control" style={{ marginTop: '4px' }}>
                                <button
                                  type="button"
                                  className={`seg-btn ${secondIconPosition === 'left' ? 'active' : ''}`}
                                  onClick={() => setSecondIconPosition('left')}
                                >
                                  Icon Left
                                </button>
                                <button
                                  type="button"
                                  className={`seg-btn ${secondIconPosition === 'right' ? 'active' : ''}`}
                                  onClick={() => setSecondIconPosition('right')}
                                >
                                  Icon Right
                                </button>
                              </div>
                            )}
                          </div>

                          {/* Font Family */}
                          <div className="form-group" style={{ marginTop: '8px' }}>
                            <label className="field-caption">Font</label>
                            <select
                              className="standard-select"
                              value={secondFontFamily}
                              onChange={(e) => setSecondFontFamily(e.target.value)}
                            >
                              {FONT_OPTIONS.map((font) => (
                                <option key={font} value={font}>
                                  {font}
                                </option>
                              ))}
                            </select>
                          </div>

                          {/* Text Color Swatch */}
                          <div className="color-picker-row" style={{ marginTop: '8px' }}>
                            <input
                              type="color"
                              id="second-text-color-picker"
                              value={secondTextColor}
                              onChange={(e) => setSecondTextColor(e.target.value)}
                              className="color-circle-input"
                            />
                            <label htmlFor="second-text-color-picker" className="color-label-group">
                              <span className="color-title">Text color</span>
                              <span className="color-hex">{secondTextColor.toUpperCase()}</span>
                            </label>
                          </div>
                        </div>

                        {/* 3. Size */}
                        <div className="second-subsection-divider">
                          <label className="field-caption">Size Options</label>
                          <div className="field-row" style={{ marginBottom: '8px' }}>
                            <span style={{ fontSize: '13px', color: '#475569' }}>Width (%):</span>
                            <input
                              type="range"
                              min="10"
                              max="80"
                              value={secondWidthPercent}
                              onChange={(e) => setSecondWidthPercent(Number(e.target.value))}
                              className="range-slider"
                            />
                            <span style={{ fontSize: '13px', fontWeight: 600 }}>{secondWidthPercent}%</span>
                          </div>

                          <div className="field-row" style={{ marginBottom: '8px' }}>
                            <span style={{ fontSize: '13px', color: '#475569' }}>Height (%):</span>
                            <input
                              type="range"
                              min="5"
                              max="35"
                              value={secondHeightPercent}
                              onChange={(e) => setSecondHeightPercent(Number(e.target.value))}
                              className="range-slider"
                            />
                            <span style={{ fontSize: '13px', fontWeight: 600 }}>{secondHeightPercent}%</span>
                          </div>

                          <div className="field-row" style={{ marginBottom: '8px' }}>
                            <span style={{ fontSize: '13px', color: '#475569' }}>Text size (%):</span>
                            <input
                              type="range"
                              min="20"
                              max="80"
                              value={secondTextSizePercent}
                              onChange={(e) => setSecondTextSizePercent(Number(e.target.value))}
                              className="range-slider"
                            />
                            <span style={{ fontSize: '13px', fontWeight: 600 }}>{secondTextSizePercent}%</span>
                          </div>

                          <div className="field-row">
                            <span style={{ fontSize: '13px', color: '#475569' }}>Letter spacing (px):</span>
                            <input
                              type="range"
                              min="0"
                              max="8"
                              value={secondLetterSpacing}
                              onChange={(e) => setSecondLetterSpacing(Number(e.target.value))}
                              className="range-slider"
                            />
                            <span style={{ fontSize: '13px', fontWeight: 600 }}>{secondLetterSpacing}px</span>
                          </div>
                        </div>
                      </>
                    )}

                    {/* Common: Position Settings */}
                    <div className="second-subsection-divider">
                      <label className="field-caption">Position</label>
                      <div className="position-mode-cards" style={{ marginBottom: '12px' }}>
                        <div
                          className={`pos-card ${secondPositionMode === 'inside' ? 'selected' : ''}`}
                          onClick={() => setSecondPositionMode('inside')}
                        >
                          <div className="pos-thumb-box" style={{ height: '56px' }}>
                            <div className="mock-badge-block" style={{ top: '6px', right: '6px', left: 'auto', background: '#10b981' }}></div>
                          </div>
                          <span className="pos-card-label">Inside image</span>
                        </div>

                        <div
                          className={`pos-card ${secondPositionMode === 'outside' ? 'selected' : ''}`}
                          onClick={() => setSecondPositionMode('outside')}
                        >
                          <div className="pos-thumb-box" style={{ height: '56px' }}>
                            <div className="mock-badge-block" style={{ top: '34px', left: '8px', background: '#10b981' }}></div>
                          </div>
                          <span className="pos-card-label">Outside image</span>
                        </div>
                      </div>

                      {secondPositionMode === 'inside' && (
                        <>
                          <label className="field-caption">Alignment (9-Point Grid)</label>
                          <div className="alignment-grid-box" style={{ marginBottom: '10px' }}>
                            {[
                              { id: 'top-left', label: '↖' },
                              { id: 'top-center', label: '↑' },
                              { id: 'top-right', label: '↗' },
                              { id: 'middle-left', label: '←' },
                              { id: 'middle-center', label: '•' },
                              { id: 'middle-right', label: '→' },
                              { id: 'bottom-left', label: '↙' },
                              { id: 'bottom-center', label: '↓' },
                              { id: 'bottom-right', label: '↘' }
                            ].map((point) => (
                              <button
                                key={point.id}
                                type="button"
                                className={`grid-point-btn ${secondAnchor === point.id ? 'active' : ''}`}
                                onClick={() => setSecondAnchor(point.id)}
                                title={point.id}
                              >
                                {point.label}
                              </button>
                            ))}
                          </div>
                        </>
                      )}

                      <div className="checkbox-row">
                        <label className="checkbox-label">
                          <input
                            type="checkbox"
                            checked={secondManualAdjust}
                            onChange={(e) => setSecondManualAdjust(e.target.checked)}
                          />
                          <span>Manual position adjust</span>
                        </label>
                      </div>

                      {secondManualAdjust && (
                        <div className="nested-settings-box" style={{ marginTop: '8px' }}>
                          <div className="field-row">
                            <span style={{ fontSize: '12px' }}>Offset X (px):</span>
                            <input
                              type="range"
                              min="-40"
                              max="40"
                              value={secondOffsetX}
                              onChange={(e) => setSecondOffsetX(Number(e.target.value))}
                            />
                            <span style={{ fontSize: '12px' }}>{secondOffsetX}px</span>
                          </div>
                          <div className="field-row">
                            <span style={{ fontSize: '12px' }}>Offset Y (px):</span>
                            <input
                              type="range"
                              min="-40"
                              max="40"
                              value={secondOffsetY}
                              onChange={(e) => setSecondOffsetY(Number(e.target.value))}
                            />
                            <span style={{ fontSize: '12px' }}>{secondOffsetY}px</span>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Common: Adjustments (Border & Rounded Corners) */}
                    <div className="second-subsection-divider">
                      <label className="field-caption">Adjustments</label>
                      
                      <div className="checkbox-row" style={{ marginBottom: '8px' }}>
                        <label className="checkbox-label">
                          <input
                            type="checkbox"
                            checked={secondHasBorder}
                            onChange={(e) => setSecondHasBorder(e.target.checked)}
                          />
                          <span>Add border around label</span>
                        </label>
                      </div>

                      {secondHasBorder && (
                        <div className="nested-settings-box" style={{ marginBottom: '10px' }}>
                          <div className="field-row">
                            <span>Border Color:</span>
                            <input
                              type="color"
                              value={secondBorderColor}
                              onChange={(e) => setSecondBorderColor(e.target.value)}
                            />
                          </div>
                          <div className="field-row">
                            <span>Border Width (px):</span>
                            <input
                              type="range"
                              min="1"
                              max="6"
                              value={secondBorderWidth}
                              onChange={(e) => setSecondBorderWidth(Number(e.target.value))}
                            />
                            <span>{secondBorderWidth}px</span>
                          </div>
                        </div>
                      )}

                      <div className="checkbox-row">
                        <label className="checkbox-label">
                          <input
                            type="checkbox"
                            checked={secondHasRoundCorner}
                            onChange={(e) => setSecondHasRoundCorner(e.target.checked)}
                          />
                          <span>Round corner</span>
                        </label>
                      </div>

                      {secondHasRoundCorner && (
                        <div className="nested-settings-box" style={{ marginTop: '8px' }}>
                          <div className="field-row">
                            <span>Corner Radius (px):</span>
                            <input
                              type="range"
                              min="2"
                              max="24"
                              value={secondBorderRadius}
                              onChange={(e) => setSecondBorderRadius(Number(e.target.value))}
                            />
                            <span>{secondBorderRadius}px</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </section>
            </>
          )}
        </aside>

        {/* Right Live Preview Area */}
        <main className="editor-preview-area">
          <div className="preview-canvas-card">
            <div className="canvas-header-indicator">
              <span>Live Storefront Preview — {{
                collection: 'Collection Catalog Grid',
                product: 'Single Product Detail Page (PDP)',
                homepage: 'Storefront Homepage',
                search: 'Search Results Page',
                cart: 'Shopping Cart & Drawer'
              }[previewPage] || 'Storefront Canvas'}</span>
              <span className="active-pill" style={{ background: (isActive && isLabelVisibleOnCurrentPage()) ? '#d1fae5' : '#fee2e2', color: (isActive && isLabelVisibleOnCurrentPage()) ? '#065f46' : '#991b1b' }}>
                {isActive && isLabelVisibleOnCurrentPage() ? '● Live Active' : '○ Hidden/Inactive'}
              </span>
            </div>

            {!isLabelVisibleOnCurrentPage() && (
              <div style={{ background: '#fef3c7', border: '1px solid #fde68a', color: '#92400e', padding: '10px 16px', borderRadius: '10px', marginBottom: '16px', fontSize: '13px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px', flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span>⚠️</span>
                  <span>{getHiddenReasonMessage()}</span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    if (previewPage === 'collection') setPageDisplay(p => ({ ...p, collectionPage: true }));
                    if (previewPage === 'product') setPageDisplay(p => ({ ...p, productPage: true }));
                    if (previewPage === 'homepage') setPageDisplay(p => ({ ...p, homepage: true }));
                    if (previewPage === 'search') setPageDisplay(p => ({ ...p, searchPage: true }));
                    if (previewPage === 'cart') setPageDisplay(p => ({ ...p, cartPage: true }));
                    if (deviceDisplay !== 'all') setDeviceDisplay('all');
                  }}
                  style={{
                    background: '#fef3c7',
                    border: '1px solid #fde68a',
                    color: '#b45309',
                    padding: '4px 10px',
                    borderRadius: '6px',
                    fontSize: '12px',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  Enable for this page
                </button>
              </div>
            )}

            {/* Dynamic Storefront Layout per previewPage selection */}
            {previewPage === 'product' && (
              <div className="pdp-preview-container">
                <div className="storefront-subnav">
                  <div className="storefront-breadcrumb">
                    <span>Home</span>
                    <span>/</span>
                    <span>Collections</span>
                    <span>/</span>
                    <span>Living Room</span>
                    <span>/</span>
                    <span style={{ color: '#0f172a', fontWeight: 600 }}>Ergonomic Lounge Armchair</span>
                  </div>
                  <span style={{ fontSize: '11.5px', color: '#10b981', fontWeight: 700 }}>● In Stock</span>
                </div>

                <div className={`pdp-split-grid ${deviceView}`}>
                  {/* Gallery Left */}
                  <div className="pdp-gallery-col">
                    <div className="pdp-hero-frame">
                      {/* Multi-Label secondary badge inside */}
                      {renderSecondBadge(true)}

                      {/* Main Label inside image */}
                      {renderLabelBadge(true)}

                      <ArmchairSvg style={{ width: '80%', height: '80%' }} />
                    </div>

                    <div className="pdp-thumb-strip">
                      <div className="pdp-thumb-item active">
                        <ArmchairSvg style={{ width: '80%', height: '80%' }} />
                      </div>
                      <div className="pdp-thumb-item">
                        <span style={{ fontSize: '20px' }}>📐</span>
                      </div>
                      <div className="pdp-thumb-item">
                        <span style={{ fontSize: '20px' }}>🛋️</span>
                      </div>
                    </div>
                  </div>

                  {/* Buy Box Right */}
                  <div className="pdp-buy-box">
                    <div className="pdp-vendor-tag">STICKERPULSE COMFORT</div>
                    <h1 className="pdp-product-title">Ergonomic Lounge Armchair</h1>

                    <div className="pdp-rating-row">
                      <span>★★★★★</span>
                      <span style={{ color: '#475569', fontWeight: 600 }}>4.9 (128 reviews)</span>
                    </div>

                    {/* Outside badge slot placed directly between title and price */}
                    {renderOutsideBadgeSlot()}
                    {renderSecondOutsideBadgeSlot()}

                    <div className="pdp-price-row">
                      <span className="pdp-main-price">$120.00 USD</span>
                      <span className="pdp-compare-price">$150.00 USD</span>
                      <span className="pdp-save-badge">SAVE 20%</span>
                    </div>

                    <div className="pdp-swatch-row">
                      <span style={{ fontSize: '13px', fontWeight: 600, color: '#334155' }}>Color: Slate Gray</span>
                      <div className="pdp-swatch-options">
                        <button type="button" className="pdp-color-pill active">Slate Gray</button>
                        <button type="button" className="pdp-color-pill">Ruby Crimson</button>
                        <button type="button" className="pdp-color-pill">Forest Green</button>
                      </div>
                    </div>

                    <div className="pdp-qty-cta-row">
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span style={{ fontSize: '13px', fontWeight: 600, color: '#334155' }}>Quantity:</span>
                        <div style={{ display: 'inline-flex', border: '1px solid #cbd5e1', borderRadius: '6px', overflow: 'hidden' }}>
                          <button type="button" style={{ padding: '4px 10px', border: 'none', background: '#f8fafc', cursor: 'pointer' }}>-</button>
                          <span style={{ padding: '4px 12px', fontSize: '13px', fontWeight: 600 }}>1</span>
                          <button type="button" style={{ padding: '4px 10px', border: 'none', background: '#f8fafc', cursor: 'pointer' }}>+</button>
                        </div>
                      </div>

                      <button type="button" className="pdp-btn-cart">
                        <span>🛒</span> Add to Cart
                      </button>
                      <button type="button" className="pdp-btn-shoppay">
                        Buy with <span style={{ fontWeight: 800 }}>Shop</span><span style={{ background: '#5a31f4', color: '#fff', border: '1px solid #fff', borderRadius: '3px', padding: '0 4px', marginLeft: '2px', fontSize: '11px' }}>Pay</span>
                      </button>
                    </div>

                    <div className="pdp-perks-box">
                      <div>🚚 <strong>Free standard delivery</strong> on orders over $50</div>
                      <div>🛡️ <strong>30-Day in-home trial</strong> with free returns</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {previewPage === 'homepage' && (
              <div className="homepage-preview-container">
                <div className="store-announcement-bar">
                  <span>🎉</span>
                  <span>FLASH SALE: Up to 40% OFF with code PULSE20 • Free shipping worldwide</span>
                </div>

                <div className="store-header-mock">
                  <div style={{ fontWeight: 800, fontSize: '15px', color: '#0f172a', letterSpacing: '-0.3px' }}>
                    STICKERPULSE <span style={{ color: '#2563eb' }}>HOME</span>
                  </div>
                  <div style={{ display: 'flex', gap: '14px', fontSize: '12.5px', color: '#475569', fontWeight: 600 }}>
                    <span style={{ color: '#2563eb' }}>Home</span>
                    <span>Catalog</span>
                    <span>New Arrivals</span>
                    <span>About Us</span>
                  </div>
                </div>

                <div className="store-hero-banner">
                  <span style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', color: '#93c5fd' }}>Autumn Collection 2026</span>
                  <h2 style={{ fontSize: '20px', fontWeight: 800, margin: 0 }}>Elevate Your Space with Modern Living</h2>
                  <p style={{ fontSize: '12.5px', color: '#cbd5e1', margin: 0 }}>Discover handcrafted minimalist furniture built for lifetime durability.</p>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '6px' }}>
                  <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a', margin: 0 }}>Trending Featured Products</h3>
                  <span style={{ fontSize: '12px', color: '#2563eb', fontWeight: 600 }}>View All (24) →</span>
                </div>

                <div className={`products-preview-grid ${deviceView}`}>
                  {[
                    { id: 1, name: 'Ergonomic Lounge Armchair', price: '$120 USD' },
                    { id: 2, name: 'Minimalist Velvet Seat', price: '$89 USD' },
                    { id: 3, name: 'Nordic Solid Wood Chair', price: '$145 USD' }
                  ].map((prod) => (
                    <div key={prod.id} className="preview-product-card">
                      <div className="product-image-frame">
                        {prod.id === 1 && renderSecondBadge(true)}
                        {renderLabelBadge(true)}
                        <ArmchairSvg />
                      </div>

                      <div className="product-meta">
                        <span className="product-title-text">{prod.name}</span>
                        {renderOutsideBadgeSlot()}
                        {prod.id === 1 && renderSecondOutsideBadgeSlot()}
                        <span className="product-price-text">{prod.price} <span className="light">(Product price)</span></span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {previewPage === 'search' && (
              <div className="search-preview-container">
                <div className="search-header-box">
                  <div className="search-query-display">
                    <span>🔍</span>
                    <span>Search results for <em>"Lounge Chair"</em></span>
                    <span style={{ fontSize: '13px', fontWeight: 500, color: '#64748b' }}>(3 products found)</span>
                  </div>

                  <div className="search-tags-row">
                    <span className="search-tag-chip">In Stock ✕</span>
                    <span className="search-tag-chip">Chairs ✕</span>
                    <span className="search-tag-chip">Under $150 ✕</span>
                    <span style={{ fontSize: '12px', color: '#2563eb', cursor: 'pointer', fontWeight: 600, marginLeft: '6px' }}>Clear all filters</span>
                  </div>
                </div>

                <div className={`products-preview-grid ${deviceView}`}>
                  {[
                    { id: 1, name: 'Ergonomic Lounge Armchair', price: '$120 USD' },
                    { id: 2, name: 'Minimalist Velvet Seat', price: '$89 USD' },
                    { id: 3, name: 'Nordic Solid Wood Chair', price: '$145 USD' }
                  ].map((prod) => (
                    <div key={prod.id} className="preview-product-card">
                      <div className="product-image-frame">
                        {prod.id === 1 && renderSecondBadge(true)}
                        {renderLabelBadge(true)}
                        <ArmchairSvg />
                      </div>

                      <div className="product-meta">
                        <span className="product-title-text">{prod.name}</span>
                        {renderOutsideBadgeSlot()}
                        {prod.id === 1 && renderSecondOutsideBadgeSlot()}
                        <span className="product-price-text">{prod.price} <span className="light">(Product price)</span></span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {previewPage === 'cart' && (
              <div className="cart-preview-container">
                <div className="cart-shipping-meter">
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12.5px', fontWeight: 700, color: '#065f46' }}>
                    <span>🚚 Free Shipping Unlocked!</span>
                    <span>100%</span>
                  </div>
                  <div className="meter-bar">
                    <div className="meter-progress"></div>
                  </div>
                </div>

                <div className="cart-items-card">
                  <div style={{ fontSize: '15px', fontWeight: 700, color: '#0f172a', borderBottom: '1px solid #f1f5f9', paddingBottom: '10px' }}>
                    Your Cart (2 items)
                  </div>

                  {/* Line Item 1 */}
                  <div className="cart-line-item">
                    <div className="cart-item-thumb">
                      {renderSecondBadge(true)}
                      {renderLabelBadge(true)}
                      <ArmchairSvg style={{ width: '80%', height: '80%' }} />
                    </div>

                    <div className="cart-item-info">
                      <span style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a' }}>Ergonomic Lounge Armchair</span>
                      {renderOutsideBadgeSlot()}
                      {renderSecondOutsideBadgeSlot()}
                      <span style={{ fontSize: '12px', color: '#64748b' }}>Color: Slate Gray / Size: Standard</span>
                      <span style={{ fontSize: '13.5px', fontWeight: 700, color: '#0f172a', marginTop: '2px' }}>$120.00 USD</span>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '8px' }}>
                      <div style={{ display: 'inline-flex', border: '1px solid #cbd5e1', borderRadius: '6px', overflow: 'hidden' }}>
                        <button type="button" style={{ padding: '2px 8px', border: 'none', background: '#f8fafc', cursor: 'pointer' }}>-</button>
                        <span style={{ padding: '2px 8px', fontSize: '12px', fontWeight: 600 }}>1</span>
                        <button type="button" style={{ padding: '2px 8px', border: 'none', background: '#f8fafc', cursor: 'pointer' }}>+</button>
                      </div>
                      <span style={{ fontSize: '13.5px', fontWeight: 700, color: '#0f172a' }}>$120.00</span>
                    </div>
                  </div>

                  {/* Line Item 2 */}
                  <div className="cart-line-item" style={{ borderBottom: 'none', paddingBottom: 0 }}>
                    <div className="cart-item-thumb">
                      <span style={{ fontSize: '28px' }}>🛋️</span>
                    </div>

                    <div className="cart-item-info">
                      <span style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a' }}>Nordic Velvet Cushion Set</span>
                      <span style={{ fontSize: '12px', color: '#64748b' }}>Color: Amber Gold / Pack of 2</span>
                      <span style={{ fontSize: '13.5px', fontWeight: 700, color: '#0f172a', marginTop: '2px' }}>$35.00 USD</span>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '8px' }}>
                      <div style={{ display: 'inline-flex', border: '1px solid #cbd5e1', borderRadius: '6px', overflow: 'hidden' }}>
                        <button type="button" style={{ padding: '2px 8px', border: 'none', background: '#f8fafc', cursor: 'pointer' }}>-</button>
                        <span style={{ padding: '2px 8px', fontSize: '12px', fontWeight: 600 }}>1</span>
                        <button type="button" style={{ padding: '2px 8px', border: 'none', background: '#f8fafc', cursor: 'pointer' }}>+</button>
                      </div>
                      <span style={{ fontSize: '13.5px', fontWeight: 700, color: '#0f172a' }}>$35.00</span>
                    </div>
                  </div>
                </div>

                <div className="cart-summary-box">
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', color: '#475569' }}>
                    <span>Subtotal:</span>
                    <span style={{ fontWeight: 700, color: '#0f172a' }}>$155.00 USD</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#10b981', fontWeight: 600 }}>
                    <span>Shipping:</span>
                    <span>FREE</span>
                  </div>
                  <button type="button" className="pdp-btn-cart" style={{ marginTop: '6px' }}>
                    🔒 Proceed to Checkout • $155.00
                  </button>
                </div>
              </div>
            )}

            {previewPage === 'collection' && (
              <>
                <div className="storefront-subnav">
                  <div className="storefront-breadcrumb">
                    <span>Home</span>
                    <span>/</span>
                    <span>Collections</span>
                    <span>/</span>
                    <span style={{ color: '#0f172a', fontWeight: 600 }}>Modern Living (3 Products)</span>
                  </div>
                  <span style={{ fontSize: '12px', color: '#64748b' }}>Filters: In Stock ▾ | Sort: Featured ▾</span>
                </div>

                <div className={`products-preview-grid ${deviceView}`}>
                  {[
                    { id: 1, name: 'Ergonomic Lounge Armchair', price: '$120 USD' },
                    { id: 2, name: 'Minimalist Velvet Seat', price: '$89 USD' },
                    { id: 3, name: 'Nordic Solid Wood Chair', price: '$145 USD' }
                  ].map((prod) => (
                    <div key={prod.id} className="preview-product-card">
                      {/* Image Container with Badge Overlay */}
                      <div className="product-image-frame">
                        {prod.id === 1 && renderSecondBadge(true)}

                        {/* Rendered Badge Inside */}
                        {renderLabelBadge(true)}

                        <ArmchairSvg />
                      </div>

                      {/* Product Details with Outside Badge Slot directly between Name and Price */}
                      <div className="product-meta">
                        <span className="product-title-text">{prod.name}</span>

                        {/* Outside Badge Slot - Positioned below Product Name and above Product Price matching Reference */}
                        {renderOutsideBadgeSlot()}
                        {prod.id === 1 && renderSecondOutsideBadgeSlot()}

                        <span className="product-price-text">{prod.price} <span className="light">(Product price)</span></span>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </main>
      </div>

      {/* Shopify Media & Templates Gallery Modal */}
      <ImageGalleryModal
        isOpen={isGalleryOpen}
        onClose={() => setIsGalleryOpen(false)}
        onSelectImage={(url) => {
          if (galleryTarget === 'secondary') {
            setSecondSelectedImageUrl(url);
          } else {
            setSelectedImageUrl(url);
          }
        }}
        onSelectTemplate={handleSelectShopifyTemplate}
        isTextMode={galleryTarget === 'secondary' ? secondLabelType === 'text' : !isImageType}
      />
    </div>
  );
}

export default TextLabelEditor;


