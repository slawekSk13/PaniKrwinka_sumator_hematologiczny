const reducer = (state = null, action) => {
  switch (action.type) {
    case "REGEX":
      return action.payload;
    default:
      return state;
  }
};

export default reducer;