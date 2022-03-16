import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";

const config = {
  apiKey: "AIzaSyCMAeWvMhpDv15bJZOkeNpV_cAlZH_mVvY",
  authDomain: "crown-db-d5d2b.firebaseapp.com",
  projectId: "crown-db-d5d2b",
  storageBucket: "crown-db-d5d2b.appspot.com",
  messagingSenderId: "227209614974",
  appId: "1:227209614974:web:bf725f7d1e5631eacc6a2f",
  measurementId: "G-8DX6R66C8H",
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
