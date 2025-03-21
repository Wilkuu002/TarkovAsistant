import { ThemeProvider, CssBaseline, Box } from "@mui/material";
import theme from "./theme";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import "./App.css"
import Assistant from "./pages/Assistant";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline /> 
      <Box className="app-container">
      <Router>
      <Navbar/>
        <Routes>
          <Route path="/" element={<Home />} />       
          <Route path="/login" element={<Login />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/assistant" element={<Assistant/>}/>
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
      </Box>
    </ThemeProvider>
  );
}

export default App;
