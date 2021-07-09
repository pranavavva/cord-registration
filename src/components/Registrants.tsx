import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import IRegistrant from "../models/IRegistrant";

const dateFromMillis = (millis: number): Date => {
    return new Date(millis + new Date().getTimezoneOffset() * 60000);
};


export default function Registrants(props: any): any {
    const [registrants, setRegistrants] = useState<IRegistrant[]>([]);

    useEffect(() => {
        axios.get("/api/registrants").then((res) => {
            setRegistrants(res.data)
        });
    }, []);

    return (
        <>
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
        </>
    );
}