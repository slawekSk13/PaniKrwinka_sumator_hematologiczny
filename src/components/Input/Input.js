import {InputStyled} from './Input.styles';
import propTypes from 'prop-types';

const Input = ({placeholder, up, value, onChange, name}) => <InputStyled autocomplete="off" name={name} onChange={onChange} value={value} placeholder={placeholder} up={up}/>

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
