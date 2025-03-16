import { useEffect, useState } from "react";
import { Grid, Alert } from "@mui/material";
import axios from "axios";
import FavoriteItem from "./FavoriteItem";

const FavoriteList = () => {
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
        setFavorites(response.data.items || []); // Obsługa pustej odpowiedzi
      } catch (error) {
        console.error("Błąd pobierania ulubionych:", error);
        setErrorMessage("Nie udało się pobrać ulubionych przedmiotów.");
      }
    };

    fetchFavorites();
  }, []);

  const removeFavorite = async (normalizedName: string) => {
    console.log("Usuwam przedmiot:", normalizedName);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setErrorMessage("Musisz być zalogowany, aby usunąć przedmiot.");
        return;
      }

      const url = `http://localhost:3000/favorites?normalizedName=${encodeURIComponent(normalizedName)}`;
      console.log("Wysyłane zapytanie DELETE:", url);

      await axios.delete(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "*/*",
        }
      });

      // Usuwamy z listy bez przeładowania
      setFavorites((prevFavorites) => prevFavorites.filter((item) => item !== normalizedName));
    } catch (error) {
      console.error("Błąd usuwania ulubionego przedmiotu:", error);
      setErrorMessage("Nie udało się usunąć przedmiotu.");
    }
  };

  return (
    <>
      {errorMessage && <Alert severity="error" sx={{ mb: 3 }}>{errorMessage}</Alert>}

      <Grid container spacing={3}>
        {favorites.length > 0 ? (
          favorites.map((normalizedName) => (
            <Grid item xs={12} sm={6} md={4} key={normalizedName}>
              <FavoriteItem normalizedName={normalizedName} onRemove={removeFavorite} />
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            Brak ulubionych przedmiotów.
          </Grid>
        )}
      </Grid>
    </>
  );
};

export default FavoriteList;
