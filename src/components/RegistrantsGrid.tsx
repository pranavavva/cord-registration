import { Grid, makeStyles } from "@material-ui/core";
import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import IRegistrant from "../models/IRegistrant";
import Registrant from "./Registrant";


const useStyles = makeStyles((theme) => ({
    gridContainer: {
        paddingTop: theme.spacing(1),
    }
}));


export default function RegistrantsGrid() {
    const [registrants, setRegistrants] = useState<IRegistrant[]>([]);

    useEffect(() => {
        axios.get("/api/registrants").then((res) => {
            setRegistrants(res.data);
        }).catch((err) => {
            console.log(err);
        });
    }, []);

    const classes = useStyles();

    return (
        <Grid container spacing={4} className={classes.gridContainer}>
            {registrants.map((registrant, index) => {
                return (
                    <Registrant registrant={registrant} key={index} />
                )
            })}
        </Grid>
    );
}
