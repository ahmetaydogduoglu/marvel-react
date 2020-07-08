import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
//scenes
import Home from "./scenes/Home";
import Detail from "./scenes/Detail"
import Comics from "./scenes/Comics"
// import Navbar from "./components/Navbar/Navbar"

function App() {
  return (
    <>
      {/* <Navbar /> */}
      <Router >
        <Switch>
          <Redirect from="/" to={"/home/1"} exact />
          <Route path="/home/:pageNumber" exact component={Home} />
          <Route path="/detail/:id" exact component={Detail} />
          <Route path="/comics" exact >
            <Comics />
          </Route>
          <Route path="*" >
            <h1>Not Found!</h1>
          </Route>
        </Switch>
      </Router>
    </>

  );
}

export default App;
