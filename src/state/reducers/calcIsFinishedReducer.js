const reducer = (state = false, action) => {
  switch (action.type) {
    case "FINISHED":
      return true;
    case "ONGOING":
      return false;
    default:
      return state;
  }
};

export default reducer;
