import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./firebaseconfig";
import { getDatabase, ref, set, get, child } from "firebase/database";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendEmailVerification,
  sendPasswordResetEmail,
} from "firebase/auth";

initializeApp(firebaseConfig);
const db = getDatabase();
const auth = getAuth();

const handleUserError = (err) => {
  const errorToReturn = {code: err.code, error: true}
    return errorToReturn;
};

const handleRegister = async (email, password) => {
  try {
    await createUserWithEmailAndPassword(auth, email, password);
    sendEmailVerification(auth.currentUser);
      signOut(auth);
      return {code: 'email-unverified', error: false}
  } catch (err) {
    return handleUserError(err);
  }
};

const handleLogin = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    const user = auth.currentUser;
    if (!auth.currentUser.emailVerified) {
      signOut(auth);
      return {code: 'email-unverified', error: true}
    } else {
      return user;
    }
  } catch (err) {
    return handleUserError(err);
  }
};

const handleLogout = async () => {
  try {
    await signOut(auth);
    return true;
  } catch (err) {
    return handleUserError(err);
  }
};

const handleResetPassword = async (email) => {
  try {
    sendPasswordResetEmail(auth, email);
  } catch (err) {
    return handleUserError(err);
  }
};

const refreshData = async () => {
  try {
    const pastResults = await getFromFirebase("results");
    const pastPatients = await getFromFirebase("patients");
    return { pastResults, pastPatients };
  } catch (err) {
    return handleUserError(err);
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
    return handleUserError(err);
  }
};

const getFromFirebase = async (dataType, cb) => {
  try {
    const dataRef = ref(db);
    return get(child(dataRef, `${auth.currentUser.uid}/${dataType}`)).then(
      (snapshot) => {
        if (snapshot) {
          return snapshot.val();
        } else return [];
      }
    );
  } catch (err) {
    return handleUserError(err);
  }
};

export {
  postToFirebase,
  handleLogin,
  handleLogout,
  handleRegister,
  refreshData,
  handleResetPassword,
  getFromFirebase,
};
