const setResultsToShow = (data) => {
    return (dispatch) => {
      dispatch({ type: "UPDATERESULTSTOSHOW", payload: data });
    };
  };
  
  const clearResultsToShow = () => {
    return (dispatch) => {
      dispatch({ type: "CLEARRESULTSTOSHOW" });
    };
  };
  
  export { setResultsToShow, clearResultsToShow };
  