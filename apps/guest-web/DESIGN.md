---
name: Premium Hotpot Tabletop Ordering
colors:
  surface: '#f9f9fc'
  surface-dim: '#d9dadc'
  surface-bright: '#f9f9fc'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f3f6'
  surface-container: '#eeeef0'
  surface-container-high: '#e8e8ea'
  surface-container-highest: '#e2e2e5'
  on-surface: '#1a1c1e'
  on-surface-variant: '#5c403d'
  inverse-surface: '#2f3133'
  inverse-on-surface: '#f0f0f3'
  outline: '#906f6c'
  outline-variant: '#e5bdba'
  surface-tint: '#bc131e'
  primary: '#a30014'
  on-primary: '#ffffff'
  primary-container: '#c92026'
  on-primary-container: '#ffe0dc'
  inverse-primary: '#ffb3ad'
  secondary: '#7e5700'
  on-secondary: '#ffffff'
  secondary-container: '#fdbe50'
  on-secondary-container: '#714d00'
  tertiary: '#932728'
  on-tertiary: '#ffffff'
  tertiary-container: '#b43f3d'
  on-tertiary-container: '#ffe0dd'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdad6'
  primary-fixed-dim: '#ffb3ad'
  on-primary-fixed: '#410003'
  on-primary-fixed-variant: '#930011'
  secondary-fixed: '#ffdead'
  secondary-fixed-dim: '#fabc4d'
  on-secondary-fixed: '#281900'
  on-secondary-fixed-variant: '#604100'
  tertiary-fixed: '#ffdad7'
  tertiary-fixed-dim: '#ffb3ae'
  on-tertiary-fixed: '#410004'
  on-tertiary-fixed-variant: '#871e20'
  background: '#f9f9fc'
  on-background: '#1a1c1e'
  surface-variant: '#e2e2e5'
typography:
  headline-xl:
    fontFamily: Epilogue
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-xl-mobile:
    fontFamily: Epilogue
    fontSize: 26px
    fontWeight: '700'
    lineHeight: 34px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Epilogue
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Epilogue
    fontSize: 20px
    fontWeight: '700'
    lineHeight: 28px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Epilogue
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '500'
    lineHeight: 24px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  body-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
  label-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '700'
    lineHeight: 18px
    letterSpacing: 0.01em
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 10px
    fontWeight: '700'
    lineHeight: 12px
    letterSpacing: 0.04em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 0.75rem
  gutter-mobile: 0.5rem
  margin: 1rem
  margin-mobile: 0.75rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 0.75rem
  space-lg: 1rem
  space-xl: 1.5rem
---

## Brand & Style

This design system is tailored for an upscale, high-energy tabletop hotpot ordering experience accessed via in-restaurant QR codes. The interface balances high-touch culinary hospitality with rapid, error-free mobile interaction under warm ambient dining lights.

### Target Audience & Psychological Intent
- **Audience:** Diners seated at the table ordering individually or collaboratively, ranging from social gatherings to formal family and corporate dining.
- **Emotional Response:** Appetizing urgency, culinary prestige, trust in ingredient freshness, and effortless control over high-volume multi-round orders.

### Visual Aesthetic: Modern Tactile Culinary
Drawing from contemporary Asian high-end dining interfaces (inspired by market leaders like Haidilao), the visual style unites crisp editorial layout with tactile hospitality cues:
- **Clean Cream Canvases:** Replacing stark sterile whites with creamy, milk-white surfaces that mimic fine porcelain and reduce optical glare in dimly lit dining rooms.
- **Vibrant Culinary Accents:** Rich chili reds spark appetite and drive primary checkout/adding actions, paired with metallic broth-gilded gold accents to denote chef specialties and signature ingredients.
- **Generous Touch Ergonomics:** Built explicitly for one-handed thumb navigation while holding chopsticks or dining utensils; high touch targets, thumb-accessible sticky trays, and fluid micro-transitions.

## Colors

The color palette is engineered for appetite stimulation, clarity, and visual prestige while strictly maintaining WCAG AA legibility across mobile displays.

### Palette Architecture
- **Primary Culinary Red (`#C92026` / `#E52D27`):** Represents boiling spicy broths and fresh cuts of marbled beef. Reserved for primary calls-to-action (Add to Cart, Confirm Order, Step Progress), real-time status alerts, and price tags.
- **Secondary Imperial Gold (`#E5A93C` / `#F7B731`):** Represents nourishing bone broths and hospitality luxury. Used exclusively for VIP tags, Chef Recommendation badges, spicy scale indicators, and subtle premium card accents.
- **Tertiary Deep Oxblood (`#7A1418`):** Deep grounding tone for active tab states, bottom sheet handles, and critical dish categorization dividers.
- **Background Tones (`#FFFFFF`, `#FAFAFA`, `#F4F4F6`):** Off-white, soft porcelain, and warm bone gray. They provide clean visual separation without harsh contrast glare.
- **Typography & Structure (`#1E2022`, `#4A4A4A`, `#9E9E9E`):** Charcoal-black for dish names and pricing to guarantee crisp optical contrast against bright food photography; secondary warm slate for portion details and ingredient descriptions.

## Typography

The type system pairs **Epilogue** for display headers and culinary dish naming with **Plus Jakarta Sans** for clear, legible body text, ingredient listings, and numerical pricing. Both typefaces feature native, polished diacritics for Vietnamese typography (tones like *hỏi, ngã, nặng, sắc, huyền* sit cleanly without overlapping ascenders or causing line-height clipping).

