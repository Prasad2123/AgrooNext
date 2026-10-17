# PRODUCT REQUIREMENTS DOCUMENT (PRD)
## Project: Naree Foundation Agro-Tech & Training Web Application
**Document Identifier:** DOC-01-PRD  
**Version:** 1.2.0 (Documentation Reconciliation & Source Audit Baseline)  
**Status:** AUDITED PLANNING BASELINE / SOURCE VERIFICATION PENDING CLIENT PROVISION OF PRIMARY ASSETS  
**Author:** Senior Product Architect, Business Analyst & Software Architecture Team  
**Date:** October 2026  
**Primary Brand:** Naree Foundation (Philosophy: *“Empower • Educate • Elevate”*) `[SOURCE-BACKED - LOGO ASSET VERIFIED; PRIMARY BROCHURE PENDING]`  

---

## 1. Classification System & Authority Hierarchy

All statements, requirements, and decisions across this document are governed by the following strict classification system:

| Classification Tag | Definition & Governance Rule |
| :--- | :--- |
| **`[SOURCE-BACKED]`** | Verified directly against an available primary source in the workspace. Authoritative baseline. *(Note: Where a primary source document such as a PDF brochure or fee schedule is missing from the workspace, claims are marked `[SOURCE-BACKED - UNVERIFIED PENDING PDF]` to prevent false verification claims).* |
| **`[CLIENT-APPROVED]`** | Explicitly affirmed and approved by the client/project owner in a recorded decision. Authoritative baseline. |
| **`[PROPOSED]`** | Recommendation drafted during product analysis; non-authoritative pending formal review. |
| **`[ASSUMPTION]`** | Working operational assumption adopted to progress architecture; must not become an enforced business rule without client sign-off. |
| **`[TECHNICAL RECOMMENDATION]`** | Engineering/design choice recommended by the technical architecture team. |
| **`[REQUIRES CLIENT DECISION]`** | Critical policy, legal, commercial, or operational choice requiring formal client resolution before implementation. |

> [!WARNING]
> **Source Verification Status Notice:**  
> The original reference PDFs (`Naree_Foundation_AgroTech_Training_Brochure (1).pdf`, `Naree_Foundation_AgroTech_Fee_Structure.pdf`, `Modern_Farming_Nutrition_Health_Guide.pdf`, and `AgrooNext_Leaflet.pdf`) were cited in earlier documentation drafts but are **NOT present in the current project workspace**. The authentic visual brand asset (`assets/images/naree_foundation_logo.jpg`) is verified in the workspace. All citations to the missing PDFs reflect previously recorded draft extractions and are classified as **Source Verification Pending** until physical/digital PDF assets are provided by the client. Phase 0 status is accordingly held at `SOURCE VERIFICATION PENDING`.

### Source Hierarchy
- **Level 1 (Primary Business Sources):** `Naree_Foundation_AgroTech_Training_Brochure (1).pdf`, `Naree_Foundation_AgroTech_Fee_Structure.pdf` *(Unverified in current workspace; client delivery pending)*.
- **Level 2 (Visual Brand Assets):** Official Naree Foundation logo (`assets/images/naree_foundation_logo.jpg`) and verified visual collateral *(Verified in current workspace)*.
- **Level 3 (Secondary Reference):** `Modern_Farming_Nutrition_Health_Guide.pdf` *(Unverified in current workspace; client delivery pending)*.
- **Level 4 (Inspiration Reference Only):** `AgrooNext_Leaflet.pdf` *(Visual and layout inspiration only; must never override primary brand)*.
- **Level 5 (AI / Technical Recommendations):** Engineering architecture and design recommendations; must never overwrite Level 1 facts or replace client decisions.

---

## 2. Document Purpose

This PRD establishes the verified product scope, functional specifications, non-functional constraints, user personas, operational workflows, and domain entities for the official digital platform of **Naree Foundation Agro-Tech & Training**. It serves as an audited and reconciled single source of truth (SSOT) to govern all subsequent design and engineering phases.

---

## 3. Product Vision & Mission

### 3.1 Vision `[SOURCE-BACKED - UNVERIFIED PENDING PDF]`
To create a practical learning platform that introduces young people, community learners, and aspiring entrepreneurs to advanced agricultural technologies, allied sectors, and enterprise development, connecting scientific concepts with hands-on skills, career awareness, and responsible entrepreneurship *(Citations from Brochure Page 2; source file delivery pending)*.

### 3.2 Mission `[SOURCE-BACKED - UNVERIFIED PENDING PDF]`
To empower learners through structured theory, supervised practical training, field exposure, and enterprise-oriented learning across agriculture, aquaculture, and women’s entrepreneurship *(Citations from Brochure Page 2; source file delivery pending)*.

### 3.3 Core Objectives `[SOURCE-BACKED - UNVERIFIED PENDING PDF]`
1. **Awareness:** Create awareness of modern agriculture as a technology and career pathway *(Brochure Page 2)*.
2. **Practical Skills:** Build practical skills through demonstrations, lab work, and field exposure *(Brochure Page 2)*.
3. **Enterprise Thinking:** Introduce enterprise thinking: costing, pricing, marketing, records, and customer needs *(Brochure Page 2)*.
4. **Inclusion & Opportunity:** Expand opportunities for women and girls through skills, enterprise support, and leadership development *(Brochure Page 2)*.
5. **Sustainability:** Encourage resource-efficient and responsible agricultural practices *(Brochure Page 2)*.

