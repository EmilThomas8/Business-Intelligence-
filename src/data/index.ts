/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Course, Service, Benefit, Company, Trainer, Testimonial, FAQ, OutcomeMetric, GalleryItem } from "../types";

export const COMPANIES: Company[] = [
  { name: "SAP", iconName: "Database" },
  { name: "Microsoft", iconName: "Monitor" },
  { name: "Oracle", iconName: "Server" },
  { name: "IBM", iconName: "Cpu" },
  { name: "AWS", iconName: "Cloud" },
  { name: "Google Cloud", iconName: "Globe" },
  { name: "Power BI", iconName: "TrendingUp" },
  { name: "Excel", iconName: "FileSpreadsheet" },
  { name: "SQL", iconName: "Layers" },
  { name: "Python", iconName: "Code" }
];

export const COURSES: Course[] = [
  {
    id: "sap-fico",
    title: "SAP S/4HANA Finance (FICO) Enterprise Consultant",
    category: "SAP ERP",
    badge: "Most Demanded",
    isPopular: true,
    rating: 4.9,
    reviewCount: 312,
    duration: "12 Weeks (120+ Hours)",
    difficulty: "Advanced",
    skillsLearned: ["General Ledger", "Accounts Payable/Receivable", "Asset Accounting", "Cost Center Accounting", "S/4HANA Migration"],
    careerPaths: ["SAP Functional Consultant", "FICO Analyst", "ERP Solution Architect"],
    description: "Master the global standard in enterprise resource planning. Learn to design, configure, and maintain SAP S/4HANA financial environments for Fortune 500 operations.",
    image: "https://picsum.photos/seed/sapfico/800/600"
  },
  {
    id: "power-bi",
    title: "Executive Business Intelligence with Microsoft Power BI",
    category: "Data Analytics",
    badge: "Certified",
    isPopular: true,
    rating: 4.8,
    reviewCount: 245,
    duration: "8 Weeks (80+ Hours)",
    difficulty: "Intermediate",
    skillsLearned: ["DAX Formulas", "Data Modeling", "ETL (Power Query)", "Interactive Dashboards", "Row-Level Security"],
    careerPaths: ["BI Developer", "Business Analyst", "Data Reporting Specialist"],
    description: "Convert raw enterprise data into highly actionable executive insights. Build advanced data models, implement complex DAX formulas, and publish responsive dashboards.",
    image: "https://picsum.photos/seed/powerbi/800/600"
  },
  {
    id: "gst-tax",
    title: "Certified Corporate GST Practitioner & Tax Strategy",
    category: "Taxation",
    badge: "Professional Certification",
    isPopular: false,
    rating: 4.9,
    reviewCount: 188,
    duration: "6 Weeks (60+ Hours)",
    difficulty: "Advanced",
    skillsLearned: ["GST Returns filing", "Input Tax Credit (ITC) audits", "E-invoicing compliance", "E-way bills", "Corporate Tax Planning"],
    careerPaths: ["Tax Consultant", "GST Auditor", "Corporate Finance Manager"],
    description: "Navigate complex commercial tax environments. Gain hands-on practice in filing tax returns, performing Input Tax Credit reconciliation, and maintaining compliance structures.",
    image: "https://picsum.photos/seed/gsttax/800/600"
  },
  {
    id: "accounting-erp",
    title: "Professional Financial Accounting & ERP Systems Integration",
    category: "Finance",
    badge: "Foundational Masterclass",
    isPopular: false,
    rating: 4.7,
    reviewCount: 154,
    duration: "10 Weeks (100+ Hours)",
    difficulty: "Beginner",
    skillsLearned: ["Double-Entry Bookkeeping", "Balance Sheets & PL", "ERP Ledger Mapping", "Bank Reconciliation", "Audit Readiness"],
    careerPaths: ["Corporate Accountant", "Accounts Lead", "Finance Executive"],
    description: "Align core financial principles with advanced ERP workflows. Design audit-ready bookkeeping practices mapped directly to global ledger configurations.",
    image: "https://picsum.photos/seed/accounting/800/600"
  },
  {
    id: "data-analytics",
    title: "Enterprise Analytics, SQL Modeling & Predictive Forecasting",
    category: "Data Analytics",
    badge: "Tech Focus",
    isPopular: true,
    rating: 4.8,
    reviewCount: 196,
    duration: "10 Weeks (90+ Hours)",
    difficulty: "Advanced",
    skillsLearned: ["Advanced SQL joins", "Window functions", "Python Pandas", "Time-series forecasting", "Data Warehousing"],
    careerPaths: ["Data Analyst", "Operations Architect", "Strategy Consultant"],
    description: "Unlock advanced predictive power for corporate performance. Extract directly from data lakes using custom SQL and build automated forecasting engines.",
    image: "https://picsum.photos/seed/analytics/800/600"
  }
];

