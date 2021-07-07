import {StyledTable} from "./Table.styles";
import propTypes from "prop-types";

const Table = ({patient, results}) => (
    <TableMarkup patient={patient} results={results} types={results ? Object.keys(results[0]) : null}/>
);

const TableMarkup = ({patient, results, types}) => (
    <StyledTable>
        <colgroup>
            <col/>
            <col/>
            <col/>
        </colgroup>
        <tbody>
        <tr>
            <td>właściciel:</td>
            <td colSpan="2">{patient.owner.name} {patient.owner.surname}</td>

        </tr>
        <tr>
            <td>pacjent:</td>
            <td colSpan="2">{patient.species} <strong>{patient.name}</strong></td>

        </tr>
        <tr>
            <td>data badania:</td>
            <td colSpan="2">{patient.date}</td>
        </tr>
        {results && <><tr>
            <td>WBC</td>
            <td colSpan="2">{results[1].wbc} <strong>G/l</strong></td>
        </tr>
        {types.map((item, index) => (
            <tr key={index}>
            <td>{item}</td>
            <td>{results[0][item]} %</td>
            <td>{results[0][item] * results[1].wbc / 100} G/l</td>
            </tr>
            ))}
            <tr>
            <td>nRBC</td>
            <td colSpan="2">{results[2].nrbc} / 100 WBC</td>
            </tr></>}
        </tbody>
    </StyledTable>
);

Table.propTypes = {
    /** patient is an object with data describing patient; mandatory props */
    patient: propTypes.object.isRequired,
    /** array with results, wbc MUST be in index 1, nRBC in 2, rest in object in index 1; optional props, without it table renders only part showing patient info */
    results: propTypes.array
}

Table.defaultProps = {
    patient: {
        name: "Reks",
        owner: {
            name: "Alina",
            surname: "Psiarska"
        },
        species: 'pies',
        date: "2021-07-07"

    }
}


export {Table}