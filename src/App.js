import React, {useEffect, useState} from 'react';
import {
    HashRouter,
    Route,
    Switch
} from 'react-router-dom';
import {Header} from "./components/Header/Header";
import {AddNewPatient} from "./views/AddNewPatient";
import {Leukogram} from "./views/Leukogram";
import {WBC} from "./views/WBC";
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
            wbc: 0
        }
    );
    const confirmPatient = patientToSave => setPatient(patientToSave);

    const sum = (a, b) => a+b;

    const handleAddCell = key => {
        setResults(prevState =>
            ({...prevState,
                [key]: prevState[key] + 1
            })
        );
    }

    useEffect(() => {
        setProgress(Object.values(results).reduce(sum));
    }, [results])

    return (
        <HashRouter>
            <>
                <Header />
                <Switch>
                    <Route exact path='/' render={() => (<AddNewPatient confirmPatient={confirmPatient}/>)}/>
                    <Route path='/leukogram' render={() => (<Leukogram patient={patient} progress={progress} handleAddCell={handleAddCell} results={results}/>)}/>
                    <Route path='/wbc' component={WBC}/>
                    <Route path='/results' component={Results}/>
                    </Switch>
                </>
        </HashRouter>
);
}

export default App;
