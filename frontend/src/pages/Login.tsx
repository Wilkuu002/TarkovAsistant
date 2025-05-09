import { useState } from "react";
import { useForm } from "react-hook-form";
import { Container, TextField, Button, Typography, Box, Alert } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface LoginFormInputs {
  email: string;
  password: string;
}

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      const response = await axios.post("http://localhost:3000/auth/login", data);
      localStorage.setItem("token", response.data.token); //  token
      navigate("/");
    } catch (error) {
      setErrorMessage("Nieprawidłowy e-mail lub hasło");
    }
  };

  return (
    <Container maxWidth="xs" sx={{ marginTop: 6, textAlign: "center" }}>
      <Typography variant="h4" fontWeight="bold">
        Login
      </Typography>
      <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
        <TextField
          label="E-mail"
          fullWidth
          margin="normal"
          {...register("email", { required: "E-mail is requiered" })}
          error={!!errors.email}
          helperText={errors.email?.message}
        />
        <TextField
          label="Hasło"
          type="password"
          fullWidth
          margin="normal"
          {...register("password", { required: "Password is requiered" })}
          error={!!errors.password}
          helperText={errors.password?.message}
        />
        {errorMessage && <Alert severity="error" sx={{ mt: 2 }}>{errorMessage}</Alert>}
        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 3 }}>
          Login
        </Button>
        <Typography sx={{ marginTop: 2,
    padding: "1px 10px", 
    borderRadius: "8px", 
    display: "inline-block",
    color: "white"}}>
  New in Tarker?<Button color="primary" onClick={() => navigate("/register")}>Create Account</Button>
</Typography>

      </Box>
    </Container>
  );
};

export default Login;
