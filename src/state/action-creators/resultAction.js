const setResultWBC = (data) => {
  return (dispatch) => {
    dispatch({ type: "UPDATERESULTWBC", payload: data });
  };
};
const setResultNRBC = () => {
  return (dispatch) => {
    dispatch({ type: "UPDATERESULTNRBC" });
  };
};
const setResultLeuko = (data) => {
  return (dispatch) => {
    dispatch({ type: "UPDATERESULTLEUKO", payload: data });
  };
};
const setResultPatient = (data) => {
  return (dispatch) => {
    dispatch({ type: "UPDATERESULTPATIENT", payload: data });
  };
};
const clearResult = () => {
  return (dispatch) => {
    dispatch({ type: "CLEARRESULT" });
  };
};

export { setResultWBC, setResultNRBC, setResultLeuko, setResultPatient, clearResult };
