import React from 'react';
import ReactDOM from 'react-dom';
import {
    HashRouter,
    Route,
    Link,
    Switch,
    NavLink,
} from 'react-router-dom';
import {Header} from "./components/Header/Header";
import {AddNewPatient} from "./views/AddNewPatient";
import {Leukogram} from "./views/Leukogram";
import {WBC} from "./views/WBC";
import {Results} from "./views/Results";

function App() {
    return (
        <HashRouter>
            <>
                <Header />
                <Switch>
                    <Route exact path='/' component={AddNewPatient}/>
                    <Route path='/leukogram' component={Leukogram}/>
                    <Route path='/wbc' component={WBC}/>
                    <Route path='/results' component={Results}/>
                    </Switch>
                </>
        </HashRouter>
);
}

export default App;
