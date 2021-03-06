
const patientZero = {
    patName: '',
    patOwnerName: '',
    patOwnerLname: '',
    species: 'pies'
}

const resultsZero = {
    id: new Date().valueOf(),
    date: new Date().toJSON().slice(0, 10).replace(/-/g, '-'),
    patientId: '',
    leukogram: {
        wbc: {
            nominal: 0,
            corrected: 'b.d.'
        },
        nrbc: 0,
        relative: {
            band: 0,
            seg: 0,
            lym: 0,
            mon: 0,
            eos: 0,
            bas: 0,
            pml: 0,
            mie: 0,
            met: 0,
            mlb: 0,
            inne: 0
        }
    }
}

// (results[item] * results.wbc / progress).toFixed(2) ==== obliczanie wartości bezwzględnej

export {patientZero, resultsZero}