import {ProgressBarStyled} from "./ProgressBar.styles";
import {Button} from "../Button/Button";
import propTypes from "prop-types";

const ProgressBar = ({progress}) => {
    return (
        <>
            <ProgressBarStyled width={`${progress}%`} color={'#CD1719'}/>
            <ProgressBarStyled width={`${100 - progress}%`} color={'#F9F9F9'}/>
        </>
    );
}

ProgressBar.propTypes = {
    /** progress is a number used to calculate divs width to show progress in calculations */
    progress: propTypes.number
}

ProgressBar.defaultProps = {
    progress: 0
}

export {ProgressBar};