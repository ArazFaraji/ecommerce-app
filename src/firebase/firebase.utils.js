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

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();
    
    // Below line checks to see if snapSHot is FALSE(user does not have existing data in our db). If FALSE then it creates a user in our DB with the specified fields of data.

    if(!snapShot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        // Try-Catch is a way to write ASYNC JS synchronously. 
        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        } catch (error) {
            console.log('error creating user', error.message)
        }
    }

    return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });  
// Above line always triggers Google pop up when we use this google auth provider for authemtication and sign-in
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;