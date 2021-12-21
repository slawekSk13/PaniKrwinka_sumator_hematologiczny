import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSave,
  faPrint,
  faFilePdf,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import propTypes from "prop-types";
import { useState } from "react";
import { ColorThemeObj } from "../../utilities/ColorTheme";
import { postToFirebase, refreshData } from "../../utilities/firebase";
import { download, print } from "../../utilities/pdf";
import { changeLocation } from "../../utilities/helpers";

import { actionCreators, useActions } from "../../state";

const Icon = ({ icon, patient, progress, results, additionalAction }) => {
  const {
    clearPatient,
    setLoading,
    unsetLoading,
    setCalcUnFinished,
    clearResultsToShow,
    setRegEx,
    setHistoricalPatients,
    setHistoricalResults,
    clearProgress,
    clearResult,
  } = useActions(actionCreators);

  const [style, setStyle] = useState({
    color: `${ColorThemeObj.primaryColor}`,
    fontSize: "3rem",
    margin: "1rem",
  });

  const save = async () => {
    try {
      setLoading();
      const success = await postToFirebase(results, "results");
      unsetLoading();
      if (success) {
        const { pastResults, pastPatients } = await refreshData();
        setHistoricalPatients(Object.values(pastPatients));
        setHistoricalResults(Object.values(pastResults));
        reset();
        return true;
      } else return false;
    } catch (err) {
      console.warn(err);
    }
  };

  const reset = () => {
    setLoading();
    clearPatient();
    clearProgress();
    clearResult();
    setCalcUnFinished();
    clearResultsToShow();
    setRegEx("");
    unsetLoading();
    changeLocation();
    additionalAction && typeof additionalAction === 'function' && additionalAction();
  };

  const handleMouseOver = () =>
    setStyle((prev) => ({
      ...prev,
      color: `${ColorThemeObj.accentColor}`,
      cursor: "pointer",
    }));
  const handleMouseLeave = () =>
    setStyle((prev) => ({
      ...prev,
      color: `${ColorThemeObj.primaryColor}`,
      cursor: "default",
    }));

  switch (icon) {
    case "save":
      return (
        <FontAwesomeIcon
          onClick={save}
          onMouseEnter={handleMouseOver}
          onMouseLeave={handleMouseLeave}
          style={style}
          icon={faSave}
        />
      );
    case "pdf":
      return (
        <FontAwesomeIcon
          onClick={() => download(patient, results, progress)}
          onMouseEnter={handleMouseOver}
          onMouseLeave={handleMouseLeave}
          style={style}
          icon={faFilePdf}
        />
      );
    case "print":
      return (
        <FontAwesomeIcon
          onClick={() => print(patient, results, progress)}
          onMouseEnter={handleMouseOver}
          onMouseLeave={handleMouseLeave}
          style={style}
          icon={faPrint}
        />
      );
    case "exit":
      return (
        <FontAwesomeIcon
          onClick={reset}
          onMouseEnter={handleMouseOver}
          onMouseLeave={handleMouseLeave}
          style={{ ...style, position: "absolute", top: "0", right: "0" }}
          icon={faTimes}
        />
      );
    default:
      console.log(
        "Icon props must be either add, pdf or print unless you add another icon"
      );
      return null;
  }
};

Icon.propTypes = {
  /** icon is a key word to choose which of preselected icons component should render, you can add more if you import them from FontAwesome and add to switch instruction */
  icon: propTypes.string,
  /** only for print & download */
  patient: propTypes.object,
  /** only for save, print & download */
  results: propTypes.object,
  /** only for print & download */
  progres: propTypes.number,
};

Icon.defaultProps = {
  icon: "save",
};

export { Icon };
