import { Card, CardContent, Typography, List, ListItem, ListItemText } from "@mui/material";
import "../styles/ManualSearchSection.css";

const Instruction = () => {
  return (
    <Card className="assistant-section">
      <CardContent>
        <Typography className="instruction-title" variant="h6">
          How to use Tarker?
        </Typography>
        <List>
          <ListItem>
            <ListItemText primary="1. Click on voice search and speak up" />
          </ListItem>
          <ListItem>
            <ListItemText primary="2. Voice search not working? Type in name and search it!" />
          </ListItem>
          <ListItem>
            <ListItemText primary="3. Check your prices and add to favorites!" />
          </ListItem>
        </List>
      </CardContent>
    </Card>
  );
};

export default Instruction;