---

## 4. Organizational Identity & Operational Baseline

- **Primary Organization:** Naree Foundation `[SOURCE-BACKED - LOGO ASSET VERIFIED; PRIMARY BROCHURE PENDING]` *(Verified via authentic logo `naree_foundation_logo.jpg`)*
- **Programme Name:** Agro-Tech & Training `[SOURCE-BACKED - UNVERIFIED PENDING PDF]` *(Brochure Page 1 citation; source delivery pending)*
- **Brand Philosophy:** *Empower • Educate • Elevate* `[SOURCE-BACKED - LOGO ASSET VERIFIED]` *(Directly verified on authentic logo tagline)*
- **Legal Non-Profit Entity Structure:** Statutory non-profit registration (e.g., Section 8 Company, Public Trust, or Society): `[REQUIRES CLIENT DECISION]` *(No registration certificate or PAN/12A/80G documents present in workspace)*
- **Initiative Affiliation (NF Venture Studio):** Identified in email templates; affiliation as an incubator/studio: `[REQUIRES CLIENT DECISION]` / `[PROPOSED]`
- **Headquarters & Physical Lab Location:** Pune, Maharashtra: `[PROPOSED]` / `[REQUIRES CLIENT DECISION]` *(Exact street address and facility agreements pending client confirmation)*
- **Geographic Reach (Regional vs Pan-India):** Initial in-person delivery in Maharashtra with digital platform reach across India: `[PROPOSED]` / `[REQUIRES CLIENT DECISION]`
- **Executive Leadership / Signatories:** Authorized Signatory and Programme Mentor/Lead: `[SOURCE-BACKED - UNVERIFIED PENDING PDF]` *(Brochure Page 10 citation)*; Specific named individuals: `[REQUIRES CLIENT DECISION]`

---

## 5. Problem Statement

1. **Information Asymmetry:** Aspiring growers, students, and community groups lack clear, structured pathways into modern farming techniques (Hydroponics, Aeroponics, Mushrooms, Aquaculture).
2. **Opaque Scheduling & Admissions:** Traditional workshops often suffer from unorganized registration, unclear prerequisites, and paper-based tracking.
3. **Absence of Verifiable Credentialing:** Training programs frequently fail to provide tamper-resistant proof of course completion, diminishing career utility.
4. **Market Misinformation:** Proliferation of unverified medicinal claims and exaggerated accreditation assertions undermines credibility in the sector.

---

## 6. Product Goals & Scope Boundaries

### 6.1 Product Goals
- **G-01:** Deliver an authoritative, responsive web platform embodying Naree Foundation’s mission and training portfolio.
- **G-02:** Provide dynamic discovery of the 5 core disciplines, 9-point syllabi, delivery levels, and proposed planning fees.
- **G-03:** Provide a transparent, multi-step application and enrollment workflow with real-time status tracking for learners.
- **G-04:** Provide an administrative operations dashboard for batch scheduling, applicant review, attendance logging, and verifiable certification.
- **G-05:** Enforce strict compliance prohibiting unapproved government/university equivalence claims and unsupported health claims.

### 6.2 Non-Goals (Scope Boundaries)
- **NG-01 (E-Commerce Retail):** The platform is not an online storefront for retail sales of fresh produce, fish, or mushrooms.
- **NG-02 (Synchronous LMS Video Streaming):** The MVP will not host live video conferencing or virtual reality labs; training is primarily in-person and hands-on.
- **NG-03 (Automated Banking/Credit Disbursement):** The platform provides financial literacy and awareness of government/institutional support; it does not process or disburse loans.
- **NG-04 (Autonomous White-Label Portals):** The platform will not support third-party autonomous franchisees in MVP.

---

## 7. Stakeholders & User Personas

### 7.1 Target Learner Groups `[SOURCE-BACKED - UNVERIFIED PENDING PDF]`
*(Citations from Brochure Page 2; source PDF delivery pending)*
1. **School Students:** Science-based awareness, demonstrations, mini-projects, and career exposure.
2. **College Students:** Technical modules, practical labs, field visits, and enterprise projects.
3. **Institute / Vocational Learners:** Skill-intensive practical training, assessment, and job/enterprise readiness.
4. **Women / SHGs / Community Groups:** Enterprise skills, value addition, financial literacy, market linkage, and leadership.

*Clarification on Age / Class Restrictions:* Age or grade brackets (e.g., Classes 8–12) are classified as `[PROPOSED]` / `[REQUIRES CLIENT DECISION]`. The primary source does NOT mandate class-level restrictions.

### 7.2 Illustrative User Personas `[PROPOSED]`
- **Persona A (College Science Learner - Ananya):** B.Sc. student seeking practical laboratory exposure in Hydroponics and Aeroponics to supplement theoretical coursework.
- **Persona B (SHG Community Leader - Sunita):** Women's group leader seeking low-capital enterprise training in Mushroom Farming and financial record-keeping.
- **Persona C (Institutional Coordinator - Prof. Deshmukh):** Vocational institute administrator seeking turnkey 1-day institutional agro-tech awareness workshops for student cohorts.
- **Persona D (Foundation Operations Lead - Staff Admin):** Program manager scheduling batches, vetting applicants, and issuing completion certificates.

