# UI/UX DESIGN SYSTEM & BRAND SPECIFICATION
## Project: Naree Foundation Agro-Tech & Training Web Application
**Document Identifier:** DOC-05-DESIGN  
**Version:** 1.2.0 (Documentation Reconciliation & Canonical Design Specification)  
**Status:** AUDITED DESIGN BASELINE / CANONICAL SPECIFICATION  
**Author:** Senior UX/UI Architect & Product Designer  
**Date:** October 2026  
**Primary Brand:** Naree Foundation (Philosophy: *“Empower • Educate • Elevate”*) `[SOURCE-BACKED - LOGO ASSET VERIFIED; PRIMARY BROCHURE PENDING]`  

---

## 1. Brand Philosophy & Visual Authority

### 1.1 Master Brand Identity (`DESIGN-BRAND-001`) `[SOURCE-BACKED - LOGO ASSET VERIFIED]`
The digital platform is the official web application for **Naree Foundation Agro-Tech & Training**.
- **Philosophy:** *“Empower • Educate • Elevate”* `[SOURCE-BACKED - LOGO ASSET VERIFIED]`
- **Visual Essence:** Serious, modern, educational, nature-inspired, technology-enabled, professional, and welcoming.
- **Strict Brand Rule:** Naree Foundation is the primary brand. The AgrooNext leaflet serves purely as visual inspiration and must never supplant Naree Foundation’s identity, name, or emblem (`LEVEL 4 INSPIRATION ONLY`).
- **UI Policy:** Professional vector iconography (Lucide Icons); zero emoji UI (`RULE-UI-001`).

### 1.2 The Verified Lotus Emblem `[SOURCE-BACKED - LOGO ASSET VERIFIED]`
Directly extracted from `assets/images/naree_foundation_logo.jpg`:
- Multi-petaled blooming lotus cradling a stylized mother and child holding a heart.
- Core petals transition from rose/magenta to warm amber, fresh agricultural emerald, and deep aquatic teal.
- Typography: "Naree" in elegant serif rose-magenta; "Foundation" in structured navy; tagline with matching accent dashes.
- *Notice on Color Precision:* The raster JPEG logo contains subtle gradients and color transitions. The hex values documented below represent **sampled/derived color approximations** from the JPEG asset, pending an official vector brand style guide from the client.

---

## 2. Color System: Official Brand vs Digital Extensions

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                    OFFICIAL DERIVED BRAND PALETTE (SAMPLED APPROXIMATIONS)             │
├──────────────────┬──────────────────┬──────────────────┬─────────────────┬─────────────┤
│    BRAND ROSE    │ FOUNDATION NAVY  │   EMERALD AGRO   │   AMBER SOLAR   │ AQUATIC TEAL│
│     #C2185B      │     #0F2C59      │     #2E7D32      │     #FB8C00     │   #00897B   │
│  [DERIVED TOKEN] │  [DERIVED TOKEN] │  [DERIVED TOKEN] │ [DERIVED TOKEN] │[DERIVED TOK]│
└──────────────────┴──────────────────┴──────────────────┴─────────────────┴─────────────┘
```

### 2.1 Official Derived Brand Colors `[PROPOSED - SAMPLED APPROXIMATIONS]`

| Brand Color Name | Hex Code | Visual Reference / Source Location in Lotus Emblem |
| :--- | :--- | :--- |
| **Naree Brand Rose** | `#C2185B` | Central lotus petal & "Naree" wordmark in official logo |
| **Foundation Navy** | `#0F2C59` | "Foundation" wordmark in official logo |
| **Agro Emerald Green**| `#2E7D32` | Lower-mid lotus foliage petals in official logo |
| **Solar Amber** | `#FB8C00` | Mid-petals (vitality / sunlight) in official logo |
| **Aquatic Teal** | `#00897B` | Base petals (water / aquaculture systems) in official logo |

### 2.2 Digital Design System Extensions `[PROPOSED]`

| Token Name | Hex Code | Role in Application |
| :--- | :--- | :--- |
| `--color-naree-rose-50` | `#FCE4EC` | Light tint background for women's entrepreneurship badges |
| `--color-naree-rose-100`| `#F8BBD0` | Subtle active borders |
| `--color-naree-rose-500`| `#E91E63` | Hover highlights |
| `--color-naree-rose-700`| `#C2185B` | **Primary Brand Rose** CTA button fill |
| `--color-naree-rose-900`| `#880E4F` | Deep contrast text |
| `--color-naree-navy-50` | `#F0F4F8` | Canvas surface fill |
| `--color-naree-navy-100`| `#D9E2EC` | Card border separators |
| `--color-naree-navy-800`| `#102A43` | Navigation headers, footer surfaces |
| `--color-naree-navy-900`| `#0F2C59` | **Foundation Navy** headings & primary text |
| `--color-naree-teal-50` | `#E0F2F1` | Light tint background for Aquaculture modules |
| `--color-naree-teal-700`| `#00897B` | **Aquatic Teal** accent pills & water system highlights |
| `--color-surface-bg` | `#F8FAFC` | Main application background (Slate-50) |
| `--color-surface-card` | `#FFFFFF` | Container cards, dialogs, form backgrounds |
| `--color-border-subtle` | `#E2E8F0` | Default input and card borders (Slate-200) |
| `--color-text-primary` | `#0F172A` | High-contrast body text (Slate-900, 14:1 ratio) |
| `--color-text-muted` | `#64748B` | Captions and metadata (Slate-500, 4.8:1 ratio) |

