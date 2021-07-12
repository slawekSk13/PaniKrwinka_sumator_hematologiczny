import React, {useEffect, useState} from 'react';
import {
    HashRouter,
    Route,
    Switch,
    Redirect
} from 'react-router-dom';
import {v4 as uuid} from 'uuid';
import {Header} from "./components/Header/Header";
import {AddNewPatient} from "./views/AddNewPatient";
import {Leukogram} from "./views/Leukogram";
import {Results} from "./views/Results";
import {Icon} from "./components/Icon/Icon";
import {getResults} from "./utilities/api/get";
import {postResults} from "./utilities/api/post";

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
            correctedWbc: 'b.d.',
            id: uuid()
        }
    );
    const [date, setDate] = useState(new Date().toJSON().slice(0, 10).replace(/-/g, '-'));

    const confirmPatient = patientToSave => setPatient({...patientToSave, id: uuid()});

    const sum = (a, b) => a + b;

    const handleAddCell = (key, value) => {
        if (key === 'wbc') {
            if (results.nrbc < 5 || progress < 100) {
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

    const handleData = data => console.log(data);

    useEffect(() => {
        // setProgress(100);
        setProgress(Object.values(results).splice(0, 11).reduce(sum));
    }, [results]);

    useEffect(() => {
        getResults(handleData);
    }, []);

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
            correctedWbc: 'b.d.',
            id: uuid()
        });
        setDate(new Date().toJSON().slice(0, 10).replace(/-/g, '-'));
        getResults(handleData);
    }

    const save = () => {
        postResults(results);
    }

    return (
        <HashRouter>
                <Header/>
            {patient && <Icon icon='exit' onClick={reset}/>}
                <Switch>
                    <Route exact path='/'><AddNewPatient confirmPatient={confirmPatient} patient={patient}/></Route>
                    <Route path='/leukogram'>
                        {patient ? <Leukogram patient={patient} progress={progress} handleAddCell={handleAddCell}
                                              results={results} date={date} reset={reset}/> : <Redirect to='/'/>}
                    </Route>
                    <Route path='/results'>
                        {results.wbc ? <Results results={results} patient={patient} save={save} reset={reset} date={date} progress={progress}/> :
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