---

## 8. User Roles & Permission Model

| Conceptual Role | Core Permissions & Capabilities | Classification |
| :--- | :--- | :--- |
| **`PUBLIC_VISITOR`** | Browse website, view 5 programmes, explore syllabi, view proposed fees, read FAQs, submit general/institutional inquiries. | `[SOURCE-BACKED - UNVERIFIED PENDING PDF]` |
| **`STUDENT_LEARNER`**| Register, log in, maintain learner profile, select courses and batches, submit applications, upload ID proof where required, track status, make payments where enabled, access attendance/assessment summaries, download verified certificates. | `[SOURCE-BACKED - UNVERIFIED PENDING PDF]` |
| **`STAFF_TRAINER`**  | View assigned batch rosters, log daily training attendance, record practical skill and knowledge assessment rubrics. | `[PROPOSED]` |
| **`SYSTEM_ADMIN`**   | Full CRUD on programmes, courses, syllabi, pricing tiers, batches; review and transition applications; reconcile payments; manage users; issue certificates; inspect audit logs; configure system settings. | `[TECHNICAL RECOMMENDATION]` |
| **`INSTITUTION_USER`**| Submit institutional training requests, coordinate student lists, view institutional workshop status. | `[PROPOSED / FUTURE]` |

---

## 9. Functional Requirements (PRD-FR)

### 9.1 Public Discovery & Institutional Narrative
- **PRD-FR-PUB-001 `[SOURCE-BACKED - LOGO ASSET VERIFIED]`:** Display Naree Foundation Agro-Tech & Training identity, official logo, and philosophy (*"Empower • Educate • Elevate"*).
- **PRD-FR-PUB-002 `[SOURCE-BACKED - UNVERIFIED PENDING PDF]`:** Present the 5 core discipline areas: Hydroponics, Aeroponics, Mushroom Farming, Aquaculture, and Women in Agri-Entrepreneurship.
- **PRD-FR-PUB-003 `[SOURCE-BACKED - UNVERIFIED PENDING PDF]`:** Render comprehensive course detail views displaying course summary, learning objectives, 9-point syllabus, delivery levels, and capstone practicals.
- **PRD-FR-PUB-004 `[SOURCE-BACKED - UNVERIFIED PENDING PDF]`:** Render "Who Can Join" guide explaining pathways for School Students, College Students, Institute/Vocational Learners, and Women/SHGs.
- **PRD-FR-PUB-005 `[PROPOSED]`:** Render searchable and categorized Frequently Asked Questions (FAQ) repository.
- **PRD-FR-PUB-006 `[SOURCE-BACKED - UNVERIFIED PENDING PDF]`:** Provide Contact and Inquiry form supporting both individual questions and institutional workshop requests.

### 9.2 Course Catalogue & Dynamic Pricing
- **PRD-FR-CAT-001 `[SOURCE-BACKED - UNVERIFIED PENDING PDF]`:** Catalogue must present 4 standard training formats:
  1. Agro-Tech Crash Course (All Topics, 1 Day)
  2. Certificate Course (Individual Topic, 5 Days)
  3. Complete Agro-Tech Package (All 5 Topics, 3 Weeks)
  4. Institutional One-Day Training (School & College/University)
- **PRD-FR-CAT-002 `[SOURCE-BACKED - UNVERIFIED PENDING PDF]` `[PROPOSED FEES]`:** Display proposed baseline fees clearly marked with disclaimer tags:
  - School Crash Course (All Topics, 1 Day): ₹250 / student `[PROPOSED FEE]`
  - College Crash Course (All Topics, 1 Day): ₹500 / student `[PROPOSED FEE]`
  - Certificate Course (Individual Topic, 5 Days): ₹5,000 / student `[PROPOSED FEE]`
  - Complete Agro-Tech Package (All 5 Topics, 3 Weeks): ₹22,000 / student `[PROPOSED FEE]` (Highlighting ₹3,000 package savings vs ₹25,000 standalone)
  - Institutional School Training: ₹15,000 / institution (per 1-day institutional session) `[PROPOSED FEE]`
  - Institutional College/University Training: ₹25,000 / institution (per 1-day institutional session) `[PROPOSED FEE]`
- **PRD-FR-CAT-003 `[TECHNICAL RECOMMENDATION]`:** Course fees must be dynamically stored in the database (`pricing_tiers`) and administrator-configurable; never hardcode fees in UI templates or API controllers.
- **PRD-FR-CAT-004 `[SOURCE-BACKED - UNVERIFIED PENDING PDF]`:** Every fee display must state the mandatory fee-planning disclaimer:  
  *"Note: Fees and projections are proposed planning figures and may be revised according to trainer costs, infrastructure, consumables, travel, taxes, and institutional agreements."*

### 9.3 Learner Identity & Profile
- **PRD-FR-USR-001 `[TECHNICAL RECOMMENDATION]`:** Secure registration and login using verified email or mobile phone with hashed credentials (Argon2id/bcrypt).
- **PRD-FR-USR-002 `[PROPOSED]`:** Learner profile capturing legal full name, contact details, educational institution/organization, address, and student ID proof metadata.
- **PRD-FR-USR-003 `[REQUIRES CLIENT DECISION]`:** Requirement of student ID card upload at digital application submission vs physical verification on Day 1.

