import React, { useState } from 'react';

// Official Shopify Badge Templates & Store Media Library
export const SHOPIFY_LIBRARY_TEMPLATES = [
  {
    id: 'shopify-sale-red',
    name: 'SALE! Red Ribbon',
    category: 'Shopify Templates',
    text: 'SALE!',
    bgColor: '#E11D48',
    textColor: '#ffffff',
    shape: 'rect',
    icon: '🏷️',
    url: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 40"><rect width="120" height="40" rx="6" fill="%23E11D48"/><text x="60" y="26" fill="white" font-family="sans-serif" font-weight="900" font-size="20" text-anchor="middle">SALE!</text></svg>'
  },
  {
    id: 'shopify-50-off',
    name: '50% OFF Pill',
    category: 'Shopify Templates',
    text: '50% OFF',
    bgColor: '#B91C1C',
    textColor: '#ffffff',
    shape: 'capsule-full',
    icon: '⚡',
    url: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 40"><rect width="120" height="40" rx="20" fill="%23B91C1C"/><text x="60" y="25" fill="white" font-family="sans-serif" font-weight="800" font-size="16" text-anchor="middle">50% OFF</text></svg>'
  },
  {
    id: 'shopify-new-blue',
    name: 'NEW ARRIVAL',
    category: 'Shopify Templates',
    text: 'NEW ARRIVAL',
    bgColor: '#2563EB',
    textColor: '#ffffff',
    shape: 'rect',
    icon: '✨',
    url: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 40"><rect width="140" height="40" rx="6" fill="%232563EB"/><text x="70" y="25" fill="white" font-family="sans-serif" font-weight="800" font-size="15" text-anchor="middle">NEW ARRIVAL</text></svg>'
  },
  {
    id: 'shopify-bestseller',
    name: 'BEST SELLER',
    category: 'Shopify Templates',
    text: 'BEST SELLER',
    bgColor: '#D97706',
    textColor: '#ffffff',
    shape: 'flag-left',
    icon: '⭐',
    url: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 40"><rect width="140" height="40" rx="8" fill="%23D97706"/><text x="70" y="25" fill="white" font-family="sans-serif" font-weight="800" font-size="15" text-anchor="middle">★ BEST SELLER</text></svg>'
  },
  {
    id: 'shopify-free-shipping',
    name: 'FREE SHIPPING',
    category: 'Shopify Templates',
    text: 'FREE SHIPPING',
    bgColor: '#0284C7',
    textColor: '#ffffff',
    shape: 'capsule-full',
    icon: '🚚',
    url: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 150 40"><rect width="150" height="40" rx="20" fill="%230284C7"/><text x="75" y="25" fill="white" font-family="sans-serif" font-weight="800" font-size="14" text-anchor="middle">🚚 FREE SHIPPING</text></svg>'
  },
  {
    id: 'shopify-eco-friendly',
    name: '100% ECO FRIENDLY',
    category: 'Shopify Templates',
    text: 'ECO FRIENDLY',
    bgColor: '#16A34A',
    textColor: '#ffffff',
    shape: 'rect',
    icon: '🌿',
    url: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 40"><rect width="140" height="40" rx="8" fill="%2316A34A"/><text x="70" y="25" fill="white" font-family="sans-serif" font-weight="700" font-size="13" text-anchor="middle">🌿 ECO FRIENDLY</text></svg>'
  },
  {
    id: 'shopify-low-stock',
    name: 'LOW STOCK - HURRY',
    category: 'Shopify Templates',
    text: 'ONLY 3 LEFT!',
    bgColor: '#EA580C',
    textColor: '#ffffff',
    shape: 'pointer-left',
    icon: '🔥',
    url: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 40"><rect width="140" height="40" rx="6" fill="%23EA580C"/><text x="70" y="25" fill="white" font-family="sans-serif" font-weight="900" font-size="14" text-anchor="middle">🔥 ONLY 3 LEFT!</text></svg>'
  },
  {
    id: 'shopify-bogo',
    name: 'BUY 1 GET 1 FREE',
    category: 'Shopify Templates',
    text: 'BOGO FREE',
    bgColor: '#9333EA',
    textColor: '#ffffff',
    shape: 'circle',
    icon: '🎁',
    url: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="48" fill="%239333EA"/><text x="50" y="46" fill="white" font-family="sans-serif" font-weight="900" font-size="13" text-anchor="middle">BUY 1</text><text x="50" y="64" fill="white" font-family="sans-serif" font-weight="900" font-size="13" text-anchor="middle">GET 1</text></svg>'
  },
  {
    id: 'shopify-bfcm',
    name: 'BLACK FRIDAY DEAL',
    category: 'Shopify Store Files',
    text: 'BLACK FRIDAY',
    bgColor: '#111827',
    textColor: '#FBBF24',
    shape: 'rect',
    icon: '⚡',
    url: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 150 40"><rect width="150" height="40" rx="6" fill="%23111827" stroke="%23FBBF24" stroke-width="2"/><text x="75" y="25" fill="%23FBBF24" font-family="sans-serif" font-weight="900" font-size="14" text-anchor="middle">⚡ BLACK FRIDAY</text></svg>'
  },
  {
    id: 'shopify-member',
    name: 'MEMBER EXCLUSIVE',
    category: 'Shopify Store Files',
    text: 'VIP ONLY',
    bgColor: '#4F46E5',
    textColor: '#ffffff',
    shape: 'capsule-full',
    icon: '💎',
    url: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 130 40"><rect width="130" height="40" rx="20" fill="%234F46E5"/><text x="65" y="25" fill="white" font-family="sans-serif" font-weight="800" font-size="14" text-anchor="middle">💎 VIP ONLY</text></svg>'
  }
];

