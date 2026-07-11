export interface Admin {
  uid: string;
  name: string;
  email: string;
  role: string;
}

export interface Category {
  id: string; // Document ID
  name: string;
  slug: string;
  color: string; // e.g. "cyan", "blue", "amber", "emerald", "purple", "rose"
  description?: string;
}

export interface BlogPost {
  id: string; // Document ID
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  categoryId: string; // Refers to Category.id
  tags: string[];
  author: string;
  status: "published" | "draft";
  featured: boolean;
  publishDate: string; // ISO 8601 string
  createdAt: string; // ISO 8601 string
  updatedAt: string; // ISO 8601 string
  seoTitle: string;
  seoDescription: string;
  keywords: string[];
  views?: number;
  readingTime?: number;
}
