# Rules Document
## StickerPulse — Mandatory Engineering & Architecture Rules

This document establishes the mandatory rules and architectural constraints that must be preserved at all times for the **StickerPulse** repository.

---

## 1. Core Repository Invariants

1.1. **Page Connectivity**: Never let clicking any button or modal option (Text label, Image label, back button, nav tab, preview selector) result in a blank page or unhandled state.

1.2. **Icon Preservation**: Always preserve and display icons across top nav tabs (`Design`, `Display`), shape grid (26 vector icons), formatting toolbar, badge icon picker, position card thumbnails, and AI banner.

1.3. **Outside Placement**: `Outside product image` position mode must position the label inside `.product-meta` between **Product name** and **Product price** (`$10 USD`).

1.4. **Build Verification**: Always verify code changes with `npm run build` with zero errors before declaring any task complete.

1.5. **Option Parity**: Every size (width %, height %, text size %, letter spacing, image size) and adjustment (borders, rounded corners with `overflow: 'hidden'`) option must logically work and live-update in **BOTH** Text Label and Image Label types across inside and outside position modes.

1.6. **Navbar Preview Dropdown Parity**: The top navbar dropdown (`previewPage`) must logically switch between dedicated storefront layouts (`collection`, `product`, `homepage`, `search`, `cart`) and respect Page Display / Device Display settings across both Text Label and Image Label types.

---

## 2. Targeting & Storefront Rendering Rules

2.1. **Strict Tag Matching**: When a label has `targetMode: 'tags'`, the storefront engine must strictly evaluate product tags. Products that do not contain the target tag (e.g., `eco-friendly`) must **never** receive the badge.

2.2. **Single Featured Image Targeting on PDP**: On Product Detail Pages and custom hero sections (e.g. `pseo_product_hero`), badges must attach strictly to the **1st primary / featured media container** and must ignore thumbnail carousels, variant swatches, or secondary zoom popups.

2.3. **Duplicate Emoji Sanitization**: The badge renderer must automatically strip redundant leading or trailing icon emojis from `textContent` when a badge icon is selected to prevent double icons (e.g. preventing `🌱 🌱 ECO-FRIENDLY`).

2.4. **Zero Theme File Modification**: All storefront badges must be delivered strictly through the Online Store 2.0 Theme App Extension (`blocks/label_embed.liquid`). Never modify merchant theme Liquid files directly.

2.5. **Theme Customizer Real-Time Reactivity**: In Shopify Theme Customizer (`window.Shopify.designMode`), the storefront engine must listen to section events (`shopify:section:load`, `shopify:section:select`, `shopify:block:select`) and re-mount badges instantly.

---

## 3. Data Integrity & State Persistence Rules

3.1. **State Preservation**: Reopening an existing label in the editor must faithfully load all saved properties from `initialData` (including `pageDisplay` checkboxes, `deviceDisplay`, `targetMode`, `targetTags`, and all secondary multi-label properties).

3.2. **Dual-Sync Pipeline**: Every save operation must update `localStorage` for instant browser responsiveness and dispatch a synchronization request to update the Shopify Shop Metafield (`shop.metafields.stickerpulse.labels_data`).

3.3. **Graceful Storefront Fallback**: If the shop metafield is uninitialized, `label_embed.liquid` must parse safely and render sensible default active badges without throwing console errors or causing layout shifts.

---

## 4. Multi-Label Rules

4.1. **Multi-Label Per Product**: When "Allow multiple labels per product" is toggled ON, the secondary label must support complete independent styling, shape selection, color customization, and positioning controls.

4.2. **Non-Destructive Overlays**: Multi-label badges must stack or position independently without clipping each other or breaking surrounding layout elements.
