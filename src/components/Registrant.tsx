import { Avatar, Card, CardContent, CardHeader, Grid, IconButton, makeStyles, Typography, Menu, MenuItem } from "@material-ui/core";
import React, { MouseEvent, useState } from "react";
import IRegistrant from "../models/IRegistrant";
import { MoreVert } from "@material-ui/icons";
import { deleteRegistrantById, updateRegistrantById } from "../api/RegistrantsAPI";
import RegistrantDialog from "./RegistrantDialog";
import { IRegistrantSubmission } from "./Navbar";

const dateFromMillis = (millis: number): Date => {
    return new Date(millis + new Date().getTimezoneOffset() * 60000);
};

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    avatar: {
        backgroundColor: theme.palette.primary.main
    }
}));

interface IProps {
    registrant: IRegistrant
}

export default function Registrant(props: IProps) {

    const [dialogOpen, setDialogOpen] = useState<boolean>(false);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const classes = useStyles();

    const handleMenuClick = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        setAnchorEl(event.currentTarget);
    }

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleDialogOpen = () => {
        handleMenuClose();
        setDialogOpen(true);
    };

    const handleDialogClose = () => {
        setDialogOpen(false);
    };

    const handleDialogSubmit = (registrant: IRegistrantSubmission) => {
        handleDialogClose();

        updateRegistrantById(props.registrant.registrantId, {
            firstName: registrant.firstName,
            lastName: registrant.lastName,
            age: registrant.age,
            email: registrant.email,
            registrationDate: new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60 * 1000).toISOString().split("T")[0]
        });
    }

    const handleDelete = () => {
        handleMenuClose();
        deleteRegistrantById(props.registrant.registrantId);
    };

    return (
        <Grid item xs={12} md={6} lg={4}>
            <Card>
                <CardHeader
                    avatar={
                        <Avatar aria-label="" className={classes.avatar}>
                            {props.registrant.firstName[0] + props.registrant.lastName[0]}
                        </Avatar>
                    }
                    action={
                        <IconButton aria-label="" onClick={handleMenuClick}>
                            <MoreVert />
                        </IconButton>
                    }
                    title={<Typography variant="h5" color="textPrimary">{props.registrant.firstName}&nbsp;{props.registrant.lastName}</Typography>}
                />

                <Menu
                    id="options-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                >
                    <MenuItem onClick={handleDialogOpen}>Edit...</MenuItem>
                    <MenuItem onClick={handleDelete}>Delete</MenuItem>
                </Menu>

                <CardContent>
                    <Typography variant="body1" color="textPrimary">Age: {props.registrant.age}</Typography>
                    <Typography variant="body1" color="textPrimary">Email: {props.registrant.email}</Typography>
                    <Typography variant="body1" color="textPrimary">Registrantion Date: {dateFromMillis(props.registrant.registrationDate.$date).toLocaleDateString()}</Typography>
                    <Typography variant="body1" color="textPrimary">Registrant ID: {props.registrant.registrantId}</Typography>
                </CardContent>
            </Card>
            <RegistrantDialog open={dialogOpen} handleClose={handleDialogClose} handleSubmit={handleDialogSubmit}
             firstName={props.registrant.firstName} lastName={props.registrant.lastName}
              age={props.registrant.age} email={props.registrant.email} />
        </Grid>
    );
}
