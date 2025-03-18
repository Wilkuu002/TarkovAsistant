import { useState } from "react";
import { Button, Card, CardContent, Typography, CircularProgress, Box } from "@mui/material";
import MicIcon from "@mui/icons-material/Mic";
import axios from "axios";
import "../styles/VoiceAssistant.css";

const getSpeechRecognition = () => {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  return SpeechRecognition ? new SpeechRecognition() : null;
};

const ContinuousVoiceAssistant = () => {
  const [isListening, setIsListening] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [itemData, setItemData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const startListening = () => {
    const recognition = getSpeechRecognition();
    if (!recognition) {
      setMessage("Twoja przeglądarka nie obsługuje rozpoznawania mowy.");
      return;
    }

    setMessage("Nasłuchuję... Powiedz 'help'");
    setIsListening(true);

    recognition.lang = "en-US";
    recognition.continuous = true;
    recognition.interimResults = false;

    let waitingForItem = false;

    recognition.onresult = async (event: SpeechRecognitionEvent) => {
      const result = event.results[event.results.length - 1][0].transcript.trim();
      console.log("Rozpoznano:", result);

      if (!waitingForItem && result.toLowerCase() === "help") {
        setMessage("Słowo kluczowe rozpoznane! Powiedz nazwę przedmiotu...");
        waitingForItem = true;
      } else if (waitingForItem) {
        setMessage(`Wyszukuję: ${result}`);
        recognition.stop(); 
        await fetchItemData(result.toLowerCase().replace(/\s/g, "-"));
        setIsListening(false);
      }
    };

    recognition.onerror = (event: Event) => {
      console.error("Błąd rozpoznawania mowy:", event);
      setMessage("Błąd rozpoznawania mowy.");
      setIsListening(false);
    };

    recognition.onend = () => {
      if (isListening) recognition.start(); 
    };

    recognition.start();
  };

  const fetchItemData = async (itemName: string) => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:3000/items/search?normalizedName=${itemName}`);
      setItemData(response.data);
    } catch (error) {
      console.error("Błąd pobierania danych o przedmiocie:", error);
      setItemData(null);
    }
    setLoading(false);
  };

  return (
    <Box className="voice-assistant-container">
      <Card className="assistant-window">
        <CardContent>
          <Typography variant="h6" fontWeight="bold">Ciągły nasłuch</Typography>
          <Button variant="contained" color="primary" startIcon={<MicIcon />} onClick={startListening} disabled={isListening}>
            {isListening ? "Nasłuchiwanie..." : "Włącz nasłuch"}
          </Button>

          {message && <Typography sx={{ marginTop: 2 }}>{message}</Typography>}
          {loading && <CircularProgress sx={{ marginTop: 2 }} />}

          {itemData ? (
            <Typography sx={{ marginTop: 3 }}>
              <strong>{itemData.name}</strong>
              <br />
              Średnia cena 24h: <strong>{itemData.avg24hPrice}₽</strong>
            </Typography>
          ) : (
            !loading && message?.includes("Wyszukuję") && <Typography color="error" sx={{ marginTop: 2 }}>Nie znaleziono przedmiotu</Typography>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default ContinuousVoiceAssistant;
