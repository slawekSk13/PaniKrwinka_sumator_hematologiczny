import React from 'react';
import {LogoStyled} from "./Logo.styles";
import {ColorTheme} from "../../utilities/ColorTheme";
import { changeLocation } from '../../utilities/helpers';


const Logo = () => {
    return (<ColorTheme.Consumer>{colors => <LogoStyled onClick={changeLocation} colors={colors}/>}</ColorTheme.Consumer>)
}

export {Logo};