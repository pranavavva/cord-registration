import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import axios from 'axios';

interface Registrant {
    _id: any;
    age: number;
    first_name: string;
    last_name: string;
    email: string;
    registrant_id: number;
    registration_date: any;
}

const convertUTCDateToLocalDate = (date: Date): Date => {
    let newDate = new Date(date.getTime() + date.getTimezoneOffset() * 60 * 1000);

    let offset = date.getTimezoneOffset() / 60;
    let hours = date.getHours();

    newDate.setHours(hours - offset);

    return newDate;
}

function App() {

    const [registrants, setRegistrants]: [Registrant[], any] = useState([]);

    useEffect(() => {
        axios.get("/api/registrants").then((res) => {
            setRegistrants(res.data)
            console.log(res.data)
        })
    }, [])

    const people = [];

    for (let registrant of registrants) {
        people.push(
            <>
                <div>
                    <h3>{registrant.first_name} {registrant.last_name}</h3>
                    <p>Age: {registrant.age}</p>
                    <p>Email: {registrant.email}</p>
                    <p>Registant ID: {registrant.registrant_id}</p>
                    <p>Registration Date: {convertUTCDateToLocalDate(new Date(registrant.registration_date.$date)).toLocaleDateString()}</p>
                </div>
                <hr />
            </>
        )
    }

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
                            {people}
                        </Route>
                        <Route exact path="/page2">
                            <p>This is page 2!</p>
                        </Route>
                    </Switch>
                </Router>
            </header>
        </div>
    );
}

export default App;
