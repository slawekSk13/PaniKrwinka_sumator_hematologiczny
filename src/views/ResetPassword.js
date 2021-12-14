import { Button } from "../components/Button/Button";
import { FlexWrapper } from "../components/FlexWrapper/FlexWrapper";
import { Input } from "../components/Input/Input";
import { TipText } from "../components/TipText/TipText";
import { useState } from "react";

import { changeLocation } from "../utilities/helpers";

const ResetPassword = ({ handleReset }) => {
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
    email === emailConfirm
      ? (handleReset(email) && changeLocation('resetPasswordSucces'))
      : setEmailConfirmed(false);
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
