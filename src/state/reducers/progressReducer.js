const reducer = (state = 0, action) => {
  switch (action.type) {
    case "UPDATEPROGRESS":
      return state + 1;
    case "CLEARPROGRESS":
      return 0;
    default:
      return state;
  }
};

export default reducer;
