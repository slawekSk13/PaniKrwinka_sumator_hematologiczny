import pdfMake from 'pdfmake/build/pdfmake'
import pdfFonts from 'pdfmake/build/vfs_fonts'

const createNewPdf = (patient, results) => {

    const docDefinition = {
        content: [
            {
                layout: 'lightHorizontalLines', // optional
                table: {
                    // headers are automatically repeated if the table spans over multiple pages
                    // you can declare how many rows should be treated as headers
                    heights: 30,
                    headerRows: 3,
                    widths: [ 'auto', 'auto', 'auto' ],
                    body: [
                        [ { text: 'Właściciel:', bold: true }, `${patient.owner.name} ${patient.owner.surname}`, ''],
                        [  { text: 'Pacjent:', bold: true }, `${patient.species} ${patient.name}`, ''],
                        [ { text: 'Data badania', bold: true }, `${patient.date}`, ''],
                        [ '', '', ''],
                        [{ text: 'WBC', bold: true }, `${results.wbc} G/l`, ''],
                        [{ text: 'skor. WBC', bold: true }, `${results.correctedWbc} G/l`, ''],
                        [{ text: 'band', bold: true }, `${results.band} %`, `${(results.band * results.wbc / 100).toFixed(2)} G/l`],
                        [{ text: 'seg', bold: true }, `${results.seg} %`, `${(results.seg * results.wbc / 100).toFixed(2)} G/l`],
                        [{ text: 'lym', bold: true }, `${results.lym} %`, `${(results.lym * results.wbc / 100).toFixed(2)} G/l`],
                        [{ text: 'mon', bold: true }, `${results.mon} %`, `${(results.mon * results.wbc / 100).toFixed(2)} G/l`],
                        [{ text: 'eos', bold: true }, `${results.eos} %`, `${(results.eos * results.wbc / 100).toFixed(2)} G/l`],
                        [{ text: 'bas', bold: true }, `${results.bas} %`, `${(results.bas * results.wbc / 100).toFixed(2)} G/l`],
                        [{ text: 'pml', bold: true }, `${results.pml} %`, `${(results.pml * results.wbc / 100).toFixed(2)} G/l`],
                        [{ text: 'mie', bold: true }, `${results.mie} %`, `${(results.mie * results.wbc / 100).toFixed(2)} G/l`],
                        [{ text: 'met', bold: true }, `${results.met} %`, `${(results.met * results.wbc / 100).toFixed(2)} G/l`],
                        [{ text: 'mlb', bold: true }, `${results.mlb} %`, `${(results.mlb * results.wbc / 100).toFixed(2)} G/l`],
                        [{ text: 'inne', bold: true }, `${results.inne} %`, `${(results.inne * results.wbc / 100).toFixed(2)} G/l`],
                        [{ text: 'nRBC', bold: true }, `${results.nrbc} / 100 WBC`, '']
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
            color: '#951B81',
            fontSize: 22
        },
        pageMargins: [100, 100, 60, 40]
    };
 return docDefinition;
}

const download = (patient, results) => pdfMake.createPdf(createNewPdf(patient, results)).download(patient.name);
const print = (patient, results) => pdfMake.createPdf(createNewPdf(patient, results)).print();

export {download, print}