### 9.4 Batch & Capacity Planning
- **PRD-FR-BAT-001 `[SOURCE-BACKED - UNVERIFIED PENDING PDF]`:** System must enforce the planning assumption of **minimum individual enrolment = 5 students** per scheduled batch *(Fee Structure Page 7 citation)*. This is an operational viability assumption and must not serve as a legal barrier to submitting individual applications.
- **PRD-FR-BAT-002 `[SOURCE-BACKED - UNVERIFIED PENDING PDF]`:** No fixed system-wide maximum student capacity shall be hardcoded in application logic. Capacity depends on trainers, infrastructure, venue, equipment, and safety requirements *(Fee Structure Page 7 citation)*.
- **PRD-FR-BAT-003 `[SOURCE-BACKED - UNVERIFIED PENDING PDF]`:** Institutional workshop capacity must incorporate the source clause:  
  *"Naree Foundation will accommodate the maximum number of students mutually agreed with the institution, subject to available trainers, training infrastructure, safety requirements, and practical equipment."*
- **PRD-FR-BAT-004 `[REQUIRES CLIENT DECISION]`:** Recommended operational ceiling per standard single-day institutional session covered under the flat fee before incremental charges apply (e.g., 50 students `[PROPOSED]`).

### 9.5 Application Lifecycle & FSM `[PROPOSED]`
- **PRD-FR-APP-001 `[PROPOSED]`:** Implement a 12-state application lifecycle:  
  `DRAFT`, `SUBMITTED`, `UNDER_REVIEW`, `ACTION_REQUIRED`, `APPROVED`, `PAYMENT_PENDING`, `PAYMENT_CONFIRMED`, `ENROLLED`, `COMPLETED`, `REJECTED`, `WAITLISTED`, `CANCELLED`.  
  *(Terminal states are `REJECTED`, `CANCELLED`, and `COMPLETED`. `WAITLISTED` is a holding state that can transition to `APPROVED` or `CANCELLED`).*
- **PRD-FR-APP-002 `[TECHNICAL RECOMMENDATION]`:** Maintain an immutable application audit trail (`application_audit_trail`) recording timestamp, previous state, new state, actor ID, and comments for all transitions.
- **PRD-FR-APP-003 `[REQUIRES CLIENT DECISION]`:** Seat reservation hold timeout window (e.g., 48 hours `[PROPOSED]`) following application approval before seat is released; must be configurable in administrative settings.

### 9.6 Payments & Financial Accounting
- **PRD-FR-PAY-001 `[REQUIRES CLIENT DECISION]`:** Integration of an authorized Indian payment gateway (Razorpay / Cashfree) supporting UPI, Net Banking, and Cards.
- **PRD-FR-PAY-002 `[SOURCE-BACKED - UNVERIFIED PENDING PDF]`:** Support for authorized offline payment logging (NEFT/RTGS, Cash, Cheque, Institutional PO) with administrative verification.
- **PRD-FR-PAY-003 `[TECHNICAL RECOMMENDATION]`:** Automatic generation of serialized, downloadable payment receipts (`REC-[YEAR]-[SEQ]`) upon payment confirmation.
- **PRD-FR-PAY-004 `[TECHNICAL RECOMMENDATION]`:** Zero storage of sensitive payment card details (PAN, CVV, expiry) on platform servers (strict PCI-DSS compliance).

### 9.7 Training Operations: Attendance & Assessment
- **PRD-FR-OPS-001 `[SOURCE-BACKED - UNVERIFIED PENDING PDF]`:** System must record assessment across the four source-backed evaluation areas *(Brochure Page 8 citation)*:
  1. Knowledge check
  2. Practical skill checklist
  3. Mini-project / enterprise canvas
  4. Attendance and participation
- **PRD-FR-OPS-002 `[SOURCE-BACKED - UNVERIFIED PENDING PDF]`:** Attendance and participation requirements must be satisfied according to configured programme policy before certificate issuance.
- **PRD-FR-OPS-003 `[REQUIRES CLIENT DECISION]`:** Exact quantitative attendance percentage threshold (e.g., 80% `[PROPOSED]`; must remain configurable).

### 9.8 Certification & Tamper-Evident Verification
- **PRD-FR-CRT-001 `[SOURCE-BACKED - UNVERIFIED PENDING PDF]`:** Certificate wording must explicitly contain:
  1. Full course title
  2. Training duration
  3. Training provider: *Naree Foundation Agro-Tech & Training*
  4. Assessment basis *(Brochure Page 8, Page 10 citation)*
- **PRD-FR-CRT-002 `[SOURCE-BACKED - UNVERIFIED PENDING PDF]`:** Under NO circumstances may the certificate, course description, or platform claim or imply government accreditation, college/university degree equivalence, UGC/AICTE recognition, or statutory licensing unless formal approval is granted *(Brochure Page 8, Page 10 citation)*.
- **PRD-FR-CRT-003 `[TECHNICAL RECOMMENDATION]`:** Embed machine-readable QR codes linking to `/verify-certificate/{uuid}` backed by cryptographic SHA-256 integrity hashes.