---

## 3. Typography & Font Hierarchy `[PROPOSED]`

- **Primary Interface Font:** `Inter` or `Plus Jakarta Sans` (Google Fonts) — High legibility across forms, tables, and mobile devices.
- **Display Headings Font:** `Plus Jakarta Sans (Bold/SemiBold)` — Modern, authoritative, and clean.
- **Monospace Font:** `JetBrains Mono` or `Roboto Mono` — Serialized numbers (`ENR-2026-0042`, receipts, hashes).

| Hierarchy Level | Desktop Size / Line-Height | Mobile Size / Line-Height | Font Weight |
| :--- | :--- | :--- | :--- |
| **Display Hero** | `56px / 64px` | `36px / 44px` | Extrabold (800) |
| **Heading 1 (H1)** | `40px / 48px` | `28px / 36px` | Bold (700) |
| **Heading 2 (H2)** | `32px / 40px` | `24px / 32px` | Bold (700) |
| **Heading 3 (H3)** | `24px / 32px` | `20px / 28px` | Semibold (600) |
| **Heading 4 (H4)** | `20px / 28px` | `18px / 24px` | Semibold (600) |
| **Body Large** | `18px / 28px` | `16px / 24px` | Regular (400) / Medium (500) |
| **Body Base** | `16px / 24px` | `15px / 22px` | Regular (400) |
| **Body Small** | `14px / 20px` | `13px / 18px` | Regular (400) |
| **Caption / Badge** | `12px / 16px` | `11px / 14px` | Semibold (600) |

---

## 4. Spacing Scale & Elevation `[PROPOSED]`

- **4px/8px Incremental Spacing System (8pt Grid Standard with 4px Half-Step Base):**
  `space-1 (4px)`, `space-2 (8px)`, `space-3 (12px)`, `space-4 (16px)`, `space-6 (24px)`, `space-8 (32px)`, `space-12 (48px)`, `space-16 (64px)`.
- **Border Radius:** `sm (4px)`, `md (8px)`, `lg (12px)`, `xl (16px)`, `full (9999px)`.
- **Elevation Shadows:**
  - `--shadow-card`: `0 2px 4px rgba(15, 23, 42, 0.06), 0 1px 2px rgba(15, 23, 42, 0.04)`
  - `--shadow-hover`: `0 10px 15px -3px rgba(15, 23, 42, 0.08), 0 4px 6px -4px rgba(15, 23, 42, 0.04)`
  - `--shadow-modal`: `0 20px 25px -5px rgba(15, 23, 42, 0.12)`

---

## 5. UI Component Standards

### 5.1 Interactive Buttons
- **Primary:** Background `--color-naree-rose-700` (`#C2185B`), text `#FFFFFF`, hover `#D81B60`.
- **Secondary:** Background `--color-naree-navy-900` (`#0F2C59`), text `#FFFFFF`, hover `#102A43`.
- **Outline:** Transparent fill, `1.5px solid --color-border-subtle`, text `--color-naree-navy-900`.
- **Touch Target:** Strictly ≥ 44px on mobile devices.

### 5.2 Status Badges (The 12 Admission States) (`DESIGN-FSM-001`) `[PROPOSED]`

| State | Badge Background | Badge Text Color | Border Accent |
| :--- | :--- | :--- | :--- |
| `DRAFT` | `#F1F5F9` (Slate-100) | `#475569` (Slate-600) | `#CBD5E1` |
| `SUBMITTED` | `#EFF6FF` (Blue-50) | `#1D4ED8` (Blue-700) | `#BFDBFE` |
| `UNDER_REVIEW` | `#F5F3FF` (Purple-50) | `#6D28D9` (Purple-700)| `#DDD6FE` |
| `ACTION_REQUIRED` | `#FEF3C7` (Amber-100) | `#B45309` (Amber-800) | `#FDE68A` |
| `APPROVED` | `#ECFDF5` (Emerald-50)| `#047857` (Emerald-700)| `#A7F3D0` |
| `PAYMENT_PENDING` | `#FFFBEB` (Yellow-50) | `#B45309` (Yellow-700) | `#FDE68A` |
| `PAYMENT_CONFIRMED`| `#ECFDF5` (Emerald-50)| `#047857` (Emerald-700)| `#A7F3D0` |
| `ENROLLED` | `#FDF2F8` (Rose-50) | `#BE185D` (Rose-700) | `#FBCFE8` |
| `WAITLISTED` | `#F8FAFC` (Slate-50) | `#64748B` (Slate-500) | `#E2E8F0` |
| `REJECTED` | `#FEF2F2` (Red-50) | `#B91C1C` (Red-700) | `#FECACA` |
| `CANCELLED` | `#F3F4F6` (Gray-100) | `#4B5563` (Gray-600) | `#E5E7EB` |
| `COMPLETED` | `#ECFDF5` (Emerald-50)| `#065F46` (Emerald-800)| `#6EE7B7` |

