import { Container } from "@material-ui/core";
import { Box } from "@material-ui/system";
import { CircularProgress } from "@mui/material";
import React, { useContext, useState } from "react";
import SnackBarMessages from "../../../Components/SnackBarMessages";
import { AdminContext } from "../../../Context/AdminContext";
import CrearPregunta from "./CrearPregunta";
import ListaPreguntas from "./ListaPreguntas";

export default function PreguntasFrecuentes() {
  const { alert, setAlert } = useContext(AdminContext);
  const [loading, setLoading] = useState(false);
  if (loading)
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="30vh"
      >
        <CircularProgress />
      </Box>
    );
  return (
    <Container>
      <SnackBarMessages alert={alert} setAlert={setAlert} />
      <Box display="flex" justifyContent="flex-end" mb={2}>
        <CrearPregunta loading={loading} setLoading={setLoading} />
      </Box>

      <ListaPreguntas />
    </Container>
  );
}
