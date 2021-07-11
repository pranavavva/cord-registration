import { makeStyles, Container, Typography } from "@material-ui/core";
import Navbar from "./components/Navbar";
import RegistrantsGrid from "./components/RegistrantsGrid";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    cardGrid: {
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(4),
    }
}));


function App() {

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Navbar />
            <Container maxWidth="lg" className={classes.cardGrid}>
                <Typography variant="h2" color="textPrimary">Registrants</Typography>
                <RegistrantsGrid />
            </Container>
        </div>
    );
}

export default App;
