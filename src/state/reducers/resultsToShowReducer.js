const reducer = (state = [], action) => {
  switch (action.type) {
    case "UPDATERESULTSTOSHOW":
      return [...action.payload] ;
    case "CLEARRESULTSTOSHOW":
      return [];
    default:
      return state;
  }
};

export default reducer;
