import {InputStyled} from './Input.styles';
import propTypes from 'prop-types'

const Input = ({placeholder}) => <InputStyled placeholder={placeholder}/>

Input.propTypes = {
    /** text to show as a placeholder */
    placeholder: propTypes.string
}


export {Input};
