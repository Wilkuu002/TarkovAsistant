import { Container, Typography } from "@mui/material";
import FavoriteList from "../components/FavoriteList";

const Favorites = () => {
  return (
    <Container sx={{ marginTop: 4 }}>
      <Typography variant="h4" fontWeight="bold" textAlign="center" gutterBottom>
        Ulubione Przedmioty
      </Typography>

      <FavoriteList />
    </Container>
  );
};

export default Favorites;
