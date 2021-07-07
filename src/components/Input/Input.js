import {InputStyled} from './Input.styles';
import propTypes from 'prop-types';

const Input = ({placeholder, up}) => <InputStyled placeholder={placeholder} up={up}/>

Input.propTypes = {
    /** text to show as a placeholder */
    placeholder: propTypes.string,
    /** if true text isn't lowercased */
    up: propTypes.bool
}


export {Input};
