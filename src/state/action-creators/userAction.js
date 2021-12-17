const setUser = (user) => {
    return (dispatch) => {
      dispatch({ type: "LOGIN", payload: user });
    };
  };
  
  const unsetUser = () => {
    return (dispatch) => {
      dispatch({ type: "LOGOUT" });
    };
  };

  export {setUser, unsetUser}