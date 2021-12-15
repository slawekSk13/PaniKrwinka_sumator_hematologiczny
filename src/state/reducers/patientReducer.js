import { patientZero } from "../../utilities/defaultStates";

const reducer = (
  state = { ...patientZero },
  action
) => {
  switch (action.type) {
    case "UPDATEPATIENT":
      return { ...state, ...action.payload };
    case "CLEARPATIENT":
      return { ...patientZero };
    default:
      return state;
  }
};

export default reducer;
