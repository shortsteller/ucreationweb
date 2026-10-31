/**
 * Firebase Configuration & Service Interface for Uditas Creations
 * 
 * Features supported:
 * 1. Authentication (Email/Password, Google OAuth)
 * 2. Firestore Database (Products, Categories, Orders, User Profiles, Reviews)
 * 
 * To connect your Firebase project:
 * Fill in your credentials in your `.env` file (see `.env.example`)
 */

// Firebase SDK credentials structure
export const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "YOUR_FIREBASE_API_KEY",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "uditas-creations.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "uditas-creations",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "uditas-creations.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "000000000000",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:000000000000:web:000000000000"
};

/**
 * Authentication Interface
 * Wire these directly to `firebase/auth` methods when you add `firebase` package.
 */
export const authService = {
  // Sign in with email and password
  async signIn(email, password) {
    console.log(`[Firebase Auth Service] signIn called for: ${email}`);
    // Ready for: return signInWithEmailAndPassword(auth, email, password);
    return { uid: 'uc-user-demo', email, displayName: email.split('@')[0] };
  },

  // Register new account
  async signUp(name, email, password) {
    console.log(`[Firebase Auth Service] signUp called for: ${email}`);
    // Ready for: return createUserWithEmailAndPassword(auth, email, password);
    return { uid: 'uc-user-demo', email, displayName: name };
  },

  // Sign in with Google Popup
  async signInWithGoogle() {
    console.log('[Firebase Auth Service] signInWithGoogle triggered');
    // Ready for: return signInWithPopup(auth, googleProvider);
    return { uid: 'uc-google-demo', email: 'user@gmail.com', displayName: 'Google User' };
  },

  // Sign out
  async signOut() {
    console.log('[Firebase Auth Service] signOut triggered');
    // Ready for: return signOut(auth);
  }
};

/**
 * Firestore Database Interface
 * Wire these directly to Firestore queries when ready.
 */
export const dbService = {
  // Fetch all products or filter by category
  async getProducts(category = null) {
    console.log(`[Firebase DB] Fetching products${category ? ' for category: ' + category : ''}`);
    // Ready for Firestore query: collection(db, 'products')
    return null;
  },

  // Fetch single product by document ID
  async getProductById(id) {
    console.log(`[Firebase DB] Fetching product details for ID: ${id}`);
    // Ready for: doc(db, 'products', id)
    return null;
  },

  // Create new customer order in Firestore
  async createOrder(orderPayload) {
    console.log('[Firebase DB] Creating new order document:', orderPayload);
    // Ready for: addDoc(collection(db, 'orders'), orderPayload)
    return { id: 'UC' + Date.now().toString().slice(-8), ...orderPayload, createdAt: new Date().toISOString() };
  },

  // Query order tracking status
  async trackOrder(orderId, phoneOrEmail) {
    console.log(`[Firebase DB] Tracking query for order #${orderId} with ${phoneOrEmail}`);
    // Ready for query: where('orderId', '==', orderId)
    return null;
  },

  // Add customer review
  async addReview(productId, reviewData) {
    console.log(`[Firebase DB] Adding review for product ${productId}:`, reviewData);
    // Ready for: addDoc(collection(db, 'products', productId, 'reviews'), reviewData)
    return { success: true };
  }
};

export default {
  firebaseConfig,
  authService,
  dbService
};
