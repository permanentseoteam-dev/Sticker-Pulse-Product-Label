# Agent Guidelines for Shopify Label App

Please follow these mandatory rules for all tasks on this repository:

1. **Page Connectivity**: Never let clicking any button or modal option (Text label, Image label, back button, nav tab) result in a blank page or unhandled state.
2. **Icon Preservation**: Always preserve and display icons across top nav tabs (`Design`, `Products`, `Display`), shape grid (26 vector icons), formatting toolbar, badge icon picker, position card thumbnails, and AI banner.
3. **Outside Placement**: `Outside product image` position mode must position the label inside `.product-meta` between `Product name` and `$10 USD (Product price)`.
4. **Verification**: Always verify changes with `npm run build` before declaring task complete.
5. **Option Parity**: Every size (width %, height %, text size %, letter spacing, image size) and adjustment (borders, rounded corners with `overflow: 'hidden'`) option must logically work and live-update in BOTH Text Label and Image Label types across inside/outside modes.
6. **Navbar Preview Dropdown Parity**: The top navbar dropdown (`previewPage`) must logically switch between dedicated storefront layouts (`collection`, `product`, `homepage`, `search`, `cart`) and respect Page Display / Device Display settings across both Text Label and Image Label types.


