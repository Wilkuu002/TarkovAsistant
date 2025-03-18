import { Container, Grid } from "@mui/material";
import VoiceAssistant from "../components/VoiceAssistant";
import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import Instruction from "../components/Instruction";
import ContinuousVoiceAssistant from "../components/ContinousVocieAssistant";

const Assistant = () => {
  return (
    <>
      <Navbar />
      <Container sx={{ marginTop: 4 }}>
        <Grid container justifyContent="center">
          <Grid item xs={12}>
            <VoiceAssistant />
          </Grid>
        </Grid>

        <Grid 
          container 
          spacing={3} 
          justifyContent="center" 
          alignItems="stretch"
          sx={{ marginTop: 3 }}
        >
          <Grid item xs={12} md={6} sx={{ display: "flex", flex: 1 }}>    
            <Instruction />
          </Grid>
          <Grid item xs={12} md={6} sx={{ display: "flex", flex: 1 }}>
            <SearchBar />
          </Grid>
        </Grid>
      </Container>
      <Container sx={{ marginTop: 4 }}>
        <ContinuousVoiceAssistant />
      </Container>
    </>
  );
};

export default Assistant;
