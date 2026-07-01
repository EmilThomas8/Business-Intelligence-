export interface Course {
  id: string;
  title: string;
  subtitle?: string;
  category: string;
  description: string;
  duration: string;
  rating: number;
  reviewsCount: number;
  difficulty: "Beginner" | "Intermediate" | "Advanced" | "All Levels";
  isPopular?: boolean;
  certified: boolean;
  skills: string[];
  careerPaths: string[];
  features: string[];
}

export interface Trainer {
  id: string;
  name: string;
  role: string;
  experience: string;
  specialization: string;
  image: string;
  linkedIn: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  text: string;
  salaryGrowth: string;
  image: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export const courses: Course[] = [
  // --- SAP & ERP ---
  {
    id: "sap-fico",
    title: "SAP FICO",
    subtitle: "SAP Financial Accounting & Controlling",
    category: "SAP & ERP",
    description: "In-depth corporate training on general ledger, accounts payable/receivable, asset accounting, and cost center control configurations.",
    duration: "90 hours / 2 months",
    rating: 4.9,
    reviewsCount: 312,
    difficulty: "Advanced",
    isPopular: true,
    certified: true,
    skills: ["General Ledger", "Asset Accounting", "Cost Center Ledger", "Accounts Payable", "S/4 HANA FICO"],
    careerPaths: ["SAP FICO Consultant", "Finance Analyst", "ERP Executive"],
    features: ["Dedicated SAP Sandbox Access", "Real-time posting case studies", "Official Certification Prep"]
  },
  {
    id: "sap-mm",
    title: "SAP MM",
    subtitle: "SAP Materials Management",
    category: "SAP & ERP",
    description: "Master procurement workflows, inventory control, master data management, and invoice verification pipelines.",
    duration: "90 hours / 2 months",
    rating: 4.8,
    reviewsCount: 224,
    difficulty: "Intermediate",
    certified: true,
    skills: ["Procurement Strategy", "Inventory Control", "Invoice Verification", "Material Master", "Vendor Reconciliation"],
    careerPaths: ["SAP MM Consultant", "Supply Chain Analyst", "Procurement Executive"],
    features: ["End-to-end supply chain setups", "Stock valuation modules", "Direct recruiter assessment"]
  },
  {
    id: "sap-sd",
    title: "SAP SD",
    subtitle: "SAP Sales & Distribution",
    category: "SAP & ERP",
    description: "Configure sales order processing, pricing strategies, shipping, billing, and customer master data setups.",
    duration: "90 hours / 2 months",
    rating: 4.8,
    reviewsCount: 198,
    difficulty: "Intermediate",
    certified: true,
    skills: ["Sales Orders", "Pricing Schemas", "Shipping Logistics", "Billing Models", "S/4 HANA SD Customization"],
    careerPaths: ["SAP SD Consultant", "Sales Operations Analyst", "ERP Executive"],
    features: ["Sales distribution scenarios", "Billing system integration", "Live corporate sandbox exercises"]
  },
  {
    id: "sap-s4-hana",
    title: "SAP S/4 HANA",
    subtitle: "SAP S/4 HANA Certification Preparation",
    category: "SAP & ERP",
    description: "Align your skillset with the next-gen cloud database architecture. Prepare thoroughly for official SAP certification exams.",
    duration: "90 hours / 2 months",
    rating: 4.9,
    reviewsCount: 415,
    difficulty: "Advanced",
    isPopular: true,
    certified: true,
    skills: ["SAP S/4HANA Architecture", "HANA Database Engine", "Migration Strategies", "Fiori UX Configuration", "System Conversion"],
    careerPaths: ["SAP S/4 HANA Consultant", "ERP Project Manager", "SAP Functional Consultant"],
    features: ["Official exam-prep questions", "HANA database live performance tests", "Authorized study resources"]
  },
  {
    id: "sap-b1",
    title: "SAP Business One",
    subtitle: "SAP Business One for SMEs",
    category: "SAP & ERP",
    description: "Manage end-to-end accounting, inventory, sales, purchasing, and customer relations for small-to-medium enterprises.",
    duration: "90 hours / 1.5 months",
    rating: 4.7,
    reviewsCount: 185,
    difficulty: "Beginner",
    certified: true,
    skills: ["B1 General Ledger", "SME Inventory Controls", "Purchasing Cycles", "CRM Pipeline", "Service Module"],
    careerPaths: ["SAP B1 Consultant", "ERP Support Analyst", "Business One Executive"],
    features: ["SME case study models", "Interactive posting laboratories", "Direct small business ERP consulting prep"]
  },
  {
    id: "sap-b1-adv",
    title: "SAP B1 Advanced",
    subtitle: "SAP Business One — Advanced",
    category: "SAP & ERP",
    description: "Deep dive into advanced queries, SDK customization, custom reporting, schema changes, and system integrations.",
    duration: "90 hours / 1.5 months",
    rating: 4.8,
    reviewsCount: 142,
    difficulty: "Advanced",
    certified: true,
    skills: ["B1 SDK & API Coding", "Custom SQL Queries", "Crystal Reports Designer", "Add-on Development", "System Administration"],
    careerPaths: ["Senior SAP B1 Consultant", "Implementation Specialist", "SAP Support Lead"],
    features: ["Whiteboard system design", "SDK integration tutorials", "Troubleshooting actual system logs"]
  },

  // --- Analytics & Excel ---
  {
    id: "business-excel",
    title: "Business Excel",
    subtitle: "Business Excel — Essentials",
    category: "Analytics & Excel",
    description: "Learn essential lookup functions, formatting tools, pivot tables, and professional data entry hygiene.",
    duration: "45–50 hours / 1 month",
    rating: 4.7,
    reviewsCount: 260,
    difficulty: "Beginner",
    certified: true,
    skills: ["Excel Pivot Tables", "VLOOKUP & HLOOKUP", "Conditional Formatting", "Data Validation", "Basic Formulas"],
    careerPaths: ["Data Entry Analyst", "MIS Executive", "Operations Staff"],
    features: ["Corporate sheet templates", "Speed drills & shortcut keys", "Clean bookkeeping data practices"]
  },
  {
    id: "business-excel-analytics",
    title: "Business Excel & Analytics",
    subtitle: "Business Excel with Analytics",
    category: "Analytics & Excel",
    description: "Build interactive reporting charts, automate manual operations, and model business forecasts inside spreadsheets.",
    duration: "45–50 hours / 1 month",
    rating: 4.8,
    reviewsCount: 320,
    difficulty: "Intermediate",
    isPopular: true,
    certified: true,
    skills: ["XLOOKUP & Dynamic Arrays", "Power Query ETL", "Data Visualization", "Descriptive Statistics", "Trend Forecasting"],
    careerPaths: ["Business Analyst", "MIS Analyst", "Reporting Executive"],
    features: ["Sales & marketing dashboard projects", "What-if scenario modeling", "Interactive analytical case study"]
  },
  {
    id: "adv-excel-power-bi",
    title: "Advanced Excel with Power BI",
    subtitle: "Advanced Excel with Power BI — Complete",
    category: "Analytics & Excel",
    description: "Complete masterclass bridging high-end Excel Power Query and multi-dimensional Power BI modeling pipelines.",
    duration: "90 hours / 1.5 months",
    rating: 4.9,
    reviewsCount: 295,
    difficulty: "Advanced",
    isPopular: true,
    certified: true,
    skills: ["DAX modeling", "Power Query M Language", "Power BI Service", "Gateway Configuration", "Row-Level Security (RLS)"],
    careerPaths: ["BI Analyst", "Data Analyst", "Reporting Manager"],
    features: ["Cloud-hosted analytics portals", "Complex DAX pattern blueprints", "Microsoft PL-300 curriculum alignment"]
  },
  {
    id: "excel-power-bi-prof",
    title: "Excel with Power BI",
    subtitle: "Excel with Power BI — Professional",
    category: "Analytics & Excel",
    description: "Establish a robust baseline in visual storytelling, direct SQL data querying, and modern business intelligence reports.",
    duration: "90 hours / 1.5 months",
    rating: 4.8,
    reviewsCount: 215,
    difficulty: "Intermediate",
    certified: true,
    skills: ["Dashboard wireframing", "SQL Database Connection", "Data Modeling basics", "Interactive visuals", "KPI Indicators"],
    careerPaths: ["Analytics Executive", "Business Intelligence Analyst", "Reporting Specialist"],
    features: ["Real estate & finance data models", "Executive presentation workshops", "Portfolio review sessions"]
  },

  // --- Taxation & Finance ---
  {
    id: "gst-filing",
    title: "GST Filing",
    subtitle: "GST Filing — Practical Course",
    category: "Taxation & Finance",
    description: "Master practical GST registration, e-way bills generation, and direct filing of GSTR-1 and GSTR-3B.",
    duration: "20 hours",
    rating: 4.9,
    reviewsCount: 310,
    difficulty: "Beginner",
    certified: true,
    skills: ["GSTR-1 & GSTR-3B filings", "E-Way Bills generation", "GST Registration", "Input Tax Credit (ITC) Check", "Portal Walkthrough"],
    careerPaths: ["Tax Assistant", "Accounts Executive", "GST Practitioner"],
    features: ["Live Government portal simulator", "Error correction techniques", "Latest financial amendments"]
  },
  {
    id: "itr-filing",
    title: "ITR Filing",
    subtitle: "Income Tax Return Filing",
    category: "Taxation & Finance",
    description: "Step-by-step guidance on filing ITR-1 to ITR-4, understanding salary structures, capital gains, and tax deductions.",
    duration: "20 hours",
    rating: 4.8,
    reviewsCount: 195,
    difficulty: "Intermediate",
    certified: true,
    skills: ["ITR-1, 2, 3, 4 E-filing", "Capital Gains Calculation", "Form 26AS & AIS Reconciliation", "Tax Deductions (80C to 80U)", "E-verification"],
    careerPaths: ["Tax Consultant", "Accounts Staff", "CA Article"],
    features: ["Live portal scenario walk-throughs", "Tax computation sheet designs", "Direct mentor audit sessions"]
  },
  {
    id: "essentials-gst-itr",
    title: "Essentials of GST & ITR",
    subtitle: "Essentials of GST & ITR — Combined",
    category: "Taxation & Finance",
    description: "Dual masterclass program delivering high-density, practical competencies across both GST compliance and income tax filings.",
    duration: "20 hours",
    rating: 4.9,
    reviewsCount: 240,
    difficulty: "Intermediate",
    isPopular: true,
    certified: true,
    skills: ["Combined Portal Audits", "Dual Return Submissions", "Tax Liability Estimation", "Compliance Schedules", "Client Management"],
    careerPaths: ["Finance Executive", "Accounts Trainee", "Tax Assistant"],
    features: ["Comprehensive compliance calendars", "Client-ready portfolio cases", "Practical sandboxed tests"]
  },
  {
    id: "uae-vat",
    title: "UAE VAT",
    subtitle: "UAE VAT — Filing & Compliance",
    category: "Taxation & Finance",
    description: "Learn VAT registration, calculation, record-keeping, and the exact filing procedures for businesses in the Gulf region.",
    duration: "20 hours",
    rating: 4.8,
    reviewsCount: 178,
    difficulty: "Intermediate",
    certified: true,
    skills: ["UAE Federal Tax Authority Portal", "VAT Return Form 201", "Zero-rated vs Exempt supply", "Reverse Charge Mechanism", "Compliance Auditing"],
    careerPaths: ["Accounts Executive (Gulf)", "UAE Finance Staff", "VAT Consultant"],
    features: ["Gulf region regulatory case study", "Cross-border trade tax logic", "Direct recruitment contacts in Dubai/GCC"]
  }
];

export const services: Service[] = [
  {
    id: "sap-erp-training",
    title: "SAP & ERP Training",
    description: "Industry-standard ERP modules taught by certified professionals with real implementation experience.",
    iconName: "Database"
  },
  {
    id: "business-analytics",
    title: "Business Analytics",
    description: "Excel, Power BI dashboards, and data-driven decision making for modern business environments.",
    iconName: "BarChart3"
  },
  {
    id: "taxation-finance",
    title: "Taxation & Finance",
    description: "GST, ITR, UAE VAT — practical tax filing skills for Indian and Gulf finance professionals.",
    iconName: "Receipt"
  },
  {
    id: "certification-support",
    title: "Certification Support",
    description: "Globally recognised certification preparation with guided exam strategies and mock tests.",
    iconName: "Award"
  },
  {
    id: "placement-assistance",
    title: "Placement Assistance",
    description: "Resume building, mock interviews, and job referrals to connect you with the right employers.",
    iconName: "Briefcase"
  }
];

export const trainers: Trainer[] = [
  {
    id: "trainer-1",
    name: "Dr. Rajesh K. Nair",
    role: "Senior Enterprise SAP Architect & Director",
    experience: "18+ Years in SAP S/4 HANA & FICO Consulting",
    specialization: "ERP Architecture & Financial Transformation",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=256&h=256&fit=crop",
    linkedIn: "https://linkedin.com"
  },
  {
    id: "trainer-2",
    name: "Anjali Thomas, CFA",
    role: "Lead Business Intelligence Engineer",
    experience: "12+ Years with Microsoft BI Ecosystem",
    specialization: "Advanced DAX, Power Query & SQL Warehouses",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=256&h=256&fit=crop",
    linkedIn: "https://linkedin.com"
  },
  {
    id: "trainer-3",
    name: "Vikram R. Joshi, FCA",
    role: "Chief Tax Counsel & Advisor",
    experience: "15+ Years in Direct & Indirect Corporate Taxation",
    specialization: "GST Portal Compliance, Tax Litigation & Audits",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=256&h=256&fit=crop",
    linkedIn: "https://linkedin.com"
  }
];

export const testimonials: Testimonial[] = [
  {
    id: "test-1",
    name: "Saurabh Sharma",
    role: "Senior SAP FICO Consultant",
    company: "Deloitte India",
    text: "The training at BIL was a complete paradigm shift. The access to real S/4 HANA servers and Dr. Nair's corporate consulting background helped me secure a promotion within 3 months of program completion.",
    salaryGrowth: "+85% Hike",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=120&h=120&fit=crop"
  },
  {
    id: "test-2",
    name: "Meera Krishnan",
    role: "Lead Business Intelligence Analyst",
    company: "Accenture",
    text: "Power BI can look easy on tutorials, but designing dashboards for 10,000 active users requires the enterprise governance and advanced DAX practices I acquired here. Highly recommended for senior analysts.",
    salaryGrowth: "2.5x Salary Growth",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=120&h=120&fit=crop"
  },
  {
    id: "test-3",
    name: "Prakash Hegde",
    role: "Finance Director",
    company: "Tata Group",
    text: "Our entire taxation compliance team completed the GST Elite certification program. The e-filing sandbox simulation saved us countless hours of manual learning and immediate compliance errors.",
    salaryGrowth: "Corporate Upskilling Outcome",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=120&h=120&fit=crop"
  }
];

export const faqs: FAQ[] = [
  {
    id: "faq-1",
    question: "How do your cloud server laboratories work?",
    answer: "Every student receives personal, secure VPN and SSH credentials to directly connect to live, active SAP S/4 HANA sandbox environments. These servers operate identical datasets to multinational configurations, so you learn in real-world environments.",
    category: "Infrastructure"
  },
  {
    id: "faq-2",
    question: "Is there direct placement assistance?",
    answer: "Yes. Our Placement Acceleration program partners with HR heads in top tier consulting firms and financial conglomerates. We don't just send resumes; we organize specific corporate assessment sessions directly inside our labs.",
    category: "Placement"
  },
  {
    id: "faq-3",
    question: "Do you offer certificates that global companies recognize?",
    answer: "Absolutely. All our course paths are verified and aligned directly with Microsoft PL-300 Certification for Power BI and SAP certified Associate designations, along with our proprietary BIL Enterprise Certification signed by senior consultants.",
    category: "Certification"
  },
  {
    id: "faq-4",
    question: "Are there flexible batches for full-time working professionals?",
    answer: "Over 70% of our attendees are working professional analysts. We run dedicated executive weekend batches (Saturdays & Sundays) with high-density workshops, as well as recorded modules for self-paced review.",
    category: "Schedule"
  }
];

export const companies = [
  { name: "SAP", type: "Enterprise ERP" },
  { name: "Microsoft", type: "Business Intelligence" },
  { name: "Oracle", type: "Databases & ERP" },
  { name: "IBM", type: "System Integration" },
  { name: "AWS", type: "Cloud Infrastructure" },
  { name: "Google Cloud", type: "Data Analytics" },
  { name: "Power BI", type: "Visualization" },
  { name: "Python", type: "Data Science" },
  { name: "SQL Server", type: "Relational DB" },
  { name: "Excel Elite", type: "Modeling" }
];

export const journeySteps = [
  {
    id: "step-1",
    title: "1. Skill Mapping & Enrollment",
    description: "Align your profile with the tech stack of your target companies. Design a customizable learning pathway.",
    details: "1-on-1 counselor audit to review corporate career trajectories."
  },
  {
    id: "step-2",
    title: "2. High-Density Consulting Classrooms",
    description: "Learn core architecture and concepts from active enterprise senior architects in small, focused peer cohorts.",
    details: "Hands-on projects covering real multi-tenant databases and complex taxation schemes."
  },
  {
    id: "step-3",
    title: "3. Live Cloud Sandbox Laboratories",
    description: "Log into premium live SAP S/4 HANA or high-volume Power BI Gateway servers to troubleshoot infrastructure.",
    details: "Solve actual simulated corporate bottlenecks, outages, and dashboard scaling challenges."
  },
  {
    id: "step-4",
    title: "4. Global Certification Mastery",
    description: "Validate your skills with elite certification paths (SAP FICO Associate, Microsoft Certified PL-300).",
    details: "94% first-time passing rate with our curated mock environments and review sessions."
  },
  {
    id: "step-5",
    title: "5. Placement Acceleration & Hiring Rails",
    description: "Get invited to direct recruitment drives with our Fortune 500 corporate network.",
    details: "Targeted resume design, portfolio compilation, and consulting case-study preparation."
  }
];

export const galleryItems = [
  {
    id: "g1",
    category: "Corporate Classrooms",
    title: "Premium executive lecture studio for SAP S/4 HANA architecture discussion",
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=600&h=400&fit=crop"
  },
  {
    id: "g2",
    category: "Advanced Database Lab",
    title: "High-density Power BI and corporate SQL server analysis infrastructure",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=600&h=400&fit=crop"
  },
  {
    id: "g3",
    category: "Corporate Seminars",
    title: "Quarterly ERP and FinTech consulting seminars with leading industry experts",
    image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?q=80&w=600&h=400&fit=crop"
  },
  {
    id: "g4",
    category: "Interactive Certifications",
    title: "Graduate student receiving SAP S/4 HANA Enterprise Professional Certification",
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=600&h=400&fit=crop"
  }
];
