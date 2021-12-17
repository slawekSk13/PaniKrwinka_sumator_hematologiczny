const setCalcFinished = () => {
    return (dispatch) => {
      dispatch({ type: "FINISHED" });
    };
  };
  
  const setCalcUnFinished = () => {
    return (dispatch) => {
      dispatch({ type: "ONGOING" });
    };
  };

  export {setCalcUnFinished, setCalcFinished}