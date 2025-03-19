import { useState, useRef } from "react";
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
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const waitingForItemRef = useRef(false);

  const startListening = () => {
    if (isListening) {
      stopListening();
      return;
    }

    const recognition = getSpeechRecognition();
    if (!recognition) {
      setMessage("Twoja przeglądarka nie obsługuje rozpoznawania mowy.");
      return;
    }

    recognitionRef.current = recognition;
    setMessage("Im listening... Say 'help' to search");
    setIsListening(true);

    recognition.lang = "en-US";
    recognition.continuous = true;
    recognition.interimResults = false;

    recognition.onresult = async (event: SpeechRecognitionEvent) => {
      const result = event.results[event.results.length - 1][0].transcript.trim();
      console.log("Rozpoznano:", result);

      if (!waitingForItemRef.current && result.toLowerCase() === "help") {
        setMessage("Słowo kluczowe rozpoznane! Powiedz nazwę przedmiotu...");
        waitingForItemRef.current = true;
      } else if (waitingForItemRef.current) {
        setMessage(`Searching: ${result}`);
        recognition.stop(); 
        await fetchItemData(result.toLowerCase().replace(/\s/g, "-"));
      }
    };

    recognition.onerror = (event: Event) => {
      console.error("Voice recognition error:", event);
      setMessage("Voice recognition error.");
      setIsListening(false);
    };

    recognition.onend = () => {
      if (isListening) restartListening();
    };

    recognition.start();
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      recognitionRef.current = null;
    }
    setIsListening(false);
    setMessage("Voice recognition is On.");
  };

  const restartListening = () => {
    if (recognitionRef.current) {
      console.log("Restartuję nasłuch na słowo 'help'...");
      setTimeout(() => {   
          waitingForItemRef.current = false;
          recognitionRef.current?.start();
          setMessage("Listening... say 'help'");   
      }, 1000);
    }
  };

  const fetchItemData = async (itemName: string) => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:3000/items/search?normalizedName=${itemName}`);
      setItemData(response.data);
      setMessage("Item was found. Say help if you want to search for another item.");
    } catch (error) {
      console.error("Error while looking for item:", error);
      setItemData(null);
      setMessage("Item not found. Say 'help', to try again.");
    }
    setLoading(false);
    console.log("koniec fetch itema")
    restartListening()
  };

  return (
    <Box className="voice-assistant-container">
      <Card className="assistant-window">
        <CardContent>
          <Typography variant="h6" fontWeight="bold">Tarkov asistant</Typography>
          <Button variant="contained" color="primary" startIcon={<MicIcon />} onClick={startListening} disabled={isListening}>
            {isListening ? "Listening..." : "Start BOT"}
          </Button>

          {message && <Typography sx={{ marginTop: 2 }}>{message}</Typography>}
          {loading && <CircularProgress sx={{ marginTop: 2 }} />}

          {itemData ? (
            <Typography sx={{ marginTop: 3 }}>
              <strong>{itemData.name}</strong>
              <br />
              Avg 24h price: <strong>{itemData.avg24hPrice}₽</strong>
            </Typography>
          ) : (
            !loading && message?.includes("Wyszukuję") && <Typography color="error" sx={{ marginTop: 2 }}>Item not found</Typography>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default ContinuousVoiceAssistant;
