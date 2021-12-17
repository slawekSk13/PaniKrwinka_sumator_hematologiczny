import { Button } from "../components/Button/Button";
import { FlexWrapper } from "../components/FlexWrapper/FlexWrapper";
import { Input } from "../components/Input/Input";
import { TipText } from "../components/TipText/TipText";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Loading } from "../components/Loading/Loading";

import { useSelector } from "react-redux";
import { actionCreators, useActions } from "../state";

import { handleLogin, refreshData } from "../utilities/firebase";
import { changeLocation } from "../utilities/helpers";

const Login = () => {
  const { user, loading} = useSelector((state) => state);
  const {
    setUser,
    setLoading,
    unsetLoading,
    setHistoricalPatients,
    setHistoricalResults,
  } = useActions(actionCreators);

  const onLogin = async (email, password) => {
    setLoading();
    setUser((await handleLogin(email, password)) || null);
    const { pastResults, pastPatients } = await refreshData();
    setHistoricalPatients(Object.values(pastPatients));
    setHistoricalResults(Object.values(pastResults));
    unsetLoading();
  };
  user && changeLocation();

  const [email, setEmail] = useState("");
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const [password, setPassword] = useState("");
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const loginPanel = (
    <FlexWrapper justify="between">
      <FlexWrapper justify={"around"} height="35vh">
        <Input
          name="email"
          onChange={handleEmailChange}
          placeholder="email"
          value={email}
        />
        <Input
          name="password"
          onChange={handlePasswordChange}
          placeholder="password"
          value={password}
          type={"password"}
        />
        {/* <Link className="link" to="/"> */}
        <Button
          size="big"
          text="zaloguj"
          onClick={() => onLogin(email, password)}
        />
        {/* </Link> */}
        <Link className="link" to="resetPassword">
          <TipText text="Zresetuj hasło" />
        </Link>
      </FlexWrapper>
      <TipText text="Dzięki logowaniu możesz sprawdzić historię wyników swoich pacjentów" />
    </FlexWrapper>
  );

  return loading ? <Loading /> : loginPanel;
};

export { Login };
