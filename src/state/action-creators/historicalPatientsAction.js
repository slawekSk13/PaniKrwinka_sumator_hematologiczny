const setHistoricalPatients = (data) => {
  return (dispatch) => {
    dispatch({ type: "SETHISTORICALPATIENTS", payload: data });
  };
};

const unsetHistoricalPatients = () => {
  return (dispatch) => {
    dispatch({ type: "CLEARHISTORICALPATIENTS" });
  };
};

export { setHistoricalPatients, unsetHistoricalPatients };
