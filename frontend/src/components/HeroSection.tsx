import { Container, Typography, Box, Button } from "@mui/material";
import BackgroundPhoto from "../assets/background_photo.webp";
import "../styles/HeroSection.css"; 
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
    const navigate = useNavigate();

    const handleAssistantActivation = () => {
      navigate("/assistant"); 
    };


  return (
    <Box
      className="hero-section"
      sx={{ backgroundImage: `url(${BackgroundPhoto})` }}
    >
      <Container className="hero-content">
        <Typography variant="h3" fontWeight="bold">
          Witamy w Tarkov Assistant
        </Typography>
        <Typography variant="h6" sx={{ mt: 2 }}>
          Znajdź przedmioty szybciej i łatwiej z naszym asystentem głosowym!
        </Typography>
        <Button className="assistant-button" onClick={handleAssistantActivation}>
          Aktywuj Asystenta
        </Button>
      </Container>
    </Box>
  );
};

export default HeroSection;
