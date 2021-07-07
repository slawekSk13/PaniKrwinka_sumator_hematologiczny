import {CenterStyled} from './Center.styles'
import propTypes from "prop-types";

const Center = ({width, children}) => <CenterStyled width={width}>{children}</CenterStyled>

Center.propTypes = {
    /** string to set width */
    width: propTypes.string
}

Center.defaultProps = {
    width: '90%'
    }

export {Center}