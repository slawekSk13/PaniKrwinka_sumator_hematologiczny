const reducer = (state = [], action) => {
    switch (action.type) {
      case "SETHISTORICALPATIENTS":
        return action.payload;
      case "CLEARHISTORICALPATIENTS":
        return [];
      default:
        return state;
    }
  };
  
  export default reducer;
  