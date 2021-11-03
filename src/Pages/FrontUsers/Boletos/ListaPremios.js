import React, { Fragment } from "react";
import { Box } from "@material-ui/system";
import { Container, Grid, Typography } from "@material-ui/core";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";

export default function ListaPremios({ sorteo }) {
  const { premio_uno, premio_dos, premio_tres } = sorteo.lista_premios;

  console.log(sorteo);
  /* premio_uno.imagen.url */

  return (
    <Container maxWidth="lg" sx={{ my: 2 }}>
      <Grid container spacing={3}>
        <Grid item sm={4} xs={12}>
          <Card>
            <CardMedia
              component="img"
              height="194"
              image="https://www.chevroletmilenio.com.mx/content/dam/chevrolet/na/mx/es/index/pickups-and-trucks/2021-cheyenne/gallery/01-images/exterior/2021-cheyenne-galeria-ext-02.jpg?imwidth=650"
              alt="premio 1"
            />
            <CardContent>
              <Typography variant="h5" textAlign="center">
                1° Primer premio
              </Typography>
              <Typography
                variant="h6"
                textAlign="center"
                color="text.secondary"
              >
                {premio_uno.nombre_premio}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item sm={4} xs={12}>
          <Card>
            <CardMedia
              component="img"
              height="194"
              image="https://rodatiautos.mx/images/listings/2021-06/bigThmb/a2e77ec9-1622805919-290.jpg"
              alt="premio 2"
            />
            <CardContent>
              <Typography variant="h5" textAlign="center">
                2° Segundo premio
              </Typography>
              <Typography
                variant="h6"
                textAlign="center"
                color="text.secondary"
              >
                {premio_dos.nombre_premio}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item sm={4} xs={12}>
          <Card>
            <CardMedia
              component="img"
              height="194"
              image="https://soloautos.li.csnstatic.com/soloautos/cars/dealer/45ol9v6ump7a0jdgigf3eqohq.jpg?pxc_width=900&pxc_height=600&pxc_method=crop&pxc_format=auto"
              alt="premio 3"
            />
            <CardContent>
              <Typography variant="h5" textAlign="center">
                3° Tercer premio
              </Typography>
              <Typography
                variant="h6"
                textAlign="center"
                color="text.secondary"
              >
                {premio_tres.nombre_premio}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}
