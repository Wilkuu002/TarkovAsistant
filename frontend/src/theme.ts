import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#9A8866", // main kolor
    },
    secondary: {
      main: "#000000", // sec kolkor
    },
    background: {
      default: "#000", // backg
      paper: "#121212", // Tło aplikacji (delikatnie jaśniejsze)
    },
    text: {
      primary: "#fff", // main text
      secondary: "#9A8866", // sec tex
    },
  },
});

export default theme;
