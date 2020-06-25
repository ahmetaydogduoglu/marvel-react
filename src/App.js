import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import Home from "./scenes/Home";
import Detail from "./scenes/Detail"


function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/detail/:id" exact>
          <Detail />
        </Route>
        <Route path="*" >
          <h1>Not Found!</h1>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
