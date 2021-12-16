import { Input } from "../components/Input/Input";
import { RadioButtonGroup } from "../components/RadioButtonGroup/RadioButtonGroup";
import { Button } from "../components/Button/Button";
import { TipText } from "../components/TipText/TipText";
import { FlexWrapper } from "../components/FlexWrapper/FlexWrapper";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { actionCreators, useActions } from "../state";

import { capitalizeFirstLetter, changeLocation } from "../utilities/helpers";
import { patientZero } from "../utilities/defaultStates";
import { postToFirebase, refreshData } from "../utilities/firebase";

const AddNewPatient = () => {
  const [localPatient, setLocalPatient] = useState({
    ...patientZero,
  });
  const { historicalPatients } = useSelector((state) => state);
  const { setPatient, setHistoricalPatients, setLoading, unsetLoading } =
    useActions(actionCreators);

  const [matchingPatient, setMatchingPatient] = useState([]);

  const handleLocalPatientChange = (e) => {
    const { name, value } = e.target;
    setLocalPatient((prevState) => ({
      ...prevState,
      [name]: capitalizeFirstLetter(value),
    }));
  };

  useEffect(() => {
    if (historicalPatients) {
      const checkMatch = (element) => {
        if (
          element.patName === localPatient.patName &&
          element.patOwnerName === localPatient.patOwnerName &&
          element.patOwnerLname === localPatient.patOwnerLname &&
          element.species === localPatient.species
        ) {
          return element;
        }
      };
      const foundPatient = historicalPatients.filter(checkMatch);
      setMatchingPatient(foundPatient);
    }
  }, [localPatient]);

  const handleRadioChange = (species) => {
    setLocalPatient((prevState) => ({
      ...prevState,
      species: species,
    }));
  };

  const confirmPatient = async (patientToSave, matchingPatient) => {
    setLoading();
    if (matchingPatient.length === 0) {
      const newPatient = { ...patientToSave, id: new Date().valueOf() };
      setPatient({ ...newPatient });
      await postToFirebase(newPatient, `patients`);
      const { pastPatients } = await refreshData();
      setHistoricalPatients(Object.values(pastPatients));
    } else {
      setPatient(matchingPatient[0]);
    }
    changeLocation("/leukogram");
    unsetLoading();
  };

  const handleClick = () => {
    setLoading();
    const { patName, patOwnerName, patOwnerLname } = localPatient;
    patName.length > 0 &&
      patOwnerName.length > 0 &&
      patOwnerLname.length > 0 &&
      confirmPatient(localPatient, matchingPatient);
      unsetLoading();
  };

  return (
    <FlexWrapper>
      <FlexWrapper justify="around" height="65vh">
        <Input
          onChange={handleLocalPatientChange}
          name={"patName"}
          value={localPatient.patName}
          placeholder="imię pacjenta"
        />
        <Input
          onChange={handleLocalPatientChange}
          name={"patOwnerName"}
          value={localPatient.patOwnerName}
          placeholder="imię właściciela"
        />
        <Input
          onChange={handleLocalPatientChange}
          name={"patOwnerLname"}
          value={localPatient.patOwnerLname}
          placeholder="nazwisko właściciela"
        />
        <RadioButtonGroup onChange={handleRadioChange} />
        <Button
          onClick={handleClick}
          size="big"
          text={matchingPatient.length === 0 ? "dalej" : "tak"}
        />
      </FlexWrapper>
      <TipText
        text={
          matchingPatient.length === 0
            ? "Wprowadź dane pacjenta"
            : `${capitalizeFirstLetter(localPatient.species)} ${
                localPatient.patName
              } należący do właściciela o imieniu i nazwisku ${
                localPatient.patOwnerName
              } ${
                localPatient.patOwnerLname
              } jest już w bazie. Czy to ten sam? Jeśli tak, przejdź dalej, aby dodać kolejne badanie dla tego pacjenta. Jeśli nie, dodaj jakiś wyróżnik do danych, żeby móc w przyszłości odróżnić pacjentów.`
        }
      />
    </FlexWrapper>
  );
};

export { AddNewPatient };
