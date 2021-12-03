import { FlexWrapper } from "../components/FlexWrapper/FlexWrapper";
import { Button } from "../components/Button/Button";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { TipText } from "../components/TipText/TipText";

const Start = () => {
  return (
    <FlexWrapper>
      <FlexWrapper justify="start" height={"65vh"}>
        <Link style={{ width: "100%", textAlign: "center" }} to="/register">
          <Button text="zarejestruj" size="big" />
        </Link>
        <Link style={{ width: "100%", textAlign: "center" }} to="/login">
          <Button text="zaloguj" size="big" />
        </Link>
      </FlexWrapper>
      <TipText
        text={"Pani Krwinka pomoże Ci w obliczeniach hematologicznych!"}
      />
    </FlexWrapper>
  );
};

export { Start };
