import React, { Fragment, useEffect, useRef, useState } from "react";
import { Typography, Box } from "@material-ui/core";
import { PaginaContext } from "../../../Context/PaginaContext";

export default function RelojSorteo() {
  const { datosSorteo } = React.useContext(PaginaContext);
  const [dias, setDias] = useState("");
  const [horas, setHoras] = useState("");
  const [minutos, setMinutos] = useState("");
  const [segundos, setSegundos] = useState("");
  const [ended, setEnded] = useState(false);

  let intervalRef = useRef();

  useEffect(() => {
    if (datosSorteo) {
      intervalRef.current = setInterval(relojDeInicio, 1000);
    }
    if (ended) {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [datosSorteo, ended]);

  if (!datosSorteo) {
    return null;
  }

  console.log("ciclo");

  function relojDeInicio() {
    let endDate = datosSorteo.fecha_sorteo;
    let difference = new Date(endDate) - new Date();

    if (difference > 0) {
      setDias(Math.floor(difference / (1000 * 60 * 60 * 24)));
      setHoras(Math.floor((difference / (1000 * 60 * 60)) % 24));
      setMinutos(Math.floor((difference / 1000 / 60) % 60));
      setSegundos(Math.floor((difference / 1000) % 60));
    } else {
      setEnded(true);
      console.log("sorteo acabo");
    }
    /* let inicio = moment(); */
    /*  let duracion = final.diff(inicio); */
    /* let intervalo = moment(duracion); */
    /* let mes = intervalo.month() + 1; */
    /* let diaDelMes = intervalo.date();
    let hora = intervalo.hour();
    let minuto = intervalo.minute();
    let segundo = intervalo.second(); */
    /* setDias(diaDelMes);
    setHoras(hora);
    setMinutos(minuto);
    setSegundos(segundo); */
  }

  if(ended) return (
    <Box>
        <Box sx={{ display: { xs: "none", sm: "block" } }} textAlign="center">
          <Typography variant="h3">
            <b>Sorteo finalizado</b>
          </Typography>
        </Box>
        <Box
          mt={3}
          sx={{ display: { xs: "block", sm: "none" } }}
          textAlign="center"
        >
          <Typography variant="h6">
            <b>Tiempo restante para el sorteo</b>
          </Typography>
        </Box>
        <Box sx={{ display: { xs: "none", sm: "block" } }} textAlign="center">
          <Box display="flex" textAlign="center">
            <Box display="flex" flexDirection="column" p={3} ml={3}>
              <Box>
                <Typography variant="h1">
                  <b>0</b>
                </Typography>
              </Box>
              <Box>
                <Typography variant="h6">
                  <b>dias</b>
                </Typography>
              </Box>
            </Box>
            <Box display="flex" flexDirection="column" p={3} ml={3}>
              <Box>
                <Typography variant="h1">
                  <b>0</b>
                </Typography>
              </Box>
              <Box>
                <Typography variant="h6">
                  <b>horas</b>
                </Typography>
              </Box>
            </Box>
            <Box display="flex" flexDirection="column" p={3} ml={3}>
              <Box>
                <Typography variant="h1">
                  <b>0</b>
                </Typography>
              </Box>
              <Box>
                <Typography variant="h6">
                  <b>minutos</b>
                </Typography>
              </Box>
            </Box>
            <Box display="flex" flexDirection="column" p={3} ml={3}>
              <Box>
                <Typography variant="h1">
                  <b>0</b>
                </Typography>
              </Box>
              <Box>
                <Typography variant="h6">
                  <b>segundos</b>
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box
          p={2}
          sx={{ display: { xs: "block", sm: "none" } }}
          textAlign="center"
          justifyContent="center"
          alignItems="center"
          justifyItems="center"
        >
          <Box display="flex">
            <Box display="flex" flexDirection="column" p={1}>
              <Box>
                <Typography variant="h3">
                  <b>0</b>
                </Typography>
              </Box>
              <Box>
                <Typography sx={{ fontSize: 22 }}>
                  <b>dias</b>
                </Typography>
              </Box>
            </Box>
            <Box display="flex" flexDirection="column" p={1}>
              <Box>
                <Typography variant="h3">
                  <b>0</b>
                </Typography>
              </Box>
              <Box>
                <Typography sx={{ fontSize: 22 }}>
                  <b>horas</b>
                </Typography>
              </Box>
            </Box>
            <Box display="flex" flexDirection="column" p={1}>
              <Box>
                <Typography variant="h3">
                  <b>0</b>
                </Typography>
              </Box>
              <Box>
                <Typography sx={{ fontSize: 22 }}>
                  <b>minutos</b>
                </Typography>
              </Box>
            </Box>
            <Box display="flex" flexDirection="column" p={1}>
              <Box>
                <Typography variant="h3">
                  <b>0</b>
                </Typography>
              </Box>
              <Box>
                <Typography sx={{ fontSize: 22 }}>
                  <b>segundos</b>
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
  )

  return (
    <Fragment>
      <Box>
        <Box sx={{ display: { xs: "none", sm: "block" } }} textAlign="center">
          <Typography variant="h3">
            <b>Tiempo restante para el sorteo</b>
          </Typography>
        </Box>
        <Box
          mt={3}
          sx={{ display: { xs: "block", sm: "none" } }}
          textAlign="center"
        >
          <Typography variant="h6">
            <b>Tiempo restante para el sorteo</b>
          </Typography>
        </Box>
        <Box sx={{ display: { xs: "none", sm: "block" } }} textAlign="center">
          <Box display="flex" textAlign="center">
            <Box display="flex" flexDirection="column" p={3} ml={3}>
              <Box>
                <Typography variant="h1">
                  <b>{dias}</b>
                </Typography>
              </Box>
              <Box>
                <Typography variant="h6">
                  <b>dias</b>
                </Typography>
              </Box>
            </Box>
            <Box display="flex" flexDirection="column" p={3} ml={3}>
              <Box>
                <Typography variant="h1">
                  <b>{horas}</b>
                </Typography>
              </Box>
              <Box>
                <Typography variant="h6">
                  <b>horas</b>
                </Typography>
              </Box>
            </Box>
            <Box display="flex" flexDirection="column" p={3} ml={3}>
              <Box>
                <Typography variant="h1">
                  <b>{minutos}</b>
                </Typography>
              </Box>
              <Box>
                <Typography variant="h6">
                  <b>minutos</b>
                </Typography>
              </Box>
            </Box>
            <Box display="flex" flexDirection="column" p={3} ml={3}>
              <Box>
                <Typography variant="h1">
                  <b>{segundos}</b>
                </Typography>
              </Box>
              <Box>
                <Typography variant="h6">
                  <b>segundos</b>
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box
          p={2}
          sx={{ display: { xs: "block", sm: "none" } }}
          textAlign="center"
          justifyContent="center"
          alignItems="center"
          justifyItems="center"
        >
          <Box display="flex">
            <Box display="flex" flexDirection="column" p={1}>
              <Box>
                <Typography variant="h3">
                  <b>{dias}</b>
                </Typography>
              </Box>
              <Box>
                <Typography sx={{ fontSize: 22 }}>
                  <b>dias</b>
                </Typography>
              </Box>
            </Box>
            <Box display="flex" flexDirection="column" p={1}>
              <Box>
                <Typography variant="h3">
                  <b>{horas}</b>
                </Typography>
              </Box>
              <Box>
                <Typography sx={{ fontSize: 22 }}>
                  <b>horas</b>
                </Typography>
              </Box>
            </Box>
            <Box display="flex" flexDirection="column" p={1}>
              <Box>
                <Typography variant="h3">
                  <b>{minutos}</b>
                </Typography>
              </Box>
              <Box>
                <Typography sx={{ fontSize: 22 }}>
                  <b>minutos</b>
                </Typography>
              </Box>
            </Box>
            <Box display="flex" flexDirection="column" p={1}>
              <Box>
                <Typography variant="h3">
                  <b>{segundos}</b>
                </Typography>
              </Box>
              <Box>
                <Typography sx={{ fontSize: 22 }}>
                  <b>segundos</b>
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Fragment>
  );
}
