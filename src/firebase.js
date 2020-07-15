import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = firebase.initializeApp({
  apiKey: 'AIzaSyDJU-6rV3yR_rNzuQHZs1m3jLbgOTuehDE',
  authDomain: 'todoist-tut-7f172.firebaseapp.com',
  databaseURL: 'https://todoist-tut-7f172.firebaseio.com',
  projectId: 'todoist-tut-7f172',
  storageBucket: 'todoist-tut-7f172.appspot.com',
  messagingSenderId: '516787440803',
  appId: '1:516787440803:web:ed708b5e6c920a56',
});

export { firebaseConfig as firebase };
