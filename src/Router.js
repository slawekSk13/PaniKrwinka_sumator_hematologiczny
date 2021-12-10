import React from "react";
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

const Router = ({patient, resultsToShowArray, user, handleRegEx, handleResultsToShowArray, onLogout,
historicalPatients, historicalResults, regEx, loading, onLogin, handleRegister, confirmPatient,
progress, handleAddCell, results, handleCalcFinish, calcFinished, save, reset}) => {
    return (
        <HashRouter>
      <Header />
      {(patient.patName !== "" || resultsToShowArray.length > 0) && (
        <Link to="/">
          <Icon icon="exit" onClick={reset} />
        </Link>
      )}
      <Switch>
        <Route exact path="/">
          {user?.emailVerified ? (
            <>
              {regEx && (
                <Link to="/">
                  <Icon icon="exit" onClick={reset} />
                </Link>
              )}
              <NewOrHistory
                handleRegEx={handleRegEx}
                handleResultsToShowArray={handleResultsToShowArray}
                handleLogout={onLogout}
                historicalPatients={historicalPatients}
                historicalResults={historicalResults}
                regEx={regEx}
              />
            </>
          ) : loading ? (
            <Loading />
          ) : (
            <Start />
          )}
        </Route>
        <Route exact path="/login">
          <Login onLogin={onLogin} />
        </Route>
        <Route exact path="/register">
          <Register handleRegister={handleRegister} />
        </Route>
        <Route path="/history">
          {resultsToShowArray ? (
            <HistoricalResults resultsToShowArray={resultsToShowArray} />
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
              progress={progress}
              calcFinished={calcFinished}
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
    )
}

export {Router}