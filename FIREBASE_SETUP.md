# Firebase Setup: Google Sign-In + Cross-Device Progress Sync

By default, Star Command saves your progress in your browser on one device. If you
want your progress to follow you across devices (phone, laptop, etc.), connect the
game to **Firebase** -- Google's free backend platform. This adds a "Sign in with
Google" landing page and syncs each player's progress to their Google account.

**You set this up once, as the owner.** Anyone who opens your link then just signs
in with their own Google account -- they do not need a Firebase project of their
own. Your Firebase config is a public pointer to your database, not a secret; it is
meant to ship inside the app.

If you skip this entirely, the game still works perfectly in local-only mode.

---

## Step 1 -- Create a Firebase project

1. Go to https://console.firebase.google.com and sign in with your Google account.
2. Click **Add project**, give it a name (e.g. `star-command`), and create it.
   (You can disable Google Analytics -- it is not needed.)

## Step 2 -- Register a Web app and copy the config

1. In your project, click the **web icon** ( `</>` ) labeled "Add app".
2. Give it a nickname (e.g. `Star Command`) and click **Register app**.
   (You do NOT need Firebase Hosting -- you are using GitHub Pages.)
3. Firebase shows a `firebaseConfig` object with values like `apiKey`,
   `authDomain`, `projectId`, etc. Keep this page open -- you will copy these.

## Step 3 -- Paste the config into firebase-config.js

Open `firebase-config.js` in your repo and replace the placeholder values with the
ones from Firebase. It should end up looking like this (with YOUR real values):

```
window.FIREBASE_CONFIG = {
  apiKey: "AIzaSy...your-real-key...",
  authDomain: "star-command-1234.firebaseapp.com",
  projectId: "star-command-1234",
  storageBucket: "star-command-1234.appspot.com",
  messagingSenderId: "1234567890",
  appId: "1:1234567890:web:abcdef123456"
};
```

As long as the `apiKey` and `projectId` are real (not the `YOUR_...` placeholders),
the game switches on the sign-in landing page automatically.

## Step 4 -- Enable Google sign-in

1. In the Firebase console: **Build > Authentication**.
2. Click **Get started** (if prompted).
3. Open the **Sign-in method** tab.
4. Click **Google**, toggle it **Enable**, pick a support email, and **Save**.

## Step 5 -- Create the Firestore database

1. In the console: **Build > Firestore Database**.
2. Click **Create database**.
3. Choose a location close to you and start in **production mode** (the rule below
   will secure it), then finish.

## Step 6 -- Add the security rule

So each player can only read and write their OWN progress:

1. In **Firestore Database**, open the **Rules** tab.
2. Replace the contents with:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /starCommandProgress/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

3. Click **Publish**.

## Step 7 -- Authorize your domains

Firebase only allows sign-in from domains you approve.

1. In the console: **Authentication > Settings > Authorized domains**.
2. Click **Add domain** and add your GitHub Pages domain, for example:
   `YOUR-USERNAME.github.io`
3. `localhost` is already authorized, so local testing works out of the box.

---

## Step 8 -- Deploy and test

1. Commit and push `firebase-config.js` (with your real values) to your repo.
2. Open your GitHub Pages URL. You should now see the **Sign in with Google**
   landing page.
3. Sign in, play a bit, then sign in on another device -- your progress follows you.

The first time you sign in, any progress you already made locally on that device is
**merged upward** into your account (kept, not overwritten).

---

## Optional -- restrict who can sign in

If you want only specific people (e.g. just you and your family) to be able to sign
in, you can tighten the Firestore rule to allow only certain UIDs, or use Firebase
Authentication's controls to limit sign-ups. Ask and this can be added.

---

## Troubleshooting

- **Still shows the game with no sign-in page:** your `firebase-config.js` still has
  `YOUR_...` placeholders, or the file was not pushed. Confirm real values are live.
- **"auth/unauthorized-domain" error:** add your exact GitHub Pages domain under
  Authentication > Settings > Authorized domains (Step 7).
- **Sign-in popup blocked:** allow popups for your site, or try again -- the app
  shows a friendly retry message.
- **Progress not syncing:** confirm Firestore is created (Step 5) and the security
  rule is published (Step 6). Check the browser console (F12) for errors.

## Cost

Firebase's free **Spark** tier is far more than a personal training game will use
(tens of thousands of reads/writes per day). You are extremely unlikely to ever pay
anything for this use case.
