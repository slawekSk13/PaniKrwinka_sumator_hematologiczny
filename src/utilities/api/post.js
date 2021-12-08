import { getDatabase, ref, set, onValue } from "firebase/database";

const postToFirebase = async (db, dataToSave, dataType, user) => {
  try {
    await set(ref(db, `${user.uid}/${dataType}/${dataToSave.id}`), dataToSave);
  } catch (err) {
    console.warn(err);
  }
};
const getFromFirebase = async (db, dataType, user, succesCallback) => {
  try {
    const dataRef = await ref(db, `${user.uid}/${dataType}`);
    onValue(dataRef, (snapshot) => {
      const data = snapshot.val();
      data && succesCallback(data, dataType);
    });
  } catch (err) {
    console.warn(err);
  }
};

export { postToFirebase, getFromFirebase };
