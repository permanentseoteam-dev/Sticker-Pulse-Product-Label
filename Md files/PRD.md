# Product Requirements Document (PRD)
## Product Name: StickerPulse — Product Labels & Badges

---

## 1. Executive Summary

**StickerPulse** is a lightweight, high-performance Shopify app designed to empower merchants to create, customize, and display visual **product labels and badges** (both Text-based and Image-based) across storefront pages (Collection grids, Product Detail Pages, Homepage featured collections, Search results, and Cart) **without altering theme Liquid files**. 

Built with a **functionality-first and reference-accurate approach**, StickerPulse operates seamlessly as an embedded Shopify Admin application (via `@shopify/app-bridge`) coupled with an Online Store 2.0 **Theme App Extension** (App Embed block). Label designs and targeting rules sync in real time to Shopify **Shop Metafields** (`shop.metafields.stickerpulse.labels_data`).

---

## 2. Core Problem & Solution

| The Challenge | StickerPulse Solution |
|---|---|
| Hardcoded theme badges break upon theme updates | Zero-code Theme App Extension (App Embed block) automatically layers badges cleanly |
| Lack of multi-label flexibility | Supports multi-label stacking with independent primary and secondary label controls |
| Inability to target specific campaigns | Granular page targeting, device filtering (Desktop/Mobile/All), and **Product Tag Targeting** (e.g. `eco-friendly`, `sale`) |
| Inflexible badge positioning | 9-point inside image grid with manual X/Y offsets + dedicated Outside placement between Title and Price |
| Complex, slow third-party apps | Native React 18 + Vite embedded admin with sub-15KB vanilla storefront injection engine |

---

## 3. Product Goals & Pillars

1. **Reference Parity & Visual Excellence**: 26 vector badge shapes (Capsules, Ribbons, Flags, Notches, Scallops, Trapezoids), rich color pickers, typography controls, custom image gallery, and auto-adapting badge icons.
2. **Deep Theme Compatibility**: Works automatically on standard Shopify themes (Dawn, Sense, Refresh, Craft, Prestige, Impulse) and bespoke merchant sections (such as `pseo_product_hero`).
3. **Multi-Label Per Product**: Toggleable multi-label support allowing independent configuration of primary and secondary badges on the same product.
4. **Smart Tag & Page Targeting**: Filter badges by product tags (e.g., `eco-friendly`) or apply to all products; choose exact page targets (PDP, Collection, Home, Search, Cart).
5. **Real-Time Metafield Sync**: Instant synchronization to Shopify Shop Metafields (`shop.metafields.stickerpulse.labels_data`) with instant local fallback.
6. **Zero Theme Code Disturbance**: 100% theme-isolated CSS and JavaScript, toggleable on/off with one click in the Shopify Theme Customizer.

---

## 4. User Personas & Core Workflows

- **Shopify Merchant**: Wants to highlight discounts (*"SALE 20%"*), sustainability (*"🌱 ECO-FRIENDLY"*), or urgency (*"BESTSELLER"*) with minimal setup.
- **E-Commerce Marketer**: Wants to launch promotional campaigns by simply adding a tag (e.g. `eco-friendly` or `summer-sale`) to products in Shopify Admin.

---

## 5. Functional Requirements

### 5.1 Label Types
1. **Text Labels**:
   - **Content**: Text string (e.g., `ECO-FRIENDLY`, `SAVE 20%`), emoji/icon selector (🔥, 🌱, ⭐, 🏷️, ⚡, 💎), icon position (`left` / `right`).
   - **Typography**: Font family (Inter, Alata, Roboto, Poppins, Outfit, serif, sans-serif), bold, italic, underline, uppercase, letter spacing (-2px to 10px).
   - **Shape Presets**: 26 vector shapes including `capsule-full`, `capsule-left`, `capsule-right`, `circle`, `scallop`, `flag-left`, `pointer-left`, `pointer-right`, `double-notch`, `arrow-notch`, `fold-left`, `fold-right`, `slanted-left`, `slanted-right`, `hexagon`, `corner-ribbon-left`, `corner-ribbon-right`, `corner-triangle-left`, `corner-triangle-right`.
   - **Colors & Fill**: Solid fill, customizable background color, text color.
   - **Adjustments**: Borders (width, color, toggle), rounded corners (`borderRadius` with `overflow: 'hidden'`).
   - **Dimensions**: Width %, Height %, Text Size % sliders.

2. **Image Labels**:
   - **Image Selection**: Direct file upload, StickerPulse preset badge gallery, or Shopify CDN asset URL.
   - **Sizing & Scaling**: Width in `%` or `px`, aspect ratio lock toggle, max-width responsive bounds.
   - **Adjustments**: Borders, rounded corners with `overflow: 'hidden'`.

### 5.2 Position Modes
- **Inside Product Image**: 9-point interactive anchor grid (`top-left`, `top-center`, `top-right`, `middle-left`, `middle-center`, `middle-right`, `bottom-left`, `bottom-center`, `bottom-right`) with fine-tuning X/Y pixel offsets.
- **Outside Product Image**: Injects badge into the product metadata slot between **Product Title** and **Product Price**, with alignment controls (`left`, `center`, `right`).

### 5.3 Targeting & Display Rules
- **Product Tag Targeting**:
  - `All products`: Displays on all store products matching page rules.
  - `Products with specific tags`: Filters strictly by merchant tags (e.g. `eco-friendly`, `organic`, `sale`).
- **Page Display Rules**: Checkboxes for Product Page, Collection Page, Homepage, Search Page, and Cart Page.
- **Device Display**: Target `All devices`, `Desktop only`, or `Mobile only`.

### 5.4 Multi-Label Per Product
- Toggle **"Allow multiple labels per product"** in the Display tab.
- Unlocks full secondary label design suite (type, content, shape, color, position mode, anchor, offsets, borders, rounded corners).

### 5.5 Admin Dashboard
- **Labels List**: Overview of all labels with active/inactive toggles, label type badges, page indicators, and action buttons (Edit, Duplicate, Delete).
- **Interactive Live Preview**: Real-time simulated product cards and PDP hero view responding instantly to all slider, color, text, and shape modifications.
- **Navigation & Parity**: Dedicated storefront page preview dropdown (`collection`, `product`, `homepage`, `search`, `cart`) and device switchers (`desktop` / `mobile`).

---

## 6. Non-Functional Requirements

- **Storefront Performance**: Under 15KB bundle size; asynchronous execution; zero impact on Shopify Core Web Vitals (LCP, CLS, INP).
- **Single Featured Image Targeting**: Targets only the primary hero product image on PDPs, ignoring thumbnails and swatches.
- **Theme Resilience**: Universal selectors covering Dawn, OS 2.0 themes, and custom sections (e.g. `pseo_product_hero`).
- **Data Integrity**: Full persistence across local development and production Shopify Metafields.

---

## 7. Release Milestones

| Milestone | Scope | Status |
|---|---|---|
| **v1.0 (Current)** | Embedded Admin App, 26 Vector Shapes, Inside/Outside Placement, Real-Time Metafield Sync, OS 2.0 Theme App Extension, Multi-Label Support, Tag-Based Targeting, Custom Section Scanner (`pseo_product_hero`) | **Complete & Verified** |
| **v1.1** | Collection-picker resource integration, scheduling (start/end dates for promotional badges) | Planned |
| **v1.2** | Dynamic condition rules (Compare-at discount % calculation, Low inventory countdown) | Planned |
