import { getDatabase, ref, set, onValue } from "firebase/database";
import { firebaseConfig } from "./firebaseconfig";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendEmailVerification,
} from "firebase/auth";

const app = initializeApp(firebaseConfig);
const db = getDatabase();
const auth = getAuth();

const handleUserError = (err) => {
  const { code, message } = err;
  console.warn(`An error occured: ${code}: ${message}`);
};

const handleRegister = async (email, password, loading) => {
  loading(true);
  try {
    await createUserWithEmailAndPassword(auth, email, password);
    sendEmailVerification(auth.currentUser);
    if (!auth.currentUser.emailVerified) {
      signOut(auth);
      window.alert("Email not veriefied!");
    }
  } catch (err) {
    handleUserError(err);
  }
  loading(false);
};

const handleLogin = async (email, password, loading, handleData, callback) => {
  loading(true);
  let user = null;
  try {
    user = await signInWithEmailAndPassword(auth, email, password);
    if (!auth.currentUser.emailVerified) {
      signOut(auth);
      window.alert("Email not veriefied!");
    } else {
      getFromFirebase(`results`, handleData);
      getFromFirebase(`patients`, handleData);
    }
  } catch (err) {
    handleUserError(err);
  }
  loading(false);
  callback(user.user);
};

const handleLogout = async (loading, callback) => {
  loading(true);
  try {
    await signOut(auth);
  } catch (err) {
    handleUserError(err);
  }
  loading(false);
  callback(null);
};

const save = async (results, handleData, reset) => {
  await postToFirebase(results, `results`);
  await getFromFirebase("results", handleData);
  await getFromFirebase("patients", handleData);
  reset();
};


const postToFirebase = async (dataToSave, dataType) => {
  try {
    await set(ref(db, `${auth.currentUser.uid}/${dataType}/${dataToSave.id}`), dataToSave);
  } catch (err) {
    console.warn(err);
  }
};
const getFromFirebase = async (dataType, succesCallback) => {
  try {
    const dataRef = await ref(db, `${auth.currentUser.uid}/${dataType}`);
    onValue(dataRef, (snapshot) => {
      const data = snapshot.val();
      data && succesCallback(data, dataType);
    });
  } catch (err) {
    console.warn(err);
  }
};

export { postToFirebase, save, handleLogin, handleLogout,  handleRegister};
