import React, { useEffect, useState } from "react";
import { Router } from "./Router";

import { patientZero, resultsZero } from "./utilities/defaultStates";
import {
  sum,
  handleAddCellWBC,
  handleAddCellNRBC,
  handleAddCellLeuko,
} from "./utilities/helpers";

import {
  postToFirebase,
  handleLogin,
  handleLogout,
  handleRegister,
  refreshData,
} from "./utilities/firebase";

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

  const onRegister = (email, password) => {
    setLoading(true);
    handleRegister(email, password);
    setLoading(false);
  };

  const onLogin = async (email, password) => {
    setLoading(true);
    setUser(await handleLogin(email, password));
    fetchData();
    setLoading(false);
  };

  const onLogout = async () => {
    setLoading(true);
    setUser(handleLogout);
    reset();
    setLoading(false);
  };

  const save = async () => {
    await postToFirebase(results, `results`);
    await fetchData();
    reset();
  };

  const handleAddCell = (key, value) => {
    if (key === "wbc") {
      setResults((prevState) => handleAddCellWBC(prevState, value, progress));
    } else {
      navigator.vibrate(100);
      key === "nrbc"
        ? setResults((prevState) => handleAddCellNRBC(prevState))
        : setResults((prevState) => handleAddCellLeuko(prevState, key));
      setCalcFinished(false);
    }
    progress >= 99 && setCalcFinished(true);
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

  const fetchData = async () => {
    try {
      await refreshData(setHistoricalPatients, setHistoricalResults);
    } catch (err) {
      console.warn(err);
    }
  };

  // useEffect(() => fetchData, [user]);

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

  const handleResultsToShowArray = (patientId, resultsToCheck) => {
    setResultsToShowArray(
      resultsToCheck.filter((el) => el.patientId === patientId)
    );
  };

  return (
    <Router
      patient={patient}
      resultsToShowArray={resultsToShowArray}
      user={user}
      handleRegEx={handleRegEx}
      handleResultsToShowArray={handleResultsToShowArray}
      onLogout={onLogout}
      historicalPatients={historicalPatients}
      historicalResults={historicalResults}
      regEx={regEx}
      loading={loading}
      onLogin={onLogin}
      handleRegister={handleRegister}
      confirmPatient={confirmPatient}
      progress={progress}
      handleAddCell={handleAddCell}
      results={results}
      handleCalcFinish={handleCalcFinish}
      calcFinished={calcFinished}
      save={save}
      reset={reset}
    />
  );
}

export default App;
