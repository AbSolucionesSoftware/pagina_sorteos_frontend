import React, { Fragment, useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Typography,
} from "@material-ui/core";

import DehazeIcon from "@material-ui/icons/Dehaze";
import useStyles from "./Styles";
/* import { HashLink } from 'react-router-hash-link'; */
import { Link } from "react-router-dom";
import clienteAxios from "../../Config/axios";
import { PaginaContext } from "../../Context/PaginaContext";
import AccountMenu from "./AccountMenu";

export default function Navegacion() {
  const {
    datos,
    setDatos,
    reload,
    setReload,
    setDatosSorteo,
  } = React.useContext(PaginaContext);
  const classes = useStyles();
  const [openDrawer, setOpenDrawer] = useState(false);
  const user = JSON.parse(localStorage.getItem("userSorteos"));
  const token = localStorage.getItem("tokenSorteos");

  console.log(user);

  const handleOpen = () => {
    setOpenDrawer(!openDrawer);
  };

  const traerDatos = async () => {
    await clienteAxios
      .get(`/empresa/empresaSorteo`)
      .then((res) => {
        setDatos(res.data.empresa);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const traerSorteoActivo = async () => {
    await clienteAxios
      .get(`/sorteo/getSorteoActivo`)
      .then((res) => {
        setDatosSorteo(res.data.sorteo);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    traerSorteoActivo();
    traerDatos();
    setReload(false);
  }, [reload]);

  if (!datos) return null;

  return (
    <Fragment>
      <Box sx={{ display: { xs: "block", sm: "block", md: "none" } }}>
        <IconButton
          onClick={handleOpen}
          color="success"
          size="large"
          component="span"
        >
          <DehazeIcon size="large" />
        </IconButton>
      </Box>
      <Box
        sx={{
          display: { xs: "none", sm: "none", md: "flex" },
          alignItems: "center",
          width: "100%",
        }}
      >
        <Box className={classes.containerImage}>
          <Avatar component={Link} to={`/`} sx={{ width: 85, height: 85 }}>
            <img
              className={classes.image}
              src={datos.imgEmpresaUrl}
              alt="imagen logo"
            />
          </Avatar>
        </Box>
        <Box
          sx={{ display: { xs: "block", md: "none", lg: "none" } }}
          className={classes.containerImageRes}
        >
          <Avatar component={Link} to={`/`} sx={{ width: 30, height: 30 }}>
            <img
              className={classes.imageRes}
              src={datos.imgEmpresaUrl}
              alt="imagen logo"
            />
          </Avatar>
        </Box>
        <Box display="flex" alignContent="center" justifyItems="center">
          <Typography variant="h6">
            <b>{datos.nombre_empresa}</b>
          </Typography>
        </Box>
        <Box flexGrow={1} />
        <Button
          color="inherit"
          sx={{ textTransform: "none", fontSize: 17, mx: 1 }}
          component={Link}
          to={`/`}
        >
          Inicio
        </Button>
        <Button
          color="inherit"
          sx={{ textTransform: "none", fontSize: 17, mx: 1 }}
          component={Link}
          to={`/`}
          onClick={() => setTimeout(() => {
            window.scrollTo(0, 1000)
          }, 300)}
        >
          Preguntas Frecuentes
        </Button>
        <Button
          color="inherit"
          sx={{ textTransform: "none", fontSize: 17, mx: 1 }}
          component={Link}
          to={`/sorteos/verificador`}
        >
          Verificar Boleto
        </Button>
        <Button
          color="inherit"
          sx={{ textTransform: "none", fontSize: 17, mx: 1 }}
          component={Link}
          to={`/sorteos/boletos`}
        >
          Comprar Boleto
        </Button>
        {token !== null && user !== null ? <AccountMenu /> : null}
      </Box>

      {/* MODO RESPONSIVO */}
      <Drawer anchor="left" open={openDrawer} onClose={handleOpen}>
        <Box height="100%" style={{ background: "black", color: "#76ff03" }}>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Box className={classes.containerImageDrawer}>
              <img
                className={classes.image}
                src={datos.imgEmpresaUrl}
                alt="imagen logo"
              />
            </Box>
          </Box>
          <List>
            <ListItem disablePadding>
              {token !== null && user !== null ? <AccountMenu /> : null}
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component={Link} to={`/`} onClick={handleOpen}>
                <Typography>
                  <b>Inicio</b>
                </Typography>
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component={Link} to={`/`} onClick={handleOpen}>
                <Typography>
                  <b>Preguntas Frecuentes</b>
                </Typography>
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton
                component={Link}
                to={`/sorteos/boletos`}
                onClick={handleOpen}
              >
                <Typography>
                  <b>Comprar Boleto</b>
                </Typography>
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton
                component={Link}
                to={`/sorteos/verificador`}
                onClick={handleOpen}
              >
                <Typography>
                  <b>Verificador boletos</b>
                </Typography>
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </Fragment>
  );
}
