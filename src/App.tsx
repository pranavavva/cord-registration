import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import axios from "axios";

interface IMongoDate {
    $date: number;
}

interface IMongoId {
    $oid: string;
}

interface IRegistrant {
    _id: IMongoId;
    age: number;
    firstName: string;
    lastName: string;
    email: string;
    registrantId: number;
    registrationDate: IMongoDate;
}

const dateFromMillis = (millis: number): Date => {
    return new Date(millis + new Date().getTimezoneOffset() * 60000);
};

function App() {
    const [registrants, setRegistrants] = useState<IRegistrant[]>([]);

    useEffect(() => {
        axios.get("/api/registrants").then((res) => {
            setRegistrants(res.data)
        });
    }, []);

    const people = [];

    for (let registrant of registrants) {
        people.push(
            <>
                <div>
                    <h3>
                        {registrant.firstName} {registrant.lastName}
                    </h3>
                    <p>Age: {registrant.age}</p>
                    <p>Email: {registrant.email}</p>
                    <p>Registant ID: {registrant.registrantId}</p>
                    <p>Registration Date: {dateFromMillis(registrant.registrationDate.$date).toLocaleDateString()}</p>
                </div>
                <hr />
            </>
        );
    }

    console.log(registrants)

    return (
        <div className="App">
            <header className="App-header">
                <Router>
                    <div>
                        <Link className="App-link" to="/">
                            Home
                        </Link>
                        &nbsp;|&nbsp;
                        <Link className="App-link" to="/page2">
                            Page2
                        </Link>
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
