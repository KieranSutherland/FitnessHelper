import * as firebaseImport from 'firebase';

const config = {
    apiKey: "AIzaSyAmnM_WdTEWbH2jhXX_jVIzW4BJNnTHdjQ",
    authDomain: "fitnesshelper-6cb4c.firebaseapp.com",
    databaseURL: "https://fitnesshelper-6cb4c.firebaseio.com",
    projectId: "fitnesshelper-6cb4c",
    storageBucket: "fitnesshelper-6cb4c.appspot.com",
    messagingSenderId: "417227960245"
  };

export const firebase = firebaseImport.initializeApp(config);
