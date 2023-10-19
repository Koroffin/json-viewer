import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { rootUrl } from "./App";

export const MainPage = () => {
  const navigate = useNavigate();
  const goToQuests = () => {
    navigate(`${rootUrl}/quests`);
  };
  const goToDialogs = () => {
    navigate(`${rootUrl}/dialogs`);
  };

  return (
    <div
      style={{
        display: "flex",
      }}
    >
      <Box sx={{ minWidth: 275 }}>
        <Card variant="outlined" onClick={goToQuests}>
          <CardContent>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              Quests Editor
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Go</Button>
          </CardActions>
        </Card>
      </Box>
      <Box sx={{ minWidth: 275 }} onClick={goToDialogs}>
        <Card variant="outlined">
          <CardContent>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              Dialog Editor
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Go</Button>
          </CardActions>
        </Card>
      </Box>
    </div>
  );
};
