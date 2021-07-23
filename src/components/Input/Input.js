import {InputStyled} from './Input.styles';
import propTypes from 'prop-types';
import {ColorTheme} from "../../utilities/ColorTheme";

const Input = ({placeholder, up, value, onChange, name}) => {
   return (<ColorTheme.Consumer>
       {colors => <InputStyled autocomplete="off" name={name} onChange={onChange} value={value} placeholder={placeholder}
                     up={up} colors={colors}/>}
   </ColorTheme.Consumer>)
}

Input.propTypes = {
    /** text to show as a placeholder */
    placeholder: propTypes.string,
    /** if true text isn't lowercased */
    up: propTypes.bool,
    /** value of input */
    value: propTypes.string,
    /** function to handle change */
    onChange: propTypes.func,
    /** text to pass to HTML input*/
    name: propTypes.string
}


export {Input};