export const SERVICES: Service[] = [
  {
    id: "corp-train",
    title: "Enterprise Group Training",
    description: "Tailored multi-user programs built specifically for corporate teams to migrate to SAP S/4HANA and integrate modern BI environments.",
    iconName: "Briefcase",
    color: "blue"
  },
  {
    id: "cert-prep",
    title: "Professional Certifications",
    description: "Guaranteed pathways and official training guidelines designed to pass SAP, Microsoft (PL-300), and Government GST exams.",
    iconName: "Award",
    color: "cyan"
  },
  {
    id: "lab-access",
    title: "Live ERP Lab Environment",
    description: "24/7 access to live enterprise sandbox systems to run real postings, test ledgers, and build real database pipelines.",
    iconName: "Terminal",
    color: "indigo"
  },
  {
    id: "placement",
    title: "Corporate Recruiting Network",
    description: "Direct talent matching with leading consulting firms, Big 4 partners, and Fortune 500 internal ERP/Analytics divisions.",
    iconName: "Handshake",
    color: "emerald"
  }
];

export const BENEFITS: Benefit[] = [
  {
    id: 1,
    title: "Industry-Expert Corporate Mentors",
    description: "Learn exclusively from senior SAP architects, Chartered Accountants, and certified Business Intelligence leads with 15+ years of live corporate experience.",
    metric: "15+ Yrs Exp"
  },
  {
    id: 2,
    title: "Production-Scale Hands-On Sandbox Labs",
    description: "Gain live configuration experience on SAP S/4HANA sandboxes and build Power BI reports connected directly to live cloud databases.",
    metric: "24/7 Server"
  },
  {
    id: 3,
    title: "Comprehensive Career & Resume Engineering",
    description: "Optimize your corporate profile with resume workshops, deep LinkedIn optimization, mock interviews, and strategic career path modeling.",
    metric: "1-on-1 Prep"
  },
  {
    id: 4,
    title: "Direct Placement Partnership with Hiring Agencies",
    description: "Unlock exclusive entry into our pipeline of consulting firms, Big 4 entities, and top international conglomerates.",
    metric: "94% Hired"
  }
];

export const OUTCOME_METRICS: OutcomeMetric[] = [
  {
    id: "salary-growth",
    label: "Avg. Salary Growth",
    value: "145%",
    subtext: "Post-certification compensation growth verified across past cohorts",
    iconName: "TrendingUp"
  },
  {
    id: "partners",
    label: "Hiring Partnerships",
    value: "120+",
    subtext: "Active corporate recruitment and direct enterprise placement partners",
    iconName: "Building2"
  },
  {
    id: "placement-rate",
    label: "Placement Rate",
    value: "94.2%",
    subtext: "Of job-seeking graduates placed within 120 days of graduation",
    iconName: "CheckCircle"
  },
  {
    id: "live-projects",
    label: "Live Sandbox Projects",
    value: "12+",
    subtext: "Real-world cases built, debugged, and integrated by each student",
    iconName: "GitBranch"
  }
];