### 9.9 Notifications & Communications
- **PRD-FR-NOT-001 `[TECHNICAL RECOMMENDATION]`:** Automated transactional email notifications for registration, application status changes, payment receipts, batch schedules, and certificate release.
- **PRD-FR-NOT-002 `[REQUIRES CLIENT DECISION]`:** SMS / WhatsApp telecom DLT gateway integration.

### 9.10 Administration & Content Governance
- **PRD-FR-ADM-001 `[TECHNICAL RECOMMENDATION]`:** Administrative KPI dashboard summarizing applicants, batch capacities, enrolled counts, and collections.
- **PRD-FR-ADM-002 `[TECHNICAL RECOMMENDATION]`:** Administrative management interface for batches, pricing tiers, courses, and syllabus details without code deployment.
- **PRD-FR-ADM-003 `[TECHNICAL RECOMMENDATION]`:** System audit log recording all administrative overrides and pricing adjustments.

---

## 10. Core Module Governance (Modules A through AF)

> [!IMPORTANT]
> **Core MVP Boundary & Scope Options (DEC-017 / CONF-007) `[REQUIRES CLIENT DECISION]`:**  
> A fundamental scope boundary decision is required between two coherent baselines:
> - **Option A (Extended Core MVP — Phases 1 through 10):** Modules OPS and U (Attendance Logging, Assessment Rubrics, and Tamper-Evident QR Certificate PDF Generation) are included in the Core MVP. Launch occurs after Phase 10.  
>   *Consequence:* The platform delivers the complete end-to-end student lifecycle from discovery to verified certification at initial launch; requires trainer mobile workflows and PDF rendering engines to be completed prior to MVP go-live.
> - **Option B (Lean Phased MVP — Phases 1 through 8):** Core MVP boundary completes at Phase 8 (Public Web, Catalogue, Admissions FSM, Payments, and Admin Dashboard). Modules OPS and U are formally classified as Post-MVP (Phases 9 & 10).  
>   *Consequence:* Rapid initial launch for marketing, admissions, and fee collection; early batch cohorts must receive paper certificates issued offline until Phases 9–10 are deployed.

| Module | Primary Role | Purpose & Functional Boundary | MVP Classification |
| :--- | :--- | :--- | :--- |
| **A. Public Web Engine** | Visitor | Responsive shell, navigation, footer, brand headers. | **CORE MVP** |
| **B. Home / Landing** | Visitor | Value proposition, brand pillars, course highlights. | **CORE MVP** |
| **C. About Foundation** | Visitor | Mission, vision, core objectives, training methodology. | **CORE MVP** |
| **D. Programme Overview** | Visitor | The 5 pillars, delivery levels (1, 2, 3), practical pedagogy. | **CORE MVP** |
| **E. Course Catalogue** | Visitor/Student | Filterable course list, delivery formats, duration, fees. | **CORE MVP** |
| **F. Course Detail** | Visitor/Student | Detailed syllabus, learning outcomes, capstone activity. | **CORE MVP** |
| **G. Syllabus / Curriculum**| Visitor/Student | 9-point curriculum breakdown and 5-day schedule. | **CORE MVP** |
| **H. Who Can Join** | Visitor/Student | Role-specific eligibility for Schools, Colleges, SHGs. | **CORE MVP** |
| **I. Fees & Pricing** | Visitor/Student | Transparent proposed fee tables with official disclaimers. | **CORE MVP** |
| **J. Training Formats** | Visitor/Student | Comparison between crash courses, certificates, packages. | **CORE MVP** |
| **K. Upcoming Batches** | Visitor/Student | Calendar of scheduled batches, dates, and locations. | **CORE MVP** |
| **L. Student Registration** | Applicant | Account signup, contact verification, consent capture. | **CORE MVP** |
| **M. Authentication** | Learner/Admin | Secure login, session handling, password recovery. | **CORE MVP** |
| **N. Student Profile** | Student | Personal profile, education, contact details, ID upload. | **CORE MVP** |
| **O. Course Application** | Student | Batch application form, prerequisite verification. | **CORE MVP** |
| **P. Enrollment Engine** | Student/Admin | Seat reservation, roll number issuance upon payment. | **CORE MVP** |
| **Q. Payment Integration** | Student/Admin | Online checkout + offline payment manual receipting. | **CORE MVP** |
| **R. Application Tracking**| Student | Visual tracker monitoring the 12-state admission FSM. | **CORE MVP** |
| **S. Notifications** | All Users | Transactional email & in-app alerts on status changes. | **CORE MVP** |
| **T. Documents & Files** | Student/Admin | Secure storage and retrieval of IDs, receipts, certs. | **CORE MVP** |
| **U. Certificate Engine** | Staff/Student | PDF certificate compilation with QR verification. | **CORE MVP (Option A) / POST-MVP (Option B)** `[REQUIRES CLIENT DECISION]` |
| **OPS. Attendance & Assessment** | Trainer/Admin| Four-pillar rubric evaluation & session attendance. | **CORE MVP (Option A) / POST-MVP (Option B)** `[REQUIRES CLIENT DECISION]` |
| **V. Contact & Inquiries** | Visitor/Inst | General inquiry & institutional workshop brief forms. | **CORE MVP** |
| **W. FAQ Knowledgebase** | Visitor/Student | Searchable repository of answers to common questions. | **CORE MVP** |
| **X. Admin Dashboard** | Admin | Operational metrics, applicant review queue, batch summary.| **CORE MVP** |
| **Y. Course Management** | Admin | Dynamic CRUD for courses, syllabi, outcomes. | **CORE MVP** |
| **Z. Batch Management** | Admin | Batch scheduling, venue assignment, capacity thresholds. | **CORE MVP** |
| **AA. Application Mgmt** | Admin | Review submissions, request info, approve/reject. | **CORE MVP** |
| **AB. User Management** | Admin | User listing, role assignments (RBAC). | **CORE MVP** |
| **AC. Content Management** | Admin | Full CMS for pages and announcements. | **POST-MVP** (Configs in MVP) |
| **AD. Reports & Analytics**| Admin | Advanced CSV/Excel analytics and cohort reports. | **POST-MVP** (Basic in MVP) |
| **AE. Audit Logs** | Admin | Immutable logging of admin overrides and fee adjustments. | **CORE MVP** |
| **AF. System Settings** | Admin | Dynamic fee configuration, global toggles, timeouts. | **CORE MVP** |

