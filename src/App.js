import React, { useEffect, useState } from "react";
import { HashRouter, Route, Switch, Redirect, Link } from "react-router-dom";
import { Header } from "./components/Header/Header";
import { AddNewPatient } from "./views/AddNewPatient";
import { Leukogram } from "./views/Leukogram";
import { Results } from "./views/Results";
import { Icon } from "./components/Icon/Icon";
import { getFromAPI } from "./utilities/api/get";
import { getFromFirebase, postToFirebase } from "./utilities/api/post";
import { patientZero, resultsZero } from "./utilities/defaultStates";
import { NewOrHistory } from "./views/NewOrHistory";
import { HistoricalResults } from "./views/HistoricalResults";
import { Start } from "./views/Start";
import { Login } from "./views/Login";
import { firebaseConfig } from "./utilities/firebaseconfig";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";
import { setCookie, getCookie, deleteCookie } from "./utilities/cookies";
import { Register } from "./views/Register";

function App() {
  const [activeUser, setActiveUser] = useState({});
  const [patient, setPatient] = useState({
    ...patientZero,
    id: new Date().valueOf(),
  });
  const [progress, setProgress] = useState(0);
  const [results, setResults] = useState({
    ...resultsZero,
    id: new Date().valueOf(),
  });
  const [calcFinished, setCalcFinished] = useState(false);
  const [historicalResults, setHistoricalResults] = useState();
  const [historicalPatients, setHistoricalPatients] = useState([]);
  const [regEx, setRegEx] = useState();
  const [resultsToShowArray, setResultsToShowArray] = useState();

  const app = initializeApp(firebaseConfig);
  const db = getDatabase();
  const auth = getAuth();
  const handleUserError = (err) => {
    const { code, message } = err;
    console.warn(`An error occured: ${code}: ${message}`);
  };
  const handleUserSucces = (userCredential) => {
    const user = userCredential.user;
    auth.currentUser.getIdToken().then((idToken) => {
      setActiveUser({ uid: user.uid, email: user.email, idToken: idToken });
    });
    setCookie("activeUserEmail", user.email, 60 * 60);
    setCookie("activeUserUid", user.uid, 60 * 60);
  };
  const handleRegister = (email, password) =>
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        handleUserSucces(userCredential);
      })
      .catch((err) => {
        handleUserError(err);
      });

  const handleLogin = (email, password) =>
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        handleUserSucces(userCredential);
      })

      .catch((err) => {
        handleUserError(err);
      });
  const handleLogOut = () => {
      signOut(auth);
    setActiveUser(false);
    deleteCookie("activeUserEmail");
    deleteCookie("activeUserUid");
  };

  const handleRegEx = (pattern) => {
    pattern === ""
      ? setRegEx()
      : setRegEx(new RegExp(`.{0,}${pattern}.{0,}`, "gi"));
  };

  const confirmPatient = async (patientToSave, matchingPatient) => {
    if (matchingPatient.length === 0) {
      setPatient(patientToSave);
      await postToFirebase(db, patientToSave, `patients`, auth.currentUser);
    } else {
      setPatient(matchingPatient[0]);
    }
  };

  const sum = (a, b) => a + b;

  const handleAddCell = (key, value) => {
    if (key === "wbc") {
      const corrWbc =
        results.leukogram.nrbc < 5
          ? value
          : progress < 100
          ? "b.d."
          : ((value * 100) / (100 + results.leukogram.nrbc)).toFixed(2);
      setResults((prevState) => ({
        ...prevState,
        leukogram: {
          ...prevState.leukogram,
          wbc: {
            nominal: value,
            corrected: corrWbc,
          },
        },
      }));
    } else {
      navigator.vibrate(100);
      if (key === "nrbc") {
        setResults((prevState) => ({
          ...prevState,
          leukogram: {
            ...prevState.leukogram,
            nrbc: prevState.leukogram.nrbc + 1,
          },
        }));
      } else {
        setResults((prevState) => {
          return {
            ...prevState,
            leukogram: {
              ...prevState.leukogram,
              relative: {
                ...prevState.leukogram.relative,
                [key]: prevState.leukogram.relative[key] + 1,
              },
            },
          };
        });
      }
      setCalcFinished(false);
    }

    progress >= 99 && setCalcFinished(true);
  };

  const handleData = (data, path) => {
    path === "results"
      ? setHistoricalResults(Object.values(data))
      : setHistoricalPatients(Object.values(data));
  };

  useEffect(() => {
    setProgress(Object.values(results.leukogram.relative).reduce(sum));
  }, [results]);

  useEffect(() => {
    getFromFirebase(db, `results`, auth.currentUser, handleData);
    getFromFirebase(db, `patients`, auth.currentUser, handleData);
  }, [activeUser]);

  useEffect(() => {
    setResults((prevState) => ({
      ...prevState,
      patientId: patient.id,
    }));
  }, [patient]);

  const reset = () => {
    setPatient({ ...patientZero, id: new Date().valueOf() });
    setProgress(0);
    setResults({ ...resultsZero, id: new Date().valueOf() });
    setCalcFinished(false);
    setResultsToShowArray();
  };

  const handleCalcFinish = () => {
    setCalcFinished(true);
  };

  const save = async (saveType) => {
    if (saveType === "results") {
      await postToFirebase(db, results, `results`, auth.currentUser);
      await getFromFirebase(db, "results", auth.currentUser, handleData);
      await getFromFirebase(db, "patients", auth.currentUser, handleData);
    }
  };

  const findMatchingPatients = () => {
    if (historicalPatients) {
      const checkMatch = (el) => {
        if (
          el.patName.match(regEx) ||
          el.patOwnerName.match(regEx) ||
          el.patOwnerLname.match(regEx)
        ) {
          return el;
        }
      };
      return historicalPatients.filter(checkMatch);
    }
  };

  const showHistoricalResults = () => {
    const matchingPatients = findMatchingPatients();
    if (historicalResults) {
      let matchingResults = [];
      matchingPatients.forEach((matchingPatient) => {
        const resultsToAdd = historicalResults.filter(
          (historicalResult) =>
            historicalResult.patientId === matchingPatient.id
        );
        const resulultsWithPatient = resultsToAdd.map((result) => ({
          ...result,
          patient: { ...matchingPatient },
        }));
        matchingResults = [...matchingResults, ...resulultsWithPatient];
      });
      return matchingResults;
    }
  };

  const handleResultsToShowArray = (patientId) => {
    setResultsToShowArray(
      showHistoricalResults().filter(
        (element) => element.patientId === patientId
      )
    );
  };

  return (
    <HashRouter>
      <Header />
      {(patient.patName !== "" || resultsToShowArray) && (
        <Link to="/">
          <Icon icon="exit" onClick={reset} />
        </Link>
      )}
      <Switch>
        <Route exact path="/">
          {activeUser.uid ? (
            <NewOrHistory
              showHistoricalResults={showHistoricalResults}
              handleRegEx={handleRegEx}
              handleResultsToShowArray={handleResultsToShowArray}
            />
          ) : (
            <Start />
          )}
        </Route>
        <Route exact path="/login">
          <Login handleLogin={handleLogin} />
        </Route>
        <Route exact path="/register">
          <Register handleRegister={handleRegister} />
        </Route>
        <Route path="/history">
          {resultsToShowArray ? (
            <HistoricalResults
              resultsToShowArray={resultsToShowArray}
              sum={sum}
              save={save}
              history={resultsToShowArray}
            />
          ) : (
            <Redirect to="/" />
          )}
        </Route>
        <Route path="/addnewpatient">
          <AddNewPatient
            confirmPatient={confirmPatient}
            patient={patient}
            historicalPatients={historicalPatients}
          />
        </Route>
        <Route path="/leukogram">
          {patient.patName !== "" ? (
            <Leukogram
              patient={patient}
              progress={progress}
              handleAddCell={handleAddCell}
              results={results}
              reset={reset}
              handleCalcFinish={handleCalcFinish}
              calcFinished={calcFinished}
            />
          ) : (
            <Redirect to="/" />
          )}
        </Route>
        <Route path="/results">
          {results.leukogram.wbc.nominal !== 0 ? (
            <Results
              results={results}
              patient={patient}
              save={save}
              reset={reset}
              progress={progress}
              calcFinished={calcFinished}
              history={resultsToShowArray}
            />
          ) : (
            <Redirect to="/leukogram" />
          )}
        </Route>
        <Route>
          <Redirect to="/results" />
        </Route>
      </Switch>
    </HashRouter>
  );
}

export default App;
