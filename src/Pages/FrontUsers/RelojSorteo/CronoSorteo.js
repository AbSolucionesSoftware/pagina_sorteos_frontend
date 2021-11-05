import React, { Fragment } from 'react';
import { Typography, Box } from "@material-ui/core";
import Countdown from 'react-countdown';
import moment from "moment";
import { PaginaContext } from '../../../Context/PaginaContext';

export default function RelojSorteo(){
    const { datosSorteo } = React.useContext(PaginaContext);

    if (!datosSorteo) {
        return null;
    }

    const renderer = (rsult) => {
        console.log(rsult);
        const { days, hours, minutes, seconds, completed } = rsult
        if (completed) {
          // Render a completed state
          return <Completionist />;
        } else {
          // Render a countdown
          return <span>{days}:{hours}:{minutes}:{seconds}</span>;
          return <RenderTimer dias={days} horas={hours} minutos={minutes} segundos={seconds} />
        }
      };

    let inicio = moment()
    let final = moment(datosSorteo.fecha_sorteo)

    return(
    <Countdown
    daysInHours={false}
        date={final}
        renderer={renderer}
    />
    )
}

// Random component
const Completionist = () => {
    return(
        <span>You are good to go!</span>
    )
};

// Renderer callback with condition
const RenderTimer = ({dias, horas, minutos, segundos}) => {

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
                <b>Tiempo restante para el proximo sorteo</b>
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
