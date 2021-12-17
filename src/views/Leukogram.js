import { Button } from "../components/Button/Button";
import { FlexWrapper } from "../components/FlexWrapper/FlexWrapper";
import { ProgressBar } from "../components/ProgressBar/ProgressBar";
import { Table } from "../components/Table/Table";
import { Center } from "../components/Center/Center";
import { Input } from "../components/Input/Input";
import { TipText } from "../components/TipText/TipText";
import { Loading } from "../components/Loading/Loading";
import { useState } from "react";

import { useSelector } from "react-redux";
import { actionCreators, useActions } from "../state";

import { changeLocation } from "../utilities/helpers";

const Leukogram = () => {
  const { patient, progress, result, calcIsFinished, loading } = useSelector(
    (state) => state
  );
  const {
    setCalcFinished,
    setCalcUnFinished,
    setResultWBC,
    setResultNRBC,
    setResultLeuko,
    setProgress,
  } = useActions(actionCreators);

  const [localWbc, setLocalWbc] = useState(
    result.leukogram.wbc.nominal !== 0
      ? result.leukogram.wbc.nominal.toString()
      : ""
  );

  const handleAddCell = (key, value) => {
    if (key === "wbc") {
      setResultWBC({ value, progress });
    } else {
      navigator.vibrate(100);
      if (key === "nrbc") {
        setResultNRBC();
      } else {
        setResultLeuko({ key });
        setProgress();
      }
    }
    progress >= 99 && setCalcFinished();
  };

  const handleLocalWbc = (e) => {
    const newValue = e.target.value;
    const regex = /^\d*(\.|,?)\d{0,2}$/;
    const isValid = () => newValue.match(regex);
    setLocalWbc((prevState) => {
      if (isValid()) {
        return newValue;
      }
      return prevState;
    });
  };
  const handleMultiClick = (e) => {
    handleAddCell(e.target.innerText.toLowerCase());
  };
  const handleWbcClick = () => {
    const newValue = Number.parseFloat(localWbc.replace(",", "."));
    if (newValue) {
      handleAddCell("wbc", newValue);
      setLocalWbc(result.leukogram.wbc.nominal);
    }
    changeLocation(localWbc === "" ? "/leukogram" : "/results");
  };

  const leukogramPanel = (
    <>
      {Object.keys(result.leukogram.relative).map((element, i) => (
        <Button
          key={i}
          text={element}
          name={element}
          onClick={handleMultiClick}
        />
      ))}
      <Button text="nrbc" name="nrbc" onClick={handleMultiClick} />
      <Button onClick={setCalcFinished} text="dalej" size="big" />
    </>
  );

  const wbcPanel = (
    <FlexWrapper height="40vh">
      <Center>
        <Input
          onChange={handleLocalWbc}
          name="wbc"
          value={localWbc}
          placeholder="WBC (G/l)"
          up={true}
        />
        <Button onClick={handleWbcClick} text="dalej" size="big" />
      </Center>
      <TipText text="Dzięki wprowadzeniu WBC będziemy mogli podać Ci wartość bezwzględną i w razie potrzeby wartość skorygowaną WBC" />
    </FlexWrapper>
  );

  return loading ? (
    <Loading />
  ) : (
    <FlexWrapper justify="around">
      <Table
        patient={patient}
        results={result}
        calcFinished={calcIsFinished}
        progress={progress}
      />
      <ProgressBar progress={progress} />
      <Center>
        {!calcIsFinished || progress < 1 ? leukogramPanel : wbcPanel}
      </Center>
    </FlexWrapper>
  );
};

export { Leukogram };
