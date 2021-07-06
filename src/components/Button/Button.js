import React from 'react';
import {ButtonStyled} from "./Button.styles";
import propTypes from "prop-types";

const Button = ({text}) =>  <ButtonStyled>{text}</ButtonStyled>
Button.propTypes = {
    /** text to show on button */
    text: propTypes.string
}

Button.defaultProps = {
    text: 'Button to click'
}

export {Button};