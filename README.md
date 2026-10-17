# AgrooNext — Agro-Tech & Training

AgrooNext is a modern, full-stack educational and enterprise platform dedicated to next-generation agricultural technology training, precision farming, greenhouse automation, and agro-entrepreneurship.

**Brand Philosophy:** Empower • Educate • Elevate  
**Official Color System:**
- Forest Canopy / Primary: `#1B4332`
- Harvest Gold / Accent: `#D4A373`
- Sprout Green / Border: `#3F6B43`
- Dark Background: `#0B130E`
- Light Background: `#F8F9FA`

---

## Key Features

1. **Homepage & Hero Experience**
   - High-impact editorial hero section with authentic agricultural imagery.
   - Refined square frame layout with 5px Sprout Green border (`#3F6B43`) and subtle depth elevation.
   - Micro-stats, trusted industry logos, training format selector, and enquiry modal integration.

2. **Official Branding & Favicons**
   - Official AgrooNext logo (`assets/logo.png`) seamlessly integrated across public headers, footers, authentication screens, learner portal, and admin console.
   - High-resolution SVG and multi-size PNG/ICO favicons and touch icons.

3. **Academic Programmes & Course Catalogue**
   - Hydroponics, greenhouse automation, IoT sensing, drone surveillance, and agribusiness curricula.
   - Real-time batch scheduling, duration tracking, and fee structures.

4. **Learner Portal**
   - Secure learner registration and authentication (JWT-based).
   - Application status tracking, personal profile management, batch assignments, and payment receipts.

5. **Admin Operations Console**
   - Application queue management and decision workflows.
   - Payment reconciliation and audit logging.
   - Course pricing and batch schedule controls.
   - Inquiries inbox and learner roster management.

---

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS + Vanilla CSS Design System
- **Database & ORM:** SQLite (dev) / PostgreSQL (prod) via Prisma ORM
- **Authentication:** Jose / JWT with HTTP-only cookies
- **Icons:** Lucide React

---

## Getting Started

### 1. Prerequisites
- Node.js (v18.17.0 or later)
- npm / pnpm / yarn

### 2. Environment Configuration
Copy `.env.example` to `.env` and configure your environment variables:
```bash
cp .env.example .env
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Database Setup & Seeding
```bash
npx prisma db push
npx tsx prisma/seed.ts
```

### 5. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the application.

---

## Scripts

- `npm run dev` — Starts the local Next.js development server.
- `npm run build` — Compiles the Next.js production bundle.
- `npm run start` — Starts the Next.js production server.
- `npm run lint` — Runs ESLint checks.
- `npm run type-check` — Runs TypeScript compiler checks (`tsc --noEmit`).

---

## License

Proprietary © AgrooNext — Agro-Tech & Training. All rights reserved.
