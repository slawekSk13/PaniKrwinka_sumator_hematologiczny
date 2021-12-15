import React from "react";
import { HashRouter, Route, Switch, Redirect, Link } from "react-router-dom";

import { useSelector } from "react-redux";

import { Header } from "./components/Header/Header";
import { Icon } from "./components/Icon/Icon";

import { AddNewPatient } from "./views/AddNewPatient";
import { Leukogram } from "./views/Leukogram";
import { Results } from "./views/Results";
import { NewOrHistory } from "./views/NewOrHistory";
import { HistoricalResults } from "./views/HistoricalResults";
import { Start } from "./views/Start";
import { Login } from "./views/Login";
import { Register } from "./views/Register";
import { ResetPassword } from "./views/ResetPassword";
import { Success } from "./views/Success";

const Router = ({
  resultsToShowArray,
  handleResultsToShowArray,
  handleRegister,
  progress,
  handleAddCell,
  results,
  handleCalcFinish,
  calcFinished,
  save,
  reset
}) => {
  const { user, regEx, patient } = useSelector((state) => state);
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
          {user ? (
            <>
              {regEx && (
                  <Icon icon="exit" onClick={reset} />
              )}
              <NewOrHistory
                handleResultsToShowArray={handleResultsToShowArray}
              />
            </>
          ) : (
            <Start />
          )}
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/register">
          <Register handleRegister={handleRegister} />
        </Route>
        <Route path="/resetPassword">
          <ResetPassword />
        </Route>
        <Route path="/resetPasswordSucces">
          <Success message={"Na Twój adres wysłano link do zmiany hasła"} />
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
  );
};

export { Router };
