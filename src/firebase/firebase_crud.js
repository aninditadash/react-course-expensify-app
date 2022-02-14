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
  off
} from "firebase/database";

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
const dbRef = ref(db);

// Created new record
set(dbRef, {
  name: "Andrew",
  age: 30,
  isEmployed: true,
  location: {
    city: "Philadelphia",
    country: "United States"
  }
})
  .then(() => {
    console.log("Data saved!!");
  })
  .catch((e) => {
    console.log("Error:: ", e);
  });

// Subscribing to database, so will be called whenever data changes
const onValueChange = (snapshot) => {
  const val = snapshot.val();
  console.log("onValue Snapshot value:: ", val);
};
const onError = (e) => console.log("Error subscribing to database::: ", e);
const subscribe = onValue(dbRef, onValueChange, onError);

// Updating existing record using set
set(ref(db, "age"), 30);
set(ref(db, "location/city"), "Boston");

// Remove existing record using remove
remove(ref(db, "age"))
  .then(() => console.log("Data removed"))
  .catch((error) => console.log("Error when remove: " + error));

// Remove existing record using set
set(ref(db, "attributes"), null);

// Added removed items to the record using update
update(ref(db), {
  age: 30
});
update(ref(db), {
  attributes: {
    height: 30,
    weight: 40
  }
});

// Update existing record using update, also deleting an item by assigning null to it
// Also we can add new items
update(ref(db), {
  name: "Mike",
  job: {
    title: "Software Engineer",
    company: "Google"
  },
  isEmployed: null
});

update(ref(db), {
  "job/company": "Amazon",
  "location/city": "Seattle"
});

// Fetching data from the Firebase manually
get(dbRef)
  .then((snapshot) => {
    const val = snapshot.val();
    console.log("Value:: ", val);
  })
  .catch((e) => console.log("Error fetching data:: ", e));

// Fetching data from the Firebase using a ref name manually
get(child(dbRef, "location/city"))
  .then((snapshot) => {
    const val = snapshot.val();
    console.log("Value:: ", val);
  })
  .catch((e) => console.log("Error fetching data:: ", e));

// Unsubscribe to the database
setTimeout(() => {
  update(ref(db), {
    age: 40
  });
}, 3500);

setTimeout(() => {
  // Unsubscribing all reference
  // off(dbRef);

  // Unsubscribing a single reference
  subscribe();
}, 7000);

setTimeout(() => {
  update(ref(db), {
    age: 30
  });
}, 10500);
