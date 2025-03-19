import { useEffect, useState } from "react";
import { Button, Card, CardContent, Typography, CircularProgress, Box } from "@mui/material";
import MicIcon from "@mui/icons-material/Mic";
import FavoriteIcon from "@mui/icons-material/Favorite";
import axios from "axios";
import useSpeechRecognition from "../hooks/speechRecognition";
import "../styles/VoiceAssistant.css"; 

const VoiceAssistant = () => {
  const { isListening, transcript, error, startListening } = useSpeechRecognition();
  const [itemData, setItemData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (transcript) {
      console.log("Przetworzona nazwa przedmiotu:", transcript);
      fetchItemData(transcript.toLowerCase().replace(/\s/g, "-")); 
    }
  }, [transcript]);

  const fetchItemData = async (itemName: string) => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:3000/items/search?normalizedName=${itemName}`);
      setItemData(response.data);
      setIsFavorite(false); 
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
      setIsFavorite(true);
      alert("Dodano do ulubionych!");
    } catch (error) {
      console.error("Błąd dodawania do ulubionych:", error);
      alert("Nie udao się dodac do ulubionych");
    }
  };

  return (
    <Box className="voice-assistant-container">
      <Card className="assistant-window">
        <CardContent>
          <Typography variant="h6" fontWeight="bold">
            Press button and say your item name
          </Typography>

          <Button 
          className="voice-assistant-button"
            variant="contained"
            color="primary"
            startIcon={<MicIcon />}
            onClick={startListening}
            disabled={isListening}
            sx={{ marginTop: 2 }}
          >
            {isListening ? "Nasłuchiwanie..." : "Aktywuj Asystenta"}
          </Button>

          {isListening && <CircularProgress sx={{ marginTop: 2 }} />}

          {transcript && (
            <Typography variant="h6" sx={{ marginTop: 3 }}>
              Detected: <strong>{transcript}</strong>
            </Typography>
          )}

          {loading && <CircularProgress sx={{ marginTop: 2 }} />}

          {itemData ? (
            <>
              <Typography variant="h6" sx={{ marginTop: 3 }}>
                Item: <strong>{itemData.name}</strong>
                <br />
                Avarage price 24h: <strong>{itemData.avg24hPrice}₽</strong>
              </Typography>

              <Button
                variant="contained"
                color="secondary"
                startIcon={<FavoriteIcon />}
                onClick={addToFavorites}
                disabled={isFavorite}
                sx={{ marginTop: 2 }}
              >
                {isFavorite ? "Dodano do ulubionych" : "Dodaj do ulubionych"}
              </Button>
            </>
          ) : (
            !loading && transcript && (
              <Typography color="error" sx={{ marginTop: 2 }}>
                Nie znaleziono przedmiotu
              </Typography>
            )
          )}

          {error && (
            <Typography color="error" sx={{ marginTop: 2 }}>
              {error}
            </Typography>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default VoiceAssistant;
