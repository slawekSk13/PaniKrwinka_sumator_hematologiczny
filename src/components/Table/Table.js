import {StyledTable} from "./Table.styles";
import propTypes from "prop-types";

const Table = ({patient, results, progress, calcFinished}) => {
    return <TableMarkup patient={patient} results={results} progress={progress ? progress : null}
                        calcFinished={calcFinished}/>
};

const TableMarkup = ({patient, results, progress, calcFinished}) => {

    const types = Object.keys(results.leukogram.relative);
    const date = results.date;
    const renderResults = calcFinished && progress > 1 && results.leukogram.wbc.nominal > 0;
    return (
        <StyledTable>
            <colgroup>
                <col/>
                <col/>
                <col/>
            </colgroup>
            <tbody>
            <tr>
                <td>właściciel:</td>
                <td colSpan="2">{patient.patOwnerName} {patient.patOwnerLname}</td>

            </tr>
            <tr>
                <td>pacjent:</td>
                <td colSpan="2">{patient.species} <strong>{patient.patName}</strong></td>

            </tr>
            <tr>
                <td>data badania:</td>
                <td colSpan="2">{date}</td>
            </tr>
            {renderResults && <>
                <tr>
                    <td colSpan="3">&nbsp;</td>
                </tr>
                <tr>
                    <td>WBC</td>
                    <td colSpan="2"><strong>{results.leukogram.wbc.nominal}</strong> G/l</td>
                </tr>
                {results.leukogram.wbc.corrected !== 'b.d.' && progress > 99 && <tr>
                    <td>skor. WBC</td>
                    <td colSpan="2"><strong>{results.leukogram.wbc.corrected}</strong> G/l</td>
                </tr>}
                {types.map((item, index) => (
                    <tr key={index}>
                        <td>{item}</td>
                        <td><strong>{(results.leukogram.relative[item] / progress * 100).toFixed()}</strong> %</td>
                        <td><strong>{(results.leukogram.relative[item] * (results.leukogram.wbc.corrected === 'b.d.' ? results.leukogram.wbc.nominal : results.leukogram.wbc.corrected) / progress).toFixed(2)}</strong> G/l</td>
                    </tr>
                ))}
                <tr>
                    <td>nRBC</td>
                    <td colSpan="2"><strong>{results.leukogram.nrbc} / {progress}</strong> WBC</td>
                </tr>
            </>}
            </tbody>
        </StyledTable>
    )
};

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