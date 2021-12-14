const reducer = (state = false, action) => {
  switch (action.type) {
    case "FALSE":
      return false;
    case "TRUE":
      return true;
    default:
      return state;
  }
};

export default reducer;
