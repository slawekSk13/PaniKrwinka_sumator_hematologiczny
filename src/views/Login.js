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
    const logInResponse = await handleLogin(email, password);
    logInResponse?.error ? setError(logInResponse.code) : setUser(logInResponse);
    unsetLoading();
    const { pastResults, pastPatients } = await refreshData();
    pastPatients && setHistoricalPatients(Object.values(pastPatients));
    pastResults && setHistoricalResults(Object.values(pastResults));
  };
  user && changeLocation();

  const [error, setError] = useState(null);
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
          placeholder="adres e-mail"
          value={email}
        />
        {error === 'auth/user-not-found' && <TipText text={'Nie znaleziono użytkownika o tym adresie e-mail'} onClick={()=>setError(null)}/>}
        {error === 'email-unverified' && <TipText text={'Przejdź do swojej skrzynki e-mail, by potwierdzić adres'} onClick={()=>setError(null)}/>}
        <Input
          name="password"
          onChange={handlePasswordChange}
          placeholder="hasło"
          value={password}
          type={"password"}
        />
        {error === 'auth/wrong-password' && <TipText text={'Podano błędne hasło'} onClick={()=>setError(null)}/>}
        <Button
          size="big"
          text="zaloguj"
          onClick={() => onLogin(email, password)}
        />
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
