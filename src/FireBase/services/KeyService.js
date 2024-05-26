// keyService.js
import { firestore, auth } from "../FireBase/firebaseConfig";

export const saveKeys = (publicKey) => {
  const user = auth.currentUser;
  if (user) {
    const userRef = firestore.collection('users').doc(user.uid);
    return userRef.set({
      publicKey
    });
  }
  return Promise.reject('No user logged in');
};

export const getPublicKey = (userId) => {
  const userRef = firestore.collection('users').doc(userId);
  return userRef.get().then(doc => doc.data().publicKey);
};
