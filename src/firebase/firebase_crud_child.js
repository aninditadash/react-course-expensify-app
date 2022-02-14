import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// import { getFirestore, collection, addDoc } from "firebase/firestore";
import {
  getDatabase,
  ref,
  set,
  update,
  remove,
  get,
  child,
  onValue,
  off,
  push,
  onChildRemoved,
  onChildChanged,
  onChildAdded
} from "firebase/database";

import expenses from "../../test/fixtures/expenses";

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSENGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID || ""
};

// Initialize Firebase
initializeApp(firebaseConfig);

const db = getDatabase();
// const dbRef = ref(db);
const expensesRef = ref(db, "expenses");

// // Adding a new node to the collection
// const postListRef = ref(db, "posts");
// const newPostRef = push(postListRef);
// set(newPostRef, {
//   title: "Second note",
//   body: "This is the second note"
// });

// // Updating a node in the collection based on id
// update(ref(db, "posts/-MvdgjybwUKoeGUdPMZ7"), {
//   body: "This is a brand updated new note"
// });

// // Removing a node from the collection based on id
// remove(ref(db, "posts/-MvdgjybwUKoeGUdPMZ7"));

// const postListRef = ref(db, "expenses");
// set(push(postListRef), expenses[0]);
// set(push(postListRef), expenses[1]);
// set(push(postListRef), expenses[2]);

get(expensesRef)
  .then((snapshot) => {
    const expenses = [];
    snapshot.forEach((childSnapshot) => {
      expenses.push({
        ...childSnapshot.val(),
        id: childSnapshot.key
      });
    });
    console.log("Expenses list::: ", expenses);
  })
  .catch((e) => console.log("Error fetching data:: ", e));

const onValueChange = (snapshot) => {
  const expenses = [];
  snapshot.forEach((childSnapshot) => {
    expenses.push({
      ...childSnapshot.val(),
      id: childSnapshot.key
    });
  });
  console.log("Subscribed expenses list::: ", expenses);
};
const onError = (e) => console.log("Error subscribing to database::: ", e);
onValue(expensesRef, onValueChange, onError);

// child_removed
onChildRemoved(expensesRef, (snapshot) => {
  console.log(snapshot.key, snapshot.val());
});

// child_changed
onChildChanged(expensesRef, (snapshot) => {
  console.log(snapshot.key, snapshot.val());
});

// child_added => will fire for all existing nodes and new ones
onChildAdded(expensesRef, (snapshot) => {
  console.log(snapshot.key, snapshot.val());
});

set(push(expensesRef), expenses[2]);
