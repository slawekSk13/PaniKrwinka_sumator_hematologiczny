import {StyledTable} from "./Table.styles";
import propTypes from "prop-types";

const Table = ({patient, results}) => (
    <TableMarkup patient={patient} results={results} types={results ? Object.keys(results) : null}/>
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
        {results && <>
            <tr>
                <td colSpan="3">&nbsp;</td>
            </tr>
            <tr>
            <td>WBC</td>
            <td colSpan="2"><strong>{results.wbc}</strong> G/l</td>
        </tr>
            {results.correctedWbc !== 0 && <tr>
                <td>skor. WBC</td>
                <td colSpan="2"><strong>{results.correctedWbc}</strong> G/l</td>
            </tr>}
        {types.map((item, index) => (
           item !== 'nrbc' && item !== 'wbc' && item !== 'correctedWbc' && <tr key={index}>
            <td>{item}</td>
                <td><strong>{results[item]}</strong> %</td>
            <td><strong>{(results[item] * results.wbc / 100).toFixed(2)}</strong> G/l</td>
            </tr>
            ))}
            <tr>
            <td>nRBC</td>
            <td colSpan="2"><strong>{results.nrbc} / 100</strong> WBC</td>
            </tr></>}
        </tbody>
    </StyledTable>
);

Table.propTypes = {
    /** patient is an object with data describing patient; mandatory props */
    patient: propTypes.object.isRequired,
    /** object with results, key is cell type name, value is given cell type count; optional props, without it table renders only part showing patient info */
    results: propTypes.object
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