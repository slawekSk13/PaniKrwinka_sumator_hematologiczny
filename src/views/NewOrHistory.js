import { FlexWrapper } from "../components/FlexWrapper/FlexWrapper";
import { Button } from "../components/Button/Button";
import { Input } from "../components/Input/Input";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { TipText } from "../components/TipText/TipText";
import { List } from "../components/List/List";
import { Icon } from "../components/Icon/Icon";
import { Loading } from "../components/Loading/Loading";

import { showHistoricalResults } from "../utilities/helpers";
import { handleLogout } from "../utilities/firebase";

import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../state";

const NewOrHistory = ({
  handleRegEx,
  regEx,
  handleResultsToShowArray,
  historicalResults,
  historicalPatients,
}) => {
  const { user, loading } = useSelector((state) => state);
  const dispatch = useDispatch();

  const {unsetUser, setLoading, unsetLoading} = bindActionCreators(actionCreators, dispatch);

  const onLogout = () => {
    setLoading();
    handleLogout() && unsetUser();
    unsetLoading();
  }

  const [historySearch, setHistorySearch] = useState("");
  const handleHistorySearch = (e) => {
    setHistorySearch(e.target.value);
  };

  useEffect(() => {
    handleRegEx(historySearch);
  }, [historySearch]);

  const newOrHistoryPanel =  <>
  {historySearch !== "" && (
    <Icon icon="exit" onClick={() => setHistorySearch("")} />
  )}
  <FlexWrapper>
    <FlexWrapper
      justify="start"
      height={historySearch === "" ? "35vh" : "65vh"}
    >
      {historySearch === "" && (
        <Link className="link" to="/addnewpatient">
          <Button text="nowe badanie" size="big" />
        </Link>
      )}
      <Input
        name="historySearch"
        onChange={handleHistorySearch}
        placeholder="szukaj w historii"
        value={historySearch}
      />
      <Button text="wyloguj" size="big" onClick={onLogout} />
      {historySearch !== "" && (
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
        historySearch === ""
          ? "Zacznij nowe badanie lub szukaj po imieniu pacjenta albo imieniu i nazwisku właściciela"
          : "Do wyszukiwania możesz użyć imienia pacjenta lub imienia i nazwiska właściciela"
      }
    />
  </FlexWrapper>
</>

  return (
   loading ? <Loading /> : newOrHistoryPanel
  );
};

export { NewOrHistory };
