import { useState } from "react";
import { TextField, Button, Card, CardContent, Typography, CircularProgress } from "@mui/material";
import axios from "axios";
import "../styles/ManualSearchSection.css";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [itemData, setItemData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:3000/items/search?normalizedName=${query.toLowerCase().replace(/\s/g, "-")}`);
      setItemData(response.data);
    } catch (error) {
      console.error("Błąd pobierania danych o przedmiocie:", error);
      setItemData(null);
    }
    setLoading(false);
  };
  const addToFavorites = async () => {
    if (!itemData) return;

    try {
      await axios.post(
        "http://localhost:3000/favorites",
        { normalizedName: itemData.name.toLowerCase().replace(/\s/g, "-") },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      alert("Dodano do ulubionych!");
    } catch (error) {
      console.error("Błąd dodawania do ulubionych:", error);
      alert("Nie udało się dodać do ulubionych.");
    }
  };

  return (
    <Card className="assistant-section">
      <CardContent>
        <Typography className="search-bar-title" variant="h6">
          Wpisz nazwę przedmiotu
        </Typography>
        <TextField
          variant="outlined"
          fullWidth
          placeholder="Np. M855A1"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          sx={{ marginTop: 2 }}
          className="search-input"
        />
        <Button
            variant="contained"
          className="search-button"
          onClick={handleSearch}
          sx={{ marginTop: 2 }}
        >
          Szukaj
        </Button>

        {loading && <CircularProgress sx={{ marginTop: 2 }} />}
        
        {itemData && (
          <Typography color="white" variant="h6" sx={{ marginTop: 3 }}>
            Item: <strong>{itemData.name}</strong>
            <br />
            Avarage price 24h: <strong>{itemData.avg24hPrice}₽</strong>
          </Typography>
          
        )}
        <Button variant="contained"
                className="favorite-button"
                onClick={addToFavorites}
              >
                Dodaj do ulubionych ⭐</Button>
      </CardContent>
    </Card>
  );
};

export default SearchBar;
