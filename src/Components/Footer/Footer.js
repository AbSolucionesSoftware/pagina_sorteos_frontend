import { Box, Grid, IconButton, Typography } from "@material-ui/core";
import React from "react";
import { PaginaContext } from "../../Context/PaginaContext";
import FacebookIcon from "@material-ui/icons/Facebook";
import InstagramIcon from "@material-ui/icons/Instagram";
import TwitterIcon from "@material-ui/icons/Twitter";

export default function Footer() {
  const { datos } = React.useContext(PaginaContext);

  if (!datos) {
    return null;
  }

  return (
    <Box style={{ background: "black", color: "white" }}>
      <Box sx={{ p: 3 }} textAlign="center">
        <Typography variant="h4">¿Tienes dudas?, ¡Escríbenos!</Typography>
        <Box p={1}>
          <Typography variant="h3">
            <b>{datos.telefono}</b>
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box>
            {datos.instagram === "" || datos.instagram === undefined ? null : (
              <IconButton href={datos.instagram} target="_blank">
                <InstagramIcon style={{ color: "white", fontSize: 60 }} />
              </IconButton>
            )}
          </Box>
          <Box>
            {datos.facebook === "" || datos.facebook === undefined ? null : (
              <IconButton href={datos.facebook} target="_blank">
                <FacebookIcon style={{ color: "white", fontSize: 60 }} />
              </IconButton>
            )}
          </Box>
          <Box>
            {datos.twitter === "" || datos.twitter === undefined ? null : (
              <IconButton href={datos.twitter} target="_blank">
                <TwitterIcon style={{ color: "white", fontSize: 60 }} />
              </IconButton>
            )}
          </Box>
        </Box>
      </Box>
      <Grid container spacing={1} justifyContent="center">
        <Grid item>
          <Typography variant="h6">
            <b>{datos.nombre_empresa}</b>
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="h6">
            <b>{datos.calle_numero},</b>
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="h6">
            <b>{datos.colonia},</b>
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="h6">
            <b>CP{datos.cp},</b>
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="h6">
            <b>{datos.ciudad}</b>
          </Typography>
        </Grid>
      </Grid>
      <Box textAlign="center" mt={3}>
        © Copyright 2021 Sorteos y Rifas de la Suerte. Sitio desarrollado por Ab
        Soluciones Empresariales
      </Box>
    </Box>
  );
}
