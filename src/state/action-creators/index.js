import { setCalcUnFinished, setCalcFinished } from "./calcIsFinishedAction";
import { setLoading, unsetLoading } from "./loadingAction";
import { setUser, unsetUser } from "./userAction";
import { setRegEx } from "./regExAction";
import {
  setHistoricalPatients,
  unsetHistoricalPatients,
} from "./historicalPatientsAction";
import {
  setHistoricalResults,
  unsetHistoricalResults,
} from "./historicalResultsAction";
import { setPatient, clearPatient } from "./patientAction";
import { setResultsToShow, clearResultsToShow } from "./resultsToShowAction";
import { setResultWBC, setResultNRBC, setResultLeuko, setResultPatient, clearResult } from "./resultAction";
import { setProgress, clearProgress } from "./progressAction";

export {
  setCalcFinished,
  setCalcUnFinished,
  setUser,
  unsetUser,
  setLoading,
  unsetLoading,
  setRegEx,
  setHistoricalPatients,
  unsetHistoricalPatients,
  setHistoricalResults,
  unsetHistoricalResults,
  setPatient,
  clearPatient,
  setResultsToShow,
  clearResultsToShow,
  setResultWBC,
  setResultNRBC,
  setResultLeuko,
  setResultPatient,
  clearResult,
  setProgress,
  clearProgress,
};
