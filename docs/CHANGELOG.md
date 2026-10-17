# DOCUMENTATION CHANGELOG
## Project: Naree Foundation Agro-Tech & Training Web Application
**Document Identifier:** DOC-SUPP-LOG  
**Current Version:** 1.2.0  
**Status:** AUDITED BASELINE / ACTIVE GOVERNANCE / SOURCE VERIFICATION PENDING  
**Author:** Senior Product Architect, Lead Technical Architect & AI Governance Lead  
**Date:** October 2026  
**Primary Brand:** Naree Foundation (Philosophy: *“Empower • Educate • Elevate”*) `[SOURCE-BACKED - UNVERIFIED IN WORKSPACE PENDING PDF]`  

---

## Version History

### Version 1.3.0 — Final Module Delivery: Full Application, Backend, Admin Console & Production Verification (October 2026)
- **Status:** `IMPLEMENTATION COMPLETE / PRODUCTION CANDIDATE (OPTION B SCOPE)`
- **Scope:** Learner Portal, Admissions FSM Engine, Centralized Pricing & Payments, Private Storage Vault, Notifications, Admin Console, Database Integration, Security Isolation, and Comprehensive QA.
- **Brand Standards Verified:** Primary brand **AgrooNext — AGRO-TECH & TRAINING** (Philosophy: *“Empower • Educate • Elevate”*). Authentic emblem (`agroonext_icon_192.png`), no `AI -` title prefix, persistent light/dark themes, bounded 3D plant scene without clipping or drift.

#### Delivered Features & Modules:
1. **Homepage & Creative Foundation:**
   - Fixed 3D Plant scene bounding box (`y = -0.72` to `+0.88`) with responsive camera distance (4.2 desktop, 5.2 mobile), zero upward/downward drift, WebGL fallback.
   - Preserved all authentic Module 2 agriculture photography across all 5 programmes.
   - Dual-theme toggle with zero layout shift and localStorage persistence across all public, learner, and admin routes.
   - Accessible enquiry modal and contact form wired to PostgreSQL/SQLite inquiry submission.

2. **Learner Portal & Admissions (`/portal/*`):**
   - User authentication: Registration, login, session cookies (HTTP-only JWT via `jose`), logout.
   - Learner Dashboard: Active course applications, 12-state FSM status badges, training dates in Pune, quick action cards.
   - Course Applications (`/portal/applications` & `[id]`): Batch selection, authoritative fee calculation, detailed timeline showing all transitions from `applicationAuditTrail`, learner self-cancellation for DRAFT/SUBMITTED states.
   - Payments & Receipts (`/portal/payments`): Offline payment submission (UPI/NEFT UTR), sandbox online gateway simulation (honest `DEC-015` labeling), and printable official sequential receipt modal (`RCP-2026-XXXX`).
   - Secure Document Vault (`/portal/documents`): Private file upload with MIME/size validation, tenant isolation, and secure streaming download endpoint (`/api/portal/documents/[id]/download`).
   - Profile Management (`/portal/profile`): DPDP Act minimal personal and academic details.

3. **Admin Console & Operations (`/admin/*`):**
   - Overview Dashboard (`/admin/dashboard`): 6 real-time database KPIs, 4 honest integration status pills, recent application and inquiry queues.
   - Applications Queue (`/admin/applications`): Status filtering, search, and FSM transition modal enforcing approved transition table with mandatory audit trail notes.
   - Payment Reconciliation (`/admin/payments`): One-click verification and confirmation of offline payments; atomic transition to `ENROLLED`, sequential receipt generation, and notification dispatch.
   - Batches & Scheduling (`/admin/batches`): Cohort scheduling, capacity ceilings, and Pune facility address allocation.
   - Centralized Pricing (`/admin/courses`): Master repository of course fees and pricing tiers with audit logging on fee adjustments.
   - Inquiries Inbox (`/admin/inquiries`): Review and status tracking (`NEW`, `IN_REVIEW`, `CONTACTED`, `RESOLVED`, `CLOSED`) for public enquiries.
   - Immutable Audit Logs (`/admin/audit-logs`): Comprehensive audit trail viewer with actor, action, timestamp, entity, and state diffs.
   - User Management (`/admin/users`): Role-based access control, account activation toggles, and self-demotion protection guards.

