import React, { Fragment, useEffect, useState } from "react";
import {
  Box,
  Button,
  Chip,
  CircularProgress,
  Container,
  Grid,
  InputBase,
  Paper,
  Typography,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { PaginaContext } from "../../../Context/PaginaContext";
import ComprarBoletos from "./Comprar";
import ListaPremios from "./ListaPremios";

export default function Boletos({ type }) {
  const {
    boletos_seleccionados,
    setBoletosSeleccionados,
    datosSorteo,
    loadingSorteo,
    finalizado,
  } = React.useContext(PaginaContext);

  const [busqueda, setBusqueda] = useState("");
  const [boletosFiltrados, setBoletosFiltrados] = useState([]);

  useEffect(() => {
    if (datosSorteo) {
      setBoletosFiltrados(
        datosSorteo.boletos.filter((boleto) => {
          return boleto.numero_boleto.includes(busqueda);
        })
      );
    }
  }, [busqueda, datosSorteo]);

  const seleccionarBoletos = (boleto, id) => {
    const copy_boleto_select = [...boletos_seleccionados];

    if (id !== undefined) {
      const result = copy_boleto_select.filter((res) => res._id !== id);
      setBoletosSeleccionados(result);
    } else {
      setBoletosSeleccionados([...copy_boleto_select, boleto]);
    }
  };

  if (loadingSorteo)
    return (
      <Box
        height="100vh"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <CircularProgress />
      </Box>
    );
  if (!datosSorteo) return null;

  return (
    <Fragment>
      <Container maxWidth="lg" sx={{ p: 2, mt: type !== "FRENTE" ? 8 : 2 }}>
        <Grid container spacing={3}>
          <Grid
            item
            md={6}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
            }}
          >
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              height="100%"
              width="100%"
            >
              <img
                style={{ maxWidth: "100%", maxHeight: "100%" }}
                src={datosSorteo.imgSorteoBoletosUrl}
                alt="Imagen de sorteo"
              />
            </Box>
          </Grid>
          <Grid
            item
            md={6}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Box>
              <Typography variant="h6">
                Fecha del sorteo: <b>{datosSorteo.fecha_sorteo}</b>
              </Typography>
              <Typography variant="h3">
                <b>{datosSorteo.nombre_sorteo}</b>
              </Typography>
            </Box>
            {finalizado ? (
              <Box mt={4} width="100%">
                <Typography variant="h3" textAlign="center">
                  <b>¡Sorteo finalizado!</b>
                </Typography>
              </Box>
            ) : (
              <Box mt={4} width="100%">
                <Typography variant="h3" textAlign="center">
                  <b>¡Boletos Disponibles!</b>
                </Typography>
                <Typography variant="h2">
                  <b>$ {datosSorteo.precio_boleto}.00 Mx.</b>
                </Typography>
              </Box>
            )}
          </Grid>
        </Grid>
      </Container>
      <Box>
        <Box textAlign="center" p={2}>
          <Typography variant="h4">
            <b>¡Premios!</b>
          </Typography>
        </Box>
        <ListaPremios sorteo={datosSorteo} />
      </Box>
      {type === "FRENTE" ? (
        finalizado ? null : (
          <Box display="flex" justifyContent="center" mt={2}>
            <Button
              href="/sorteos/boletos"
              size="large"
              sx={{ fontSize: 24 }}
              variant="contained"
            >
              ¡Compra tu Boleto!
            </Button>
          </Box>
        )
      ) : null}

      {finalizado ? null : type === "FRENTE" ? null : (
        <Fragment>
          <Box textAlign="center" p={2} bgcolor="black">
            <Typography color="white" variant="h3">
              <b>Boletos</b>
            </Typography>
          </Box>
          <Container maxWidth="lg" sx={{ mt: 2 }}>
            <Grid container spacing={2}>
              <Grid item md={6} xs={12}>
                <Paper
                  component="form"
                  variant="outlined"
                  sx={{
                    p: "2px 4px",
                    display: "flex",
                    alignItems: "center",
                    width: "auto",
                  }}
                >
                  <SearchIcon color="action" />
                  <InputBase
                    fullWidth
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="Busca tu boleto"
                    inputProps={{ "aria-label": "busca tu boleto" }}
                    onChange={(e) => setBusqueda(e.target.value)}
                  />
                </Paper>
              </Grid>
              <Grid
                item
                md={6}
                xs={12}
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Box display="flex" justifyItems="center" flexGrow={1}>
                  <Chip variant="outlined" label="Disponibles" />
                  <Box mx={1} />
                  <Chip
                    disabled
                    style={{ backgroundColor: "#2e7d32" }}
                    label="Vendidos"
                  />
                </Box>
                <ComprarBoletos sx={{ mt: 1 }} sorteo={datosSorteo} />
              </Grid>
            </Grid>
            <Grid container spacing={1} sx={{ my: 2 }}>
              {boletosFiltrados.map((boleto, index) => (
                <Grid item key={index}>
                  <RenderNumeros
                    boleto={boleto}
                    seleccionarBoletos={seleccionarBoletos}
                    boletosFiltrados={boletosFiltrados}
                  />
                </Grid>
              ))}
            </Grid>
          </Container>
        </Fragment>
      )}


    </Fragment>
  );
}

const RenderNumeros = ({ boleto, seleccionarBoletos, boletosFiltrados }) => {
  const [seleccionado, setSeleccionado] = useState([]);
  const { boletos_seleccionados } = React.useContext(PaginaContext);

  useEffect(() => {
    setSeleccionado(
      boletos_seleccionados.filter((res) => res._id === boleto._id)
    );
  }, [boletos_seleccionados, boletosFiltrados, boleto._id]);

  const select = () => {
    if (boletos_seleccionados.length >= 4 && !seleccionado.length) return;

    if (seleccionado.length) {
      seleccionarBoletos(boleto, boleto._id);
    } else {
      seleccionarBoletos(boleto);
    }
  };

  return (
    <Box>
      <Chip
        variant="outlined"
        disabled={boleto.vendido}
        onClick={() => select()}
        style={
          seleccionado.length > 0 && seleccionado[0]._id === boleto._id
            ? { backgroundColor: "#2e7d32" }
            : boleto.vendido
            ? { backgroundColor: "#2e7d32" }
            : { backgroundColor: "white" }
        }
        label={
          <Box p={1}>
            <Typography>
              <b>{boleto.numero_boleto}</b>
            </Typography>
          </Box>
        }
      />
    </Box>
  );
};
