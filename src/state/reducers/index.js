import { combineReducers } from "redux";
import calcIsFinishedReducer from "./calcIsFinishedReducer";
import userReducer from "./userReducer";
import loadingReducer from "./loadingReducer";
import regExReducer from "./regExReducer";
import historicalResultsReducer from "./historicalResultsReducer";
import historicalPatientsReducer from "./historicalPatientsReducer";
import patientReducer from "./patientReducer";
import resultsToShowReducer from "./resultsToShowReducer";
import resultReducer from './resultReducer';
import progressReducer from './progressReducer'

const reducers = combineReducers({
  user: userReducer,
  patient: patientReducer,
  result: resultReducer,
  progress: progressReducer,
  historicalPatients: historicalPatientsReducer,
  historicalResults: historicalResultsReducer,
  regEx: regExReducer,
  resultsToShow: resultsToShowReducer,
  calcIsFinished: calcIsFinishedReducer,
  loading: loadingReducer,
});

export default reducers;
