import { Dialog, Button, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, TextField } from "@material-ui/core";
import React, { useState } from "react";
import { IRegistrantSubmission } from "./Navbar";

interface IProps {
    open: boolean,
    handleClose: () => void,
    handleSubmit: (registrant: IRegistrantSubmission) => void,
    firstName?: string,
    lastName?: string,
    email?: string,
    age?: number
}

export default function RegistrantDialog(props: IProps) {

    const [firstName, setFirstName] = useState<string>(props.firstName || "");
    const [lastName, setLastName] = useState<string>(props.lastName || "");
    const [email, setEmail] = useState<string>(props.email || "");
    const [age, setAge] = useState<number>(props.age || 0);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const target = e.target;
        const name = target.name;
        const value = target.value;
        if (name === "firstName") {
            setFirstName(value);
        } else if (name === "lastName") {
            setLastName(value);
        } else if (name === "email") {
            setEmail(value);
        } else if (name === "age") {
            setAge(parseInt(value, 10));
        }
    };


    return (
        <Dialog open={props.open} onClose={props.handleClose} aria-labelledby="form-dialog-title" maxWidth="sm">
            <DialogTitle id="form-dialog-title">{props.firstName ? "Edit" : "Add"} Registrant</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Fill out the fields below to {props.firstName ? "edit the" : "add a new"} registrant.
                </DialogContentText>
                <Grid container spacing={2}>
                    <Grid item xs={12}><TextField label="First Name" name="firstName" fullWidth={true} onChange={handleChange} value={firstName} /></Grid>
                    <Grid item xs={12}><TextField label="Last Name" name="lastName" fullWidth={true} onChange={handleChange} value={lastName} /></Grid>
                    <Grid item xs={12}><TextField label="Email" name="email" fullWidth={true} onChange={handleChange} value={email} /></Grid>
                    <Grid item xs={12}><TextField label="Age" name="age" fullWidth={true} onChange={handleChange} value={age} /></Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.handleClose} color="default">
                    Cancel
                </Button>
                <Button onClick={() => {
                    props.handleSubmit({
                        firstName: firstName,
                        lastName: lastName,
                        email: email,
                        age: age
                    })
                }} color="primary">
                    {props.firstName ? "Save" : "Add"} Registrant
                </Button>
            </DialogActions>
        </Dialog>
    );
}
