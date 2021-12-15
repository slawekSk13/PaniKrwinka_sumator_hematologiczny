import { combineReducers } from "redux";
import calcIsFinishedReducer from "./calcIsFinishedReducer";
import userReducer from "./userReducer";
import loadingReducer from "./loadingReducer";
import regExReducer from "./regExReducer";
import historicalResultsReducer from "./historicalResultsReducer";
import historicalPatientsReducer from "./historicalPatientsReducer";
import patientReducer from "./patientReducer";

const reducers = combineReducers({
  calcIsFinished: calcIsFinishedReducer,
  user: userReducer,
  loading: loadingReducer,
  regEx: regExReducer,
  historicalPatients: historicalPatientsReducer,
  historicalResults: historicalResultsReducer,
  patient: patientReducer,
});

export default reducers;
