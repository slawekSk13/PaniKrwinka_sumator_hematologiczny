import { Input } from "../components/Input/Input";
import { RadioButtonGroup } from "../components/RadioButtonGroup/RadioButtonGroup";
import { Button } from "../components/Button/Button";
import { TipText } from "../components/TipText/TipText";
import { FlexWrapper } from "../components/FlexWrapper/FlexWrapper";
import { Select } from "../components/Select/Select";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { actionCreators, useActions } from "../state";

import { capitalizeFirstLetter, changeLocation } from "../utilities/helpers";
import { patientZero } from "../utilities/defaultStates";
import { postToFirebase, refreshData } from "../utilities/firebase";

const AddNewPatient = () => {
  const [error, setError] = useState(false);
  const [localPatient, setLocalPatient] = useState({
    ...patientZero,
  });
  const { historicalPatients } = useSelector((state) => state);
  const {
    setPatient,
    setResultPatient,
    setHistoricalPatients,
    setLoading,
    unsetLoading,
  } = useActions(actionCreators);

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
      setResultPatient(newPatient);
    } else {
      setPatient(matchingPatient[0]);
      setResultPatient(matchingPatient[0]);
    }
    changeLocation("/leukogram");
    unsetLoading();
  };

  const handleClick = () => {
    setLoading();
    const { patName, patOwnerName, patOwnerLname } = localPatient;
    if (
      patName.length > 0 &&
      patOwnerName.length > 0 &&
      patOwnerLname.length > 0
    ) {
      confirmPatient(localPatient, matchingPatient);
    } else {
      setError('not-all-filled');
    }
    unsetLoading();
  };

  const handleSelect = (e) => {
    const oldPatientId = parseInt(e.target.value);
    const oldPatient = historicalPatients.filter(
      (el) => el.id === oldPatientId
    );
    confirmPatient(null, [...oldPatient]);
  };

  return (
    <FlexWrapper>
      <FlexWrapper justify="around" height="65vh">
        <Select options={historicalPatients} handleSelect={handleSelect} />
        {error === "not-all-filled" && (
          <TipText
            text={
              "Prosz?? uzupe??ni?? wszystkie pola"
            }
            onClick={() => setError(null)}
          />
        )}
        <Input
          onChange={handleLocalPatientChange}
          name={"patName"}
          value={localPatient.patName}
          placeholder="imi?? pacjenta"
        />
        <Input
          onChange={handleLocalPatientChange}
          name={"patOwnerName"}
          value={localPatient.patOwnerName}
          placeholder="imi?? w??a??ciciela"
        />
        <Input
          onChange={handleLocalPatientChange}
          name={"patOwnerLname"}
          value={localPatient.patOwnerLname}
          placeholder="nazwisko w??a??ciciela"
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
            ? "Wprowad?? dane pacjenta"
            : `${capitalizeFirstLetter(localPatient.species)} ${
                localPatient.patName
              } nale????cy do w??a??ciciela o imieniu i nazwisku ${
                localPatient.patOwnerName
              } ${
                localPatient.patOwnerLname
              } jest ju?? w bazie. Czy to ten sam? Je??li tak, przejd?? dalej, aby doda?? kolejne badanie dla tego pacjenta. Je??li nie, dodaj jaki?? wyr????nik do danych, ??eby m??c w przysz??o??ci odr????ni?? pacjent??w.`
        }
      />
    </FlexWrapper>
  );
};

export { AddNewPatient };
