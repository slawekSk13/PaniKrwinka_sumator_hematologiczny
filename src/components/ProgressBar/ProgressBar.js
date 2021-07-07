import {ProgressBarStyled} from "./ProgressBar.styles";
import propTypes from "prop-types";

const ProgressBar = ({progress}) => {
    return (
        <div style={{width: '95%', marginBottom: '2rem'}}>
            <ProgressBarStyled width={`${progress}%`} color={'#CD1719'}/>
            <ProgressBarStyled width={`${100 - progress}%`} color={'#F9F9F9'}/>
        </div>
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