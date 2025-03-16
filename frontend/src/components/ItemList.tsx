import { useEffect, useState } from "react";
import { Container, Grid, Card, CardContent, Typography } from "@mui/material";

interface Item {
  id: string;
  name: string;
  avg24hPrice: number;
}

const ItemList = () => {
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    setTimeout(() => {
      setItems([
        { id: "1", name: "M855A1", avg24hPrice: 1200 },
        { id: "2", name: "Water Filter", avg24hPrice: 5000 },
        { id: "3", name: "GPU", avg24hPrice: 250000 },
      ]);
    }, 1000);
  }, []);

  return (
    <Container sx={{
        marginTop: 4,
        paddingTop: 3,
        borderTop: "3px solid #9A8866",
        boxShadow: "0px -4px 10px rgba(154, 136, 102, 0.5)",
      }}
    >
      <Typography variant="h5" gutterBottom textAlign="center">
        Popularne przedmioty
      </Typography>
      <Grid container spacing={3}>
        {items.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item.id}>
            <Card sx={{backgroundColor:"white", transition: "0.3s", "&:hover": { transform: "scale(1.05)" } }}>
              <CardContent>
                <Typography color="black" variant="h6" fontWeight="bold">
                  {item.name}
                </Typography>
                <Typography color="textSecondary">Cena: {item.avg24hPrice}₽</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ItemList;
