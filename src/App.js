import React from 'react';
import ReactDOM from 'react-dom';
import {
    HashRouter,
    Route,
    Link,
    Switch,
    NavLink,
} from 'react-router-dom';
import {Main} from "./views/Main";
import {Main3} from "./views/Main3";
import {Header} from "./components/Header/Header";
import {AddNewPatient} from "./views/AddNewPatient";

function App() {
    return (
        <HashRouter>
            <>
                <Header />
                <Switch>
                    <Route exact path='/' component={Main}/>
                    <Route path='/button' component={AddNewPatient}/>
                    <Route path='/buttonznapisem/:text' component={Main3}/>
                    </Switch>
                </>
        </HashRouter>
);
}

export default App;
