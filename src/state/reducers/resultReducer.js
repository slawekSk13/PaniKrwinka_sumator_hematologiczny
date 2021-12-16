import { resultsZero } from "../../utilities/defaultStates";

const reducer = (
  state = { ...resultsZero },
  action
) => {
  switch (action.type) {
    case "UPDATERESULT":
      return { ...state, ...action.payload };
    case "CLEARRESULT":
      return { ...resultsZero };
    default:
      return state;
  }
};

export default reducer;
