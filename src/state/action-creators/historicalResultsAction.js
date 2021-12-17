const setHistoricalResults = (data) => {
    return (dispatch) => {
      dispatch({ type: "SETHISTORICALRESULTS", payload: data });
    };
  };
  
  const unsetHistoricalResults = () => {
    return (dispatch) => {
      dispatch({ type: "CLEARHISTORICALRESULTS" });
    };
  };
  
  export { setHistoricalResults, unsetHistoricalResults };
  