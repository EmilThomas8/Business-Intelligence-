import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy 
} from "firebase/firestore";
import { db } from "../lib/firebase";
import { Course } from "../types/course";

const COURSES_COLLECTION = "courses";

export const courseService = {
  // Get all courses (optionally filtered by status)
  async getAllCourses(onlyPublished = true): Promise<Course[]> {
    const coursesCol = collection(db, COURSES_COLLECTION);
    const q = query(coursesCol, orderBy("createdAt", "desc"));
    
    const snapshot = await getDocs(q);
    const courses = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Course[];

    if (onlyPublished) {
      return courses.filter(course => course.status === "Published");
    }
    return courses;
  },

  // Get single course by ID
  async getCourseById(id: string): Promise<Course | null> {
    const docRef = doc(db, COURSES_COLLECTION, id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as Course;
    }
    return null;
  },

  // Get course by Slug
  async getCourseBySlug(slug: string): Promise<Course | null> {
    const coursesCol = collection(db, COURSES_COLLECTION);
    const q = query(coursesCol, where("slug", "==", slug));
    const snapshot = await getDocs(q);
    if (!snapshot.empty) {
      const d = snapshot.docs[0];
      return { id: d.id, ...d.data() } as Course;
    }
    return null;
  },

  // Create new course
  async createCourse(courseData: Omit<Course, "id">): Promise<string> {
    const coursesCol = collection(db, COURSES_COLLECTION);
    const docRef = await addDoc(coursesCol, {
      ...courseData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });
    return docRef.id;
  },

  // Update existing course
  async updateCourse(id: string, courseData: Partial<Course>): Promise<void> {
    const docRef = doc(db, COURSES_COLLECTION, id);
    await updateDoc(docRef, {
      ...courseData,
      updatedAt: new Date().toISOString()
    });
  },

  // Delete course
  async deleteCourse(id: string): Promise<void> {
    const docRef = doc(db, COURSES_COLLECTION, id);
    await deleteDoc(docRef);
  }
};
