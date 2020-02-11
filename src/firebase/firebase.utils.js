import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyDeWj39SSgGoYmDltaHlafQgGvUdabzyIg",
    authDomain: "ecommerce-db-a86e5.firebaseapp.com",
    databaseURL: "https://ecommerce-db-a86e5.firebaseio.com",
    projectId: "ecommerce-db-a86e5",
    storageBucket: "ecommerce-db-a86e5.appspot.com",
    messagingSenderId: "654489965020",
    appId: "1:654489965020:web:bbcf4c8bf26748d0ee7f19",
    measurementId: "G-49KKH4EZSP"
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });  
// Above line always triggers Google pop up when we use this google auth provider for authemtication and sign-in
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;