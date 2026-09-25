/**
 * Shopify Service Layer
 * Handles App Bridge communication, GraphQL Metafields synchronization,
 * and seamless fallback for local standalone testing.
 */

const STORAGE_KEY = 'stickerpulse_labels_data';

export const shopifyService = {
  /**
   * Check if running embedded inside Shopify Admin iframe
   */
  isEmbedded() {
    return Boolean(
      typeof window !== 'undefined' &&
      (new URLSearchParams(window.location.search).get('host') ||
       new URLSearchParams(window.location.search).get('shop') ||
       window.top !== window.self)
    );
  },

  /**
   * Get the current store domain
   */
  getShopDomain() {
    if (typeof window === 'undefined') return 'pseo-cro.myshopify.com';
    const params = new URLSearchParams(window.location.search);
    return params.get('shop') || 'pseo-cro.myshopify.com';
  },

  /**
   * Load saved labels from Backend API, Metafield or LocalStorage fallback
   */
  async loadLabels() {
    // 1. Try fetching from server API first
    try {
      const response = await fetch('/api/metafields');
      if (response.ok) {
        const data = await response.json();
        if (Array.isArray(data) && data.length > 0) {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
          return data;
        }
      }
    } catch (e) {
      // Ignore network errors in offline/local dev
    }

    // 2. Try localStorage
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn('Could not read from localStorage:', e);
    }

    // 3. Eco-Friendly default starter template
    return [
      {
        id: 1,
        name: 'Eco-Friendly Label',
        type: 'text',
        positionMode: 'inside',
        anchor: 'top-left',
        offsetX: 0,
        offsetY: 0,
        fillMode: 'solid',
        isActive: true,
        textContent: '🌱 ECO-FRIENDLY',
        fontFamily: 'Inter',
        isBold: true,
        isItalic: false,
        isUnderline: false,
        selectedShape: 'capsule-full',
        bgColor: '#059669',
        textColor: '#ffffff',
        badgeIcon: '🌱',
        iconPosition: 'left',
        widthPercent: 32,
        heightPercent: 12,
        textSizePercent: 44,
        letterSpacing: 1,
        imageSize: 26,
        imageUnit: '%',
        lockAspectRatio: true,
        hasBorder: false,
        borderColor: '#ffffff',
        borderWidth: 1,
        hasRoundCorner: true,
        borderRadius: 999,
        pageDisplay: {
          productPage: true,
          collectionPage: true,
          homepage: true,
          searchPage: true,
          cartPage: true,
          specificPages: false
        },
        deviceDisplay: 'all',
        showMultipleLabelsPreview: false
      }
    ];
  },

  /**
   * Save labels list to both LocalStorage and Shopify Metafield
   */
  async saveLabels(labels) {
    // 1. Always update local storage for immediate browser persistence
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(labels));
    } catch (e) {
      console.warn('LocalStorage save failed:', e);
    }

    // 2. Sync with Backend / Shopify Metafields API
    try {
      const response = await fetch('/api/metafields', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          namespace: 'stickerpulse',
          key: 'labels_data',
          type: 'json',
          value: JSON.stringify(labels)
        })
      });
      return await response.json();
    } catch (err) {
      console.log('Sync to Shopify Metafields:', err);
    }

    return { success: true };
  }
};

export default shopifyService;