### 5.3 Educational & Nutritional Notice Banner (`DESIGN-MED-002`) `[SOURCE-BACKED - UNVERIFIED PENDING PDF]`
Mandatory alert banner on all produce, crop, and nutrition pages:
```html
<div class="rounded-xl border border-amber-200 bg-amber-50 p-4 text-amber-900 shadow-sm">
  <div class="flex items-start gap-3">
    <svg class="h-5 w-5 text-amber-600 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
    </svg>
    <div class="text-sm leading-relaxed">
      <strong class="font-semibold text-amber-950">Educational & Nutritional Notice:</strong>
      Food is not a substitute for medical treatment. Educational materials describe nutrients, bioactive compounds, and scientific research associations; they do not establish that these crops cure diseases. For clinical nutrition or medical treatment, follow advice from a qualified healthcare professional.
    </div>
  </div>
</div>
```

---

## 6. Layout Archetypes & Page Flow Anchors

- **5 Programmes Grid (`DESIGN-PROG-001`):** Filterable cards presenting the five disciplines with duration and skill level badges.
- **Course Detail View (`DESIGN-SYLL-001`):** Header with metadata pills; 9-point syllabus accordion; capstone practical callout.
- **Who Can Join Guide (`DESIGN-ELIG-001`):** Role-specific eligibility cards for Schools, Colleges, Vocational Learners, and Women/SHGs.
- **Contact & Inquiry Modal (`DESIGN-CONT-001`):** Responsive form supporting individual inquiries and institutional workshop requests.
- **Training Formats Grid (`DESIGN-FMT-001`):** Side-by-side comparison of 1-day crash courses, 5-day certificate modules, and 3-week packages.
- **Dynamic Fee Cards (`DESIGN-PRICE-001`, `DESIGN-PRICE-002`):** Cards displaying dynamic database pricing with mandatory planning disclaimer (`DESIGN-DISC-001`).
- **Upcoming Batches & Capacity (`DESIGN-BATCH-001`, `DESIGN-BATCH-002`, `DESIGN-BATCH-003`):** Calendar grid with live seat status and institutional capacity clause.
- **Authentication Screens (`DESIGN-AUTH-001`):** Accessible registration, login, and consent checkboxes.
- **Learner Profile & ID Upload (`DESIGN-PROF-001`, `DESIGN-DOC-001`):** Multi-tab profile with secure file upload widget.
- **Application Tracker (`DESIGN-FSM-001`, `DESIGN-HOLD-001`):** 12-state visual progress tracker with seat hold countdown timer.
- **Audit Trail Viewer (`DESIGN-AUD-001`):** Linear chronological audit trail for applications and system settings.
- **Payment Gateway Modal (`DESIGN-PAY-001`, `DESIGN-PAY-002`):** Dual-path checkout modal with online gateway and offline bank transfer submission.
- **Serialized Receipt PDF (`DESIGN-REC-001`):** Printable, serialized payment receipt layout.
- **Trainer Attendance Roster (`DESIGN-ATT-001`, `DESIGN-ATT-002`):** Mobile attendance checkbox roster with student dashboard progress meter.
- **Four-Pillar Assessment Rubric (`DESIGN-RUBR-001`):** Evaluation matrix for knowledge check, practical checklist, project, and attendance.
- **Verifiable PDF Certificate (`DESIGN-CERT-001`, `DESIGN-CERT-002`, `DESIGN-CERT-003`):** Landscape certificate template with mandatory disclosures, non-accreditation disclaimer, and vector QR code.
- **Notification Center (`DESIGN-NOT-001`):** In-app notification bell and responsive email templates.
- **Nutritional Safety Guards (`DESIGN-MED-001`):** Automated checks preventing curative medical claims on crop pages.
- **FAQ Accordion (`DESIGN-FAQ-001`):** Searchable, categorized FAQ accordion component.
- **Admin KPI Dashboard (`DESIGN-DASH-001`):** Data metrics cards and review queue tables.
- **System Settings Manager (`DESIGN-SETT-001`):** Dynamic fee and timeout management forms.

---

## 7. Accessibility & Responsive Standards

- **WCAG 2.1 Level AA:** All body copy contrast ≥ 4.5:1; display headers ≥ 3:1.
- **Breakpoints:** Mobile (320px–639px), Tablet (640px–1023px), Desktop (1024px–1439px), Ultra-Wide (1440px+).
- **Iconography:** Lucide Icons; clean vector geometry; no emojis in UI (`RULE-UI-001`).