export const TRAINERS: Trainer[] = [
  {
    id: "t1",
    name: "Saurabh Sharma",
    role: "Chief SAP Solutions Architect",
    experience: "16+ Years Corporate Consulting",
    specialization: "SAP S/4HANA Finance, FICO & Treasury Integration",
    bio: "Ex-consultant at Deloitte and SAP India. Advised major petrochemical and automotive conglomerates on global enterprise resource planning setups.",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&auto=format&fit=crop&q=80",
    linkedin: "https://linkedin.com"
  },
  {
    id: "t2",
    name: "Meera Nair",
    role: "Director of Business Intelligence & Data Science",
    experience: "12+ Years Enterprise Analytics",
    specialization: "Microsoft Certified Power BI Master, DAX Architecture, SQL Warehousing",
    bio: "Led BI initiatives for major fintech platforms. Specialized in optimizing slow dashboard queries and transforming data pipelines for executive boards.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80",
    linkedin: "https://linkedin.com"
  },
  {
    id: "t3",
    name: "CA Rajesh Goel",
    role: "Principal Tax Strategist & Financial Analyst",
    experience: "18+ Years Public Accounting",
    specialization: "Corporate Taxation, GST Filing Compliance, Audit Representation",
    bio: "Advised hundreds of medium-to-large corporate enterprises on restructuring supply chain tax pathways and capturing ideal Input Tax Credit reconciliations.",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&auto=format&fit=crop&q=80",
    linkedin: "https://linkedin.com"
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "st1",
    name: "Rohan Kapoor",
    role: "Senior SAP FICO Consultant",
    company: "Deloitte",
    previousCompany: "Associate Accountant",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80",
    quote: "The live SAP sandbox access at BIL was phenomenal. I didn't just study for exams; I built complex ledger configurations that helped me clear my senior consultant interviews with absolute confidence.",
    salaryGrowth: "+160% Hike",
    courseCompleted: "SAP S/4HANA Finance"
  },
  {
    id: "st2",
    name: "Anjali Gupta",
    role: "Lead Business Intelligence Engineer",
    company: "Accenture",
    previousCompany: "Operations Assistant",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80",
    quote: "Meera's focus on DAX formulas and real corporate datasets completely rewired how I work. I moved from building basic charts to designing corporate dashboard architectures for international business partners.",
    salaryGrowth: "+120% Hike",
    courseCompleted: "Executive Business Intelligence"
  },
  {
    id: "st3",
    name: "Vikram Shenoy",
    role: "Corporate Tax and Compliance Officer",
    company: "EY",
    previousCompany: "Tax Assistant",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80",
    quote: "As a practicing professional, keeping up with changing GST legislation is a huge challenge. The deep dives on reconciliation and electronic audit strategies gave me an immense professional edge.",
    salaryGrowth: "+90% Salary Growth",
    courseCompleted: "Certified Corporate GST Practitioner"
  }
];

export const FAQS: FAQ[] = [
  {
    id: "faq1",
    question: "Do students get access to authentic SAP server sandboxes?",
    answer: "Yes, absolutely. We do not use simulated software. Every student in our SAP programs receives official sandbox credentials to work directly with authentic live SAP S/4HANA servers, allowing you to run real journal entries, configure chart of accounts, and manage postings."
  },
  {
    id: "faq2",
    question: "Can I take these courses part-time while working a full-time corporate job?",
    answer: "Yes. Our courses are structured with professional learners in mind. We provide flexible weekend live interactive sessions, evening classes, and recorded high-definition modules, allowing you to level up without disrupting your current employment."
  },
  {
    id: "faq3",
    question: "How does the placement support system work?",
    answer: "Our career services program is split into two phases. First, we optimize your professional package: resume building, technical mock interview sessions, and LinkedIn profile tuning. Second, we introduce you directly to pre-scheduled interviews with our 120+ corporate and Big 4 partners."
  },
  {
    id: "faq4",
    question: "Are the certifications recognized internationally?",
    answer: "Yes, our programs prepare you for globally recognized industry standards. The SAP course aligns with the official SAP Certified Application Associate exam curriculum, and the Power BI program aligns with Microsoft's PL-300 Data Analyst Associate certification."
  },
  {
    id: "faq5",
    question: "What is the prerequisite for joining the Advanced Analytics or FICO track?",
    answer: "While background knowledge in business operations, finance, or computer systems is beneficial, our programs start with strong foundations. We provide pre-requisite introductory modules for absolute beginners to bridge any knowledge gaps quickly."
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "g1",
    title: "Executive Training Center",
    category: "Infrastructure",
    imageUrl: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: "g2",
    title: "S/4HANA Sandbox Ledger Lab",
    category: "Tech Labs",
    imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: "g3",
    title: "Power BI Executive Dashboard Review",
    category: "Live Sessions",
    imageUrl: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: "g4",
    title: "Corporate Recruitment Day",
    category: "Events",
    imageUrl: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: "g5",
    title: "Graduation & Certification Ceremony",
    category: "Ceremony",
    imageUrl: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: "g6",
    title: "One-on-One Mentorship Session",
    category: "Live Sessions",
    imageUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&auto=format&fit=crop&q=80"
  }
];
