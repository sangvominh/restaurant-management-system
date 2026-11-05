---
name: Ocean Blue Ops
colors:
  surface: '#f9f9ff'
  surface-dim: '#d3daea'
  surface-bright: '#f9f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f0f3ff'
  surface-container: '#e7eefe'
  surface-container-high: '#e2e8f8'
  surface-container-highest: '#dce2f3'
  on-surface: '#151c27'
  on-surface-variant: '#404850'
  inverse-surface: '#2a313d'
  inverse-on-surface: '#ebf1ff'
  outline: '#707881'
  outline-variant: '#bfc7d1'
  surface-tint: '#006399'
  primary: '#005d90'
  on-primary: '#ffffff'
  primary-container: '#0077b6'
  on-primary-container: '#f3f7ff'
  inverse-primary: '#94ccff'
  secondary: '#315ca9'
  on-secondary: '#ffffff'
  secondary-container: '#86adff'
  on-secondary-container: '#033e8a'
  tertiary: '#3b5e65'
  on-tertiary: '#ffffff'
  tertiary-container: '#53777e'
  on-tertiary-container: '#e7fbff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#cde5ff'
  primary-fixed-dim: '#94ccff'
  on-primary-fixed: '#001d32'
  on-primary-fixed-variant: '#004b74'
  secondary-fixed: '#d8e2ff'
  secondary-fixed-dim: '#aec6ff'
  on-secondary-fixed: '#001a42'
  on-secondary-fixed-variant: '#0f4490'
  tertiary-fixed: '#c3e9f1'
  tertiary-fixed-dim: '#a8cdd5'
  on-tertiary-fixed: '#001f24'
  on-tertiary-fixed-variant: '#284c53'
  background: '#f9f9ff'
  on-background: '#151c27'
  surface-variant: '#dce2f3'
typography:
  headline-lg:
    fontFamily: Inter
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
  title-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 22px
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  body-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
  label-lg:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 18px
    letterSpacing: 0.01em
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '500'
    lineHeight: 14px
    letterSpacing: 0.02em
  metric-counter:
    fontFamily: Inter
    fontSize: 22px
    fontWeight: '700'
    lineHeight: 26px
    letterSpacing: -0.02em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 0.75rem
  gutter-tablet: 1rem
  gutter-desktop: 1.5rem
  margin: 1rem
  margin-tablet: 1.5rem
  margin-desktop: 2rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 0.75rem
  space-lg: 1rem
  space-xl: 1.5rem
  space-2xl: 2rem
---

## Brand & Style

This design system is engineered for restaurant floor staff, cashiers, kitchen staff, and shift supervisors operating in fast-paced, high-stress environments. The emotional response must evoke clarity, situational awareness, and total operational calm under pressure.

### Design Movement
**Modern Operational / Functional Precision:**
- **Ergonomic one-handed mobile focus:** Key interactive actions reside within the thumb reach zone (bottom 40% of the viewport).
- **High legibility & high contrast:** Immediate glanceability across noisy, variable lighting conditions (dark bar areas to bright daylight dining rooms).
- **Zero visual fluff:** Decorative elements are eliminated in favor of functional spatial separation, crisp state communication, and immediate feedback.

## Colors

The palette balances clinical authority with distinct operational state feedback. 

### Key Color Roles
- **Primary (`#0077B6` - Ocean Blue):** Primary actions, active navigation states, selected floor zones, and interactive focus states.
- **Secondary (`#023E8A` - Deep Navy):** High-level headers, primary text, high-priority operational tabs, and persistent containers.
- **Tertiary (`#CAF0F8` - Light Blue):** Soft highlight fills, secondary badge backgrounds, subtle active state fills for table selections.
- **Neutral (`#6B7280` - Steel Gray):** Secondary metadata, inactive states, dividers, and icon tints.
- **Canvas / Background (`#F5FAFD`):** Ultra-soft tinted cool canvas reducing glare on OLED/LCD screens during prolonged shifts.
- **Surface / Card (`#FFFFFF`):** High-contrast background for order tickets, table cards, and interactive tiles.

### Semantic State System
- **Available / Completed (`#10B981`):** Ready-to-serve orders, settled checks, available tables.
- **In-Progress / Pending (`#F59E0B`):** Kitchen cooking, pending modifications, waiting for bill settlement.
- **Urgent / Overdue / Needs Attention (`#EF4444`):** Late tickets (>15 mins), dirty/bussed tables requiring cleanup, out-of-stock item triggers.
- **Neutral / Idle (`#6B7280`):** Reserved or inactive states.

## Typography

The type system prioritizes **Inter** for uniform optical tracking across full Vietnamese diacritic character sets (`à, ả, ã, á, ạ, ă, ắ, ằ...`) and dense numerical data.

### Typographic Rules
- **Tabular Figures (`tnum`):** All numerical tables, table numbers, item quantity counts, timers, and currency values (`₫ / VND`) must render with tabular figures to prevent horizontal jitter during real-time updates.
- **Visual Distinction for Special Instructions:** Kitchen notes, customer allergies, and modification labels must use `title-md` or `label-md` with strict color-coded semantic emphasis rather than complex serif flourishes.
- **Compact Scannability:** Table identifiers and quick timers rely on `metric-counter` tokens for instantaneous recognition from an arm's length away.

## Layout & Spacing

The layout is built on an **8pt modular spacing grid** (with a 4pt sub-unit for tight micro-elements like badge insets and stepper counters).

