import React, {useEffect, useState} from 'react';
import {
    HashRouter,
    Route,
    Switch,
    Redirect
} from 'react-router-dom';
import {Header} from "./components/Header/Header";
import {AddNewPatient} from "./views/AddNewPatient";
import {Leukogram} from "./views/Leukogram";
import {Results} from "./views/Results";

function App() {
    const [patient, setPatient] = useState();
    const [progress, setProgress] = useState(0);
    const [results, setResults] = useState(
        {
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
            inne: 0,
            nrbc: 0,
            wbc: 0,
            correctedWbc: 0
        }
    );
    const [date, setDate] = useState(new Date().toJSON().slice(0, 10).replace(/-/g, '-'));

    const confirmPatient = patientToSave => setPatient(patientToSave);

    const sum = (a, b) => a + b;

    const handleAddCell = (key, value) => {
        if (key === 'wbc') {
            if (results.nrbc < 5) {
                setResults(prevState => ({
                    ...prevState,
                    [key]: value
                }));
            } else {
                const correctedWbc = ((value * 100) / (100 + results.nrbc)).toFixed(2);
                setResults(prevState => ({
                    ...prevState,
                    wbc: value,
                    correctedWbc: correctedWbc
                }));
            }
        } else
            setResults(prevState => {
            navigator.vibrate(100);
                    return ({
                        ...prevState,
                        [key]: prevState[key] + 1
                    })
                }
            );
    }

    useEffect(() => {
        // setProgress(100);
        setProgress(Object.values(results).splice(0, 11).reduce(sum));
    }, [results]);

    const reset = () => {
        setPatient();
        setProgress(0);
        setResults({
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
            inne: 0,
            nrbc: 0,
            wbc: 0,
            correctedWbc: 0
        });
        setDate(new Date().toJSON().slice(0, 10).replace(/-/g, '-'));
    }

    return (
        <HashRouter>
                <Header/>
                <Switch>
                    <Route exact path='/'><AddNewPatient confirmPatient={confirmPatient}/></Route>
                    <Route path='/leukogram'>
                        {patient ? <Leukogram patient={patient} progress={progress} handleAddCell={handleAddCell}
                                              results={results} date={date}/> : <Redirect to='/'/>}
                    </Route>
                    <Route path='/results'>
                        {results.wbc ? <Results results={results} patient={patient} reset={reset} date={date} progress={progress}/> :
                            <Redirect to='/leukogram'/>}
                    </Route>
                    <Route>
                        <Redirect to='/results'/>
                    </Route>
                </Switch>
        </HashRouter>
    );
}

export default App;
