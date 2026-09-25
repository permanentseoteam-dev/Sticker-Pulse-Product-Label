# Shopify Label App Project Rules

## 1. Page Connectivity & Flow
- **Seamless Navigation**: Maintain clean, bidirectional page transitions across all app views:
  - Empty State (`EmptyState.jsx`) → **Choose Label Type Modal** (`ChooseLabelTypeModal.jsx`).
  - Modal choices (**Text Label** / **Image Label**) → **Label Editor** (`TextLabelEditor.jsx`).
  - Label Editor top navbar tabs (**Design**, **Products**, **Display**) → Active tab switching.
  - Back button (`← Create label`) → Dashboard (`App.jsx`).
- **No Blank Pages**: Every card, button, and clickable area in modals and navbars must handle click events gracefully without causing blank pages or unhandled state transitions.

## 2. Strict Icon & Visual Element Preservation
- **Never Remove Icons**: Do NOT remove, omit, or replace icons, vector thumbnails, or visual elements present in the reference screenshots:
  - **Top Nav Tabs**: Include SVG icons for `Design` (palette), `Products` (tag), and `Display` (monitor/grid).
  - **Shape Selector**: Include full 26 vector SVG shape glyphs (`ShapeGlyphIcon.jsx`).
  - **Formatting & Content**: Preserve `B`, `I`, `U`, `🙂`, `✨ AutoText`, and the **Badge Icon** picker row (`🔥`, `⭐`, `🏷️`, `⚡`, `🎁`, `💥`, `🚚`, `🌿`, `💎`, `❤️`).
  - **Position Cards**: Maintain visual preview thumbnails for both `Inside product image` and `Outside product image`.
  - **AI Banner**: Preserve AI spark icon (`✨`) and badge chips (`Starter`).

## 4. Logical Option Parity Across Label Types
- **Size & Adjustment Option Logic**: Every setting created (width %, height %, text size %, letter spacing, image size %, px unit, lock aspect ratio, border color/width, round corner checkbox, corner radius px) must work logically and update live in BOTH Text Label and Image Label types.
- **Corner Radius Enforcement**: Always apply `overflow: 'hidden'` alongside `borderRadius` so rounded corners render smoothly on images, background fills, and badge containers without square cut-offs.
- **Predictable Dynamic Math**: Dynamic style calculations (font size, padding, width/height) must scale smoothly across slider min-max ranges without artificial caps or unhandled shape overrides.

## 6. Navbar Preview Dropdown & Page Display Parity
- **Logical Storefront Page Switching**: The top navbar dropdown (`previewPage`) must logically switch the preview canvas layout among:
  - **Collection page**: 3-product collection catalog grid with toolbar.
  - **Product page**: Full Single Product Detail Page (PDP) split layout with hero gallery, buy box, variant pickers, and outside badge slot between Product title and price.
  - **Homepage**: Storefront header, announcement bar, hero banner, and featured collection cards.
  - **Search page**: Search bar with active query and filter tags.
  - **Cart page**: Shopping cart drawer with shipping progress meter, line items, and checkout summary.
- **Display Visibility Parity**: The label rendering must strictly respect Page Display (`pageDisplay`) and Device Display (`deviceDisplay`) settings across both Text Label and Image Label types. When disabled for a page, the canvas must surface a clear warning indicator with an option to enable it.

