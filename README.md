# StickerPulse — Shopify Product Labels & Badges

> A high-performance, universal product badge and label designer for Shopify stores (Online Store 2.0).

---

## 🚀 Key Features

- **Text & Image Labels**: Design promotional text badges or upload custom branded graphics.
- **26 Vector Badge Shapes**: Capsules, Ribbons, Banners, Notches, Flags, Scallops, Stars, and Diamonds.
- **Precision Positioning**:
  - **Inside Image**: 9-point anchor grid with fine-tuning X/Y pixel offsets.
  - **Outside Image**: Injects directly into `.product-meta` between Product Title and Price.
- **Product Tag Targeting**: Target badges to all products or restrict exclusively to specific product tags (e.g. `eco-friendly`, `sale`, `organic`).
- **Multi-Label Per Product**: Stack or position primary and secondary labels independently on the same product.
- **Full Display Targeting**: Page-level targeting (Collection, Product PDP, Homepage, Search, Cart) and device filtering (All, Desktop, Mobile).
- **Online Store 2.0 Theme App Extension**: Pure App Embed block without modifying theme Liquid files.
- **Real-Time Shopify Metafield Sync**: Automatically synchronizes label configurations to `shop.metafields.stickerpulse.labels_data`.

---

## 🛠️ Tech Stack

- **Frontend**: React 18, Vite, Lucide Icons, Vanilla CSS
- **Shopify App Integration**: `@shopify/app-bridge`, `@shopify/app-bridge-react`
- **Storefront Extension**: Shopify Liquid (`blocks/label_embed.liquid`), Vanilla JS & Scoped CSS
- **Storage**: Shopify Shop Metafields + LocalStorage cache

---

## 📖 Documentation Index

All detailed specifications and engineering guides are located in the [`Md files/`](file:///f:/Shopify%20Label%20App/Md%20files/) directory:

- [**PRD.md**](file:///f:/Shopify%20Label%20App/Md%20files/PRD.md): Product requirements, features, and user workflows.
- [**ARCHITECTURE.md**](file:///f:/Shopify%20Label%20App/Md%20files/ARCHITECTURE.md): System architecture, data flow, and metafield schemas.
- [**DESIGN.md**](file:///f:/Shopify%20Label%20App/Md%20files/DESIGN.md): UI/UX design tokens, component specifications, and 26 vector shape designs.
- [**IMPLEMENTATION_PLAN.md**](file:///f:/Shopify%20Label%20App/Md%20files/IMPLEMENTATION_PLAN.md): Completed milestone roadmap and verification records.
- [**RULES.md**](file:///f:/Shopify%20Label%20App/Md%20files/RULES.md): Mandatory engineering constraints and rendering rules.

---

## 💻 Local Development

```powershell
# 1. Install dependencies
npm install

# 2. Start local dev server & Shopify tunnel
shopify app dev

# 3. Build for production
npm run build
```
