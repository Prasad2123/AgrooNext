# SYSTEM GOVERNANCE & ENGINEERING RULES
## Project: Naree Foundation Agro-Tech & Training Web Application
**Document Identifier:** DOC-03-RULES  
**Version:** 1.2.0 (Documentation Reconciliation & Source Audit Baseline)  
**Status:** AUDITED GOVERNANCE BASELINE / SOURCE VERIFICATION PENDING  
**Author:** Senior Technical Lead, Product Architect & Security Engineer  
**Date:** October 2026  
**Primary Brand:** Naree Foundation (Philosophy: *“Empower • Educate • Elevate”*) `[SOURCE-BACKED - LOGO ASSET VERIFIED; PRIMARY BROCHURE PENDING]`  

---

## CRITICAL NOTICE TO ALL DEVELOPERS & AI AGENTS

> [!CAUTION]
> **STRICT COMPLIANCE MANDATE:**  
> No developer, software architect, or AI coding assistant is authorized to unilaterally or silently alter, bypass, or invent business rules, fee structures, eligibility criteria, certification claims, or medical statements.
>
> **Source Verification Status Notice:**
> Primary source PDF documents (`Brochure`, `Fee Structure`, and `Modern Farming Guide`) are currently missing from the workspace. All citations referencing these documents are designated as unverified pending physical/digital delivery by the client. Rules derived from proposed architecture models must remain distinct from client-approved facts.
>
> **Conflict Resolution Protocol:**
> Whenever a proposed user request, feature prompt, or code modification appears to conflict with any rule documented herein:
> 1. **HALT:** Do not implement the conflicting modification.
> 2. **IDENTIFY:** Pinpoint the exact rule ID and the conflicting requirement.
> 3. **EXPLAIN:** Detail the operational, legal, or technical ramifications of the conflict.
> 4. **RECORD DECISION:** Submit the dilemma for formal client/administrative stakeholder approval.
> 5. **UPDATE DOCS:** Update this governance document with an approved decision reference.
> 6. **IMPLEMENT:** Proceed with coding *only after* formal alignment.

---

## Section A: Core Business Rules

- **RULE-BUS-001 `[SOURCE-BACKED - LOGO ASSET VERIFIED]` (Master Brand Identity):** The authoritative platform name is **Naree Foundation Agro-Tech & Training**. The institutional motto is strictly *"Empower • Educate • Elevate"*. Secondary materials (e.g., AgrooNext) serve purely as visual/content inspiration; their branding must never supplant Naree Foundation.
- **RULE-BUS-002 `[SOURCE-BACKED - UNVERIFIED PENDING PDF]` (Non-Profit & Skills Mission):** The platform operates to foster agricultural technology awareness, hands-on skills, and livelihood creation. It must never be presented as an unverified get-rich-quick agricultural scheme or a retail e-commerce produce marketplace.
- **RULE-BUS-003 `[SOURCE-BACKED - UNVERIFIED PENDING PDF]` (Educational Integrity):** All training programmes must pair scientific theoretical principles with physical practical demonstrations, laboratory exercises, and enterprise unit economics.

---

## Section B: Course Portfolio Rules

- **RULE-CRS-001 `[SOURCE-BACKED - UNVERIFIED PENDING PDF]` (Approved Core Disciplines):** The core educational portfolio comprises exactly 5 primary disciplines derived from foundational source materials:
  1. Hydroponics
  2. Aeroponics
  3. Mushroom Farming
  4. Aquaculture
  5. Women in Agri-Entrepreneurship
