import { AppBar, IconButton, makeStyles, Theme, Toolbar, Typography } from '@material-ui/core';
import { Menu as MenuIcon } from '@material-ui/icons';
import React from 'react';

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        flexGrow: 1,
        marginBottom: theme.spacing(3),
    },
    menuButton: {
        marginRight: theme.spacing(2)
    },
    title: {
        flexGrow: 1
    }
}));

export default function Navbar(): any {

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="sticky" color="primary">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6">
                        CORD Registration
                    </Typography>
                </Toolbar>
            </AppBar>
        </div>
    )
}
