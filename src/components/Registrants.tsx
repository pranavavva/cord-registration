import { CircularProgress, Grid, makeStyles, Paper, Typography } from "@material-ui/core";
import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import IRegistrant from "../models/IRegistrant";

const dateFromMillis = (millis: number): Date => {
    return new Date(millis + new Date().getTimezoneOffset() * 60000);
};


const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));


export default function Registrants() {
    const [registrants, setRegistrants] = useState<IRegistrant[]>([]);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        axios.get("/api/registrants").then((res) => {
            setRegistrants(res.data);
            setLoaded(true);
        }).catch((err) => {
            console.log(err);
            setLoaded(true);
        });
    }, []);

    const classes = useStyles();

    return (
        <div>
            {!loaded && <CircularProgress size={100} />}
            <Grid container spacing={3}>
                {registrants.map((registrant, index) => {
                    return (
                        <Grid item xs={12} md={6} lg={4} key={index}>
                            <Paper className={classes.paper} elevation={6}>
                                <Typography variant="h4" color="textPrimary">{registrant.firstName}&nbsp;{registrant.lastName}</Typography>
                                <Typography variant="body1" color="textPrimary">Age: {registrant.age}</Typography>
                                <Typography variant="body1" color="textPrimary">Email: {registrant.email}</Typography>
                                <Typography variant="body1" color="textPrimary">Registrantion Date: {dateFromMillis(registrant.registrationDate.$date).toLocaleDateString()}</Typography>
                                <Typography variant="body1" color="textPrimary">Registrant ID: {registrant.registrantId}</Typography>
                            </Paper>
                        </Grid>

                    )
                })}
            </Grid>
        </div>
    );
}
