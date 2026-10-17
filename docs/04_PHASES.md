# IMPLEMENTATION ROADMAP & PHASE SPECIFICATION
## Project: Naree Foundation Agro-Tech & Training Web Application
**Document Identifier:** DOC-04-PHASES  
**Version:** 1.2.0 (Documentation Reconciliation & Source Audit Baseline)  
**Status:** AUDITED ROADMAP BASELINE / SOURCE VERIFICATION PENDING  
**Author:** Senior Product Architect, Technical Lead & Engineering Manager  
**Date:** October 2026  
**Primary Brand:** Naree Foundation (Philosophy: *“Empower • Educate • Elevate”*) `[SOURCE-BACKED - LOGO ASSET VERIFIED; PRIMARY BROCHURE PENDING]`  

---

## 1. Roadmap Architecture & Phase Boundaries

The roadmap is structured into 15 sequential, gate-controlled phases. It formalizes two clear scope baselines subject to client resolution:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    PROJECT PHASING BOUNDARIES & OPTIONS                     │
├──────────────────────┬───────────────────────────────┬──────────────────────┤
│       PHASE 0        │    CORE MVP (OPTION A vs B)   │ POST-MVP / SCALE     │
│ Discovery, Source    │ OPTION A: Phases 1-10         │ Analytics, B2B Bulk, │
│ Audit & Reconciliation│ (includes Ops & QR Certs)    │ DLT SMS/WhatsApp,    │
│ [SOURCE VERIFICATION │ OPTION B: Phases 1-8          │ Marathi/Hindi        │
│       PENDING]       │ (Ops & QR Certs in Phases 9-10)│ Localization        │
└──────────────────────┴───────────────────────────────┴──────────────────────┘
```

> [!IMPORTANT]
> **Core MVP Boundary Scope Options (DEC-017 / CONF-007) `[REQUIRES CLIENT DECISION]`:**
> - **Option A (Extended Core MVP — Phases 1 to 10):** Includes Phases 9 & 10 (Attendance Logging, Four-Pillar Assessments, and Tamper-Evident QR PDF Certification Engine) in the initial production release. MVP go-live occurs after Phase 10.
> - **Option B (Lean Phased MVP — Phases 1 to 8):** Core MVP launch occurs at Phase 8 (Public Web, Catalogue, Admissions FSM, Payments, and Admin Dashboard). Phases 9 & 10 become the immediate Post-MVP release.

---

## PHASE 0 — Documentation, Source Audit & Reconciliation `[ACTIVE GATE]`

- **Objective:** Establish the verified single source of truth (SSOT), analyze primary source materials, reconcile discrepancies, enforce the classification system, and align documentation across all modules.
- **Scope:** Source audit of workspace assets; authoring and updating DOC-01 through DOC-06; establishing `TRACEABILITY_MATRIX.md` and `CHANGELOG.md`; asset cataloging.
- **Modules Involved:** Global Project Governance.
- **Prerequisites:** Workspace access, raw PDFs, authentic brand logos.
- **Dependencies:** Client delivery of physical or digital copies of primary PDFs.
- **Database / API / Code Changes:** NONE. Strictly documentation only.
- **Acceptance Criteria for Phase 0 Gateway:**
  - [ ] Primary source PDF documents received and cross-checked *(BLOCKED: Primary PDFs missing from workspace; client delivery pending)*.
  - [x] Authentic Naree Foundation logo analyzed and color tokens cataloged from `assets/images/naree_foundation_logo.jpg`.
  - [x] All foundational documents updated to Version 1.2.0 with strict classification tags and unverified source notices.
  - [x] Traceability Matrix expanded to cover 100% of PRD requirements (all 37 items) with real document section anchors.
  - [x] Formal Decision Register and Source Conflict Register reconciled with Option A / Option B MVP scope.
  - [x] Open client decisions clearly identified with implementation blocking impact.
  - [x] Architecture baseline stabilized on verified compatible LTS stack (Next.js 14.2.24+, Node 20/22 LTS, Prisma 5.22.x).
- **Status:** **DOCUMENTATION RECONCILED / SOURCE VERIFICATION PENDING CLIENT PROVISION OF PRIMARY ASSETS.**

---

## PHASE 1 — Foundation & Project Setup `[TECHNICAL RECOMMENDATION]`

- **Objective:** Initialize the application codebase with strict TypeScript types, design token system, database ORM, and environment validation.
- **Scope:** Next.js 14.2.24+ (App Router), React 18.3.1, TypeScript 5.4.x / 5.5.x, Tailwind CSS 3.4.x, Prisma ORM 5.22.x, PostgreSQL 15.x/16.x connection.
- **Modules Involved:** Mod A (Public Web Shell), Mod AF (System Settings).
- **Prerequisites:** Phase 0 sign-off / client authorization.
- **Dependencies:** Node.js 20.x or 22.x LTS, PostgreSQL instance.
- **Database Work:** Setup Prisma schema; run initial migration for `users` and baseline enums.
- **API Work:** Health check endpoint (`GET /api/health`).
- **Frontend Work:** Responsive root layout, typography scale, CSS custom properties for canonical Naree Foundation color tokens (`05_DESIGN.md`).
- **Testing:** Build validation (`npm run build`), TypeScript checks, DB connection ping.
- **Acceptance Criteria:** Clean build with zero TypeScript warnings; Prisma connected to PostgreSQL.

---

## PHASE 2 — Public Website & Brand Narrative

- **Objective:** Deliver the authoritative public web presence communicating Naree Foundation’s mission, training philosophy, and institutional background.
- **Scope:** Homepage, About Foundation, Who Can Join guide, FAQ accordion, Contact/Inquiry forms.
- **Modules Involved:** Mod A, Mod B, Mod C, Mod H, Mod V, Mod W.
- **Prerequisites:** Phase 1 completion.
- **Database Work:** Tables for `inquiries` and `faqs`.
- **API Work:** `POST /api/v1/inquiries` (with CSRF and rate limiting), `GET /api/v1/faqs`.
- **Frontend Work:**
  - Hero section featuring authentic agricultural imagery and CTA buttons.
  - Brand philosophy cards: *Empower • Educate • Elevate*.
  - 5 Programme discipline highlight cards.
  - "Who Can Join" interactive eligibility guide (Schools, Colleges, Vocational, Women/SHGs).
  - Medical disclaimer banner component (`RULE-MED-002`).
  - Institutional workshop inquiry modal.
- **Testing:** Mobile (375px), tablet (768px), desktop (1440px) responsive layout testing; form validation tests.
- **Acceptance Criteria:** Lighthouse score ≥ 90; inquiry submissions stored cleanly in `inquiries` table.

---

## PHASE 3 — Course Catalogue, 9-Point Syllabus & Dynamic Pricing

- **Objective:** Deliver a filterable course catalogue showcasing the 5 core disciplines, 9-point syllabus breakdowns, delivery tiers, and proposed planning fees.
- **Scope:** Course grid, faceted filtering, course detail views, syllabus accordions, fee comparison tables with disclaimers.
- **Modules Involved:** Mod D, Mod E, Mod F, Mod G, Mod I, Mod J, Mod K.
- **Prerequisites:** Phase 2 completion.
- **Database Work:** Schema for `programmes`, `courses`, `course_programmes` (multi-discipline junction), `syllabus_topics`, `pricing_tiers` (supporting per-student and per-institution pricing models), and `batches`. Seed baseline 9-point syllabi.
- **API Work:** `GET /api/v1/programmes`, `GET /api/v1/courses`, `GET /api/v1/courses/:slug`, `GET /api/v1/batches`.
- **Frontend Work:**
  - Course card components featuring duration pills, target learner tags, and fee indicators.
  - Faceted filter sidebar on desktop / bottom sheet on mobile.
  - Course detail view with interactive 9-point syllabus accordion.
  - Transparent pricing table displaying proposed fees with mandatory planning disclaimer (`RULE-FEE-003`).
  - Callout for the ₹3,000 complete package discount incentive (`RULE-FEE-004`).
- **Acceptance Criteria:** All 5 subjects reflect baseline brochure syllabus; fees served dynamically from database.

---

## PHASE 4 — User Authentication & Learner Profile

- **Objective:** Enable secure student account creation, credential verification, RBAC session handling, and persistent learner profiles.
- **Scope:** Registration, login, password recovery, session management, learner profile dashboard, document/ID upload.
- **Modules Involved:** Mod L, Mod M, Mod N, Mod T, Mod AB.
- **Prerequisites:** Phase 3 completion.
- **Database Work:** `users` (with verified timestamps), `student_profiles` (with data minimization and secure storage keys), and `documents` tables.
- **API Work:** `POST /api/v1/auth/register`, `POST /api/v1/auth/login`, `POST /api/v1/auth/logout`, `GET /api/v1/profile`, `PATCH /api/v1/profile`, `POST /api/v1/profile/upload-id`.
- **Frontend Work:** Accessible registration and login forms; learner profile form; file upload widget with preview and 5MB size enforcement (`RULE-SEC-002`).
- **Acceptance Criteria:** Zero plain-text credentials; Argon2id hashing; secure HttpOnly cookies; rate-limited auth endpoints; ID proofs stored in private object storage.

---

## PHASE 5 — Application Lifecycle & Admission FSM `[PROPOSED]`

- **Objective:** Implement the core admissions processing engine supporting the 12-state FSM, seat reservation, and student tracking timeline.
- **Scope:** Multi-step application submission, application review workbench for staff, student tracking timeline.
- **Modules Involved:** Mod O, Mod P, Mod R, Mod AA, Mod Z.
- **Prerequisites:** Phase 4 completion.
- **Database Work:** `applications`, `application_audit_trail`, and `enrollments` tables.
- **API Work:** `POST /api/v1/applications`, `GET /api/v1/applications/my-applications`, `GET /api/v1/applications/:id`, `PATCH /api/v1/admin/applications/:id/status`, `GET /api/v1/applications/:id/audit-trail`.
- **Frontend Work:**
  - Multi-step application wizard (Batch selection → Details → Documents → Review).
  - Student Application Status Tracker rendering the 12-state progression.
  - Admin review workbench to inspect submissions, request revisions, or approve.
- **Acceptance Criteria:** State transitions comply with FSM rules; every transition logs an immutable audit trail entry.

---

## PHASE 6 — Payment Gateway & Invoicing `[REQUIRES CLIENT DECISION / OFFLINE FALLBACK]`

- **Objective:** Integrate automated online payment processing alongside administrator offline reconciliation, generating serialized PDF receipts upon payment confirmation.
- **Scope:** Online checkout modal (Razorpay/Cashfree), webhook listener, offline bank transfer log, serialized PDF receipt generator.
- **Modules Involved:** Mod Q, Mod P, Mod T.
- **Prerequisites:** Phase 5 completion.
- **Database Work:** `payments` table and serialized receipt counter.
- **API Work:** `POST /api/v1/payments/create-order`, `POST /api/v1/payments/webhook`, `POST /api/v1/admin/payments/offline-reconcile`, `GET /api/v1/payments/:id/receipt-pdf`.
- **Frontend Work:** Payment checkout modal; offline transfer submission form; serialized receipt PDF download.
- **Acceptance Criteria:** Verified payment triggers enrollment and roll number generation; serialized PDF receipts generated.

---

## PHASE 7 — Event-Driven Notifications

- **Objective:** Deliver transactional notifications across email and in-app alerts for admission status shifts, payment receipts, and batch schedules.
- **Scope:** Transactional email dispatch, in-app notification center.
- **Modules Involved:** Mod S.
- **Prerequisites:** Phase 6 completion.
- **Database Work:** `notifications` table.
- **API Work:** `GET /api/v1/notifications`, `PATCH /api/v1/notifications/:id/read`.
- **Frontend Work:** Notification bell with badge counter; branded HTML email templates for admissions, receipts, and schedules.
- **Acceptance Criteria:** All critical admission lifecycle events trigger transactional emails without blocking main API threads.

---

## PHASE 8 — Administrative Dashboard & Operations Control `[CORE MVP BOUNDARY (OPTION B)]`

- **Objective:** Centralized administrative dashboard for foundation leadership and staff to manage batches, monitor admissions, configure fees, and oversee system operations.
- **Scope:** KPI analytics cards, Batch manager, Dynamic pricing manager, Application review queue, System settings manager.
- **Modules Involved:** Mod X, Mod Y, Mod Z, Mod AA, Mod AB, Mod AF.
- **Prerequisites:** Phase 7 completion. *Marks the completion of the Core MVP if Option B is selected by client.*
- **Database Work:** `system_settings` table.
- **API Work:** `GET /api/v1/admin/dashboard-stats`, `GET /api/v1/admin/settings`, `PATCH /api/v1/admin/settings`.
- **Frontend Work:** High-density data grids with filtering, batch creation modal, dynamic pricing editor with audit notes, system settings editor.
- **Acceptance Criteria:** Authorized staff can modify batch dates and proposed fees without code deployment.

---

## PHASE 9 — Training Operations: Attendance Logging `[CORE MVP (OPTION A) / POST-MVP (OPTION B)]`

- **Objective:** Enable trainers to log daily session attendance for enrolled students, validating attendance satisfaction before certification.
- **Scope:** Trainer mobile-friendly roster, daily attendance marking, student attendance progress bar.
- **Modules Involved:** Training Operations (Attendance), Mod N.
- **Prerequisites:** Phase 8 completion. *Part of Core MVP under Option A; Post-MVP under Option B.*
- **Database Work:** `attendance_records` table.
- **API Work:** `GET /api/v1/trainer/batches/:id/roster`, `POST /api/v1/trainer/attendance/bulk-mark`.
- **Frontend Work:** Mobile-first attendance checkbox sheet; student dashboard attendance visualization.
- **Acceptance Criteria:** Attendance logged seamlessly on mobile devices; retroactive changes require admin justification in audit log.

---

## PHASE 10 — Four-Pillar Assessment & QR Certification Engine `[CORE MVP (OPTION A) / POST-MVP (OPTION B)]`

- **Objective:** Record four-pillar assessment rubrics and generate tamper-evident PDF completion certificates with embedded public verification QR codes.
- **Scope:** Practical checklist logging, knowledge check scoring, tamper-evident PDF certificate generator, public verification page.
- **Modules Involved:** Mod U, Training Operations (Assessments).
- **Prerequisites:** Phase 9 completion. *Marks the completion of the Core MVP if Option A is selected by client.*
- **Database Work:** `assessment_records` and `certificates` tables.
- **API Work:** `POST /api/v1/trainer/assessments/evaluate`, `POST /api/v1/admin/certificates/batch-generate`, `GET /api/v1/verify-certificate/:uuid`.
- **Frontend Work:** Trainer assessment rubric form; student certificate download card; public `/verify-certificate/:uuid` web page.
- **Acceptance Criteria:**
  - Certificate wording contains course title, duration, training provider (*Naree Foundation Agro-Tech & Training*), and assessment basis `[SOURCE-BACKED - UNVERIFIED PENDING PDF]`.
  - Zero unapproved government or university equivalence claims `[RULE-CERT-001]`.
  - QR code points to verified public page backed by SHA-256 hash `[TECHNICAL RECOMMENDATION]`.

---

## PHASE 11 — Audit Trail, Reporting & Export Analytics

- **Objective:** Provide full-spectrum administrative audit trails and operational export reporting (CSV/Excel/PDF).
- **Scope:** Filterable audit log viewer, student roster exports, financial collections ledger.
- **Modules Involved:** Mod AD, Mod AE.
- **Prerequisites:** Phase 10 completion.
- **Database Work:** Indexing optimization on `audit_logs`.
- **API Work:** `GET /api/v1/admin/audit-logs`, `GET /api/v1/admin/reports/roster-export/:id`.
- **Acceptance Criteria:** 100% of admin state mutations generate immutable audit logs; reports export cleanly.

---

## PHASE 12 — Security Hardening, Performance Tuning & QA

- **Objective:** Execute comprehensive automated testing, OWASP Top-10 security scanning, accessibility auditing, and performance optimization.
- **Scope:** Playwright E2E test suite, Lighthouse optimization, WCAG 2.1 AA validation, rate-limiting tuning.
- **Acceptance Criteria:** Zero critical security findings; Lighthouse score ≥ 90 across Performance, Accessibility, and SEO; 100% E2E test pass rate.

---

## PHASE 13 — Production Deployment & Go-Live

- **Objective:** Deploy the certified application to production cloud infrastructure, configure production DNS and SSL, run production migrations, and initiate launch.
- **Scope:** Production environment provisioning, managed PostgreSQL connection, domain binding, production gateway activation.
- **Acceptance Criteria:** Platform live on primary HTTPS domain; live transaction verified; zero runtime console errors.

---

## PHASE 14 — Future Enhancements (Post-MVP Scale)

- **Scope:** Institutional B2B bulk portal; regional language localization (Marathi & Hindi); multimedia video library; DLT telecom SMS/WhatsApp gateway; alumni network.
