const setCalcFinished = () => {
    return (dispatch) => {
      dispatch({ type: "TRUE" });
    };
  };
  
  const setCalcUnFinished = () => {
    return (dispatch) => {
      dispatch({ type: "FALSE" });
    };
  };

  const setLoading = () => {
    return (dispatch) => {
      dispatch({ type: "LOADINGSTART" });
    };
  };
  
  const unsetLoading = () => {
    return (dispatch) => {
      dispatch({ type: "LOADINGFINISED" });
    };
  };

const setUser = (user) => {
  return (dispatch) => {
    dispatch({ type: "LOGIN", payload: user });
  };
};

const unsetUser = () => {
  return (dispatch) => {
    dispatch({ type: "LOGOUT" });
  };
};

export { setCalcFinished, setCalcUnFinished, setUser, unsetUser, setLoading, unsetLoading };
