import React from 'react';
import {ButtonStyled} from "./Button.styles";
import propTypes from "prop-types";

const Button = ({text, size}) =>  <ButtonStyled size={size}>{text}</ButtonStyled>
Button.propTypes = {
    /** text to show on button */
    text: propTypes.string,
    /** big - width: 75%, default - width 35% */
    size: propTypes.string
}

Button.defaultProps = {
    text: 'Button to click',
    size: 'default'
}

export {Button};