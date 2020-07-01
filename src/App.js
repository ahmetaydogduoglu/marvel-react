import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
//scenes
import Home from "./scenes/Home";
import Detail from "./scenes/Detail"
// import Navbar from "./components/Navbar/Navbar"

function App() {
  return (
    <>
      {/* <Navbar /> */}
      <Router >
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/detail/:id" exact component={Detail} />
          <Route path="*" >
            <h1>Not Found!</h1>
          </Route>
        </Switch>
      </Router>
    </>

  );
}

export default App;