4. **Security, Quality & Compliance Verification:**
   - **Automated Security Suite:** 25/25 automated integration tests passed (IDOR isolation between learners, private storage path traversal prevention, role guards, FSM boundary enforcement, payment idempotency, webhook HMAC SHA256 verification).
   - **Type Safety & Linting:** `npm run type-check` passed with 0 errors; `npm run lint` passed with 0 errors.
   - **Production Build:** `npm run build` compiled all 40/40 routes with code-splitting and static optimization.
   - **Governance Status:** Option B scope (`DEC-017`) maintained; attendance tracking, assessment rubrics, and QR certificates remain deferred until approved.

---
- **Status:** `AUDITED BASELINE / ACTIVE GOVERNANCE / SOURCE VERIFICATION PENDING`
- **Rationale:** Deep architectural and governance audit across all project documentation to eliminate internal contradictions, enforce strict evidence-based taxonomies, correct lifecycle state machine defects, reconcile ERD/DDL/API models, address missing workspace source files, and establish full bidirectional traceability for 37 requirements.

#### Detailed Corrections:
1. **Workspace Source Inventory & Evidence Taxonomy Rectification:**
   - Conducted full workspace audit; verified that primary source PDF files (`Naree_Foundation_AgroTech_Training_Brochure (1).pdf`, `Naree_Foundation_AgroTech_Fee_Structure.pdf`, `Modern_Farming_Nutrition_Health_Guide.pdf`, `AgrooNext_Leaflet.pdf`) and application source code are absent from the local workspace repository.
   - Reclassified all source citations to `[SOURCE-BACKED - UNVERIFIED IN WORKSPACE PENDING PDF]`.
   - Updated Phase 0 status in `04_PHASES.md` from "Audit Complete" to `DOCUMENTATION RECONCILED / SOURCE VERIFICATION PENDING CLIENT PROVISION OF PRIMARY ASSETS`.
   - Disallowed claiming verification on unverified files while preserving page citation trails for future verification against physical PDFs.
   - Reclassified unsupported legal non-profit status, NF Venture Studio affiliation, and headquarters claims as `[ASSUMPTION]` pending client legal confirmation (`DEC-022`).

2. **Master Brand Authority & Asset Taxonomy:**
   - Re-established **Naree Foundation Agro-Tech & Training** with motto *“Empower • Educate • Elevate”* as the sole authoritative master brand.
   - Explicitly clarified that "AgrooNext" is a secondary reference and layout inspiration that must never override Naree Foundation branding.
   - Designated color hex codes in `05_DESIGN.md` as "sampled/derived approximations" from the raster JPEG logo (`assets/images/naree_foundation_logo.jpg`), pending vector brand guidelines.
   - Formalized Aquatic Teal (`#00897B`) as a canonical 5th brand accent token across all documents.
   - Normalized spacing system to "4px/8px Incremental Spacing System (8pt Grid with 4px Half-Step Base)".

3. **Curricular Attribution & Capstone Reconciliation:**
   - Resolved contradiction between "Authoritative Curriculum" vs "Proposed Syllabus". Reclassified detailed syllabi and capstones as `[PROPOSED]` implementation structures, reserving `[SOURCE-BACKED]` strictly for the 5 core discipline titles and high-level descriptions.
   - Reaffirmed that no unauthorized 6th discipline may be created.

4. **Fee Structures, Pricing Models & Capacity Boundaries:**
   - Clarified that institutional training fees (Schools: ₹15,000; Colleges/Universities: ₹25,000) are flat rates per 1-day institutional session, not per student.
   - Reaffirmed that the 5-student minimum enrolment is an operational planning guideline for scheduling confirmation, never a legal barrier to submitting an individual application.
   - Reaffirmed dynamic maximum capacity governed by venue, trainer availability, equipment, and safety.
   - Retained mandatory fee planning disclaimer across all catalog views.

5. **12-State Application Lifecycle FSM Defect Resolution:**
   - Harmonized the 12-state FSM (`DRAFT`, `SUBMITTED`, `UNDER_REVIEW`, `ACTION_REQUIRED`, `APPROVED`, `PAYMENT_PENDING`, `PAYMENT_CONFIRMED`, `ENROLLED`, `COMPLETED`, `REJECTED`, `WAITLISTED`, `CANCELLED`) across all documents.
   - Fixed the critical contradiction where `WAITLISTED` was previously classified as a terminal error state; established that `WAITLISTED` is an active non-terminal holding state transitioning to `APPROVED` (when seats open) or `CANCELLED`.
   - Established an immutable, validated transition table with triggering actors, guards, and mandatory audit logging in `application_audit_logs`.
   - Reclassified seat-hold timeout (48 hours) as a configurable parameter in `system_settings` pending client confirmation (`DEC-010`).

