import {TipTextStyled} from './TipText.styles';
import propTypes from 'prop-types';
import {ColorTheme} from "../../utilities/ColorTheme";

const TipText = ({text}) => {
    return (<ColorTheme.Consumer>
        {colors => <TipTextStyled colors={colors}>{text}</TipTextStyled>}
    </ColorTheme.Consumer>)
}

TipText.propTypes = {
    /** text to show as a content */
    text: propTypes.string
}

export {TipText}