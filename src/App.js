import React, { useEffect, useState } from "react";
import { HashRouter, Route, Switch, Redirect, Link } from "react-router-dom";

import { Header } from "./components/Header/Header";
import { Loading } from "./components/Loading/Loading";
import { Icon } from "./components/Icon/Icon";

import { AddNewPatient } from "./views/AddNewPatient";
import { Leukogram } from "./views/Leukogram";
import { Results } from "./views/Results";
import { NewOrHistory } from "./views/NewOrHistory";
import { HistoricalResults } from "./views/HistoricalResults";
import { Start } from "./views/Start";
import { Login } from "./views/Login";
import { Register } from "./views/Register";

import { patientZero, resultsZero } from "./utilities/defaultStates";

import { postToFirebase, save, handleLogin, handleLogout,  handleRegister } from "./utilities/firebase";

function App() {
  const [user, setUser] = useState(null);
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
  const [historicalResults, setHistoricalResults] = useState([]);
  const [historicalPatients, setHistoricalPatients] = useState([]);
  const [regEx, setRegEx] = useState(null);
  const [resultsToShowArray, setResultsToShowArray] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleRegEx = (pattern) => {
    pattern === ""
      ? setRegEx(null)
      : setRegEx(new RegExp(`.{0,}${pattern}.{0,}`, "gi"));
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
    setResultsToShowArray([]);
  };

  const handleCalcFinish = () => {
    setCalcFinished(true);
  };

  const confirmPatient = async (patientToSave, matchingPatient) => {
    if (matchingPatient.length === 0) {
      setPatient(patientToSave);
      await postToFirebase(patientToSave, `patients`);
    } else {
      setPatient(matchingPatient[0]);
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
          {user?.emailVerified ? (
            <NewOrHistory
              showHistoricalResults={showHistoricalResults}
              handleRegEx={handleRegEx}
              handleResultsToShowArray={handleResultsToShowArray}
              handleLogout={handleLogout}
              callback={setUser}
              loading={setLoading}
            />
          ) : loading ? (
            <Loading />
          ) : (
            <Start />
          )}
        </Route>
        <Route exact path="/login">
          <Login handleLogin={handleLogin} 
              callback={setUser}
              loading={setLoading} handleData={handleData}/>
        </Route>
        <Route exact path="/register">
          <Register handleRegister={handleRegister} loading={setLoading}/>
        </Route>
        <Route path="/history">
          {resultsToShowArray ? (
            <HistoricalResults
              resultsToShowArray={resultsToShowArray}
              sum={sum}
              save={save}
              reset={reset}
              handleData={handleData}
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
              handleData={handleData}
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
