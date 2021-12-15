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

  export {setCalcUnFinished, setCalcFinished}