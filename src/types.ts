/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Course {
  id: string;
  title: string;
  category: string;
  badge?: string;
  isPopular?: boolean;
  rating: number;
  reviewCount: number;
  duration: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  skillsLearned: string[];
  careerPaths: string[];
  description: string;
  image: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  iconName: string;
  color: string;
}

export interface Benefit {
  id: number;
  title: string;
  description: string;
  metric?: string;
}

export interface Company {
  name: string;
  logoUrl?: string;
  iconName: string;
}

export interface Trainer {
  id: string;
  name: string;
  role: string;
  experience: string;
  specialization: string;
  bio: string;
  image: string;
  linkedin: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  previousCompany?: string;
  image: string;
  quote: string;
  salaryGrowth: string;
  courseCompleted: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
}

export interface OutcomeMetric {
  id: string;
  label: string;
  value: string;
  subtext: string;
  iconName: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
}
