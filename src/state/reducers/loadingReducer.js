const reducer = (state = false, action) => {
    switch (action.type) {
      case "LOADINGFINISED":
        return false;
      case "LOADINGSTART":
        return true;
      default:
        return state;
    }
  };
  
  export default reducer;
  