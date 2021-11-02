import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function Card_Premio({index}) {
  return (
    <div>
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          component="img"
          height="140"
          image="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fst.motortrendenespanol.com%2Fuploads%2Fsites%2F5%2F2018%2F11%2F2019-GMC-Sierra-AT4-front-three-quarter-in-motion-2.jpg&f=1&nofb=1"
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Premio {index + 1}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Ford Lovo Del Ano 2021
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Editar</Button>
          <Button size="small">Eliminar</Button>
        </CardActions>
      </Card>
    </div>
  );
}
