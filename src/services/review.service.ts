import { 
  collection, 
  doc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy,
  onSnapshot,
  QuerySnapshot,
  DocumentData
} from "firebase/firestore";
import { db } from "../lib/firebase";
import { StudentReview } from "../types/review";

const REVIEWS_COLLECTION = "studentReviews";

export const reviewService = {
  // Real-time listener for reviews
  subscribeToReviews(callback: (reviews: StudentReview[]) => void, onlyPublished = false) {
    const reviewsCol = collection(db, REVIEWS_COLLECTION);
    // Remove the filter from the query to avoid index requirement for composite index
    const q = query(reviewsCol, orderBy("createdAt", "desc"));
    
    return onSnapshot(q, (snapshot: QuerySnapshot<DocumentData>) => {
      let reviews = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as StudentReview[];

      if (onlyPublished) {
        reviews = reviews.filter(review => review.status === "Published");
      }
      callback(reviews);
    });
  },

  async createReview(reviewData: Omit<StudentReview, "id" | "createdAt" | "updatedAt">): Promise<string> {
    const reviewsCol = collection(db, REVIEWS_COLLECTION);
    const docRef = await addDoc(reviewsCol, {
      ...reviewData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });
    return docRef.id;
  },

  async updateReview(id: string, reviewData: Partial<StudentReview>): Promise<void> {
    const docRef = doc(db, REVIEWS_COLLECTION, id);
    await updateDoc(docRef, {
      ...reviewData,
      updatedAt: new Date().toISOString()
    });
  },

  async deleteReview(id: string): Promise<void> {
    const docRef = doc(db, REVIEWS_COLLECTION, id);
    await deleteDoc(docRef);
  }
};
