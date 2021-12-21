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

  const [error, setError] = useState(null);
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
    const registered = await handleRegister(email, password);
    setError(registered.code);
    unsetLoading();
    error?.code === "email-unverified" && changeLocation("registerSuccess");
  };

  const registerButtonHandler = () => {
    if (password.length > 5) {
      password === passwordConfirm
        ? onRegister(email, password)
        : setPasswordConfirmed(false);
    } else setError('password-short')
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
        {error === "auth/invalid-email" && (
          <TipText
            text={"Podaj poprawny adres e-mail"}
            onClick={() => setError(null)}
          />
        )}
        {error === "auth/email-already-in-use" && (
          <TipText
            text={
              "Adres jest już używany, przejdź do logowania, by się zalogować lub odzyskać hasło"
            }
            onClick={() => setError(null)}
          />
        )}
        <Input
          name="password"
          onChange={handlePasswordChange}
          placeholder="hasło"
          value={password}
          type="password"
        />{" "}
        {!passwordConfirmed && (
          <TipText text="Hasło w obu polach musi być indentyczne!" />
        )}
        {error === "password-short" && (
          <TipText
            text={
              "Hasło musi zawierać przynajmniej 6 znaków"
            }
            onClick={() => setError(null)}
          />
        )}
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
        <Button
          size="big"
          text="logowanie"
          onClick={() => changeLocation("login")}
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
