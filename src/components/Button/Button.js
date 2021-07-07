import React from 'react';
import {ButtonStyled} from "./Button.styles";
import propTypes from "prop-types";

const Button = ({text, width}) =>  <ButtonStyled width={width}>{text}</ButtonStyled>
Button.propTypes = {
    /** text to show on button */
    text: propTypes.string,
    /** big - width: 75%, default - width 35% */
    width: propTypes.string
}

Button.defaultProps = {
    text: 'Button to click',
    width: 'default'
}

export {Button};