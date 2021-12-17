import { Button } from "../components/Button/Button";
import { FlexWrapper } from "../components/FlexWrapper/FlexWrapper";
import { Input } from "../components/Input/Input";
import { TipText } from "../components/TipText/TipText";
import { useState } from "react";

import { actionCreators, useActions } from "../state";

import { changeLocation } from "../utilities/helpers";
import { handleResetPassword } from "../utilities/firebase";

const ResetPassword = () => {

  const { setLoading, unsetLoading } = useActions(actionCreators);

  const [emailConfirmed, setEmailConfirmed] = useState(true);
  const [email, setEmail] = useState("");
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const [emailConfirm, setEmailConfirm] = useState("");
  const handleEmailConfirmChange = (e) => {
    setEmailConfirm(e.target.value);
  };

  const confirmButtonHandler = () => {
    email === emailConfirm && email !== ""
      ? handleReset(email) && changeLocation("resetPasswordSucces")
      : setEmailConfirmed(false);
  };

  const handleReset = async (email) => {
    setLoading();
    await handleResetPassword(email);
    unsetLoading();
    return true;
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
          name="emailConfirm"
          onChange={handleEmailConfirmChange}
          placeholder="potwierdź email"
          value={emailConfirm}
        />
        <Button
          size="big"
          text="Resetuj hasło"
          onClick={() => confirmButtonHandler()}
        />
      </FlexWrapper>
      {!emailConfirmed && (
        <TipText text="Adres w obu polach musi być indentyczne!" />
      )}
    </FlexWrapper>
  );
};

export { ResetPassword };