- **RULE-CRS-002 `[SOURCE-BACKED - UNVERIFIED PENDING PDF]` (Curriculum Uniformity):** Each individual course topic must strictly reflect the approved 9-point syllabus structure detailed in the PRD (`DOC-01-PRD`) and source brochure.
- **RULE-CRS-003 `[SOURCE-BACKED - UNVERIFIED PENDING PDF]` (Course Delivery Tiers):** Standard delivery models are constrained to three recognized tiers *(Brochure Page 8 citation)*:
  - **Level 1 (Awareness / Foundation):** 1–2 days; fundamental concepts, system demonstrations, and safety.
  - **Level 2 (Skill Certificate):** 3–7 days (standard planning default: 5 days); theory, supervised laboratory practicals, and structured assessment.
  - **Level 3 (Advanced / Enterprise Package):** 2–12 weeks (standard planning default: 3 weeks); complete five-topic immersion, system assembly, costing, and a 12-month business plan.

---

## Section C: Fee & Pricing Rules

- **RULE-FEE-001 `[TECHNICAL RECOMMENDATION]` (Dynamic Fee Storage):** Course fees must never be hard-coded into static HTML templates, React JSX files, or API handler constants. All pricing must be retrieved dynamically from the `pricing_tiers` database table.
- **RULE-FEE-002 `[SOURCE-BACKED - UNVERIFIED PENDING PDF]` `[PROPOSED FEES]` (Published Planning Baseline):** Initial baseline pricing reflects approved source planning figures *(Fee Structure Page 2 citation)*:
  - School Crash Course (All Topics, 1 Day): ₹250 / student
  - College/University Crash Course (All Topics, 1 Day): ₹500 / student
  - Certificate Course (Individual Topic, 5 Days): ₹5,000 / student
  - Complete Agro-Tech Package (All 5 Topics, 3 Weeks): ₹22,000 / student
  - Institutional One-Day Training (School): ₹15,000 / institution (per 1-day institutional session)
  - Institutional One-Day Training (College/University): ₹25,000 / institution (per 1-day institutional session)
- **RULE-FEE-003 `[SOURCE-BACKED - UNVERIFIED PENDING PDF]` (Pricing Disclaimer Notice):** Every public display of course fees must carry the official disclaimer:  
  *“Note: Fees and projections are proposed planning figures and may be revised according to trainer costs, infrastructure, consumables, travel, taxes, and institutional agreements.”*
- **RULE-FEE-004 `[SOURCE-BACKED - UNVERIFIED PENDING PDF]` (Package Bundle Incentive):** The 3-Week Complete Package must explicitly highlight the source-documented ₹3,000 discount incentive compared to purchasing five standalone 5-day certificate modules (₹25,000 standalone vs ₹22,000 package).

---

## Section D: Eligibility & Prerequisite Rules

- **RULE-ELG-001 `[SOURCE-BACKED - UNVERIFIED PENDING PDF]` (Target Learner Segmentation):** Admissions eligibility is structured across four primary learner cohorts *(Brochure Page 2 citation)*:
  - School Students (Science-based awareness, demonstrations, mini-projects).
  - College / University Students (Technical modules, practical labs, field visits).
  - Institute / Vocational Learners (Skill-intensive practical training, assessment).
  - Women / SHGs / Community Groups (Enterprise skills, value addition, financial literacy).
- **RULE-ELG-002 `[PROPOSED]` `[REQUIRES CLIENT DECISION]` (Grade / Stream Brackets):** Specific grade brackets (e.g., "Classes 8–12") or academic stream prerequisites are proposed and require client confirmation before strict enforcement.
- **RULE-ELG-003 `[REQUIRES CLIENT DECISION]` (Proof of Student Status):** Determination of whether applicants claiming subsidized School (₹250) or College (₹500) rates must upload an institutional ID card online or can present it physically on Day 1.

---

## Section E: Minimum Enrolment Rules

- **RULE-CAP-001 `[SOURCE-BACKED - UNVERIFIED PENDING PDF]` (Minimum Batch Assumption):** The minimum individual learner enrolment assumption is strictly **5 students** per scheduled batch *(Fee Structure Page 7 citation)*.
- **RULE-CAP-002 `[TECHNICAL RECOMMENDATION]` (Batch Viability Threshold):** This assumption functions as an operational and financial viability threshold. If a scheduled public batch has fewer than 5 confirmed paid enrolments prior to the start date, the system alerts the administrator for batch consolidation or rescheduling; it does not constitute a legal barrier to individual application submission.

