// db.js
import { doc, setDoc, getDoc, collection, addDoc, query, getDocs, where } from "firebase/firestore";
import { db } from "../FireBaseConfig/fireBaseConfig"; 

// Lưu khóa công khai vào firestore
export const savePublicKey = async (email, publicKey) => {
  try {
    await setDoc(doc(db, "users", email), {
      publicKey: publicKey
    });
    alert("Public key saved successfully!");
  } catch (error) {
    alert("Error saving public key: ", error);
    throw new Error("Unable to save public key");
  }
};

// Gửi khóa công khai từ tài khoản email đến tài khoản email
export const sendPublicKey = async (toEmail, fromEmail, publicKey) => {
  try {
    await addDoc(collection(db, "publicKeys"), {
      to: toEmail,
      from: fromEmail,
      publicKey: publicKey,
      timestamp: new Date()
    });
    alert("Public key sent!");
  } catch (error) {
    console.error("Error sending public key: ", error);
  }
};

//Get khóa công khai

export const getPublicKey = async (email) => {
  const docRef = doc(db, "users", email);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data().publicKey;
  } else {
    throw new Error("No such user!");
  }
};

// 
export const getPublicKeysForUser = async (email) => {
  try {
    const q = query(collection(db, "publicKeys"), where("to", "==", email));
    const querySnapshot = await getDocs(q);
    const publicKeys = [];
    querySnapshot.forEach((doc) => {
      publicKeys.push({ id: doc.id, ...doc.data() });
    });
    return publicKeys;
  } catch (error) {
    console.error("Error getting public keys for user: ", error);
    throw new Error("Unable to get public keys for user");
  }
};

export const sendEncryptedMessage = async (toEmail, fromEmail, encryptedMessage) => {
  try {
    await addDoc(collection(db, "messages"), {
      to: toEmail,
      from: fromEmail,
      message: encryptedMessage,
      timestamp: new Date()
    });
    console.log("Encrypted message sent successfully!");
  } catch (error) {
    console.error("Error sending encrypted message: ", error);
    throw new Error("Unable to send encrypted message");
  }
};

//Hàm để lấy tin nhắn đã mã hóa từ Firestore
export const getEncryptedMessages = async (email) => {
  try {
    const q = query(collection(db, "messages"), where("to", "==", email));
    const querySnapshot = await getDocs(q);
    const messages = [];
    querySnapshot.forEach((doc) => {
      messages.push({ id: doc.id, ...doc.data() });
    });
    return messages;
  } catch (error) {
    console.error("Error getting encrypted messages: ", error);
    throw new Error("Unable to get encrypted messages");
  }
};

  
