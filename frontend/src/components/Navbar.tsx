import { useEffect, useState } from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    navigate("/login"); 
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "#000", padding: "10px" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6" sx={{ fontWeight: "bold", color: "#9A8866" }}>
          Tarkov Assistant
        </Typography>
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button color="inherit" onClick={() => navigate("/")}>
            Strona Główna
          </Button>
          <Button color="inherit" onClick={() => navigate("/assistant")}>
            Asystent
          </Button>
          <Button color="inherit" onClick={() => navigate("/favorites")}>
            Ulubione
          </Button>
        </Box>

        <Box>
          {isAuthenticated ? (
            <Button color="inherit" onClick={handleLogout}>
              Wyloguj
            </Button>
          ) : (
            <Button color="inherit" onClick={() => navigate("/login")}>
              Zaloguj
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
