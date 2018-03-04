import * as firebase from 'firebase';

const config = {
    apiKey: "AIzaSyAmnM_WdTEWbH2jhXX_jVIzW4BJNnTHdjQ",
    authDomain: "fitnesshelper-6cb4c.firebaseapp.com",
    databaseURL: "https://fitnesshelper-6cb4c.firebaseio.com",
    projectId: "fitnesshelper-6cb4c",
    storageBucket: "",
    messagingSenderId: "417227960245"
  };

export const firebaseApp = firebase.initializeApp(config);
