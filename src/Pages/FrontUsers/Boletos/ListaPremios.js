import React from "react";
import { Container, Grid, Typography } from "@material-ui/core";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";

export default function ListaPremios({ sorteo }) {
  const { premio_uno, premio_dos, premio_tres } = sorteo.lista_premios;

  return (
    <Container maxWidth="lg" sx={{ my: 2 }}>
      <Grid container spacing={3} alignItems="center">
        <Grid item sm={4} xs={12}>
          {premio_dos.imagen.url ? (
            <Card>
              <CardMedia
                component="img"
                height="194"
                image={premio_dos.imagen.url}
                alt="premio 2"
              />
              <CardContent>
                <Typography variant="h5" textAlign="center">
                  2° Premio
                </Typography>
                <Typography
                  variant="h6"
                  textAlign="center"
                  color="text.secondary"
                  noWrap
                >
                  {premio_dos.nombre_premio}
                </Typography>
              </CardContent>
            </Card>
          ) : null}
        </Grid>
        <Grid item sm={4} xs={12}>
          {premio_uno.imagen.url ? (
            <Card sx={{ height: 360 }}>
              <CardMedia
                component="img"
                height="250"
                image={premio_uno.imagen.url}
                alt="premio 1"
              />
              <CardContent>
                <Typography variant="h5" textAlign="center">
                  <b>1° Premio</b>
                </Typography>
                <Typography
                  variant="h6"
                  textAlign="center"
                  color="text.secondary"
                  noWrap
                >
                  {premio_uno.nombre_premio}
                </Typography>
              </CardContent>
            </Card>
          ) : null}
        </Grid>
        <Grid item sm={4} xs={12}>
          {premio_tres.imagen.url ? (
            <Card>
              <CardMedia
                component="img"
                height="194"
                image={premio_tres.imagen.url}
                alt="premio 3"
              />
              <CardContent>
                <Typography variant="h5" textAlign="center">
                  3° Premio
                </Typography>
                <Typography
                  variant="h6"
                  textAlign="center"
                  color="text.secondary"
                  noWrap
                >
                  {premio_tres.nombre_premio}
                </Typography>
              </CardContent>
            </Card>
          ) : null}
        </Grid>
      </Grid>
    </Container>
  );
}
