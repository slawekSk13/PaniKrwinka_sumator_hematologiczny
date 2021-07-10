import pdfMake from 'pdfmake/build/pdfmake'
import pdfFonts from 'pdfmake/build/vfs_fonts'

const createNewPdf = (patient, results, date, progress) => {

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
                        [ { text: 'Data badania', bold: true }, `${date}`, ''],
                        [ '', '', ''],
                        [{ text: 'WBC', bold: true }, `${results.wbc} G/l`, ''],
                        [{ text: 'skor. WBC', bold: true }, progress > 99 ? `${results.correctedWbc} G/l` : 'b.d.' , ''],
                        [{ text: 'band', bold: true }, `${(results.band / progress * 100).toFixed(2)} %`, `${(results.band * results.wbc / progress).toFixed(2)} G/l`],
                        [{ text: 'seg', bold: true }, `${(results.seg / progress * 100).toFixed(2)} %`, `${(results.seg * results.wbc / progress).toFixed(2)} G/l`],
                        [{ text: 'lym', bold: true }, `${(results.lym / progress * 100).toFixed(2)} %`, `${(results.lym * results.wbc / progress).toFixed(2)} G/l`],
                        [{ text: 'mon', bold: true }, `${(results.mon / progress * 100).toFixed(2)} %`, `${(results.mon * results.wbc / progress).toFixed(2)} G/l`],
                        [{ text: 'eos', bold: true }, `${(results.eos / progress * 100).toFixed(2)} %`, `${(results.eos * results.wbc / progress).toFixed(2)} G/l`],
                        [{ text: 'bas', bold: true }, `${(results.bas / progress * 100).toFixed(2)} %`, `${(results.bas * results.wbc / progress).toFixed(2)} G/l`],
                        [{ text: 'pml', bold: true }, `${(results.pml / progress * 100).toFixed(2)} %`, `${(results.pml * results.wbc / progress).toFixed(2)} G/l`],
                        [{ text: 'mie', bold: true }, `${(results.mie / progress * 100).toFixed(2)} %`, `${(results.mie * results.wbc / progress).toFixed(2)} G/l`],
                        [{ text: 'met', bold: true }, `${(results.met / progress * 100).toFixed(2)} %`, `${(results.met * results.wbc / progress).toFixed(2)} G/l`],
                        [{ text: 'mlb', bold: true }, `${(results.mlb / progress * 100).toFixed(2)} %`, `${(results.mlb * results.wbc / progress).toFixed(2)} G/l`],
                        [{ text: 'inne', bold: true }, `${(results.inne / progress * 100).toFixed(2)} %`, `${(results.inne * results.wbc / progress).toFixed(2)} G/l`],
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

const download = (patient, results, date, progress) => pdfMake.createPdf(createNewPdf(patient, results, date, progress)).download(`${patient.name}_${date}`);
const print = (patient, results, date, progress) => pdfMake.createPdf(createNewPdf(patient, results, date, progress)).print();

export {download, print}