### Hierarchy Implementation
- **Headline Styles:** Epilogue provides characterful, authoritative food category names (e.g., "Nước Lẩu & Gia Vị", "Thịt Bò Thượng Hạng") with slight organic curves that evoke artisan dining.
- **Body & Numerical Legibility:** Plus Jakarta Sans delivers wide apertures and tall x-heights, ensuring that currency formats (`₫`, `VND`), portion weights (`200g`, `Nửa phần / Cả phần`), and dietary labels remain immediately decipherable on compressed mobile screens.
- **Label System:** Used for culinary badges (e.g., "Bếp Trưởng Khuyên Dùng", "Bán Chạy Nhất"), order count chips, and modifiers.

## Layout & Spacing

This design system is structured primarily for portrait mobile web sessions (`360px` to `430px` viewport width), with a dynamic two-column responsive grid scaling to tablet stations for tabletop iPad setups.

### Layout Philosophy
- **Sticky Architectural Anchors:** 
  - **Top:** Pinned table session status (Table Number, Guest Count, Current Subtotal, Search Bar).
  - **Left Rail (or Segmented Pill Carousel):** Quick-scroll category anchor navigation (Broths, Wagyu & Beef, Seafood, Handmade Pastes, Fresh Greens, Beverages).
  - **Bottom:** Persistent "Floating Order Tray" anchored above the mobile browser's bottom navigation bar, featuring dynamic count badges and immediate checkout access.
- **Touch-First Rhythm:** Standard 44px minimum interactive height for every touch target. Dish quantity steppers (`-`, `number`, `+`) maintain 48px square touch targets to prevent accidental ordering mistakes while eating.

## Elevation & Depth

Visual depth is achieved through delicate ambient drop shadows paired with translucent glassmorphic surfaces, avoiding heavy dark drop shadows that compromise clean hygiene aesthetics.

### Elevation Levels
- **Level 0 (Base Canvas):** Off-white warm porcelain (`#FAFAFA`).
- **Level 1 (Dish Cards & Form Modules):** Crisp white (`#FFFFFF`) with a feather-light warm shadow: `0 4px 16px -2px rgba(30, 32, 34, 0.05)`, edged by a hairline border (`1px solid #F0EFEF`).
- **Level 2 (Sticky Headers & Navigation Rails):** Semi-transparent white (`rgba(255, 255, 255, 0.92)`) featuring a `12px` backdrop blur (`backdrop-filter: blur(12px)`) and subtle base shadow `0 2px 8px rgba(0, 0, 0, 0.04)`.
- **Level 3 (Floating Order Bar & Modal Drawers):** Elevated above the dining canvas with a vibrant culinary depth shadow: `0 12px 32px -4px rgba(201, 32, 38, 0.18), 0 4px 12px -2px rgba(30, 32, 34, 0.08)`.
- **Level 4 (Full Flavor & Customization Bottom Sheets):** Deep dim overlay `rgba(18, 18, 20, 0.65)` supporting upward slide-in modals for sauce recipes and broth split selections (2-compartment / 4-compartment pots).

## Shapes

The design system employs a soft, friendly, and organic shape language that mirrors clean ceramic plates and rounded hotpot vessels.

### Curvature Hierarchy
- **Cards & Primary Modules:** Uniform `rounded-2xl` (`1rem` / `16px`) for food imagery containers, category containers, and broth selection cards.
- **Interactive Controls & Buttons:** Full pill radii (`9999px`) for action buttons, filter tags, and quantity increment steppers, providing an effortless, tactile feeling under the thumb.
- **Badges & Modifiers:** Semi-pill rounded curves (`8px` to `12px`) ensuring text stability inside compact nutritional and culinary tags.
- **Image Treatment:** Aspect ratios maintain a uniform `1:1` square for standard catalog lists or `16:10` for signature hero dishes (e.g., Australian Wagyu platters), masked with the parent card's `16px` corner curvature.

## Components

### 1. Dish Card (Product Item)
- **Layout:** Horizontal compact card on mobile lists; vertical card on promo grids.
- **Media:** High-resolution food photography with subtle inner vignette.
- **Badges:** Top-left stacked tags (e.g., Gold Badge: "★ Bếp Trưởng Khuyên Dùng", Red Badge: "🔥 Bán Chạy").
- **Content:** Title in `headline-md`, concise description in `body-sm` (truncated to 2 lines), bold price display in Primary Red (`label-lg`).
- **Action:** Circular plus (`+`) pill icon button (`40x40px`) or full expanded quantity stepper (`- [count] +`) when selected.

### 2. Flavor & Pot Split Selector (Signature Component)
- Custom toggle cards representing 1-compartment, 2-compartment (Yin-Yang), and 4-compartment hotpot cauldrons.
- Selected quadrant indicates soup base with active colored tags (e.g., Spicy Mala Red, Tomato Gold, Herbal Clear).

### 3. Sticky Bottom Order Bar
- Persistent bottom bar floating `12px` above screen edge.
- Left side: Dynamic order bowl icon with total dish count badge (Gold `#E5A93C` on Red `#C92026`) and calculated live total.
- Right side: Broad pill action button (`Gửi Đơn Gọi Món` / "Review Order") with smooth micro-pulsing feedback upon new dish addition.

### 4. Chips & Filters
- **Dietary & Category Chips:** Soft cream background (`#F4F4F6`), charcoal label. Active state transitions to deep Primary Red fill with white text.
- **Spiciness Level Indicators:** Visual chili pepper icon scale (`1` to `3` peppers) tinted with `#C92026`.

### 5. Input Fields & Special Requests
- Textareas for kitchen notes ("Ít cay", "Không hành tím", "Nước sôi thêm") styled with warm-tinted neutral borders (`#E5E5E8`), transitioning to a crisp Primary Red focus ring with zero layout shift.