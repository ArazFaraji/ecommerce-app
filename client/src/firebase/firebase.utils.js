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
    // Below line checks to see if snapSHot is FALSE(user does not have existing data in db). If FALSE then it creates a user in the DB with the specified fields of data.

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

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = firestore.collection(collectionKey);
    console.log(collectionRef);

    const batch = firestore.batch();
    objectsToAdd.forEach(obj => {
        const newDocRef = collectionRef.doc();
        // console.log(newDocRef)
        batch.set(newDocRef, obj);
    });

    return await batch.commit()
};

export const convertCollectionsSnapshotToMap = collections => {
    const transformedCollection = collections.docs.map(doc => {
        const { title, items } = doc.data();

        return {
            // encodeURI lets me pass it a string and it gives back a string where any characters that a URL cannot handle/process are converted into a version that the URL can read
            routeName: encodeURI(title.toLowerCase()),
            id: doc.id,
            title, 
            items
        };
    });
    console.log(transformedCollection);
    
    // I pass in initial object {}, goes through and sets the title of each collection as a key and they equal their respective collection object. 
    return transformedCollection.reduce((accumulator, collection) => {
        accumulator[collection.title.toLowerCase()] = collection;
        return accumulator;
    }, {});
};

export const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
        const unsubscribe = auth.onAuthStateChanged(userAuth => {
            unsubscribe();
            resolve(userAuth);
        }, reject)
    });
};


export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });  
// Above line always triggers Google pop up when we use this google auth provider for authemtication and sign-in
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

export default firebase;