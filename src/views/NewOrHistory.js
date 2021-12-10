import { FlexWrapper } from "../components/FlexWrapper/FlexWrapper";
import { Button } from "../components/Button/Button";
import { Input } from "../components/Input/Input";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { TipText } from "../components/TipText/TipText";
import { List } from "../components/List/List";
import { Icon } from "../components/Icon/Icon";

const NewOrHistory = ({
  showHistoricalResults,
  handleRegEx, regEx,
  handleResultsToShowArray,
  handleLogout, callback, loading,
  historicalResults, historicalPatients,
}) => {
  const [historySearch, setHistorySearch] = useState("");
  const handleHistorySearch = (e) => {
    setHistorySearch(e.target.value);
  };

  useEffect(() => {
    handleRegEx(historySearch);
  }, [historySearch]);

  return (
    <>
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
          <Button text='wyloguj' size='big' onClick={() => handleLogout(loading, callback)} />
          {historySearch !== "" && (
            <List
              results={showHistoricalResults(historicalPatients, regEx, historicalResults)}
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
  );
};

export { NewOrHistory };
