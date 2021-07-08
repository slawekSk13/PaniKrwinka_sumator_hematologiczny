import React from 'react';
import {ButtonStyled} from "./Button.styles";
import propTypes from "prop-types";

const Button = ({text, size, onClick}) =>  <ButtonStyled size={size} onClick={onClick}>{text}</ButtonStyled>
Button.propTypes = {
    /** text to show on button */
    text: propTypes.string,
    /** big - width: 75%, default - width 35% */
    size: propTypes.string,
    /** function to handle click*/
    onClick: propTypes.func
}

Button.defaultProps = {
    text: 'Button to click',
    size: 'default',
    onClick: value => console.log(value)
}

export {Button};