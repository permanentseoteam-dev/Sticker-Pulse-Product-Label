# Design Document
## StickerPulse — UI/UX Specifications, Design System & Interaction Model

---

## 1. Information Architecture & Navigation

```
StickerPulse App
├── Header
│   ├── App Brand (Rosette Icon + "StickerPulse" Logo + "Product Labels & Badges" tagline)
│   └── Embedded Status Pill ("Embedded in <shop>.myshopify.com" | "OS 2.0 Theme Embed Ready")
├── Dashboard (Empty State & Labels Table)
│   ├── Metric Bar (Active Labels count, Total Labels count)
│   ├── "+ Create label" Action
│   └── Labels Table
│       ├── Columns: Label Name, Type, Position, Pages, Status Toggle, Actions (Edit, Duplicate, Delete)
├── Label Type Modal
│   ├── Text Label Card (Dynamic typography, 26 vector shapes, inside/outside placement)
│   └── Image Label Card (Custom graphics, transparent PNG/SVG, gallery presets)
└── Unified Label Editor (`TextLabelEditor.jsx`)
    ├── Top Navigation Header
    │   ├── Back Button ("← Create label" / "← Labels")
    │   ├── Tab Switcher ("Design" | "Display")
    │   ├── Page Preview Dropdown (Collection, Product, Homepage, Search, Cart)
    │   ├── Device Switcher (Desktop, Mobile)
    │   ├── Active / Inactive Status Switch
    │   └── "Save Label" Button (Primary CTA)
    ├── Left Sidebar (Settings Panel)
    │   ├── DESIGN TAB:
    │   │   ├── Section 1: Label Shape / Image Configuration
    │   │   ├── Section 2: Position (Inside 9-Point Grid | Outside Meta Slot)
    │   │   ├── Section 3: Content & Icons (Text, Fonts, Formatting, Icon Picker, Colors)
    │   │   ├── Section 4: Size & Spacing (Width %, Height %, Text Size %, Letter Spacing)
    │   │   └── Section 5: Adjustments (Borders, Rounded Corners with overflow hidden)
    │   └── DISPLAY TAB:
    │       ├── Section 1: Page Display (Product, Collection, Homepage, Search, Cart checkboxes)
    │       ├── Section 2: Device Display (All devices, Desktop only, Mobile only)
    │       ├── Section 3: Product Targeting (All products vs. Specific Product Tags + Suggestions)
    │       └── Section 4: Multi-Label Support (Toggle secondary label design suite)
    └── Right Pane (Interactive Live Preview)
        ├── Simulated Product Card or PDP Hero View
        ├── Real-Time Vector Shape & Typography Rendering
        ├── Warning / Hidden Reason Banner if current page/device rule excludes label
        └── Live Multi-Label Secondary Overlay
```

---

## 2. Design System & Visual Tokens

### 2.1 Color Palette
- **Primary Brand / Emerald**: `#059669` (Dark: `#047857`, Light: `#d1fae5`)
- **Accent Ruby / Sale Red**: `#B02947` (Light: `#fee2e2`)
- **Neutral Dark / Text**: `#0f172a`, `#1e293b`, `#334155`
- **Neutral Light / Backgrounds**: `#f8fafc`, `#f1f5f9`, `#ffffff`
- **Borders & Dividers**: `#e2e8f0`, `#cbd5e1`
- **Warning / Notice**: Background `#fffbeb`, Border `#fde68a`, Text `#b45309`

### 2.2 Typography Scale
- **Font Families**: `Inter`, `Alata`, `Roboto`, `Poppins`, `Outfit`, `serif`, `sans-serif`
- **Header Titles**: 18px–20px, Bold (700)
- **Section Headers**: 13.5px–14px, SemiBold (600)
- **Body & Inputs**: 12.5px–13px, Regular (400–500)
- **Helper & Meta Text**: 11px–12px, Muted (`#64748b`)

---

## 3. Component Specifications

### 3.1 Shape Grid (26 Vector Shapes)
The editor provides an interactive visual grid of 26 vector badge shapes with live SVG/CSS clip-path previews:
- **Capsule Family**: `capsule-full`, `capsule-left`, `capsule-right`
- **Ribbon & Flag Family**: `flag-left`, `corner-ribbon-left`, `corner-ribbon-right`, `fold-left`, `fold-right`
- **Pointers & Notches**: `pointer-left`, `pointer-right`, `double-notch`, `arrow-notch`
- **Geometric & Badges**: `circle`, `scallop`, `hexagon`, `slanted-left`, `slanted-right`, `trapezoid-top`, `trapezoid-bottom`, `corner-triangle-left`, `corner-triangle-right`

### 3.2 Position Selector System
1. **Inside Product Image (9-Point Grid)**:
   - Visual 3x3 interactive card matrix representing:
     `[Top-Left, Top-Center, Top-Right]`
     `[Middle-Left, Middle-Center, Middle-Right]`
     `[Bottom-Left, Bottom-Center, Bottom-Right]`
   - Fine-tune controls: `Offset X` (-50px to +50px) and `Offset Y` (-50px to +50px).
2. **Outside Product Image (Product Meta Slot)**:
   - Positions the badge between **Product Title** and **Product Price**.
   - Alignment selector: `Left`, `Center`, `Right`.

### 3.3 Product Tag Targeting Controls
- **Radio Options**:
  - `All products`
  - `Products with specific tags`
- **Tag Input**: Clean input box with auto-tokenization (e.g. `eco-friendly, organic, sale`).
- **Quick-Add Suggestions**: Clickable pill chips (`+eco-friendly`, `+organic`, `+sale`, `+new`, `+bestseller`).

### 3.4 Multi-Label Secondary Builder
- When toggled ON, reveals an embedded secondary label design panel allowing merchants to define a distinct second badge with independent shape, color, typography, and anchor.

---

## 4. Storefront Rendering UX

1. **Instant Paint**: Badges render smoothly on initial DOM paint with zero layout shift (CLS = 0).
2. **Featured Media Isolation**: On Product Detail Pages, badges strictly overlay the primary active media, leaving thumbnail carousels clean.
3. **Responsive Scaling**: Proportional scaling across mobile (≤768px) and desktop viewports.
4. **Duplicate Emoji Sanitization**: Automatically strips redundant emoji prefixes from text content if the icon picker is active.
