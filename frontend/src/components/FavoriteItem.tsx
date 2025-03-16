import { Card, CardContent, Typography, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

interface FavoriteItemProps {
  normalizedName: string;
  onRemove: (normalizedName: string) => void;
}

const FavoriteItem: React.FC<FavoriteItemProps> = ({ normalizedName, onRemove }) => {
  return (
    <Card sx={{ backgroundColor: "white", transition: "0.3s", "&:hover": { transform: "scale(1.05)" } }}>
      <CardContent sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Typography color="black" variant="h6" fontWeight="bold">
          {normalizedName}
        </Typography>
        <IconButton onClick={() => onRemove(normalizedName)} color="error">
          <DeleteIcon />
        </IconButton>
      </CardContent>
    </Card>
  );
};

export default FavoriteItem;