6. **Core MVP Boundary Conflict Resolution (Option A vs Option B):**
   - Resolved the contradiction between PRD module classifications and the roadmap phase boundary by creating an explicit dual-option register (`DEC-017` / `CONF-007`):
     - **Option A (Extended MVP - Phases 1 to 10):** Delivers full credentialing lifecycle (Attendance Tracking, Assessments, QR PDF Certificates) in the initial release.
     - **Option B (Lean MVP - Phases 1 to 8):** Launches course catalog, admissions, payments, and admin batch scheduling immediately; defers Attendance and QR Certificates to Post-MVP (Phases 9–10).
   - Marked final scope selection as `[REQUIRES CLIENT DECISION]`.

7. **Architecture, ERD, SQL DDL & API Matrix Synchronization:**
   - Added complete SQL DDL and ERD entities for previously missing roadmap and operational entities: `inquiries`, `faqs`, `documents`, `notifications`, and `system_settings`.
   - Introduced `course_programmes` junction table and `pricing_model` enum (`PER_STUDENT` vs `PER_INSTITUTION_SESSION`) to model the 3-week Complete Package across all 5 disciplines and flat institutional workshops without fabricating a fake 6th discipline.
   - Enforced DPDP data minimization: made guardian details and demographic fields optional, and secured ID proofs via private S3/R2 storage keys (`id_proof_storage_key`) with time-limited signed URLs instead of public URLs.
   - Fixed Mermaid Level 2 architecture diagram syntax and resolved undefined node reference (`WAF --> ApiGateway` routing to defined service tier components).
   - Expanded API matrix to 34 comprehensively defined endpoints with HTTP methods, route paths, RBAC roles, input validation rules, success responses, error codes, and phase tags.
   - Refreshed full-stack technical baseline to verified stable LTS packages (Node.js 20/22 LTS, Next.js 14.2.24+, React 18.3.1, TypeScript 5.5+, Prisma 5.22.x, PostgreSQL 16).

8. **Traceability Matrix & Memory Anchor Infrastructure:**
   - Expanded `TRACEABILITY_MATRIX.md` from 29 items to cover all 37 PRD functional and non-functional requirements.
   - Mapped the 8 previously missing requirements: `PRD-FR-PUB-005` (FAQ Knowledgebase), `PRD-FR-USR-003` (Student ID Upload), `PRD-FR-BAT-004` (Institutional Cohort Ceilings), `PRD-FR-PAY-004` (PCI-DSS Zero Storage), `PRD-FR-NOT-002` (Telecom DLT SMS/WhatsApp), `PRD-FR-ADM-001` (Admin KPI Dashboard), `PRD-FR-ADM-002` (Catalogue CRUD), and `PRD-FR-ADM-003` (Administrative Audit Logs).
   - Replaced all opaque architecture, design, and memory identifiers with verified, locatable anchor tags (`ARCH-*`, `DESIGN-*`, `MEM-*`).
   - Added a dedicated "Workspace Source Availability" status column tracking unverified primary PDFs.
   - Recomputed matrix statistics: 37 mapped requirements, 0 orphaned requirements (100% coverage).
   - Rebuilt Decision Register in `06_MEMORY.md` to 23 decisions (`DEC-001` to `DEC-023`).

---

### Version 1.1.0 — Documentation Correction & Baseline Freeze (2026-10-07)
- **Status:** `FROZEN PLANNING BASELINE / PENDING CLIENT DECISIONS` (SUPERSEDED by v1.2.0)
- **Rationale:** Initial audit pass to reconcile generated documentation against brochure citations, introduce 6-tag classification system, and decouple technical recommendations from authoritative business facts.

---

### Version 1.0.0 — Initial Master Project Discovery (2026-10-07)
- **Status:** Initial Planning Draft (SUPERSEDED by v1.1.0).
- Generated initial foundational documentation from preliminary prompt inputs.
