import {ListItemStyled} from "./ListItem.styles"
import propTypes from "prop-types";
import {ColorTheme} from "../../utilities/ColorTheme";

const ListItem = ({result, onClick, results}) => {
    return (<ColorTheme.Consumer>
        {colors => <ListItemStyled
            onClick={() => onClick(result.patientId, results)} colors={colors}>{result.patient.patOwnerName} {result.patient.patOwnerLname}, {result.patient.species}
            <strong> {result.patient.patName}</strong>, {result.date} </ListItemStyled>}
    </ColorTheme.Consumer>)
}

ListItem.propTypes = {
    /** results object */
    result: propTypes.object,
    /** patient object */
    patient: propTypes.object,
}

ListItem.defaultProps = {
    result: {
        date: '2021-06-99'
    }
}

export {ListItem}