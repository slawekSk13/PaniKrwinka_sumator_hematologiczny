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
import {Icon} from "./components/Icon/Icon";
import {getFromAPI} from "./utilities/api/get";
import {postToAPI} from "./utilities/api/post";
import {patientZero, resultsZero} from "./utilities/defaultStates";
import {NewOrHistory} from "./views/NewOrHistory";

function App() {
    const [patient, setPatient] = useState(patientZero);
    const [progress, setProgress] = useState(0);
    const [results, setResults] = useState(resultsZero);
    const [calcFinished, setCalcFinished] = useState(false);
    const [historicalResults, setHistoricalResults] = useState();
    const [historicalPatients, setHistoricalPatients] = useState();

    const confirmPatient = patientToSave => {
        setPatient(patientToSave);
        save('patient');
    };

    const sum = (a, b) => a + b;

    const handleAddCell = (key, value) => {
        if (key === 'wbc') {
            const corrWbc = results.leukogram.nrbc < 5 ? value : (progress < 100 ? 'b.d.' : ((value * 100) / (100 + results.leukogram.nrbc)).toFixed(2));
            setResults(prevState => ({
                ...prevState,
                leukogram: {
                    ...prevState.leukogram,
                    wbc: {
                        nominal: value,
                        corrected: corrWbc
                    }
                }
            }));
        } else {
            navigator.vibrate(100);
            if (key === 'nrbc') {
                setResults(prevState => ({
                    ...prevState,
                    leukogram: {
                        ...prevState.leukogram,
                        nrbc: prevState.leukogram.nrbc + 1
                    }
                }));
            } else {
                setResults(prevState => {
                        return ({
                            ...prevState,
                            leukogram: {
                                ...prevState.leukogram,
                                relative: {
                                    ...prevState.leukogram.relative,
                                    [key]: prevState.leukogram.relative[key] + 1
                                }
                            }
                        })
                    }
                );
            }
            setCalcFinished(false);
        }

        progress >= 99 && setCalcFinished(true);
    }

    const handleData = (data, path) => {
       path === 'results' ? setHistoricalResults(data) : setHistoricalPatients(data);
    };

    useEffect(() => {
        // setProgress(100);
        setProgress(Object.values(results.leukogram.relative).reduce(sum));
    }, [results]);

    useEffect(() => {
        getFromAPI(handleData, 'results');
        getFromAPI(handleData, 'patients');
    }, []);

    useEffect(() => {
        setResults(prevState => ({
            ...prevState,
            patientId: patient.id
        }));
    }, [patient]);

    const reset = () => {
        setPatient(patientZero);
        setProgress(0);
        setResults(resultsZero);
        getFromAPI(handleData, 'results');
        getFromAPI(handleData, 'patients');
    }

    const handleCalcFinish = () => {
        setCalcFinished(true);
    }

    const save = saveType => {
       if (saveType === 'results') {
           postToAPI(results, 'results');
           reset();
       } else if (saveType === 'patient') {
           postToAPI(patient, 'patients')
       }

    }

    return (
        <HashRouter>
            <Header/>
            {patient !== patientZero && <Icon icon='exit' onClick={reset}/>}
            <Switch>
                <Route exact path='/'><NewOrHistory /></Route>
                <Route path='/addnewpatient'><AddNewPatient confirmPatient={confirmPatient} patient={patient}/></Route>
                <Route path='/leukogram'>
                    {patient !== patientZero ? <Leukogram patient={patient} progress={progress} handleAddCell={handleAddCell}
                                          results={results} reset={reset} handleCalcFinish={handleCalcFinish}
                                          calcFinished={calcFinished}/> : <Redirect to='/'/>}
                </Route>
                <Route path='/results'>
                    {results.leukogram.wbc.nominal !== 0 ? <Results results={results} patient={patient} save={save} reset={reset}
                                            progress={progress} calcFinished={calcFinished}/> :
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
