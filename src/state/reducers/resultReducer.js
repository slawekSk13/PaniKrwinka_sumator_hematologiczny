import { resultsZero } from "../../utilities/defaultStates";
import {
  handleAddCellLeuko,
  handleAddCellWBC,
  handleAddCellNRBC,
  handleAddPatientToResult,
} from "../../utilities/helpers";

const reducer = (state = { ...resultsZero }, action) => {
  switch (action.type) {
    case "UPDATERESULTWBC":
      return handleAddCellWBC(
        state,
        action.payload.value,
        action.payload.progress
      );
    case "UPDATERESULTNRBC":
      return handleAddCellNRBC(state);
    case "UPDATERESULTLEUKO":
      return handleAddCellLeuko(state, action.payload.key);
    case "UPDATERESULTPATIENT":
      return handleAddPatientToResult(state, action.payload);
    case "CLEARRESULT":
      return { ...resultsZero };
    default:
      return state;
  }
};

export default reducer;
