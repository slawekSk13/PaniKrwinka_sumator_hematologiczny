import {FlexWrapperStyled} from "./FlexWrapper.styles";
import propTypes from "prop-types";

const FlexWrapper = ({justify, height, children}) => <FlexWrapperStyled justify={justify} height={height}>{children}</FlexWrapperStyled>

FlexWrapper.propTypes = {
    /** around => space-around, between => spacebetween, center or nothing => center, other => flex-start */
    justify: propTypes.string,
    /** height of wrapper */
    height: propTypes.string
}

FlexWrapper.defaultProps = {
    justify: 'center',
    height: '75vh'
}

export {FlexWrapper}