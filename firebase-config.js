/* =====================================================================
   STAR COMMAND -- Firebase configuration (for Google sign-in + sync)
   ---------------------------------------------------------------------
   Fill in the values below with YOUR Firebase project's web config to
   enable "Sign in with Google" and cross-device progress saving.

   HOW TO GET THESE VALUES (one-time, free):
     1. Go to https://console.firebase.google.com and create a project.
     2. In the project, click the web icon ( </> ) to "Add app", give it a
        nickname (e.g. Star Command), and register it.
     3. Firebase shows you a firebaseConfig object -- copy its values here.
     4. In the console: Build > Authentication > Sign-in method >
        enable "Google".
     5. In the console: Build > Firestore Database > Create database
        (Start in production mode is fine).
     6. In Authentication > Settings > Authorized domains, add your
        GitHub Pages domain (for example: yourname.github.io).

   If you leave the "YOUR_..." placeholders below, the game simply runs
   in local-only mode (progress saved on this device only) -- nothing
   breaks, you just do not get cross-device sync.
   ===================================================================== */
window.FIREBASE_CONFIG = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

/* Recommended Firestore security rule so each user can only read/write
   their OWN progress document (paste in Firestore > Rules):

   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /starCommandProgress/{userId} {
         allow read, write: if request.auth != null && request.auth.uid == userId;
       }
     }
   }
*/
