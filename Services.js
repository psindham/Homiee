import * as firebase from 'firebase';

export default Services=>{
var  firebaseConfig = {
  apiKey: "AIzaSyCJkLnfyglXnAe64Y93kSjRz4dOhSxgbWk",
  authDomain: "homiee-afbd4.firebaseapp.com",
  databaseURL: "https://homiee-afbd4.firebaseio.com",
  projectId: "homiee-afbd4",
  storageBucket: "homiee-afbd4.appspot.com",
  messagingSenderId: "373427940224",
  appId: "1:373427940224:web:8657c1451f527312166f65",
  measurementId: "G-1ZFQHHFVYB"
  };
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
}

  