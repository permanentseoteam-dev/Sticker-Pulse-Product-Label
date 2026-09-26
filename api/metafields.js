// Vercel Serverless Function — /api/metafields
// Mirrors the local Vite dev middleware in vite.config.js

const SHOP = process.env.SHOPIFY_SHOP || 'pseo-cro.myshopify.com';
const ACCESS_TOKEN = process.env.SHOPIFY_ACCESS_TOKEN || '';
const SHOPIFY_API_URL = `https://${SHOP}/admin/api/2026-01/graphql.json`;
const SHOP_GID = process.env.SHOPIFY_SHOP_GID || 'gid://shopify/Shop/77778747445';

async function setMetafield(labelsStr) {
  if (!ACCESS_TOKEN) return { success: true, synced: false, reason: 'No access token configured' };

  const mutation = `
    mutation SetShopMetafield($metafields: [MetafieldsSetInput!]!) {
      metafieldsSet(metafields: $metafields) {
        metafields { id key value }
        userErrors { field message }
      }
    }
  `;

  const res = await fetch(SHOPIFY_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Access-Token': ACCESS_TOKEN,
    },
    body: JSON.stringify({
      query: mutation,
      variables: {
        metafields: [{
          namespace: 'stickerpulse',
          key: 'labels_data',
          type: 'json',
          value: labelsStr,
          ownerId: SHOP_GID,
        }],
      },
    }),
  });

  const json = await res.json();
  const errors = json?.data?.metafieldsSet?.userErrors;
  if (errors && errors.length > 0) {
    return { success: false, errors };
  }
  return { success: true, synced: true };
}

async function getMetafield() {
  if (!ACCESS_TOKEN) return null;

  const query = `
    {
      shop {
        metafield(namespace: "stickerpulse", key: "labels_data") {
          value
        }
      }
    }
  `;

  const res = await fetch(SHOPIFY_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Access-Token': ACCESS_TOKEN,
    },
    body: JSON.stringify({ query }),
  });

  const json = await res.json();
  const val = json?.data?.shop?.metafield?.value;
  if (val) {
    try {
      return typeof val === 'string' ? JSON.parse(val) : val;
    } catch (e) {
      return null;
    }
  }
  return null;
}

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'POST') {
    try {
      const data = req.body || {};
      const labels = data.value || data.labels || data;
      const labelsStr = typeof labels === 'string' ? labels : JSON.stringify(labels);
      const result = await setMetafield(labelsStr);
      return res.status(200).json(result);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  if (req.method === 'GET') {
    try {
      const data = await getMetafield();
      if (data) {
        return res.status(200).json(data);
      }
      return res.status(200).json([]);
    } catch (err) {
      return res.status(200).json([]);
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
