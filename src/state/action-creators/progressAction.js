const setProgress = () => {
  return (dispatch) => {
    dispatch({ type: "UPDATEPROGRESS" });
  };
};

const clearProgress = () => {
  return (dispatch) => {
    dispatch({ type: "CLEARPROGRESS" });
  };
};

export { setProgress, clearProgress };
