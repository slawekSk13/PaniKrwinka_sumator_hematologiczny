const reducer = (state = [], action) => {
    switch (action.type) {
      case "SETHISTORICALRESULTS":
        return action.payload;
      case "CLEARHISTORICALRESULTS":
        return [];
      default:
        return state;
    }
  };
  
  export default reducer;
  