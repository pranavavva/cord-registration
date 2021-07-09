import { createTheme } from "@material-ui/core/styles";

// A custom theme for this app
export const theme = createTheme({
    palette: {
        primary: {
            main: "#1e88e5",
            light: "#6ab7ff",
            dark: "#005cb2",
        },
        secondary: {
            main: "#e1f5fe",
            light: "#ffffff",
            dark: "#afc2cb",
        }
    },
});
