import { AppBar, IconButton, makeStyles, Theme, Toolbar, Typography, Tooltip } from '@material-ui/core';
import { Add as AddIcon } from "@material-ui/icons";
import React, { useState } from 'react';
import { createRegistrant } from '../api/RegistrantsAPI';
import RegistrantDialog from './RegistrantDialog';

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        flexGrow: 1,
        marginBottom: theme.spacing(3),
    },
    plusButton: {
        marginLeft: "auto"
    },
    title: {
        flexGrow: 1
    }
}));

export interface IRegistrantSubmission {
    firstName: string,
    lastName: string,
    age: number,
    email: string,
}

export default function Navbar(): any {

    const [dialogOpen, setDialogOpen] = useState<boolean>(false);

    const handleDialogClickOpen = () => {
        setDialogOpen(true);
    }

    const handleDialogClose = () => {
        setDialogOpen(false);
    }

    const handleDialogSubmit = (registrant: IRegistrantSubmission) => {
        handleDialogClose();

        createRegistrant({
            firstName: registrant.firstName,
            lastName: registrant.lastName,
            age: registrant.age,
            email: registrant.email,
            registrationDate: new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60 * 1000).toISOString().split("T")[0],
        });
    }


    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="sticky" color="primary">
                <Toolbar>
                    <Typography variant="h6">
                        CORD Registration
                    </Typography>
                    <Tooltip title="Add">
                        <IconButton edge="start" color="inherit" aria-label="create" className={classes.plusButton}>
                            <AddIcon onClick={handleDialogClickOpen} />
                        </IconButton>
                    </Tooltip>
                </Toolbar>
            </AppBar>
            <RegistrantDialog open={dialogOpen} handleClose={handleDialogClose} handleSubmit={handleDialogSubmit} />
        </div>
    )
}
