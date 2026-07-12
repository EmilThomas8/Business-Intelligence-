export interface StudentReview {
  id: string;
  studentName: string;
  jobTitle?: string;
  company?: string;
  course: string;
  rating: number;
  review: string;
  completionDate: string;
  featured: boolean;
  status: "Draft" | "Published" | "Hidden";
  createdAt: string;
  updatedAt: string;
  displayOrder?: number;
  studentImage?: string;
}
