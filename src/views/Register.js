import { Button } from "../components/Button/Button";
import { FlexWrapper } from "../components/FlexWrapper/FlexWrapper";
import { Input } from "../components/Input/Input";
import { TipText } from "../components/TipText/TipText";
import { useState } from "react";
import { Link } from "react-router-dom";

const Register = ({ handleRegister, loading }) => {
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

  const registerButtonHandler = () => {
    password === passwordConfirm
      ? handleRegister(email, password)
      : setPasswordConfirmed(false);
  };
  return (
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
        <Link className='link' to='/' >
        <Button
          size="big"
          text="zarejestruj"
          onClick={() => registerButtonHandler()}
        /></Link>
      </FlexWrapper>
      {!passwordConfirmed && (
        <TipText text="Hasło w obu polach musi być indentyczne!" />
      )}
    </FlexWrapper>
  );
};

export { Register };
