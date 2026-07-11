import { 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged, 
  User,
  createUserWithEmailAndPassword
} from "firebase/auth";
import { doc, getDoc, setDoc, collection, getDocs, limit, query } from "firebase/firestore";
import { auth, db } from "../lib/firebase";
import { Admin } from "../types/blog";

const ADMINS_COLLECTION = "admins";

export const authService = {
  // Sign in with email and password
  async login(email: string, password: string): Promise<User> {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  },

  // Log out
  async logout(): Promise<void> {
    await signOut(auth);
  },

  // Listen for authentication changes
  subscribeToAuth(callback: (user: User | null) => void) {
    return onAuthStateChanged(auth, callback);
  },

  // Verify if user is an admin by checking Firestore 'admins' collection
  async isAdmin(uid: string): Promise<boolean> {
    try {
      const docRef = doc(db, ADMINS_COLLECTION, uid);
      const docSnap = await getDoc(docRef);
      return docSnap.exists();
    } catch (e) {
      console.error("Error verifying admin status:", e);
      return false;
    }
  },

  // Register a new admin user
  async registerAdmin(email: string, password: string, name: string): Promise<User> {
    // Create authentication credentials
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Create corresponding admin profile document in Firestore
    const adminProfile: Admin = {
      uid: user.uid,
      name,
      email,
      role: "Administrator"
    };

    await setDoc(doc(db, ADMINS_COLLECTION, user.uid), adminProfile);
    return user;
  },

  // Check and seed default credentials if no admins exist
  async seedAdminUserIfNeeded(): Promise<void> {
    try {
      const adminsCol = collection(db, ADMINS_COLLECTION);
      const q = query(adminsCol, limit(1));
      const snapshot = await getDocs(q);

      // If the admin collection is empty, automatically provision the default test admin
      if (snapshot.empty) {
        console.log("No administrators found in system. Provisioning default test admin...");
        // Use a standard test email & password
        const email = "admin@sapinstitute.com";
        const password = "AdminPassword123";
        
        try {
          // Attempt standard registration
          await this.registerAdmin(email, password, "Head of SAP Training");
          console.log("Default admin account provisioned: admin@sapinstitute.com / AdminPassword123");
        } catch (authError: any) {
          // If user already exists in Auth but not in Firestore, write the doc
          if (authError.code === "auth/email-already-in-use") {
            // We can prompt login
            console.log("Default user already in Auth database.");
          }
        }
      }
    } catch (e) {
      console.error("Failed to seed admin credentials:", e);
    }
  }
};
