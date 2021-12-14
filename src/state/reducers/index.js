import { combineReducers } from "redux";
import calcIsFinishedReducer from "./calcIsFinishedReducer";
import userReducer from "./userReducer";
import loadingReducer from "./loadingReducer";

const reducers = combineReducers({
  calcIsFinished: calcIsFinishedReducer,
  user: userReducer,
  loading: loadingReducer,
});

export default reducers;