---

## 11. Authoritative 5-Programme Curriculum Specifications `[UNVERIFIED - SOURCE PDF MISSING FROM WORKSPACE]`

> [!WARNING]
> The following 9-point curriculum specifications reflect extractions from earlier discovery documents citing `Naree_Foundation_AgroTech_Training_Brochure (1).pdf` (Pages 5–7). Because that source PDF is not present in the current workspace, these curricula are retained as **Working Baseline Syllabi (Unverified)** pending client confirmation. Do not treat these items as approved until the primary brochure is provided.

### 11.1 Hydroponics — Working Baseline Syllabus `[UNVERIFIED PENDING PDF]`
1. Introduction to soilless farming and protected cultivation
2. Hydroponic systems: NFT, DWC, drip, media-based, and vertical systems
3. Water quality, pH and EC; nutrient solution preparation and monitoring
4. Seedling raising, transplanting, crop selection, and crop planning
5. Root-zone management, irrigation/fertigation, and climate control
6. Plant nutrition, deficiency symptoms, pest and disease management
7. Harvesting, grading, hygiene, packaging, and basic marketing
8. Farm layout, operating costs, unit economics, and entrepreneurship
9. **Practical:** Assemble a small hydroponic unit and complete a crop cycle plan

### 11.2 Aeroponics — Working Baseline Syllabus `[UNVERIFIED PENDING PDF]`
1. Principles of aeroponic cultivation and comparison with hydroponics
2. Root-zone aeration, misting cycles, pumps, nozzles, and reservoirs
3. System design, sanitation, filtration, and preventive maintenance
4. Nutrient management, pH/EC, water quality, and monitoring
5. Crop selection, nursery management, and transplanting
6. Climate, light, humidity, and root-health management
7. Troubleshooting: clogging, pump failure, root stress, and contamination
8. Harvesting, productivity records, economics, and enterprise planning
9. **Practical:** Design and demonstrate a small aeroponic system

### 11.3 Mushroom Farming — Working Baseline Syllabus `[UNVERIFIED PENDING PDF]`
1. Introduction, nutritional value, edible vs. poisonous mushrooms, and enterprise scope
2. Species selection: Oyster, Milky, Paddy Straw, and Button mushrooms
3. Substrate preparation, pasteurisation/sterilisation, and hygiene
4. Spawn, inoculation, incubation, and environmental requirements
5. Fruiting management: humidity, ventilation, temperature, and light
6. Pest, disease, and contamination management
7. Harvesting, grading, packaging, storage, and shelf-life
8. Value addition, food safety, branding, marketing, and costing
9. **Practical:** Prepare substrate bags, inoculate spawn, and maintain a crop log

### 11.4 Aquaculture — Working Baseline Syllabus `[UNVERIFIED PENDING PDF]`
1. Scope of aquaculture and selection of suitable culture species
2. Pond/tank preparation, nursery, and grow-out management
3. Water quality: temperature, pH, dissolved oxygen, ammonia, and basic testing
4. Stocking, acclimatisation, feed, and feeding management
5. Fish health, biosecurity, disease prevention, and safe handling
6. Modern systems: Biofloc, RAS, aquaponics, and integrated fish farming
7. Basic hatchery, seed quality, harvesting, and post-harvest handling
8. Farm records, economics, marketing, and responsible/sustainable aquaculture
9. **Practical:** Water testing, feed demonstration, and farm-layout exercise

### 11.5 Women in Agri-Entrepreneurship — Working Baseline Syllabus `[UNVERIFIED PENDING PDF]`
1. Women’s role in agriculture, allied sectors, and local value chains
2. Identifying an enterprise opportunity and preparing a simple business model
3. Costing, pricing, budgeting, cash-flow, and basic financial literacy
4. Self-help groups, producer groups, cooperatives, and collective enterprises
5. Digital tools, record keeping, branding, packaging, and market linkage
6. Negotiation, communication, leadership, and decision-making skills
7. Government-support awareness and responsible use of institutional finance
8. Workplace safety, food safety, legal/quality basics, and customer service
9. **Practical:** Prepare an enterprise canvas and 12-month action plan

---

## 12. Application Finite State Machine (FSM) `[PROPOSED]`

