import { useEffect, useState } from "react";
import { Container, Grid, Card, CardContent, Typography, Alert } from "@mui/material";
import axios from "axios";
import Navbar from "../components/Navbar";

const Favorites = () => {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setErrorMessage("Musisz być zalogowany, aby zobaczyć ulubione przedmioty.");
          return;
        }

        const response = await axios.get("http://localhost:3000/favorites", {
          headers: { Authorization: `Bearer ${token}` }
        });

        console.log("Otrzymana odpowiedź z backendu:", response.data);

        setFavorites(response.data.items); // Ustawiamy tylko listę nazw
      } catch (error) {
        console.error("Błąd pobierania ulubionych:", error);
        setErrorMessage("Nie udało się pobrać ulubionych przedmiotów.");
      }
    };

    fetchFavorites();
  }, []);

  return (
    <>
    <Navbar/>
    <Container sx={{ marginTop: 4 }}>
      <Typography variant="h4" fontWeight="bold" textAlign="center" gutterBottom>
        Ulubione Przedmioty
      </Typography>

      {errorMessage && <Alert severity="error" sx={{ mb: 3 }}>{errorMessage}</Alert>}

      <Grid container spacing={3}>
        {favorites.length > 0 ? (
          favorites.map((name) => (
            <Grid item xs={12} sm={6} md={4} key={name}>
              <Card sx={{ backgroundColor: "white", transition: "0.3s", "&:hover": { transform: "scale(1.05)" } }}>
                <CardContent>
                  <Typography color="black" variant="h6" fontWeight="bold">
                    {name}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography textAlign="center" sx={{ width: "100%", mt: 3 }}>
            Brak ulubionych przedmiotów.
          </Typography>
        )}
      </Grid>
    </Container>
    </>
  );
};

export default Favorites;
