import React, { Fragment, useCallback, useEffect, useState } from "react";

import {
  Box,
  Button,
  Chip,
  CircularProgress,
  Grid,
  IconButton,
  InputBase,
  Paper,
  Typography,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import clienteAxios from "../../../Config/axios";
import { PaginaContext } from "../../../Context/PaginaContext";
import ComprarBoletos from "./Comprar";
import ListaPremios from "./ListaPremios";


export default function Boletos({ type }) {
  const {
    datos,
    boletos_seleccionados,
    setBoletosSeleccionados,
  } = React.useContext(PaginaContext);
  const [sorteo, setSorteo] = useState([]);
  const [boletos, setBoletos] = useState([]);
  const [numeroBoleto, setNumeroBoleto] = useState([]);
  const [loading, setLoading] = useState(true);

  const traerSorteoActivo = useCallback(
    async () => {
      setLoading(true)
      await clienteAxios
      .get(`/sorteo/getSorteoActivo`)
      .then((res) => {
        console.log(res);
        setSorteo(res.data.sorteo);
        setBoletos(res.data.sorteo.boletos);
        setLoading(false)
      })
      .catch((err) => {
        setLoading(false)
        console.log(err);
      });
    },
    [ ],
  )

  const traerDatosBoleto = async () => {
    console.log("si entra la condicion");
    await clienteAxios
      .post(`/sorteo/buscarBoleto/${datos._id}`, numeroBoleto)
      .then((res) => {
        console.log(res.data);
        setBoletos(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const seleccionarBoletos = (boleto, index) => {
      const copy_boleto_select = [...boletos_seleccionados];
    if(index !== undefined){
        copy_boleto_select.pop(index);
        setBoletosSeleccionados(copy_boleto_select);
    }else{
        setBoletosSeleccionados([...copy_boleto_select, boleto]);
    }
  };

  useEffect(() => {
    traerSorteoActivo();
  }, [traerSorteoActivo]);

  console.log("inifinit");

  const pressEnter = (e) => {
    if (!e.target.defaultValue) return;
    traerDatosBoleto();
  };

  if (loading && !sorteo.length){
    return <Box height="400px" display="flex" justifyContent="center" alignItems="center">
      <CircularProgress />
    </Box>
  }else{
    return (
    <Fragment>
      <Box textAlign="center">
        <Box p={4}>
          <Typography variant="h6">
            Fecha del sorteo: <b>{sorteo ? sorteo.fecha_sorteo : null}</b>
          </Typography>
          <Typography variant="h3">
            <b>{sorteo ? sorteo.nombre_sorteo : null}</b>
          </Typography>
        </Box>
      </Box>
      <Box style={{ backgroundColor: "white" }}>
        <Box textAlign="center" p={2}>
          <Typography variant="h4">
            <b>¡Premios!</b>
          </Typography>
        </Box>
        <ListaPremios sorteo={sorteo} />
      </Box>
      {type === "FRENTE" ? (
        <Box p={3} textAlign="center">
          <Button
            href="/sorteos/boletos"
            style={{ color: "white", backgroundColor: "black" }}
          >
            <Typography variant="h4">
              <b>Ver Boletos</b>
            </Typography>
          </Button>
        </Box>
      ) : (
        <Box p={2} textAlign="center">
          <Typography variant="h6">
            <b>Lista de boletos abajo</b>
          </Typography>
        </Box>
      )}
      <Box
        p={2}
        mt={2}
        textAlign="center"
        display="flex"
        justifyContent="center"
        justifyItems="center"
        style={{ backgroundColor: "white" }}
      >
        <Box textAlign="center" style={{ width: "70%", height: "80%" }}>
          <img
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
            }}
            src={sorteo.imgSorteoBoletosUrl}
            alt="Imagen de sorteo"
          />
        </Box>
      </Box>

      {type === "FRENTE" ? null : (
        <>
          <Box textAlign="center" p={2}>
            <Typography variant="h3">
              <b>¡Boletos Disponibles!</b>
            </Typography>
          </Box>
          <Box p={3} style={{ backgroundColor: "white" }} textAlign="center">
            <Typography variant="h5">
              <b>Precio Boleto</b>
            </Typography>
            <Typography variant="h2">
              <b>$ {sorteo.precio_boleto}.00 Mx.</b>
            </Typography>
          </Box>
          <Box textAlign="center" p={2}>
            <Box display="flex" justifyItems="center" justifyContent="center">
              <Box p={1}>
                <Chip
                  style={{ backgroundColor: "white" }}
                  label={
                    <Box p={1}>
                      <Typography variant="h5">
                        <b>0000</b>
                      </Typography>
                    </Box>
                  }
                />
              </Box>
              <Box p={1}>
                <Typography variant="h6">
                  <b>Blancos boletos disponibles</b>
                </Typography>
              </Box>
            </Box>
            <Box display="flex" justifyItems="center" justifyContent="center">
              <Box p={1}>
                <Chip
                  disabled
                  style={{ backgroundColor: "#2e7d32" }}
                  label={
                    <Box p={1}>
                      <Typography variant="h5">
                        <b>0000</b>
                      </Typography>
                    </Box>
                  }
                />
              </Box>
              <Box p={1}>
                <Typography variant="h6">
                  <b>Verdes boletos vendidos</b>
                </Typography>
              </Box>
            </Box>
          </Box>

          <Grid container>
            <Grid item md={6}>
              <Paper
                component="form"
                sx={{
                  p: "2px 4px",
                  display: "flex",
                  alignItems: "center",
                  width: "auto",
                }}
              >
                <InputBase
                  fullWidth
                  sx={{ ml: 1, flex: 1 }}
                  placeholder="Busca tu boleto"
                  inputProps={{ "aria-label": "busca tu boleto" }}
                  onKeyPress={pressEnter}
                  onChange={(e) =>
                    setNumeroBoleto({
                      ...numeroBoleto,
                      numeroBoleto: e.target.value,
                    })
                  }
                />
                <IconButton
                  type="submit"
                  sx={{ p: "10px" }}
                  aria-label="search"
                  onClick={traerDatosBoleto}
                >
                  <SearchIcon />
                </IconButton>
              </Paper>
            </Grid>
            <Grid
              item
              md={6}
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
              }}
            >
              <ComprarBoletos sorteo={sorteo} />
            </Grid>
          </Grid>

          <Box
            display="flex"
            justifyItems="center"
            alignContent="center"
            textAlign="center"
          >
            <Box width="50%" p={1}></Box>
          </Box>
          <Grid container lg={12}>
            {boletos?.map((boleto, index) => (
              <RenderNumeros
                key={index}
                boleto={boleto}
                seleccionarBoletos={seleccionarBoletos}
                index={index}
              />
            ))}
          </Grid>
        </>
      )}
    </Fragment>
  );
  }

  
}

const RenderNumeros = ({ boleto, seleccionarBoletos, index }) => {
    const [ seleccionado, setSeleccionado ] = useState(false);
    const { boletos_seleccionados } = React.useContext(PaginaContext);

    const select = () => {
        if(boletos_seleccionados.length >= 4 && !seleccionado) return

        if(seleccionado){
            seleccionarBoletos(boleto, index)
            setSeleccionado(false);
        }else{
            seleccionarBoletos(boleto)
            setSeleccionado(true);
        }
    }
        
  return boleto.vendido === true ? (
    <Box p={0.5}>
      <Chip
        disabled
        style={{ backgroundColor: "#2e7d32" }}
        label={
          <Box p={1}>
            <Typography>
              <b>{boleto.numero_boleto}</b>
            </Typography>
          </Box>
        }
      />
    </Box>
  ) : (
    <Box p={0.5}>
      <Chip
        onClick={() => select()}
        style={ seleccionado ? { backgroundColor: "#2e7d32" } : { backgroundColor: "white" } }
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
