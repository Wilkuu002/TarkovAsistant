import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import ItemList from "../components/ItemList";
import { Box } from "@mui/material";

const Home = () => {
  return (
    <>
      <Box mt={2}>
        <HeroSection />
        <ItemList />
      </Box>
    </>
  );
};

export default Home;
