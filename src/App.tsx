import React, { useEffect, useState } from 'react';
import {BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

function App() {

    const [time, setTime] = useState(0);

    useEffect(() => {
        axios.get("/api/time").then(res => res.data).then(data => {
            setTime(data.time);
        })
    }, [])


    return (
        <div className="App">
      <header className="App-header">
        <Router>
          <div>
            <Link className="App-link" to="/">Home</Link>
            &nbsp;|&nbsp;
            <Link className="App-link" to="/page2">Page2</Link>
          </div>
          <Switch>
            <Route exact path="/">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                  Edit <code>src/App.js</code> and save to reload.
                </p>
                <a
                  className="App-link"
                  href="https://reactjs.org"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Learn React
                </a>
                <p>The current time is {time}.</p>
            </Route>
            <Route path="/page2">
                <p>This is page 2!</p>
            </Route>
          </Switch>
        </Router>
      </header>
    </div>
    );
}

export default App;
