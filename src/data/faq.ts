export interface FAQItem {
  id: string;
  category: 'general' | 'admissions' | 'formats_fees' | 'curriculum' | 'certification';
  question: string;
  answer: string;
  sourceRef?: string;
}

export const FAQ_CATEGORIES = [
  { id: 'all', label: 'All Questions' },
  { id: 'general', label: 'General & Mission' },
  { id: 'admissions', label: 'Admissions & Eligibility' },
  { id: 'formats_fees', label: 'Formats & Fees' },
  { id: 'curriculum', label: 'Curriculum & Labs' },
  { id: 'certification', label: 'Certification & Integrity' },
];

export const FAQ_DATA: FAQItem[] = [
  {
    id: 'faq-01',
    category: 'general',
    question: 'What is AgrooNext and what is its training mission?',
    answer:
      'AgrooNext is an agro-technology training initiative focused on experiential, hands-on modern agricultural education. Supported by Naree Foundation’s social outreach mission (“Empower • Educate • Elevate”), AgrooNext bridges foundational science with direct physical practice in five core disciplines: Hydroponics, Aeroponics, Mushroom Cultivation, Aquaculture, and Women Agri-Entrepreneurship.',
    sourceRef: 'AgrooNext Core Mission & PRD',
  },
  {
    id: 'faq-02',
    category: 'general',
    question: 'Where are the training facilities located?',
    answer:
      'Primary hands-on laboratory sessions and practical demonstrations are hosted at AgrooNext demonstration facilities in the Pune District, Maharashtra. For institutional workshops, training is conducted directly on-site at the client school or university campus.',
    sourceRef: 'Batch Scheduling Data',
  },
  {
    id: 'faq-03',
    category: 'admissions',
    question: 'Who can enroll in AgrooNext training programmes?',
    answer:
      'Our programmes cater to four distinct groups: (1) School students (Grades 8–12), (2) College and university students, (3) Individual learners, farmers, and aspiring agri-entrepreneurs, and (4) Women leaders and Self-Help Groups (SHGs). Each course clearly indicates its target audience and prerequisites.',
    sourceRef: 'Admissions Guidelines',
  },
  {
    id: 'faq-04',
    category: 'admissions',
    question: 'Are there any academic prerequisites for the 5-day certificate courses?',
    answer:
      'No formal degree or agricultural background is strictly required for the 5-day topic certificate courses. Basic literacy and a willingness to engage in physical laboratory exercises (mixing solutions, cleaning equipment, and recording data) are all that is needed.',
    sourceRef: 'Curricular Prerequisites',
  },
  {
    id: 'faq-05',
    category: 'formats_fees',
    question: 'What is the fee structure for individual courses?',
    answer:
      'Individual course fees are standardized as follows: School Crash Courses are ₹250/student; College Crash Courses are ₹500/student; 5-Day Topic Certificate Courses are ₹5,000/participant; and the comprehensive 3-Week Complete Package covering all 5 disciplines is ₹22,000/participant (providing ₹3,000 in package savings).',
    sourceRef: 'Approved Course Pricing Tier',
  },
  {
    id: 'faq-06',
    category: 'formats_fees',
    question: 'How do institutional turnkey workshop fees work?',
    answer:
      'Institutional workshops are billed at a flat rate per 1-day campus session rather than individual student fees. The institutional rate is ₹15,000 per session for schools and ₹25,000 per session for colleges and universities. The institution provides the venue and agrees with AgrooNext on student cohort capacity based on infrastructure and safety requirements.',
    sourceRef: 'Institutional Pricing Structure',
  },
  {
    id: 'faq-07',
    category: 'formats_fees',
    question: 'What is the policy regarding cancellations and refunds?',
    answer:
      'If AgrooNext cancels an enrolled batch due to operational constraints, learners are entitled to a full transfer to the next available batch or refund. Learner-initiated cancellation policies and applicable administrative retention terms are subject to final institutional confirmation prior to enrollment payment.',
    sourceRef: 'Policy Documentation Pending Final Sign-Off',
  },
  {
    id: 'faq-08',
    category: 'curriculum',
    question: 'What proportion of the training is hands-on practical versus classroom theory?',
    answer:
      'Under our 4-Pillar Learning Methodology, every programme incorporates substantial supervised physical laboratory time. Learners directly assemble hydroponic channels, calibrate digital pH/EC sensors, prepare sterile mushroom substrates, and perform water chemistry tests on live aquaculture tanks.',
    sourceRef: 'Pedagogy Standards',
  },
  {
    id: 'faq-09',
    category: 'curriculum',
    question: 'What is the Capstone Requirement?',
    answer:
      'Every certificate-level programme requires completing a practical capstone project. For example, Hydroponics students must assemble an operational tabletop unit and calculate nutrient dosing for a complete crop cycle, while Mushroom Farming students must inoculate five sterile substrate bags and log fruiting room parameters.',
    sourceRef: 'Assessment Rubric [ARCH-CAT-002]',
  },
  {
    id: 'faq-10',
    category: 'certification',
    question: 'What certificate is awarded upon course completion?',
    answer:
      'Learners who meet the 4-Pillar Competency Evaluation (Knowledge Check, Practical Skill Checklist, Capstone Project, and Attendance) receive an official AgrooNext Certificate of Skill Competency issued in partnership with Naree Foundation.',
    sourceRef: 'Certification Architecture [ARCH-CERT-001]',
  },
  {
    id: 'faq-11',
    category: 'certification',
    question: 'Are AgrooNext certificates equivalent to a government degree or formal diploma?',
    answer:
      'No. In strict adherence to educational integrity, our certificates verify practical skill competency and vocational training hours. They do not constitute a formal statutory academic degree, government diploma, or university qualification. No unapproved accreditation claims are made.',
    sourceRef: 'Mandatory Governance Notice',
  },
  {
    id: 'faq-12',
    category: 'certification',
    question: 'Are medical, curative, or health-cure claims made about modern agricultural produce?',
    answer:
      'No. All training materials describe botanical biology, nutrient composition, and agricultural techniques. We make no curative health claims, disease-treatment guarantees, or therapeutic efficacy promises regarding crops, mushrooms, or fish produce.',
    sourceRef: 'Statutory Health & Educational Notice',
  },
];
