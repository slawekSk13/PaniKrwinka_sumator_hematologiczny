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

  export { setLoading, unsetLoading}