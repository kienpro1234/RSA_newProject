import firebase from "firebase/app";
import "firebase/firestore";
import { firestore, auth } from "../FireBase/firebaseConfig";

export const sendMessage = (receiverId, encryptedMessage) => {
  const senderId = auth.currentUser.uid;
  const messagesRef = firestore.collection("messages");
  return messagesRef.add({
    senderId,
    receiverId,
    encryptedMessage,
    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
  });
};

export const getMessages = (callback) => {
  const userId = auth.currentUser.uid;
  return firestore
    .collection("messages")
    .where("receiverId", "==", userId)
    .orderBy("timestamp", "desc")
    .onSnapshot((snapshot) => {
      const messages = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      callback(messages);
    });
};
