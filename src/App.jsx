import React, { useState, useEffect } from 'react';
import EmptyState from './components/EmptyState';
import ChooseLabelTypeModal from './components/ChooseLabelTypeModal';
import TextLabelEditor from './components/TextLabelEditor';
import AppLogo from './components/AppLogo';
import { shopifyService } from './services/shopifyService';

export function App() {
  const [labels, setLabels] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingLabel, setEditingLabel] = useState(null);
  const [activeTypeForNew, setActiveTypeForNew] = useState(null);

  // Load labels from Shopify Metafields or LocalStorage on mount
  useEffect(() => {
    async function init() {
      const initialLabels = await shopifyService.loadLabels();
      setLabels(initialLabels);
      setIsLoaded(true);
    }
    init();
  }, []);

  // Save changes to storage whenever labels list updates
  const persistLabels = (updatedLabels) => {
    setLabels(updatedLabels);
    shopifyService.saveLabels(updatedLabels);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSelectType = (type) => {
    setIsModalOpen(false);
    setActiveTypeForNew(type);
    setEditingLabel(null);
  };

  const handleSaveLabel = (savedData) => {
    const existsIndex = labels.findIndex((l) => l.id === savedData.id);
    let updated;
    if (existsIndex >= 0) {
      updated = [...labels];
      updated[existsIndex] = savedData;
    } else {
      updated = [...labels, savedData];
    }
    persistLabels(updated);
    setEditingLabel(null);
    setActiveTypeForNew(null);
  };

  const handleToggleStatus = (id) => {
    const updated = labels.map((l) => (l.id === id ? { ...l, isActive: !l.isActive } : l));
    persistLabels(updated);
  };

  const handleDeleteLabel = (id) => {
    const updated = labels.filter((l) => l.id !== id);
    persistLabels(updated);
  };

  const handleDuplicateLabel = (labelToDup) => {
    const newLabel = {
      ...labelToDup,
      id: Date.now(),
      name: `${labelToDup.name} (Copy)`
    };
    const updated = [...labels, newLabel];
    persistLabels(updated);
  };

  // If currently editing or creating a label, render TextLabelEditor
  if (editingLabel || activeTypeForNew) {
    return (
      <TextLabelEditor
        labelType={editingLabel ? editingLabel.type : activeTypeForNew}
        initialData={editingLabel}
        onSave={handleSaveLabel}
        onBack={() => {
          setEditingLabel(null);
          setActiveTypeForNew(null);
        }}
      />
    );
  }

  if (!isLoaded) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f6f6f7' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '28px', marginBottom: '8px' }}>🏷️</div>
          <div style={{ color: '#64748b', fontSize: '14px', fontWeight: 600 }}>Loading StickerPulse...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="app-shell" style={{ minHeight: '100vh', background: '#f6f6f7' }}>
      {/* Top Navigation Bar */}
      <header className="app-header">
        <AppLogo size="md" showBadge={true} />
        <div className="header-status">
          <span className="status-indicator"></span>
          <span>{shopifyService.isEmbedded() ? `Embedded in ${shopifyService.getShopDomain()}` : 'Theme Embed Ready (OS 2.0)'}</span>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="main-content" style={{ padding: '24px 32px', maxWidth: '1200px', margin: '0 auto' }}>
        {labels.length === 0 ? (
          <EmptyState onCreateLabelClick={handleOpenModal} />
        ) : (
          <div className="dashboard-container">
            {/* Table Header Row */}
            <div className="dashboard-header-bar" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
              <div>
                <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#111827', margin: 0 }}>Labels Dashboard</h2>
                <p style={{ fontSize: '13px', color: '#6b7280', margin: '4px 0 0' }}>
                  Manage product badges & image labels ({labels.filter(l => l.isActive).length} active / {labels.length} total)
                </p>
              </div>

              <button
                type="button"
                className="btn-primary"
                style={{ padding: '8px 18px', fontSize: '14px', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}
                onClick={handleOpenModal}
              >
                <span>+</span> Create label
              </button>
            </div>

            {/* Labels Table Card */}
            <div className="labels-table-card" style={{ background: '#ffffff', borderRadius: '12px', border: '1px solid #e5e7eb', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13.5px' }}>
                <thead>
                  <tr style={{ background: '#f9fafb', borderBottom: '1px solid #e5e7eb', color: '#4b5563', fontWeight: 600 }}>
                    <th style={{ padding: '12px 20px' }}>Label Name</th>
                    <th style={{ padding: '12px 16px' }}>Type</th>
                    <th style={{ padding: '12px 16px' }}>Position</th>
                    <th style={{ padding: '12px 16px' }}>Pages</th>
                    <th style={{ padding: '12px 16px' }}>Status</th>
                    <th style={{ padding: '12px 20px', textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {labels.map((lbl) => (
                    <tr key={lbl.id} style={{ borderBottom: '1px solid #f3f4f6', transition: 'background 0.15s' }}>
                      <td style={{ padding: '14px 20px', fontWeight: 600, color: '#111827' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <span style={{ fontSize: '18px' }}>{lbl.type === 'image' ? '🖼️' : '🏷️'}</span>
                          <div>
                            <div>{lbl.name}</div>
                            {lbl.textContent && <div style={{ fontSize: '12px', color: '#6b7280', fontWeight: 400 }}>Content: "{lbl.textContent}"</div>}
                          </div>
                        </div>
                      </td>
                      <td style={{ padding: '14px 16px' }}>
                        <span style={{ textTransform: 'capitalize', background: lbl.type === 'image' ? '#eff6ff' : '#fef2f2', color: lbl.type === 'image' ? '#1d4ed8' : '#b91c1c', padding: '3px 8px', borderRadius: '6px', fontSize: '12px', fontWeight: 600 }}>
                          {lbl.type} Label
                        </span>
                      </td>
                      <td style={{ padding: '14px 16px', color: '#4b5563' }}>
                        {lbl.positionMode === 'inside' ? 'Inside Image' : 'Outside Image'}
                      </td>
                      <td style={{ padding: '14px 16px', color: '#4b5563' }}>
                        {(() => {
                          if (!lbl.pageDisplay) return 'All Pages';
                          const pages = [];
                          if (lbl.pageDisplay.productPage) pages.push('Product');
                          if (lbl.pageDisplay.collectionPage) pages.push('Collection');
                          if (lbl.pageDisplay.homepage) pages.push('Home');
                          if (lbl.pageDisplay.searchPage) pages.push('Search');
                          if (lbl.pageDisplay.cartPage) pages.push('Cart');
                          return pages.length > 0 ? pages.join(', ') : 'None';
                        })()}
                      </td>
                      <td style={{ padding: '14px 16px' }}>
                        <button
                          type="button"
                          onClick={() => handleToggleStatus(lbl.id)}
                          style={{
                            border: 'none',
                            background: lbl.isActive ? '#d1fae5' : '#fee2e2',
                            color: lbl.isActive ? '#065f46' : '#991b1b',
                            padding: '4px 10px',
                            borderRadius: '12px',
                            fontSize: '12px',
                            fontWeight: 700,
                            cursor: 'pointer'
                          }}
                        >
                          {lbl.isActive ? '● Active' : '○ Inactive'}
                        </button>
                      </td>
                      <td style={{ padding: '14px 20px', textAlign: 'right' }}>
                        <div style={{ display: 'inline-flex', gap: '8px' }}>
                          <button
                            type="button"
                            className="btn-secondary"
                            style={{ padding: '4px 10px', fontSize: '12.5px' }}
                            onClick={() => setEditingLabel(lbl)}
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            className="btn-secondary"
                            style={{ padding: '4px 10px', fontSize: '12.5px' }}
                            onClick={() => handleDuplicateLabel(lbl)}
                          >
                            Duplicate
                          </button>
                          <button
                            type="button"
                            className="btn-secondary"
                            style={{ padding: '4px 10px', fontSize: '12.5px', color: '#ef4444' }}
                            onClick={() => handleDeleteLabel(lbl.id)}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>

      {/* Choose Label Type Modal */}
      <ChooseLabelTypeModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSelectType={handleSelectType}
      />
    </div>
  );
}

export default App;
