import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  addDoc, 
  setDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy, 
  increment,
  writeBatch
} from "firebase/firestore";
import { db } from "../lib/firebase";
import { BlogPost, Category } from "../types/blog";

const BLOGS_COLLECTION = "blogs";
const CATEGORIES_COLLECTION = "categories";

export const blogService = {
  // Get all blogs (optionally filtered by status)
  async getAllBlogs(onlyPublished = true): Promise<BlogPost[]> {
    const blogsCol = collection(db, BLOGS_COLLECTION);
    const q = query(blogsCol, orderBy("publishDate", "desc"));
    
    const snapshot = await getDocs(q);
    const posts = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as BlogPost[];

    if (onlyPublished) {
      return posts.filter(post => post.status === "published");
    }
    return posts;
  },

  // Get single blog by ID
  async getBlogById(id: string): Promise<BlogPost | null> {
    const docRef = doc(db, BLOGS_COLLECTION, id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as BlogPost;
    }
    return null;
  },

  // Get blog by Slug
  async getBlogBySlug(slug: string): Promise<BlogPost | null> {
    const blogsCol = collection(db, BLOGS_COLLECTION);
    const q = query(blogsCol, where("slug", "==", slug));
    const snapshot = await getDocs(q);
    if (!snapshot.empty) {
      const d = snapshot.docs[0];
      return { id: d.id, ...d.data() } as BlogPost;
    }
    return null;
  },

  // Create new blog
  async createBlog(blogData: Omit<BlogPost, "id">): Promise<string> {
    const blogsCol = collection(db, BLOGS_COLLECTION);
    const docRef = await addDoc(blogsCol, {
      ...blogData,
      views: 0
    });
    return docRef.id;
  },

  // Update existing blog
  async updateBlog(id: string, blogData: Partial<BlogPost>): Promise<void> {
    const docRef = doc(db, BLOGS_COLLECTION, id);
    await updateDoc(docRef, {
      ...blogData,
      updatedAt: new Date().toISOString()
    });
  },

  // Delete blog
  async deleteBlog(id: string): Promise<void> {
    const docRef = doc(db, BLOGS_COLLECTION, id);
    await deleteDoc(docRef);
  },

  // Increment blog views
  async incrementViews(id: string): Promise<void> {
    const docRef = doc(db, BLOGS_COLLECTION, id);
    await updateDoc(docRef, {
      views: increment(1)
    });
  }
};

