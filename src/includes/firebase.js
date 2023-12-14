import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCiXKCJxl9S4dhMVYZ0uJNz7oapL9yWpI8',
  authDomain: 'music-8d2fb.firebaseapp.com',
  projectId: 'music-8d2fb',
  storageBucket: 'music-8d2fb.appspot.com',
  // messagingSenderId: '591616655167',
  appId: '1:591616655167:web:70604522842056bfc09d8a',
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();

const usersCollection = db.collection('users');

export { auth, db, usersCollection };
