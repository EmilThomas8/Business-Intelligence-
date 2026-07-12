export interface CareerPath {
  id: string;
  title: string;
}

export interface Course {
  id: string;
  title: string;
  subtitle: string;
  slug: string;
  shortDescription: string;
  description: string;
  thumbnail: string;
  category: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  durationHours: string;
  courseLength: string;
  language: string;
  mode: "Online" | "Offline" | "Hybrid";
  certified: boolean;
  featured: boolean;
  popular: boolean;
  trending: boolean;
  newCourse: boolean;
  careerPaths: CareerPath[];
  rating: number;
  reviewCount: number;
  detailsButtonText: string;
  enrollButtonText: string;
  enrollUrl: string;
  whatsappUrl: string;
  status: "Draft" | "Published" | "Archived";
  seoTitle: string;
  seoDescription: string;
  keywords: string[];
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
}
