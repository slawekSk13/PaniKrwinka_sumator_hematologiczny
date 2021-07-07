import {FlexWrapperStyled} from "./FlexWrapper.styles";
import propTypes from "prop-types";

const FlexWrapper = ({justify, height, children}) => <FlexWrapperStyled justify={justify} height={height}>{children}</FlexWrapperStyled>

FlexWrapper.propTypes = {
    /** around => space-around, between => spacebetween */
    justify: propTypes.string,
    /** height of wrapper */
    height: propTypes.string
}

FlexWrapper.defaultProps = {
    justify: 'between',
    height: '75vh'
}

export {FlexWrapper}