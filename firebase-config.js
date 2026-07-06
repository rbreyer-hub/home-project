/*
  Home Project — Firebase config
  ─────────────────────────────────────────────────────────────────
  Reuses the same Firebase project as budget-planner-web.
  The authorized domain (rbreyer-hub.github.io) is already set.

  Firestore path: users/{uid}/homeProject/main

  IMPORTANT: The share link feature requires public reads on this path.
  Update your Firestore security rules to include:

    match /users/{userId}/homeProject/{doc} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.uid == userId;
    }

  The existing catch-all rule:
    match /users/{userId}/{document=**} { allow read, write: if request.auth.uid == userId; }
  will NOT cover public reads — you need the explicit rule above added.
  ─────────────────────────────────────────────────────────────────
*/

const firebaseConfig = {
  apiKey:            "AIzaSyDwagvEPiQDLre2k6rku_pkwyKcBOxBnwE",
  authDomain:        "budget-planner-fb.firebaseapp.com",
  projectId:         "budget-planner-fb",
  storageBucket:     "budget-planner-fb.firebasestorage.app",
  messagingSenderId: "682449918354",
  appId:             "1:682449918354:web:c132bcec3976ce1988094b"
};

firebase.initializeApp(firebaseConfig);
