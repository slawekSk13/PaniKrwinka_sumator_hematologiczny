import { Button } from "../components/Button/Button";
import { FlexWrapper } from "../components/FlexWrapper/FlexWrapper";
import { Input } from "../components/Input/Input";
import { TipText } from "../components/TipText/TipText";
import { useState } from "react";
import { Link } from "react-router-dom";

const Register = ({handleRegister}) => {
  const [email, setEmail] = useState('');
  const handleEmailhange = (e) => {
    setEmail(e.target.value);
  };
  const [password, setPassword] = useState('');
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  return (
      <FlexWrapper justify='between'>
    <FlexWrapper justify={'around'} height='35vh'>
      <Input
        name="email"
        onChange={handleEmailhange}
        placeholder="email"
        value={email}
      />
      <Input
        name="password"
        onChange={handlePasswordChange}
        placeholder="password"
        value={password}
      />
      <Button size='big' text='zarejestruj' onClick={() => handleRegister(email, password)} />
    </FlexWrapper>
    <TipText text='Dzięki rejestracji nie tylko możesz pobrać lub wydrukować wyniki, ale także mieć do nich dostęp w przyszłości' />
    </FlexWrapper>
  );
};

export { Register };
