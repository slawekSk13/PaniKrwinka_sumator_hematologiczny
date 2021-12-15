const setPatient = (data) => {
  return (dispatch) => {
    dispatch({ type: "UPDATEPATIENT", payload: data });
  };
};

const clearPatient = () => {
  return (dispatch) => {
    dispatch({ type: "CLEARPATIENT" });
  };
};

export { setPatient, clearPatient };
