import {StyledTable} from "./Table.styles";
import propTypes from "prop-types";

const Table = ({patient, results}) => (
    <TableMarkup patient={patient} results={results} types={Object.keys(results[0])}/>
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
            <td>{patient.owner.name} {patient.owner.surname}</td>
            <td/>
        </tr>
        <tr>
            <td>pacjent:</td>
            <td>{patient.species} <strong>{patient.name}</strong></td>

            <td/>
        </tr>
        <tr>
            <td>data badania:</td>
            <td>{patient.date}</td>
            <td/>
        </tr>
        <tr>
            <td>WBC</td>
            <td>{results[1].wbc} <strong>G/l</strong></td>
            <td/>
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
            <td>{results[2].nrbc} / 100 WBC</td>
            <td/>
        </tr>
        </tbody>
    </StyledTable>
);

Table.propTypes = {
    /** patient is an object with data describing patient */
    patient: propTypes.object,
    /** array with results, wbc MUST be in index 1, nRBC in 2, rest in object in index 1 */
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

    },
    results: [
        {
            band: 15,
            seg: 6,
            lym: 10,
            mon: 15,
            eos: 1,
            bas: 12,
            pml: 10,
            mie: 7,
            met: 12,
            inne: 2
        },
        {wbc: 13.5},
        {
            nrbc: 5
        }
    ]
}


export {Table}