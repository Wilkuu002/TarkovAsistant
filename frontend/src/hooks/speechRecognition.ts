import { useState } from "react";

// 🔹 Naprawiamy brakujące typy w TypeScript
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
  interface SpeechRecognitionEvent extends Event {
    results: SpeechRecognitionResultList;
  }
}

const getSpeechRecognition = () => {
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  return SpeechRecognition ? new SpeechRecognition() : null;
};

const useSpeechRecognition = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const startListening = () => {
    const recognition = getSpeechRecognition();
    if (!recognition) {
      setError("Twoja przeglądarka nie obsługuje rozpoznawania mowy.");
      return;
    }

    setIsListening(true);
    setTranscript(null);
    setError(null);

    recognition.lang = "en-US";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const result = event.results[0][0].transcript;
      console.log("Rozpoznano:", result);
      setTranscript(result);
      setIsListening(false);
    };

    recognition.onerror = (event: Event) => {
      console.error("Błąd rozpoznawania mowy:", event);
      setError("Błąd rozpoznawania mowy.");
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  return { isListening, transcript, error, startListening };
};

export default useSpeechRecognition;