The application lifecycle is modeled as a 12-state Finite State Machine. Every transition requires validation, authorization, and an immutable log entry in `application_audit_trail`.

| Source State | Permitted Destination | Triggering Actor | Guard / Pre-conditions | Audit Log Requirement | Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **`DRAFT`** | `SUBMITTED` | Student | All mandatory application fields completed. | Log transition, actor ID, timestamp | `[PROPOSED]` |
| **`DRAFT`** | `CANCELLED` | Student | Student discards draft application. | Log withdrawal reason | `[PROPOSED]` |
| **`SUBMITTED`** | `UNDER_REVIEW` | Admin / Staff | Staff member opens application dossier for review. | Log reviewer ID, timestamp | `[PROPOSED]` |
| **`SUBMITTED`** | `CANCELLED` | Student | Student withdraws application prior to review. | Log withdrawal comment | `[PROPOSED]` |
| **`UNDER_REVIEW`**| `APPROVED` | Admin / Staff | Eligibility confirmed; batch seat quota available. | Log approving admin ID | `[PROPOSED]` |
| **`UNDER_REVIEW`**| `ACTION_REQUIRED` | Admin / Staff | Document illegible or additional information required. | Log specific remediation notes | `[PROPOSED]` |
| **`UNDER_REVIEW`**| `WAITLISTED` | Admin / Staff | Batch full; applicant meets eligibility for waitlist. | Log waitlist position/reason | `[PROPOSED]` |
| **`UNDER_REVIEW`**| `REJECTED` | Admin / Staff | Applicant ineligible or fails minimum prerequisites. | Log formal rejection justification | `[PROPOSED]` |
| **`ACTION_REQUIRED`**| `UNDER_REVIEW`| Student | Student submits corrected documents/data. | Log resubmission payload | `[PROPOSED]` |
| **`ACTION_REQUIRED`**| `CANCELLED` | Student / System | Applicant withdraws or remediation timeout expires. | Log timeout/cancellation reason | `[PROPOSED]` |
| **`APPROVED`** | `PAYMENT_PENDING` | System / Admin | Order/invoice generated; seat hold timer initiated. | Log invoice reference & timer expiry | `[PROPOSED]` |
| **`APPROVED`** | `CANCELLED` | Student / Admin | Applicant declines seat or seat hold window expires. | Log release reason | `[PROPOSED]` |
| **`PAYMENT_PENDING`**| `PAYMENT_CONFIRMED`| Gateway / Admin | Payment cleared via gateway webhook or offline log. | Log transaction reference & amount | `[PROPOSED]` |
| **`PAYMENT_PENDING`**| `CANCELLED` | System / Admin | Seat hold timeout expires without payment. | Log timeout expiration & seat release | `[PROPOSED]` |
| **`PAYMENT_CONFIRMED`**| `ENROLLED` | System | Enrollment record created; sequential roll number issued. | Log enrollment number | `[PROPOSED]` |
| **`ENROLLED`** | `COMPLETED` | System / Admin | Attendance satisfied AND assessment rubrics passed. | Log completion verification | `[PROPOSED]` |
| **`ENROLLED`** | `CANCELLED` | Admin | Emergency withdrawal or batch cancellation. | Log refund/credit record | `[PROPOSED]` |
| **`WAITLISTED`** | `APPROVED` | Admin / System | Seat opens in batch or capacity expanded. | Log promotion from waitlist | `[PROPOSED]` |
| **`WAITLISTED`** | `CANCELLED` | Student / Admin | Batch commences or student withdraws from waitlist. | Log waitlist closure | `[PROPOSED]` |
| **`REJECTED`** | *(Terminal State)* | None | No further transitions permitted. | Application archived | `[PROPOSED]` |
| **`CANCELLED`** | *(Terminal State)* | None | No further transitions permitted. | Application archived | `[PROPOSED]` |
| **`COMPLETED`** | *(Terminal State)* | None | No further transitions permitted; eligible for cert. | Certificate issuance record linked | `[PROPOSED]` |

---

## 13. Medical & Nutritional Content Safety Policy `[SOURCE-BACKED - UNVERIFIED PENDING PDF]`

*(Derived strictly from Modern Farming Nutrition & Health Guide citations, Pages 1, 3, 4, 6, 8, 12; source PDF delivery pending)*

- **PRD-POL-MED-001 `[SOURCE-BACKED - UNVERIFIED PENDING PDF]`:** Content is strictly educational and nutrition-awareness oriented. Under no circumstances may produce grown via Hydroponics, Aeroponics, Aquaponics, or Mushroom farming be described as a cure, medical treatment, or guaranteed preventive measure for diseases such as cancer, diabetes, hypertension, or infections.
- **PRD-POL-MED-002 `[SOURCE-BACKED - UNVERIFIED PENDING PDF]`:** All pages referencing nutrition, produce, or health must display the official educational disclaimer:  
  *“Food is not a substitute for medical treatment. Educational materials describe nutrients, bioactive compounds, and scientific research associations; they do not establish that these foods cure diseases. For clinical nutrition or medical treatment, follow advice from a qualified healthcare professional.”*

---

## 14. Source Conflicts & Unresolved Decisions Register

