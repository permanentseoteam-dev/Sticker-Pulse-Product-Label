import React from 'react';
import RosetteIcon from './RosetteIcon';

export function EmptyState({ onCreateLabelClick }) {
  return (
    <div className="empty-state-card">
      {/* Visual Product Cards Illustration */}
      <div className="illustration-wrapper">
        <div className="illustration-bg-circle" />

        {/* Back Product Card (with Red Image Rosette) */}
        <div className="mock-card-back">
          <div className="mock-img-placeholder" />
          <div className="mock-line" />
          <div className="mock-button" />
          <div className="rosette-badge red">
            <RosetteIcon type="image" color="red" size={48} />
          </div>
        </div>

        {/* Front Product Card (with Blue Text Rosette) */}
        <div className="mock-card-front">
          <div className="mock-img-placeholder" />
          <div className="mock-line" />
          <div className="mock-subline" />
          <div className="mock-button" />
          <div className="rosette-badge blue">
            <RosetteIcon type="text" color="blue" size={52} />
          </div>
        </div>
      </div>

      {/* Typography */}
      <h2 className="empty-state-title">There is no label here</h2>
      <p className="empty-state-desc">Start creating your label or watch guidelines</p>

      {/* Action Buttons */}
      <div className="empty-state-actions">
        <button
          type="button"
          className="btn-secondary"
          onClick={() => {
            alert("LabelCraft guidelines:\n1. Choose Text or Image label.\n2. Configure style & position.\n3. Assign to products and preview live!");
          }}
        >
          Learn more
        </button>
        <button
          type="button"
          className="btn-primary"
          onClick={onCreateLabelClick}
        >
          Create label
        </button>
      </div>
    </div>
  );
}

export default EmptyState;
