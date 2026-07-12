import { initializeApp, getApps, getApp } from "firebase/app";
import { initializeFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import appletConfig from "../../firebase-applet-config.json";

const firebaseConfig = {
  apiKey: appletConfig.apiKey,
  authDomain: appletConfig.authDomain,
  projectId: appletConfig.projectId,
  storageBucket: appletConfig.storageBucket,
  messagingSenderId: appletConfig.messagingSenderId,
  appId: appletConfig.appId,
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const auth = getAuth(app);

// Use both experimentalForceLongPolling and useFetchStreams: false to guarantee
// reliable connectivity inside the sandboxed iframe preview environment.
const dbId = appletConfig.firestoreDatabaseId && appletConfig.firestoreDatabaseId !== "(default)"
  ? appletConfig.firestoreDatabaseId
  : undefined;

export const db = dbId
  ? initializeFirestore(app, {
      experimentalForceLongPolling: true,
      useFetchStreams: false,
    } as any, dbId)
  : initializeFirestore(app, {
      experimentalForceLongPolling: true,
      useFetchStreams: false,
    } as any);

export const storage = getStorage(app);