---

## Section F: Capacity & Facility Handling Rules

- **RULE-CAP-003 `[SOURCE-BACKED - UNVERIFIED PENDING PDF]` (No Arbitrary Maximum Hardcoding):** In strict accordance with the primary source *(Fee Structure Page 7 citation)*: *"No fixed maximum is specified; practical capacity should be agreed based on trainers, equipment, venue, and safety requirements."* The application must NOT hardcode a universal maximum capacity.
- **RULE-CAP-004 `[SOURCE-BACKED - UNVERIFIED PENDING PDF]` (Institutional Capacity Clause):** All institutional workshop proposals and agreements are governed by the source clause:  
  *“Naree Foundation will accommodate the maximum number of students mutually agreed with the institution, subject to available trainers, training infrastructure, safety requirements, and practical equipment.”*

---

## Section G: Application Lifecycle Rules

- **RULE-APP-001 `[PROPOSED]` (12-State Finite State Machine):** All learner applications transition through valid states in the FSM:  
  `DRAFT` → `SUBMITTED` → `UNDER_REVIEW` ↔ `ACTION_REQUIRED` → `APPROVED` → `PAYMENT_PENDING` → `PAYMENT_CONFIRMED` → `ENROLLED` → `COMPLETED`.  
  *(Terminal states are `REJECTED`, `CANCELLED`, and `COMPLETED`. `WAITLISTED` is a non-terminal holding state that can transition to `APPROVED` or `CANCELLED`).*
- **RULE-APP-002 `[TECHNICAL RECOMMENDATION]` (Immutable Audit Trail):** Direct manual mutation of application states in the database without an accompanying entry in `application_audit_trail` is strictly prohibited.
- **RULE-APP-003 `[PROPOSED]` `[REQUIRES CLIENT DECISION]` (Seat Reservation Window):** Upon transition to `APPROVED` / `PAYMENT_PENDING`, the seat reservation timeout (proposed: 48 hours) is configurable via system settings and must not be hardcoded as an immutable rule.

---

## Section H: Enrollment & Student Roster Rules

- **RULE-ENR-001 `[TECHNICAL RECOMMENDATION]` (Unique Roll Number Generation):** An enrollment record can only be instantiated once an application reaches `PAYMENT_CONFIRMED`. Every enrolled learner is issued an immutable, sequential enrollment number formatted as: `ENR-[YEAR]-[BATCH_CODE]-[SEQ]`.
- **RULE-ENR-002 `[TECHNICAL RECOMMENDATION]` (Single Active Batch Constraint):** A student cannot be simultaneously enrolled in two batches with overlapping calendar dates.

---

## Section I: Payment & Receipting Rules

- **RULE-PAY-001 `[SOURCE-BACKED - UNVERIFIED PENDING PDF]` (Dual Payment Pathway):** The system must accommodate both automated online payments and administrator-verified offline collections (NEFT, RTGS, Cheque, Institutional PO) *(Fee Structure Pages 1, 6 citation)*.
- **RULE-PAY-002 `[TECHNICAL RECOMMENDATION]` (Cryptographic Webhook Verification):** All automated payment confirmations received via gateway webhooks must verify the HMAC-SHA256 signature prior to crediting the account.
- **RULE-PAY-003 `[TECHNICAL RECOMMENDATION]` (PCI-DSS Zero Storage):** Credit card numbers, debit card numbers, expiration dates, and CVVs must never touch or reside on application servers.
- **RULE-PAY-004 `[TECHNICAL RECOMMENDATION]` (Serialized Receipts):** Every successful payment must generate a serialized receipt record (`REC-[YEAR]-[SEQ]`) available for immediate PDF download.

---

## Section J: Cancellation & Refund Policy Rules

