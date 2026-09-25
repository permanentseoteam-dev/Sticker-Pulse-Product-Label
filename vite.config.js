import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function shopifyMetafieldsPlugin() {
  return {
    name: 'shopify-metafields-api',
    configureServer(server) {
      server.middlewares.use('/api/metafields', (req, res, next) => {
        if (req.method === 'POST') {
          let body = '';
          req.on('data', chunk => { body += chunk; });
          req.on('end', () => {
            try {
              const data = JSON.parse(body || '{}');
              const labels = data.value || data.labels || data;
              const labelsStr = typeof labels === 'string' ? labels : JSON.stringify(labels);
              
              // Persist to local cache file
              const cacheFile = path.resolve(__dirname, '.shopify_labels_cache.json');
              fs.writeFileSync(cacheFile, labelsStr, 'utf8');

              // Sync to Shopify store metafield via Shopify CLI
              const mutationQuery = `mutation SetShopMetafield($metafields: [MetafieldsSetInput!]!) {
                metafieldsSet(metafields: $metafields) {
                  metafields { id key value }
                  userErrors { field message }
                }
              }`;
              const vars = {
                metafields: [{
                  namespace: "stickerpulse",
                  key: "labels_data",
                  type: "json",
                  value: labelsStr,
                  ownerId: "gid://shopify/Shop/77778747445"
                }]
              };
              
              const qFile = path.resolve(__dirname, '.temp_q.graphql');
              const vFile = path.resolve(__dirname, '.temp_v.json');
              fs.writeFileSync(qFile, mutationQuery, 'utf8');
              fs.writeFileSync(vFile, JSON.stringify(vars), 'utf8');

              exec(`shopify store execute --store pseo-cro.myshopify.com --query-file "${qFile}" --variable-file "${vFile}" --allow-mutations`, (err) => {
                try { fs.unlinkSync(qFile); fs.unlinkSync(vFile); } catch(e) {}
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ success: true, synced: !err }));
              });
            } catch (err) {
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: err.message }));
            }
          });
        } else if (req.method === 'GET') {
          const cacheFile = path.resolve(__dirname, '.shopify_labels_cache.json');
          if (fs.existsSync(cacheFile)) {
            const content = fs.readFileSync(cacheFile, 'utf8');
            res.setHeader('Content-Type', 'application/json');
            res.end(content);
          } else {
            res.setHeader('Content-Type', 'application/json');
            res.end('[]');
          }
        } else {
          next();
        }
      });
    }
  };
}

export default defineConfig({
  plugins: [react(), shopifyMetafieldsPlugin()],
  server: {
    port: parseInt(process.env.PORT || '3000', 10),
    host: true,
    allowedHosts: true,
    cors: true
  }
});
