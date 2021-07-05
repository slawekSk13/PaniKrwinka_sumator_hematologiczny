
import React from 'react';
import ReactDOM from 'react-dom';
import {
  HashRouter,
  Route,
  Link,
  Switch,
  NavLink,
} from 'react-router-dom';
import Main from "./components/Main";
import Main2 from "./components/Main2";
import Main3 from "./components/Main3";

function App() {
  return (
      <HashRouter>
   <>
   <Route exact path='/' component={Main} />
       <Route path='/button' component={Main2} />
       <Route path='/buttonznapisem/:text' component={Main3} />
   </>
      </HashRouter>
  );
}

export default App;
