import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';
import {defineConfig} from 'vite';

// Load env variables into process.env
dotenv.config();

export default defineConfig(() => {
  // Load local firebase-applet-config.json to get active project secrets & db id
  let appletConfig: any = {};
  try {
    const configPath = path.resolve(process.cwd(), 'firebase-applet-config.json');
    if (fs.existsSync(configPath)) {
      appletConfig = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
    }
  } catch (err) {
    console.error('Failed to read firebase-applet-config.json:', err);
  }

  const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY || appletConfig.apiKey || "AIzaSyCOdoNdHmI5XO5Dtj6Q5qbJjgPAtbfqVdQ";
  const authDomain = process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || appletConfig.authDomain || "starry-precinct-bbwbv.firebaseapp.com";
  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || appletConfig.projectId || "starry-precinct-bbwbv";
  const storageBucket = process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || appletConfig.storageBucket || "starry-precinct-bbwbv.firebasestorage.app";
  const messagingSenderId = process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || appletConfig.messagingSenderId || "579011647509";
  const appId = process.env.NEXT_PUBLIC_FIREBASE_APP_ID || appletConfig.appId || "1:579011647509:web:889151d9ce15a51a0d161c";
  const dbId = process.env.NEXT_PUBLIC_FIREBASE_DB_ID || appletConfig.firestoreDatabaseId || "ai-studio-businessintellig-e3b9a5f8-70b3-4909-870f-8b23d59baebc";

  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    define: {
      'process.env.NEXT_PUBLIC_FIREBASE_API_KEY': JSON.stringify(apiKey),
      'process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN': JSON.stringify(authDomain),
      'process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID': JSON.stringify(projectId),
      'process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET': JSON.stringify(storageBucket),
      'process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID': JSON.stringify(messagingSenderId),
      'process.env.NEXT_PUBLIC_FIREBASE_APP_ID': JSON.stringify(appId),
      'process.env.NEXT_PUBLIC_FIREBASE_DB_ID': JSON.stringify(dbId),
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
