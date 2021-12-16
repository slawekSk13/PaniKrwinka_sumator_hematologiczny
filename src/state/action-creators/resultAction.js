const setResult = (data) => {
    return (dispatch) => {
      dispatch({ type: "UPDATERESULT", payload: data });
    };
  };
  
  const clearResult = () => {
    return (dispatch) => {
      dispatch({ type: "CLEARRESULT" });
    };
  };
  
  export { setResult, clearResult };
  