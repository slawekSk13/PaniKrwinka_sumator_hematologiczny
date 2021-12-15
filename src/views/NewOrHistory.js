import { FlexWrapper } from "../components/FlexWrapper/FlexWrapper";
import { Button } from "../components/Button/Button";
import { Input } from "../components/Input/Input";
import { Link } from "react-router-dom";
import React, { useState } from "react";
import { TipText } from "../components/TipText/TipText";
import { List } from "../components/List/List";
import { Icon } from "../components/Icon/Icon";
import { Loading } from "../components/Loading/Loading";

import { showHistoricalResults } from "../utilities/helpers";
import { handleLogout } from "../utilities/firebase";

import { useSelector } from "react-redux";
import { actionCreators, useActions } from "../state";

const NewOrHistory = ({ handleResultsToShowArray }) => {
  const [pattern, setPattern] = useState("");

  const { regEx, loading, historicalPatients, historicalResults, } = useSelector(
    (state) => state
  );
  const {
    unsetUser,
    unsetHistoricalPatients,
    unsetHistoricalResults,
    setLoading,
    unsetLoading,
    setRegEx,
    clearPatient
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

  const newOrHistoryPanel = (
    <>
      {regEx && <Icon icon="exit" onClick={() => handlePattern("")} />}
      <FlexWrapper>
        <FlexWrapper justify="start" height={regEx === "" ? "35vh" : "65vh"}>
          {!regEx && (
            <Link className="link" to="/addnewpatient">
              <Button text="nowe badanie" size="big" />
            </Link>
          )}
          <Input
            name="historySearch"
            onChange={(e) => handlePattern(e.target.value)}
            placeholder="szukaj w historii"
            value={pattern}
          />
          {!regEx && <Button text="wyloguj" size="big" onClick={onLogout} />}
          {regEx && (
            <List
              results={showHistoricalResults(
                historicalPatients,
                regEx,
                historicalResults
              )}
              handleClick={handleResultsToShowArray}
              regEx={regEx}
              historicalPatients={historicalPatients}
              historicalResults={historicalResults}
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
