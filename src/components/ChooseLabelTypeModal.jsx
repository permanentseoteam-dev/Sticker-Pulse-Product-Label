import React, { useEffect } from 'react';
import RosetteIcon from './RosetteIcon';

export function ChooseLabelTypeModal({ isOpen, onClose, onSelectType }) {
  // Close modal on Escape key press (modern accessible behavior)
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      onClick={(e) => {
        // Light dismiss on backdrop click
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="modal-card">
        {/* Header */}
        <div className="modal-header">
          <h3 id="modal-title" className="modal-title">Choose label type</h3>
          <button
            type="button"
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="modal-body">
          {/* Option 1: Text label */}
          <div
            className="label-option-card"
            style={{ cursor: 'pointer' }}
            onClick={() => onSelectType('text')}
          >
            <div className="option-left">
              <div className="option-icon-box">
                <RosetteIcon type="text" color="blue" size={44} />
              </div>
              <div className="option-content">
                <div className="option-title-row">
                  <span className="option-title">Text label</span>
                  <span className="popular-tag">✨ Most popular</span>
                </div>
                <p className="option-desc">
                  Start with our templates and easily customize the text, shape, and color to match your brand.
                </p>
              </div>
            </div>
            <button
              type="button"
              className="option-btn"
              onClick={(e) => {
                e.stopPropagation();
                onSelectType('text');
              }}
            >
              Create
            </button>
          </div>

          {/* Option 2: Image label */}
          <div
            className="label-option-card"
            style={{ cursor: 'pointer' }}
            onClick={() => onSelectType('image')}
          >
            <div className="option-left">
              <div className="option-icon-box">
                <RosetteIcon type="image" color="blue" size={44} />
              </div>
              <div className="option-content">
                <div className="option-title-row">
                  <span className="option-title">Image label</span>
                </div>
                <p className="option-desc">
                  Select an image from our gallery, upload your own design, or let our AI create one for you.
                </p>
              </div>
            </div>
            <button
              type="button"
              className="option-btn"
              onClick={(e) => {
                e.stopPropagation();
                onSelectType('image');
              }}
            >
              Create
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChooseLabelTypeModal;
