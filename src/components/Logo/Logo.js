import React from 'react';
import {LogoStyled} from "./Logo.styles";
import {ColorTheme} from "../../utilities/ColorTheme";


const Logo = () => {
    return (<ColorTheme.Consumer>{colors => <LogoStyled colors={colors}/>}</ColorTheme.Consumer>)
}

export {Logo};