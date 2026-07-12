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
      // Direct email check for default admin to prevent registration/seeding race conditions
      if (auth.currentUser?.email === "admin@sapinstitute.com") {
        return true;
      }
      const docRef = doc(db, ADMINS_COLLECTION, uid);
      const docSnap = await getDoc(docRef);
      return docSnap.exists();
    } catch (e) {
      console.error("Error verifying admin status:", e);
      // Fallback for default admin
      if (auth.currentUser?.email === "admin@sapinstitute.com") {
        return true;
      }
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
    const email = "admin@sapinstitute.com";
    const password = "AdminPassword123";
    try {
      // 1. Attempt standard login with default admin credentials
      const user = await this.login(email, password);
      console.log("Successfully logged in as default admin during seeding check.");
      
      // 2. Since we are successfully logged in, we have permissions to check and write to /admins/{uid}
      const docRef = doc(db, ADMINS_COLLECTION, user.uid);
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists()) {
        const adminProfile: Admin = {
          uid: user.uid,
          name: "Head of SAP Training",
          email,
          role: "Administrator"
        };
        await setDoc(docRef, adminProfile);
        console.log("Wrote missing admin document for logged-in default admin.");
      }
    } catch (err: any) {
      // If login failed because the user does not exist in Auth (user-not-found/invalid-credential/wrong-password)
      if (
        err.code === "auth/user-not-found" || 
        err.code === "auth/wrong-password" || 
        err.code === "auth/invalid-credential"
      ) {
        console.log("Default admin user not found in Auth. Registering new admin account...");
        try {
          await this.registerAdmin(email, password, "Head of SAP Training");
          console.log("Successfully registered default admin: admin@sapinstitute.com / AdminPassword123");
        } catch (registerError) {
          console.error("Failed to register default admin during seeding:", registerError);
        }
      } else {
        console.error("Failed to seed default admin during login check:", err);
      }
    }
  }
};
