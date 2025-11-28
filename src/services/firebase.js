import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getEnvConfig } from './env.js';

const { firebaseConfig, appId, authToken } = getEnvConfig();

const hasFirebaseConfig =
  Boolean(firebaseConfig?.apiKey) && Boolean(firebaseConfig?.projectId) && Boolean(firebaseConfig?.authDomain);

let app = null;
let auth = null;
let db = null;

if (hasFirebaseConfig) {
  try {
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    db = getFirestore(app);
  } catch (error) {
    console.warn('Firebase initialization failed; falling back to local mode.', error);
  }
} else {
  console.warn('Firebase config missing; running in local-only mode.');
}

const isFirebaseEnabled = Boolean(app && auth && db);

export { app, appId, auth, authToken, db, isFirebaseEnabled };
