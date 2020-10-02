import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from "./components/Login"
import Register from './components/Register';
import Home from "./components/Home"

function App() {
  return (
    <Router>
        <Switch>
          <Route path="/" exact component={Home}/>
          <Route  path = "/login" component = {Login}/>
          <Route  path = "/register" component = {Register}/>
        </Switch>
    </Router>
  );
}

export default App;
