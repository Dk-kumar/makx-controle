
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyDewphss3NQ841rDIkacg2kXgITzInJN2A",
  authDomain: "maxcontroller-6b85d.firebaseapp.com",
  databaseURL: "https://maxcontroller-6b85d-default-rtdb.firebaseio.com",
  projectId: "maxcontroller-6b85d",
  storageBucket: "maxcontroller-6b85d.appspot.com",
  messagingSenderId: "1052020300473",
  appId: "1:1052020300473:web:28ace2f20b8f73a9ce1968",
  measurementId: "G-NJYYHDFMCT"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);


export { database };
