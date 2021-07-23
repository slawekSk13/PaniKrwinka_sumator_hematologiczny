import {ProgressBarStyled} from "./ProgressBar.styles";
import propTypes from "prop-types";
import {ColorTheme} from "../../utilities/ColorTheme";

const ProgressBar = ({progress}) => {
    return (<ColorTheme.Consumer>
            {colors => <div style={{width: '95%', marginBottom: '2rem'}}>
                <ProgressBarStyled width={`${progress}%`} color={colors.accentColor}/>
                <ProgressBarStyled width={`${100 - progress}%`} color={colors.progressBarNegativeColor}/>
            </div>}
        </ColorTheme.Consumer>
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