- **RULE-REF-001 `[PROPOSED]` `[REQUIRES CLIENT DECISION]` (Configurable Refund Policy):** The platform architecture must support configurable refund and cancellation policies. Specific parameters (such as an 80% refund for voluntary cancellations ≥ 5 days prior to start) are proposed planning guidelines and require formal client approval prior to enforcement.
- **RULE-REF-002 `[PROPOSED]` `[REQUIRES CLIENT DECISION]` (Foundation Cancellation):** If Naree Foundation cancels a scheduled batch due to operational constraints, proposed policy entitles learners to an immediate 100% refund or priority transfer credit to the next available session. This policy requires formal client confirmation before enforcement.

---

## Section K: Assessment & Practical Evaluation Rules

- **RULE-ASM-001 `[SOURCE-BACKED - UNVERIFIED PENDING PDF]` (Four-Pillar Evaluation Rubric):** Certification eligibility requires documented evaluation across all 4 source-backed areas *(Brochure Page 8 citation)*:
  1. Knowledge check
  2. Practical skill checklist
  3. Mini-project / enterprise canvas
  4. Attendance and participation
- **RULE-ASM-002 `[PROPOSED]` (Evaluator Authority):** Users assigned the `STAFF_TRAINER` or `SYSTEM_ADMIN` role are authorized to log evaluation outcomes.
- **RULE-ASM-003 `[PROPOSED]` (Remedial Reassessment):** Learners marked as `NEEDS_REASSESSMENT` are granted a remedial evaluation window according to foundation policy.

---

## Section L: Attendance Governance Rules

- **RULE-ATT-001 `[SOURCE-BACKED - UNVERIFIED PENDING PDF]` (Attendance Policy Satisfaction):** Attendance and participation requirements must be satisfied according to the configured programme policy before a certificate can be issued *(Brochure Page 8 citation)*.
- **RULE-ATT-002 `[PROPOSED]` `[REQUIRES CLIENT DECISION]` (Attendance Threshold Percentage):** Any specific numerical attendance benchmark (such as 80%) is a proposed working threshold and must remain configurable in system settings.
- **RULE-ATT-003 `[TECHNICAL RECOMMENDATION]` (Log Integrity):** Session attendance must be logged on the day of training. Retroactive modifications require administrative justification in the audit log.

---

## Section M: Certification & Accreditation Rules

- **RULE-CERT-001 `[SOURCE-BACKED - UNVERIFIED PENDING PDF]` (Zero-Misrepresentation Mandate):** Certificates, course pages, and marketing materials must **NEVER** claim or imply:
  - Government accreditation (unless formal written accreditation is granted).
  - University or college academic degree equivalence.
  - Statutory or regulatory licensure *(Brochure Page 8, Page 10 citation)*.
- **RULE-CERT-002 `[SOURCE-BACKED - UNVERIFIED PENDING PDF]` (Mandatory Certificate Disclosures):** In strict accordance with primary source specifications *(Brochure Page 8, Page 10 citation)*, every certificate must explicitly state:
  1. Full Course Title
  2. Exact Training Duration
  3. Official Training Provider: *Naree Foundation Agro-Tech & Training*
  4. Explicit Assessment Basis
- **RULE-CERT-003 `[TECHNICAL RECOMMENDATION]` (Tamper-Evident Verification):** Certificates embed a machine-readable QR code linking to `/verify-certificate/{uuid}` backed by an immutable cryptographic SHA-256 hash.

---

## Section N: Medical & Nutritional Content Rules

- **RULE-MED-001 `[SOURCE-BACKED - UNVERIFIED PENDING PDF]` (No Curative or Therapeutic Claims):** The platform strictly adheres to the Modern Farming Nutrition & Health Guide. Under no circumstances may crops or mushrooms be advertised as a cure or treatment for cancer, diabetes, hypertension, or chronic disease *(Modern Farming Guide Pages 1, 12 citation)*.
- **RULE-MED-002 `[SOURCE-BACKED - UNVERIFIED PENDING PDF]` (Mandatory Health Disclaimer):** All pages or components referencing crop nutrition or health benefits must render the mandatory educational disclaimer *(Modern Farming Guide Pages 1, 12 citation)*.

