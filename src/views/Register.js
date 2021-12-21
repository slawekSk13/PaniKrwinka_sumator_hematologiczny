import { Button } from "../components/Button/Button";
import { FlexWrapper } from "../components/FlexWrapper/FlexWrapper";
import { Input } from "../components/Input/Input";
import { TipText } from "../components/TipText/TipText";
import { useState } from "react";
import { Loading } from "../components/Loading/Loading";

import { useSelector } from "react-redux";
import { actionCreators, useActions } from "../state";

import { handleRegister } from "../utilities/firebase";
import { changeLocation } from "../utilities/helpers";

const Register = () => {
  const { loading } = useSelector((state) => state);
  const { setLoading, unsetLoading } = useActions(actionCreators);

  const [passwordConfirmed, setPasswordConfirmed] = useState(true);
  const [email, setEmail] = useState("");
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const [password, setPassword] = useState("");
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const handlePasswordConfirmChange = (e) => {
    setPasswordConfirm(e.target.value);
  };

  const onRegister = async () => {
    setLoading();
    await handleRegister(email, password);
    unsetLoading();
    changeLocation();
  };

  const registerButtonHandler = () => {
    password === passwordConfirm
      ? onRegister(email, password)
      : setPasswordConfirmed(false);
  };

  const registerPanel = (
    <FlexWrapper justify="between">
      <FlexWrapper justify={"around"} height="35vh">
        <Input
          name="email"
          onChange={handleEmailChange}
          placeholder="adres e-mail"
          value={email}
        />
        <Input
          name="password"
          onChange={handlePasswordChange}
          placeholder="hasło"
          value={password}
          type="password"
        />
        <Input
          name="passwordConfirm"
          onChange={handlePasswordConfirmChange}
          placeholder="powtórz hasło"
          value={passwordConfirm}
          type="password"
        />
        <Button
          size="big"
          text="zarejestruj"
          onClick={() => registerButtonHandler()}
        />
      </FlexWrapper>
      {!passwordConfirmed && (
        <TipText text="Hasło w obu polach musi być indentyczne!" />
      )}
    </FlexWrapper>
  );
  return loading ? <Loading /> : registerPanel;
};

export { Register };
