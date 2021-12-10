import { Button } from "../components/Button/Button";
import { FlexWrapper } from "../components/FlexWrapper/FlexWrapper";
import { Input } from "../components/Input/Input";
import { TipText } from "../components/TipText/TipText";
import { useState } from "react";
import { Link } from "react-router-dom";

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const [password, setPassword] = useState("");
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
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
          placeholder="password"
          value={password}
          type={"password"}
        />
       <Link className='link' to='/' ><Button
          size="big"
          text="zaloguj"
          onClick={() => onLogin(email, password)}
        /></Link>
      </FlexWrapper>
      <TipText text="Dzięki logowaniu możesz sprawdzić historię wyników swoich pacjentów" />
    </FlexWrapper>
  );
};

export { Login };
