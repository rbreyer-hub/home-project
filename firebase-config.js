// Firebase config — fill in with your Firebase project credentials
// You can reuse the same Firebase project as the debt/budget planners
const firebaseConfig = {
  apiKey:            "YOUR_API_KEY",
  authDomain:        "YOUR_PROJECT.firebaseapp.com",
  projectId:         "YOUR_PROJECT_ID",
  storageBucket:     "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId:             "YOUR_APP_ID"
};

firebase.initializeApp(firebaseConfig);

// Firestore security rules needed:
// rules_version = '2';
// service cloud.firestore {
//   match /databases/{database}/documents {
//     match /users/{userId}/homeProject/{doc} {
//       allow read: if true;                              // public read for share links
//       allow write: if request.auth != null && request.auth.uid == userId;
//     }
//   }
// }
