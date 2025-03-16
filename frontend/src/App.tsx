import { ThemeProvider, CssBaseline, Box } from "@mui/material";
import theme from "./theme"; // Importujemy nasz motyw
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import "./App.css"

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* Resetuje domyślne style przeglądarki */}
      <Box className="app-container">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />       
          <Route path="/login" element={<Login />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </Router>
      </Box>
    </ThemeProvider>
  );
}

export default App;
