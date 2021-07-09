import { Grid, makeStyles, Container } from "@material-ui/core";
import Navbar from "./components/Navbar";
import Registrants from "./components/Registrants";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    }
}));


function App() {

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Navbar />
            <Container maxWidth="lg">
                <Grid container spacing={1}>
                    <Registrants />
                </Grid>
            </Container>
        </div>
    );
}

export default App;
