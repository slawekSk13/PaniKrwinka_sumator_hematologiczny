import { Button } from "../components/Button/Button";
import { FlexWrapper } from "../components/FlexWrapper/FlexWrapper";
import { Input } from "../components/Input/Input";
import { TipText } from "../components/TipText/TipText";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Loading } from "../components/Loading/Loading";

import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../state";

import { handleLogin } from "../utilities/firebase";
import { changeLocation } from "../utilities/helpers";

const Login = () => {
  const { user, loading } = useSelector((state) => state);
  const dispatch = useDispatch();

  const { setUser, setLoading, unsetLoading } = bindActionCreators(
    actionCreators,
    dispatch
  );

  const onLogin = async (email, password) => {
    setLoading();
    setUser((await handleLogin(email, password)) || null);
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
