import { Container, Typography } from "@mui/material";
import FavoriteList from "../components/FavoriteList";
import Navbar from "../components/Navbar";

const Favorites = () => {
  return (
    <>
    <Navbar/>
    <Container sx={{ marginTop: 4 }}>
      <Typography variant="h4" fontWeight="bold" textAlign="center" gutterBottom>
        Ulubione Przedmioty
      </Typography>

      <FavoriteList />
    </Container>
    </>
  );
};

export default Favorites;