---

## Section O: Administrative & Role-Based Access Rules

- **RULE-RBAC-001 `[TECHNICAL RECOMMENDATION]` (Default Deny):** All private API routes and dashboard pages default to denied access unless explicitly permitted for the user's role.
- **RULE-RBAC-002 `[PROPOSED]` (Role Segmentation):**
  - `PUBLIC_VISITOR`: Read-only access to published public web content and catalogue.
  - `STUDENT_LEARNER`: Access restricted strictly to own profile, applications, payments, and certificates.
  - `STAFF_TRAINER`: Access to assigned batch rosters, attendance marking, and assessment rubrics.
  - `SYSTEM_ADMIN`: Full administrative control over users, courses, batches, pricing tiers, audit logs, and settings.

---

## Section P: Security, Validation & Privacy Rules

- **RULE-SEC-001 `[TECHNICAL RECOMMENDATION]` (Strict Input Validation):** 100% of incoming API payloads must be validated against strict Zod schemas. Unexpected fields must be stripped.
- **RULE-SEC-002 `[TECHNICAL RECOMMENDATION]` (File Upload Hygiene):** Permitted MIME types: `image/jpeg`, `image/png`, `application/pdf`. Maximum size: 5.0 MB. Strip EXIF metadata from uploaded images. Store with random UUIDs in private object storage with signed URL access.
- **RULE-SEC-003 `[TECHNICAL RECOMMENDATION]` (Rate Limiting):** Authentication endpoints throttled to 5 requests per IP/user per 60 seconds.
- **RULE-SEC-004 `[TECHNICAL RECOMMENDATION]` `[PROPOSED]` (DPDP Act Compliance):** Explicit consent checkboxes are required at signup. Learners may request profile erasure subject to statutory credential records.

---

## Section Q: UI / UX Design & Accessibility Rules

- **RULE-UI-001 `[PROPOSED]` (Zero Emoji Interface):** The user interface must never use emojis as primary UI indicators, buttons, or navigation markers. Use professional SVG vector icons (Lucide Icons).
- **RULE-UI-002 `[PROPOSED]` (Brand Color Fidelity):** All primary interactive components must adhere to the canonical design system specified in `05_DESIGN.md`, derived as sampled approximations from the official lotus emblem: Brand Rose (`#C2185B`), Foundation Navy (`#0F2C59`), Emerald Green (`#2E7D32`), Solar Amber (`#FB8C00`), and Aquatic Teal (`#00897B`). Exact values remain sampled approximations pending an approved brand style guide.
- **RULE-UI-003 `[TECHNICAL RECOMMENDATION]` (Contrast Compliance):** All text elements must achieve WCAG 2.1 AA minimum contrast ratios (≥ 4.5:1 for body copy; ≥ 3:1 for large headers).
- **RULE-UI-004 `[TECHNICAL RECOMMENDATION]` (Form State Resilience):** Multi-step application forms must persist intermediate state to `sessionStorage` to prevent data loss on accidental browser refreshes.

---

## Section R: Coding Standards & Vibe-Coding Governance

- **RULE-DEV-001 `[TECHNICAL RECOMMENDATION]` (Inspection Preceding Modification):** Every developer or AI agent must inspect existing files and schemas before making edits. Never hallucinate variable names or table schemas.
- **RULE-DEV-002 `[TECHNICAL RECOMMENDATION]` (Minimal Safe Diff):** Edits must be surgical. Never overwrite unrelated files or dismantle working modules.
- **RULE-DEV-003 `[TECHNICAL RECOMMENDATION]` (Zero Dummy APIs in Production):** Never leave hardcoded mock responses in production API endpoints.
- **RULE-DEV-004 `[TECHNICAL RECOMMENDATION]` (Zero Secrets in Source):** Never commit API keys, database passwords, or secrets to source control. Resolve all secrets via environment variables.
