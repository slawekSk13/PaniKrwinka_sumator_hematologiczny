import {TipTextStyled} from './TipText.styles';
import propTypes from 'prop-types';

const TipText = ({text}) => <TipTextStyled>{text}</TipTextStyled>

TipText.propTypes = {
    /** text to show as a content */
    text: propTypes.string
}

export {TipText}