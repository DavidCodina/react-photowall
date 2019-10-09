import * as firebase from 'firebase';

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyCCiheMWXi-iio38Tqg4oXGWTH3OSzv5DY",
  authDomain: "photowall-38074.firebaseapp.com",
  databaseURL: "https://photowall-38074.firebaseio.com",
  projectId: "photowall-38074",
  storageBucket: "",
  messagingSenderId: "380688214458",
  appId: "1:380688214458:web:926ae6b558ce60c86b1583"
};

firebase.initializeApp(firebaseConfig);

const database = firebase.database();


//database is imported into the action reducer files (e.g., photoActions)
export { database };