| Conflict ID | Topic | Source A | Source B | Conflict & Impact | Recommended Resolution | Current Status |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **CONF-001** | Platform Master Brand | `Brochure` Page 1: "Agro-Tech & Training" | `Leaflet`: "AgrooNext" / `Agri Next`: "Agri Next" | Brand name variation in early draft materials. | Standardize strictly on "Naree Foundation Agro-Tech & Training". Motto: "Empower • Educate • Elevate". | `[SOURCE-BACKED - LOGO ASSET VERIFIED]` |
| **CONF-002** | Certificate Course Duration | `Fee Structure` Page 4: 5 Days / topic | `Brochure` Page 8: Delivery Level 2 = 3–7 Days | Fee table fixes 5 days; brochure offers 3–7 day range. | Default individual topic certificate to 5 Days; allow admin override between 3–7 days. | `[PROPOSED BASELINE]` |
| **CONF-003** | Advanced Package Duration | `Fee Structure` Page 5: Complete Package = 3 Weeks | `Brochure` Page 8: Delivery Level 3 = 2–12 Weeks | Fee table specifies 3-week package; brochure describes 2–12 week scope. | Standardize 3-Week Package as the primary offering; extended periods treated as customized. | `[PROPOSED BASELINE]` |
| **CONF-004** | Institutional Cohort Limits | `Fee Structure` Page 7: "Mutually agreed capacity" | Flat fee structure (₹15k / ₹25k) | Risk of institutions requesting unfeasible cohort sizes on a single flat fee. | Establish a recommended operational ceiling (e.g., 50 students) before incremental fees apply. | `[REQUIRES CLIENT DECISION]` |
| **CONF-005** | Seat Hold Duration | `03_RULES.md` v1.0.0: 48-Hour hold | Not mentioned in primary brochure/fees | Arbitrary business timeout. | Make seat hold window configurable in admin settings. | `[REQUIRES CLIENT DECISION]` |
| **CONF-006** | Attendance Threshold | `03_RULES.md` v1.0.0: 80% Attendance | Brochure Page 8: "Attendance and participation" (no percentage) | Arbitrary percentage requirement. | State that attendance policy must be satisfied; establish exact percentage via client decision. | `[REQUIRES CLIENT DECISION]` |
| **CONF-007** | Core MVP Scope Boundary | PRD Table 10 (Certificates as Core MVP) | Phases Roadmap (Core MVP ends at Phase 8; Certs in Phase 10) | Scope boundary contradiction between PRD module table and phase roadmap. | Formally define Option A (Phases 1-10) vs Option B (Phases 1-8). Mark scope choice for client sign-off. | `[REQUIRES CLIENT DECISION]` |
| **CONF-008** | Student ID Verification | PRD-FR-USR-003 (Digital Upload) | Operational Reality (Physical Verification on Day 1) | Mandatory digital ID upload creates friction for rural/school applicants. | Make digital ID upload optional; permit physical student ID verification on Day 1. | `[REQUIRES CLIENT DECISION]` |
| **CONF-009** | Taxation & Fee Display | Proposed Fee Tables (Base Fees) | Undetermined GST status | Defaulting tax rate to 0% misrepresents potential tax liability if GST applies. | Store base fee; display fee disclaimer; clarify tax exemption/treatment with tax counsel. | `[REQUIRES CLIENT DECISION]` |

---

## 15. Open Questions for Client Resolution

1. **Core MVP Boundary Selection (DEC-017):** Does the client require Option A (Core MVP through Phase 10 including Attendance, Assessment, and QR Certificates) or Option B (Core MVP through Phase 8, with Certificates deferred to Post-MVP)? `[REQUIRES CLIENT DECISION]`
2. **Payment Gateway Provider (DEC-015):** Confirm existing approved merchant account (Razorpay / Cashfree) under Naree Foundation entity. `[REQUIRES CLIENT DECISION]`
3. **Institutional Cohort Ceilings (DEC-018):** What is the maximum student capacity per single-day institutional session covered under the flat ₹15,000 / ₹25,000 fee before incremental charges apply? `[REQUIRES CLIENT DECISION]`
4. **Student ID Upload Mandate (DEC-019):** Is digital upload of student ID proof mandatory during online application submission, or is in-person verification on Day 1 sufficient? `[REQUIRES CLIENT DECISION]`
5. **Cancellation and Refund Rules (DEC-012):** Formally approve or adjust the proposed cancellation and refund policy (including 100% refund on foundation cancellation and voluntary withdrawal terms). `[REQUIRES CLIENT DECISION]`
6. **Physical Training Venue Locations (DEC-020):** Provide official physical addresses for the Pune training center and demonstration facilities. `[REQUIRES CLIENT DECISION]`
7. **Telecom DLT SMS/WhatsApp Provider (DEC-021):** Confirm preferred provider (Gupshup, Twilio, MSG91) and DLT registration status for transactional alerts. `[REQUIRES CLIENT DECISION]`
8. **Statutory Entity Structure & Signatories (DEC-022):** Provide registered non-profit entity details (Section 8 / Trust / Society) and authorized certificate signatories. `[REQUIRES CLIENT DECISION]`
9. **Taxation Treatment (DEC-023):** Confirm whether published training fees are inclusive of GST, exempt under educational non-profit provisions, or subject to additional tax. `[REQUIRES CLIENT DECISION]`
