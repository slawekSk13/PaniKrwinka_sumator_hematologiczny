import React from 'react';
import {ButtonStyled} from "./Button.styles";
import propTypes from "prop-types";
import {ColorTheme} from "../../utilities/ColorTheme";

const Button = ({text, size, onClick}) => {
    return (<ColorTheme.Consumer>
        {colors => <ButtonStyled size={size} onClick={onClick} colors={colors}>{text}</ButtonStyled>}
    </ColorTheme.Consumer>)
}
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