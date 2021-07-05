import React from 'react';
import ButtonStyled from "./Button.styles";

const Button = ({text, primary}) =>  <ButtonStyled primary={primary}>{text}</ButtonStyled>

export default Button;