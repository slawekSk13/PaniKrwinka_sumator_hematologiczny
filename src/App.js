import React from "react";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";

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

function App() {
  const { user, regEx, patient, resultsToShow, calcIsFinished, progress, result } = useSelector((state) => state);
  return (
    <HashRouter>
      <Header />
      {(patient.patName !== "" || resultsToShow.length > 0) && (<Icon icon="exit" />)}
      <Switch>
        <Route exact path="/">
          {user ? (<>{regEx && <Icon icon="exit" />}<NewOrHistory /></>) : (<Start />)}
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/register">
          <Register />
        </Route>
        <Route path="/resetPassword">
          <ResetPassword />
        </Route>
        <Route path="/resetPasswordSucces">
          <Success message={"Na Twój adres wysłano link do zmiany hasła"} />
        </Route>
        <Route path="/registerSuccess">
          <Success message={"Dziękujemy za rejestrację! Na podany adres mailowy przesłaliśmy link aktywacyjny"} />
        </Route>
        <Route path="/history">
          {resultsToShow ? <HistoricalResults /> : <Redirect to="/" />}
        </Route>
        <Route path="/addnewpatient">
          <AddNewPatient />
        </Route>
        <Route path="/leukogram">
          {patient.patName !== "" ? (
            <Leukogram />
          ) : (
            <Redirect to="/" />
          )}
        </Route>
        <Route path="/results">
          {result.leukogram.wbc.nominal !== 0 ? (
            <Results
              results={result}
              patient={patient}
              progress={progress}
              calcFinished={calcIsFinished}
            />
          ) : (<Redirect to="/leukogram" />)}
        </Route>
        <Route>
          <Redirect to="/results" />
        </Route>
      </Switch>
    </HashRouter>
  );
}

export default App;
