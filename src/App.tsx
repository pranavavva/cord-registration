import React, { useEffect, useState } from "react";
import axios from "axios";
import IRegistrant from "./models/IRegistrant";

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

    return (
        <div className="App">
            <header className="App-header">
                {registrants.map((registrant, index) => {
                    return (
                        <React.Fragment key={index}>
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
                        </React.Fragment>
                    )
                })}
            </header>
        </div>
    );
}

export default App;
