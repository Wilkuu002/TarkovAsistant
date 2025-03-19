import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Card, CardContent, Typography } from "@mui/material";
import axios from "axios";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); // Pole do potwierdzenia hasła
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleRegister = async () => {
    setError(null);

    // Walidacja potwierdzenia hasła
    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      await axios.post("http://localhost:3000/auth/register", { email, password });
      alert("Account created successfully! You can now log in.");
      navigate("/login");
    } catch (error) {
      setError("Registration failed. Please try again.");
      console.error("Error during registration:", error);
    }
  };

  return (
    <Card sx={{ maxWidth: 400, margin: "auto", marginTop: 4, padding: 2, backgroundColor: "#1a1a1a", color: "white" }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Create Account
        </Typography>
        <TextField
          label="Email"
          type="email"
          fullWidth
          variant="outlined"
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          InputLabelProps={{ style: { color: "white" } }}
          sx={{ input: { color: "white" } }}
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          variant="outlined"
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          InputLabelProps={{ style: { color: "white" } }}
          sx={{ input: { color: "white" } }}
        />
        <TextField
          label="Confirm Password"
          type="password"
          fullWidth
          variant="outlined"
          margin="normal"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          InputLabelProps={{ style: { color: "white" } }}
          sx={{ input: { color: "white" } }}
        />
        
        {error && <Typography color="error" sx={{ marginTop: 1 }}>{error}</Typography>}

        <Button variant="contained" color="primary" fullWidth sx={{ marginTop: 2 }} onClick={handleRegister}>
          Register
        </Button>

        <Typography sx={{ marginTop: 2, textAlign: "center" }}>
          Already have an account? <Button color="secondary" onClick={() => navigate("/login")}>Login</Button>
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Register;
