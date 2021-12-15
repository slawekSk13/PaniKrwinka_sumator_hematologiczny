const setRegEx = (regEx) => {
    const payload = regEx === '' ? null : new RegExp(`.{0,}${regEx}.{0,}`, "gi");
  return (dispatch) => {
    dispatch({ type: "REGEX", payload: payload });
  };
};

export { setRegEx };
