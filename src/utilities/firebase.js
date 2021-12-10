import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./firebaseconfig";
import { getDatabase, ref, set, onValue } from "firebase/database";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendEmailVerification,
} from "firebase/auth";

initializeApp(firebaseConfig);
const db = getDatabase();
const auth = getAuth();

const handleUserError = (err) => {
  const { code, message } = err;
  console.warn(`An error occured: ${code}: ${message}`);
};

const handleRegister = async (email, password) => {
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
};

const handleLogin = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    const user = auth.currentUser;
    if (!auth.currentUser.emailVerified) {
      signOut(auth);
      window.alert("Email not veriefied!");
    } else {
      return user;
    }
  } catch (err) {
    handleUserError(err);
  }
};

const handleLogout = async () => {
  try {
    await signOut(auth);
    return null;
  } catch (err) {
    handleUserError(err);
  }
};

const refreshData = async (setPatients, setResults) => {
  try {
    await getFromFirebase("results", setResults);
    await getFromFirebase("patients", setPatients);
  } catch (err) {
    handleUserError(err);
  }
};

const postToFirebase = async (dataToSave, dataType) => {
  try {
    await set(
      ref(db, `${auth.currentUser.uid}/${dataType}/${dataToSave.id}`),
      dataToSave
    );
    return true;
  } catch (err) {
    handleUserError(err);
  }
};

const getFromFirebase = async (dataType, cb) => {
  try {
    const dataRef = await ref(db, `${auth.currentUser.uid}/${dataType}`);
    onValue(dataRef, (snapshot) => {
      const data = snapshot.val();
      const dataValues = data ? Object.values(data) : false;
      //how to return from here?
      dataValues ? cb(dataValues) : cb([]);
    });
  } catch (err) {
    handleUserError(err);
  }
};

export {
  postToFirebase,
  handleLogin,
  handleLogout,
  handleRegister,
  refreshData,
};
