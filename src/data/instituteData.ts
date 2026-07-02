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
    id: "sap-b1",
    title: "SAP BUSINESS ONE (B1)",
    subtitle: "SME ERP Implementation & Management",
    category: "SAP & ERP",
    description: "Master the leading ERP solution for small-to-medium enterprises. Cover core accounting, customer relationship management, stock control, purchasing workflows, and system integration.",
    duration: "90 hours / 2 months",
    rating: 4.8,
    reviewsCount: 185,
    difficulty: "Beginner",
    isPopular: true,
    certified: true,
    skills: ["B1 General Ledger", "SME Inventory Controls", "Purchasing Cycles", "CRM Pipeline", "Service Module"],
    careerPaths: ["SAP B1 Consultant", "ERP Support Analyst", "Business One Administrator"],
    features: ["Dedicated SAP B1 Sandbox Access", "Real-world SME case studies", "Official Certification Prep"]
  },
  {
    id: "sap-fico",
    title: "SAP FICO",
    subtitle: "SAP Financial Accounting & Controlling",
    category: "SAP & ERP",
    description: "In-depth corporate training on general ledger, accounts payable/receivable, asset accounting, cost center controls, and S/4 HANA finance migration workflows.",
    duration: "90 hours / 2 months",
    rating: 4.9,
    reviewsCount: 312,
    difficulty: "Advanced",
    isPopular: true,
    certified: true,
    skills: ["General Ledger", "Asset Accounting", "Cost Center Ledger", "Accounts Payable", "S/4 HANA FICO"],
    careerPaths: ["SAP FICO Consultant", "Finance Analyst", "ERP Solution Architect"],
    features: ["Dedicated SAP Sandbox Access", "Real-time posting case studies", "Official Certification Prep"]
  },
  {
    id: "sap-mm",
    title: "SAP MM",
    subtitle: "SAP Materials Management",
    category: "SAP & ERP",
    description: "Master enterprise procurement workflows, inventory control, master data management, and automated invoice verification pipelines.",
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
    description: "Configure enterprise sales order processing, advanced pricing schemas, shipping logistics, billing operations, and customer master setups.",
    duration: "90 hours / 2 months",
    rating: 4.8,
    reviewsCount: 198,
    difficulty: "Intermediate",
    certified: true,
    skills: ["Sales Orders", "Pricing Schemas", "Shipping Logistics", "Billing Models", "S/4 HANA SD Customization"],
    careerPaths: ["SAP SD Consultant", "Sales Operations Analyst", "ERP Functional Executive"],
    features: ["Sales distribution scenarios", "Billing system integration", "Live corporate sandbox exercises"]
  },

  // --- Taxation & Finance ---
  {
    id: "e-filing",
    title: "E-FILING",
    subtitle: "Income Tax & Returns Compliance",
    category: "Taxation & Finance",
    description: "Step-by-step masterclass on filing ITR-1 to ITR-4, understanding salary structures, capital gains calculations, tax deductions, and Form 26AS/AIS reconciliation.",
    duration: "40 hours / 1 month",
    rating: 4.9,
    reviewsCount: 285,
    difficulty: "Beginner",
    certified: true,
    skills: ["ITR-1, 2, 3, 4 E-filing", "Capital Gains Calculation", "Form 26AS & AIS Reconciliation", "Tax Deductions (80C to 80U)", "E-verification"],
    careerPaths: ["Tax Consultant", "Accounts Executive", "GST & Income Tax Practitioner"],
    features: ["Live Government Portal Simulator", "Tax Computation Sheet Designs", "Direct Mentor Audit Sessions"]
  },
  {
    id: "uae-vat",
    title: "UAE VAT",
    subtitle: "UAE VAT & Gulf Corporate Tax Compliance",
    category: "Taxation & Finance",
    description: "Complete coverage of VAT registration, record-keeping, VAT Return Form 201 filing, and corporate tax regulations across Gulf region businesses.",
    duration: "30 hours / 1 month",
    rating: 4.8,
    reviewsCount: 178,
    difficulty: "Intermediate",
    certified: true,
    skills: ["UAE Federal Tax Authority Portal", "VAT Return Form 201", "Zero-rated vs Exempt supply", "Reverse Charge Mechanism", "Compliance Auditing"],
    careerPaths: ["Accounts Executive (Gulf)", "UAE Finance Staff", "VAT & Corporate Tax Consultant"],
    features: ["Gulf region regulatory case study", "Cross-border trade tax logic", "Direct recruitment contacts in Dubai/GCC"]
  },

  // --- Analytics & Excel ---
  {
    id: "advanced-excel",
    title: "ADVANCED EXCEL WITH POWER BI ANALYTICS",
    subtitle: "Advanced Spreadsheet Modeling & Business Intelligence",
    category: "Analytics & Excel",
    description: "High-end comprehensive program combining advanced spreadsheet modeling and automation with Power BI multi-dimensional database architecture, DAX query writing, and interactive reporting.",
    duration: "90 hours / 2 months",
    rating: 4.9,
    reviewsCount: 342,
    difficulty: "Intermediate",
    isPopular: true,
    certified: true,
    skills: ["Advanced Formulas & Arrays", "Pivot Dashboard Designs", "Power Query ETL Pipelines", "DAX Query Writing", "Power BI Service Cloud", "Macro Automation"],
    careerPaths: ["Data Analyst", "BI Specialist", "MIS & Reporting Manager"],
    features: ["Real-world business tracking", "Automated ETL pipelines", "Interactive cloud sandboxes", "Direct mentor audits"]
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
