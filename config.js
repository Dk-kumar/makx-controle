
import firebase from 'firebase/compat/app'
import { getDatabase } from 'firebase/database'


const firebaseConfig = {
  apiKey: "AIzaSyAPthHYQzMHn_dZhreF4b-20eiaudQVWsY",
  authDomain: "makx-control.firebaseapp.com",
  projectId: "makx-control",
  storageBucket: "makx-control.appspot.com",
  messagingSenderId: "669172052121",
  appId: "1:669172052121:web:15960c0b72e3a2be694808",
  measurementId: "G-010300BWCZ"
};

// Initialize Firebase
if(firebase.apps.length === 0) {
   firebase.initializeApp(firebaseConfig);
}

const db = getDatabase()

export {db}
