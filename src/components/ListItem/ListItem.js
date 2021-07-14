import {ListItemStyled} from "./ListItem.styles"
import propTypes from "prop-types";

const ListItem = ({result, onClick}) => <ListItemStyled onClick={()=>onClick(result.patientId)}>{result.patient.patOwnerName} {result.patient.patOwnerLname}, {result.patient.species} <strong>{result.patient.patName}</strong>, {result.date} </ListItemStyled>

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