import { FlexWrapper } from "../components/FlexWrapper/FlexWrapper";
import { Button } from "../components/Button/Button";
import { Input } from "../components/Input/Input";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { TipText } from "../components/TipText/TipText";
import { List } from "../components/List/List";
import { Icon } from "../components/Icon/Icon";
import { Loading } from "../components/Loading/Loading";

import {
  showHistoricalResults,
  addPatientToResults,
} from "../utilities/helpers";
import { handleLogout } from "../utilities/firebase";

import { useSelector } from "react-redux";
import { actionCreators, useActions } from "../state";

const NewOrHistory = () => {
  const [pattern, setPattern] = useState("");
  const [showWholeHistory, setShowWholeHistory] = useState(false);

  const { regEx, loading, historicalPatients, historicalResults } = useSelector(
    (state) => state
  );
  const {
    unsetUser,
    unsetHistoricalPatients,
    unsetHistoricalResults,
    setLoading,
    unsetLoading,
    setRegEx,
    clearPatient,
  } = useActions(actionCreators);

  const onLogout = () => {
    setLoading();
    if (handleLogout()) {
      unsetUser();
      unsetHistoricalPatients();
      unsetHistoricalResults();
      clearPatient();
    }
    unsetLoading();
  };

  const handlePattern = (value) => {
    setPattern(value);
    setRegEx(value);
  };

  const setLoginTimeout = () => {
    const loginTimeout = setTimeout(() => {
      onLogout();
      clearTimeout(loginTimeout);
    }, 3 * 60 * 60 * 1000);
    return loginTimeout;
  };

  const loginTimeout = setLoginTimeout();

  useEffect(() => {
    return clearTimeout(loginTimeout);
  }, []);

  const toggleWholeHistory = () => {
    setShowWholeHistory((prevState) => !prevState);
  };

  const resetSearch = () => {
    handlePattern("")
    setShowWholeHistory(false);
  }

  const newOrHistoryPanel = (
    <>
      {(regEx || showWholeHistory) && <Icon icon="exit" additionalAction={resetSearch} />}
      <FlexWrapper>
        <FlexWrapper justify="start" height={regEx === "" ? "35vh" : "65vh"}>
          {!regEx && (
            <>
              <Link className="link" to="/addnewpatient">
                <Button text="nowe badanie" size="big" />
              </Link>
              <Button text={showWholeHistory ? 'ukryj historię' : "pokaż historię"} size="big" onClick={toggleWholeHistory} />
            </>
          )}
          <Input
            name="historySearch"
            onChange={(e) => handlePattern(e.target.value)}
            placeholder="szukaj w historii"
            value={regEx ? pattern : ""}
          />

          {!regEx && !showWholeHistory && <Button text="wyloguj" size="big" onClick={onLogout} />}
          {regEx && (
            <List
              results={showHistoricalResults(
                historicalPatients,
                regEx,
                historicalResults
              )}
            />
          )}
          {showWholeHistory && !regEx && (
            <List
              results={addPatientToResults(
                historicalResults,
                historicalPatients
              )}
            />
          )}
        </FlexWrapper>
        <TipText
          text={
            regEx
              ? "Do wyszukiwania możesz użyć imienia pacjenta lub imienia i nazwiska właściciela"
              : "Zacznij nowe badanie lub szukaj po imieniu pacjenta albo imieniu i nazwisku właściciela"
          }
        />
      </FlexWrapper>
    </>
  );

  return loading ? <Loading /> : newOrHistoryPanel;
};

export { NewOrHistory };
