import { Box, Container, Typography } from "@material-ui/core";
import React, { Fragment } from "react";
import { PaginaContext } from "../../../Context/PaginaContext";

export default function QuienesSomos() {
  const { datos } = React.useContext(PaginaContext);
  return (
    <Fragment>
      <Container maxWidth="lg">
        <Box sx={{ mt: 2, p: 1 }}>
          <Typography variant="h3" textAlign="center">
            <b>¿Quienes somos?</b>
          </Typography>
          <Box my={3} />
          <Typography variant="h4" textAlign="center">
            <b>{datos.nombre_empresa}</b>
          </Typography>
        </Box>
        <Box sx={{ p: 1, mb: 5 }}>
          <Typography textAlign="justify" variant="h6">
            {datos.quienes_somos}
          </Typography>
        </Box>
      </Container>
    </Fragment>
  );
}
