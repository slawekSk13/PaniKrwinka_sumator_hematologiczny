import pdfMake from 'pdfmake/build/pdfmake'
import {ColorThemeObj} from "./ColorTheme";

const createNewPdf = (patient, results, progress) => {

    const docDefinition = {
        content: [
            {
                layout: 'lightHorizontalLines', // optional
                table: {
                    // headers are automatically repeated if the table spans over multiple pages
                    // you can declare how many rows should be treated as headers
                    heights: 30,
                    headerRows: 1,
                    widths: [ 'auto', 'auto', 'auto' ],
                    body: [
                        [  { text: 'Pacjent:', bold: true }, `${patient.species} ${patient.patName}`, ''],
                        [ { text: 'Właściciel:', bold: true }, `${patient.patOwnerName} ${patient.patOwnerLname}`, ''],
                        [ { text: 'Data badania', bold: true }, `${results.date}`, ''],
                        [ '', '', ''],
                        [{ text: 'WBC', bold: true }, `${results.leukogram.wbc.nominal} G/l`, ''],
                        [{ text: 'skor. WBC', bold: true }, progress > 99 ? `${results.leukogram.wbc.corrected} G/l` : 'b.d.' , ''],
                        [{ text: 'band', bold: true }, `${(results.leukogram.relative.band / progress * 100).toFixed(2)} %`, `${(results.leukogram.relative.band * (results.leukogram.wbc.corrected === 'b.d.' ? results.leukogram.wbc.nominal : results.leukogram.wbc.corrected) / progress).toFixed(2)} G/l`],
                        [{ text: 'seg', bold: true }, `${(results.leukogram.relative.seg / progress * 100).toFixed(2)} %`, `${(results.leukogram.relative.seg * (results.leukogram.wbc.corrected === 'b.d.' ? results.leukogram.wbc.nominal : results.leukogram.wbc.corrected) / progress).toFixed(2)} G/l`],
                        [{ text: 'lym', bold: true }, `${(results.leukogram.relative.lym / progress * 100).toFixed(2)} %`, `${(results.leukogram.relative.lym * (results.leukogram.wbc.corrected === 'b.d.' ? results.leukogram.wbc.nominal : results.leukogram.wbc.corrected) / progress).toFixed(2)} G/l`],
                        [{ text: 'mon', bold: true }, `${(results.leukogram.relative.mon / progress * 100).toFixed(2)} %`, `${(results.leukogram.relative.mon * (results.leukogram.wbc.corrected === 'b.d.' ? results.leukogram.wbc.nominal : results.leukogram.wbc.corrected) / progress).toFixed(2)} G/l`],
                        [{ text: 'eos', bold: true }, `${(results.leukogram.relative.eos / progress * 100).toFixed(2)} %`, `${(results.leukogram.relative.eos * (results.leukogram.wbc.corrected === 'b.d.' ? results.leukogram.wbc.nominal : results.leukogram.wbc.corrected) / progress).toFixed(2)} G/l`],
                        [{ text: 'bas', bold: true }, `${(results.leukogram.relative.bas / progress * 100).toFixed(2)} %`, `${(results.leukogram.relative.bas * (results.leukogram.wbc.corrected === 'b.d.' ? results.leukogram.wbc.nominal : results.leukogram.wbc.corrected) / progress).toFixed(2)} G/l`],
                        [{ text: 'pml', bold: true }, `${(results.leukogram.relative.pml / progress * 100).toFixed(2)} %`, `${(results.leukogram.relative.pml * (results.leukogram.wbc.corrected === 'b.d.' ? results.leukogram.wbc.nominal : results.leukogram.wbc.corrected) / progress).toFixed(2)} G/l`],
                        [{ text: 'mie', bold: true }, `${(results.leukogram.relative.mie / progress * 100).toFixed(2)} %`, `${(results.leukogram.relative.mie * (results.leukogram.wbc.corrected === 'b.d.' ? results.leukogram.wbc.nominal : results.leukogram.wbc.corrected) / progress).toFixed(2)} G/l`],
                        [{ text: 'met', bold: true }, `${(results.leukogram.relative.met / progress * 100).toFixed(2)} %`, `${(results.leukogram.relative.met * (results.leukogram.wbc.corrected === 'b.d.' ? results.leukogram.wbc.nominal : results.leukogram.wbc.corrected) / progress).toFixed(2)} G/l`],
                        [{ text: 'mlb', bold: true }, `${(results.leukogram.relative.mlb / progress * 100).toFixed(2)} %`, `${(results.leukogram.relative.mlb * (results.leukogram.wbc.corrected === 'b.d.' ? results.leukogram.wbc.nominal : results.leukogram.wbc.corrected) / progress).toFixed(2)} G/l`],
                        [{ text: 'inne', bold: true }, `${(results.leukogram.relative.inne / progress * 100).toFixed(2)} %`, `${(results.leukogram.relative.inne * (results.leukogram.wbc.corrected === 'b.d.' ? results.leukogram.wbc.nominal : results.leukogram.wbc.corrected) / progress).toFixed(2)} G/l`],
                        [{ text: 'nRBC', bold: true }, `${results.leukogram.nrbc} / ${progress} WBC`, '']
                    ]
                }
            }
        ],
        footer: {
            text: [`Pani Krwinka - szkolenia weterynaryjne - `, {text: 'www.panikrwinka.pl', link: 'https://panikrwinka.pl/'}],
            fontSize: 10,
            alignment: 'center'
        },
        defaultStyle: {
            color: `${ColorThemeObj.primaryColor}`,
            fontSize: 22
        },
        pageMargins: [100, 100, 60, 40]
    };
 return docDefinition;
}

const download = (patient, results, date, progress) => pdfMake.createPdf(createNewPdf(patient, results, date, progress)).download(`${patient.name}_${date}`);
const print = (patient, results, date, progress) => pdfMake.createPdf(createNewPdf(patient, results, date, progress)).print();

export {download, print}