export function ImageGalleryModal({ isOpen, onClose, onSelectImage, onSelectTemplate, isTextMode = false }) {
  const [activeTab, setActiveTab] = useState('All');
  const [customUploads, setCustomUploads] = useState([]);

  if (!isOpen) return null;

  const categories = ['All', 'Shopify Templates', 'Shopify Store Files', 'Custom Uploads'];

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        const newUpload = {
          id: `custom-${Date.now()}`,
          name: file.name,
          category: 'Custom Uploads',
          url: uploadEvent.target.result,
          text: file.name.replace(/\.[^/.]+$/, '').toUpperCase()
        };
        setCustomUploads((prev) => [newUpload, ...prev]);
        if (isTextMode && onSelectTemplate) {
          onSelectTemplate(newUpload);
        } else {
          onSelectImage(newUpload.url);
        }
        onClose();
      };
      reader.readAsDataURL(file);
    }
  };

  const allItems = [...customUploads, ...SHOPIFY_LIBRARY_TEMPLATES];
  const filteredItems = activeTab === 'All'
    ? allItems
    : allItems.filter((item) => item.category === activeTab);

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal-card gallery-modal-card">
        {/* Header */}
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '18px' }}>🛍️</span>
            <div>
              <h3 className="modal-title">Shopify Media & Badge Library</h3>
              <p style={{ fontSize: '12px', color: '#64748b', margin: 0 }}>
                {isTextMode ? 'Choose a Shopify template to pre-fill badge text, shape, and colors' : 'Select a badge graphic from your Shopify store files and templates'}
              </p>
            </div>
          </div>
          <button type="button" className="modal-close-btn" onClick={onClose} aria-label="Close modal">✕</button>
        </div>

        {/* Category Tabs */}
        <div className="gallery-tabs-row">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              className={`gallery-tab-btn ${activeTab === cat ? 'active' : ''}`}
              onClick={() => setActiveTab(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Body */}
        <div className="modal-body gallery-modal-body">
          {/* Upload Dropzone */}
          <div className="upload-dropzone-box">
            <label className="dropzone-label">
              <span className="upload-icon">☁️</span>
              <span className="upload-text">Upload to Shopify Store Media (PNG, SVG, WebP)</span>
              <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden-file-input" />
            </label>
          </div>

          {/* Grid of Badges */}
          <div className="gallery-grid">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="gallery-item-card"
                onClick={() => {
                  if (isTextMode && onSelectTemplate && item.text) {
                    onSelectTemplate(item);
                  } else {
                    onSelectImage(item.url);
                  }
                  onClose();
                }}
              >
                <img src={item.url} alt={item.name} className="gallery-img-preview" />
                <span className="gallery-item-name">{item.name}</span>
                {item.category && (
                  <span style={{ fontSize: '10px', color: '#94a3b8', background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px' }}>
                    {item.category}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ImageGalleryModal;