export const categoryService = {
  // Get all categories
  async getAllCategories(): Promise<Category[]> {
    const catCol = collection(db, CATEGORIES_COLLECTION);
    const snapshot = await getDocs(catCol);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Category[];
  },

  // Create category
  async createCategory(categoryData: Omit<Category, "id">): Promise<string> {
    const catCol = collection(db, CATEGORIES_COLLECTION);
    const docRef = await addDoc(catCol, categoryData);
    return docRef.id;
  },

  // Update category
  async updateCategory(id: string, categoryData: Partial<Category>): Promise<void> {
    const docRef = doc(db, CATEGORIES_COLLECTION, id);
    await updateDoc(docRef, categoryData);
  },

  // Delete category
  async deleteCategory(id: string): Promise<void> {
    const docRef = doc(db, CATEGORIES_COLLECTION, id);
    await deleteDoc(docRef);
  },

  // Database seeder (creates initial categories and blogs if none exist)
  async seedInitialDataIfNeeded(): Promise<void> {
    const categories = await this.getAllCategories();
    if (categories.length > 0) return; // already seeded

    const batch = writeBatch(db);

    // Initial categories
    const initialCategories: Omit<Category, "id">[] = [
      { name: "SAP FICO", slug: "sap-fico", color: "cyan" },
      { name: "SAP ABAP", slug: "sap-abap", color: "blue" },
      { name: "SAP Materials Management", slug: "sap-mm", color: "amber" },
      { name: "Career & Interview Tips", slug: "career-tips", color: "emerald" }
    ];

    const categoryIds: string[] = [];
    const catCol = collection(db, CATEGORIES_COLLECTION);
    
    for (const cat of initialCategories) {
      const newDocRef = doc(catCol);
      batch.set(newDocRef, cat);
      categoryIds.push(newDocRef.id);
    }

    // Commit categories first
    await batch.commit();

    // Re-fetch category details with IDs to set up sample blogs
    const freshCategories = await this.getAllCategories();
    const ficoCat = freshCategories.find(c => c.slug === "sap-fico")?.id || "";
    const abapCat = freshCategories.find(c => c.slug === "sap-abap")?.id || "";
    const mmCat = freshCategories.find(c => c.slug === "sap-mm")?.id || "";
    const careerCat = freshCategories.find(c => c.slug === "career-tips")?.id || "";

    const blogsCol = collection(db, BLOGS_COLLECTION);
    const initialBlogs: Omit<BlogPost, "id">[] = [
      {
        title: "How to Crack your First SAP FICO Interview in 2026",
        slug: "crack-sap-fico-interview-2026",
        excerpt: "Landing a role as an SAP Financial Accounting (FICO) consultant requires more than theoretical configuration. Here are the top 10 scenario-based questions from tier-1 MNCs.",
        content: `<h2>Introduction to SAP FICO Career Path</h2>
<p>In the evolving enterprise landscape, SAP FICO (Financial Accounting and Controlling) remains the backbone of financial modules. As corporations move their data pipelines into S/4HANA Finance platforms, the demand for consultants who understand both financial configuration and operational integration is hitting record highs.</p>

<h3>Key Scenario Questions to Expect</h3>
<p>Interviews have evolved significantly. Rather than asking simple transactional codes (T-Codes), interviewers focus heavily on live industrial business cases. Here are the most frequently asked scenarios:</p>

<ol>
  <li><strong>The Classical vs. New General Ledger (GL) Scenario:</strong> Be ready to explain document splitting, multi-ledger capability, and the Universal Journal architecture (ACDOCA table).</li>
  <li><strong>Integration with Logistics (FI-MM & FI-SD):</strong> Understating the automated posting system and account determination pipelines (OBYC and VKOA setups).</li>
  <li><strong>Month-End Closing Processes:</strong> Describing balance sheet preparation, foreign currency revaluation, and depreciation run sequences.</li>
</ol>

<blockquote>"An expert consultant doesn't just memorize settings; they translate physical corporate workflows into structured accounting tables."</blockquote>

<h3>Configuration Mastery</h3>
<p>To qualify for top tier-1 MNC consulting roles (e.g., Accenture, Capgemini, Deloitte), you must demonstrate confidence in managing the following elements directly on live SAP client sandboxes:</p>
<ul>
  <li>Chart of Accounts structure definition.</li>
  <li>Fiscal Year Variant assignments.</li>
  <li>Custom ledger setups for global operational standards.</li>
</ul>

<h3>Conclusion</h3>
<p>Start your preparation by practicing configurations on live sandbox systems, focusing on real-world industrial datasets rather than generic tutorial guidelines.</p>`,
        featuredImage: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1200&auto=format&fit=crop",
        categoryId: ficoCat,
        tags: ["SAP FICO", "Interview Prep", "Finance", "Career"],
        author: "Rajesh Kumar",
        status: "published",
        featured: true,
        publishDate: new Date().toISOString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        seoTitle: "Top SAP FICO Interview Scenario Questions & Answers for 2026",
        seoDescription: "Prepare for your SAP Financial Accounting and Controlling interviews with live scenario questions, document splitting, and OBYC integration setups.",
        keywords: ["SAP FICO", "Interview Questions", "Universal Journal", "OBYC", "S4HANA Finance"],
        views: 124
      },
      {
        title: "Modern ABAP: Transitioning from Procedural to Object-Oriented Coding",
        slug: "modern-abap-object-oriented-transition",
        excerpt: "The SAP development paradigm has changed. Explore the crucial differences between legacy procedural ABAP and modern object-oriented extensions designed for S/4HANA Cloud.",
        content: `<h2>The Evolution of SAP Application Development</h2>
<p>For decades, legacy custom applications in SAP were built using procedural techniques with modular structures, custom subroutines, and classic reports. While functional, these patterns are insufficient to support highly interactive cloud systems. Modern S/4HANA platforms rely heavily on Object-Oriented ABAP (OO-ABAP) and clean cloud extensions.</p>

<h3>Why Make the Shift to OO-ABAP?</h3>
<p>Object-oriented development brings scalability, testability, and separation of concerns into SAP. Standardizing code into classes and interfaces enables:</p>
<ul>
  <li><strong>Reusability:</strong> Reducing database query overlaps and custom table access.</li>
  <li><strong>Cleaner CDS Views:</strong> Building powerful Core Data Services projections before rendering on SAP Fiori cards.</li>
  <li><strong>Unit Testing:</strong> Using ABAP Unit frameworks to automate logical code verification.</li>
</ul>

<h3>A Simple Procedural vs OO Comparison</h3>
<p>Consider reading materials management data. Instead of calling generic direct SQL selects in your report body, encapsulate the select logic into a dedicated Data Access Object (DAO) class:</p>
<pre><code>CLASS lcl_materials_dao DEFINITION.
  PUBLIC SECTION.
    CLASS-METHODS get_stock_data
      IMPORTING iv_plant TYPE werks_d
      RETURNING VALUE(rt_stock) TYPE ty_stock_table.
ENDCLASS.</code></pre>

<p>This simple standard keeps your business logic isolated from presentation screens, ensuring your custom apps don't break during main platform upgrades.</p>`,
        featuredImage: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=1200&auto=format&fit=crop",
        categoryId: abapCat,
        tags: ["SAP ABAP", "OO-ABAP", "S4HANA", "Development"],
        author: "Sarah Jenkins",
        status: "published",
        featured: false,
        publishDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        seoTitle: "Object Oriented ABAP Guide - Modern SAP Coding Patterns",
        seoDescription: "Learn how to write high-contrast, scalable, upgrade-safe custom modules using ABAP Objects and S/4HANA cloud extensibility patterns.",
        keywords: ["ABAP Objects", "S4HANA Extensibility", "CDS Views", "SAP Fiori"],
        views: 89
      },
      {
        title: "Understanding SAP MM: Procurement to Payment (P2P) Lifecycle",
        slug: "sap-mm-procurement-to-payment-lifecycle",
        excerpt: "Master the essential transactional flow of the Materials Management module. A complete guide on purchasing, invoice verification, and stock movements.",
        content: `<h2>The Foundation of Logistics: Procure-to-Pay</h2>
<p>The Procure-to-Pay (P2P) cycle is the core business process inside the SAP Materials Management (MM) module. It coordinates company purchasing systems, stock levels, and warehouse operations to ensure smooth manufacturing workflows.</p>

<h3>Detailed P2P Flow Analysis</h3>
<p>Let's map out the 8 key stages of the P2P cycle as configured in S/4HANA enterprise resource grids:</p>
<ol>
  <li><strong>Determination of Requirements:</strong> Automatically generated via Material Requirements Planning (MRP) runs or created manually through a Purchase Requisition (PR).</li>
  <li><strong>Source Determination:</strong> Establishing vendors via Outline Agreements, Request for Quotations (RFQs), or direct Info Records.</li>
  <li><strong>Purchase Order (PO) Processing:</strong> Creating formal transactional agreements using T-Code ME21N.</li>
  <li><strong>Goods Receipt (GR):</strong> Recording inventory entry into physical storage using T-Code MIGO, posting balance sheet stock changes automatically.</li>
  <li><strong>Invoice Verification:</strong> Matching vendor bills against purchase orders and quantities using T-Code MIRO to prepare for accounts payable processes.</li>
</ol>

<h3>Essential Configuration Skills</h3>
<p>To stand out in the logistics market, you must understand pricing schema determinations, movement types configuration (e.g. 101, 201, 561), and general valuation class setups mapped with FI ledgers.</p>`,
        featuredImage: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1200&auto=format&fit=crop",
        categoryId: mmCat,
        tags: ["SAP MM", "Procurement", "P2P Lifecycle", "Logistics"],
        author: "Vikram Naidu",
        status: "published",
        featured: false,
        publishDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        seoTitle: "SAP Materials Management P2P Lifecycle Configuration Tutorial",
        seoDescription: "Complete physical walkthrough of the SAP MM Procure-to-Pay (P2P) cycle. Learn inventory controls, goods receipts, and vendor verification.",
        keywords: ["SAP MM", "P2P Cycle", "MIGO", "MIRO", "Procure to Pay"],
        views: 65
      }
    ];

    for (const blog of initialBlogs) {
      await addDoc(blogsCol, blog);
    }
  }
};