### Mobile Thumb-Zone Architecture
- Primary viewport target is 360px–430px wide handheld hardware.
- High-frequency touch elements must maintain a minimum target size of **48x48px**.
- Secondary filters and section pickers live in sticky bottom sheets or horizontal scroll chips stationed above the bottom navigation bar.
- Layout switches to a 6-column grid on small POS tablets (768px+) and a 12-column grid on supervisor terminal dashboards (1024px+).

### Spacing Guidelines
- **Card Padding:** `space-lg` (16px) for order summary cards; `space-md` (12px) for floor-plan table tiles.
- **Section Margins:** `margin` (16px) dynamic gutter on mobile screens to preserve screen real estate.
- **Item Row Insets:** `space-sm` vertical separation between modifier rows to keep order tickets compact without overlapping touch targets.

## Elevation & Depth

To preserve operational speed, elevation relies on clean, low-intensity ambient shadows and crisp surface separation rather than heavy skeuomorphism.

### Depth Hierarchy
1. **Level 0 (Floor/Canvas):** Default background (`#F5FAFD`). Static grid base and floor-plan layout boundaries.
2. **Level 1 (Surface/Card):** `#FFFFFF` surfaces with a 1px border (`#E2EEF5`) and subtle ambient shadow: `0 1px 3px rgba(2, 62, 138, 0.05)`. Used for order items, table tiles, and static reports.
3. **Level 2 (Active/Selected Card):** Elevated active cards or dragging items: `0 4px 12px rgba(2, 62, 138, 0.10)`.
4. **Level 3 (Sticky Nav & Floating Actions):** Bottom navigation bars, persistent checkout CTA bars: `0 -2px 10px rgba(0, 119, 182, 0.08)`.
5. **Level 4 (Modals & Bottom Drawers):** Table action sheets, modifier selectors, numerical quantity keypads: `0 -8px 24px rgba(2, 62, 138, 0.16)`.

## Shapes

The design system uses **Level 2 (Rounded)** geometries to achieve a modern, approachable, and ergonomic feel that reduces visual fatigue during long service shifts.

### Geometric Values
- **Base Components (Inputs, Buttons, Cards):** `0.5rem` (8px) radius.
- **Containers & Bottom Sheets:** `rounded-lg` (`1rem` / 16px) for top corners of modal sheets and main layout cards.
- **Status Badges, Chips & Counter Pills:** Fully rounded (`rounded-full` / 9999px) to clearly distinguish metadata from clickable square/rectangular cards.
- **Floor Plan Tables:** Circular for round dining tables (`rounded-full`), rounded square (`0.5rem`) for standard booths and rectangular 4-tops.

## Components

### Bottom Navigation
- **Placement:** Affixed strictly to the bottom of the viewport with hardware-safe area padding.
- **Items:** 4 primary destinations (e.g., Sơ đồ bàn [Tables], Gọi món [Orders], Bếp [KDS], Thu ngân [Cashier]).
- **Height:** 64px container; active item highlighted with Ocean Blue (`#0077B6`) icon and label, neutral items tinted with `#6B7280`.

### Status Badges
- **Dimensions:** Height 24px, padding 4px 10px, radius 9999px.
- **Variants:**
  - *Bàn trống (Available):* Background `#ECFDF5`, Text/Dot `#10B981`.
  - *Đang phục vụ / Đang nấu (In-Progress):* Background `#FFFBEB`, Text/Dot `#F59E0B`.
  - *Cần dọn dẹp / Chậm trễ (Alert):* Background `#FEF2F2`, Text/Dot `#EF4444`.
  - *Đã thanh toán (Settled):* Background `#F3F4F6`, Text/Dot `#4B5563`.
- Include a 6px solid pulsating dot indicator on overdue or critical alert badges.

### Floor Plan Grid
- **Card Aspect:** Standard square or 4:3 tile showing table number in `metric-counter` bold.
- **Visual States:**
  - Background is white (`#FFFFFF`) with a top accent bar (4px thick) matching the semantic status color.
  - Active guest count and elapsed sitting time (`body-sm`) centered below table identifier.
  - Selected state indicated by a 2px `#0077B6` outline and Light Blue (`#CAF0F8`) surface wash.

### Action Cards & Order Items
- **Order Item Row:** Left counter box (quantity in `#0077B6` bold), center description with nested modifier chips, right price / item action (cross-out or status checkmark).
- **Kitchen Ticket Action Card:** Header displays table number, elapsed timer (switching to `#EF4444` when > 15m), checklist items below, and a single full-width primary bottom trigger ("Hoàn tất món").

### Quick Action Buttons (One-Handed Mobile)
- **Primary CTA:** Minimum 48px height, background `#0077B6`, text `#FFFFFF`, font `label-lg`.
- **Secondary CTA:** Background `#CAF0F8`, text `#023E8A`, zero border.
- **Destructive / Void CTA:** Ghost or soft-tinted `#FEE2E2` with `#EF4444` text.
- **Split-Keypad Quick Action:** Fixed bottom-docked panel providing single-tap actions: "Chuyển bàn", "Tách đơn", "Báo món", and "Thanh toán".

### Checkboxes & Input Controls
- Touch target minimum 44px with a 20px visible control.
- Checkbox uses `#0077B6` fill with white checkmark when selected; radio uses center solid dot.
- Numerical stepper controls for order quantities feature large `+` and `−` touch areas (40x40px minimum) flanked around tabular number indicators.