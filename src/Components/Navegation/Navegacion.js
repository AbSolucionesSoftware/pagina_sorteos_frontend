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
  ListItemText,
  Typography,
} from "@material-ui/core";

import DehazeIcon from "@material-ui/icons/Dehaze";
import useStyles from "./Styles";
import { Link } from "react-router-dom";
import clienteAxios from "../../Config/axios";
import { PaginaContext } from "../../Context/PaginaContext";
import AccountMenu from "./AccountMenu";
import { Verified } from "@mui/icons-material";
import { Home, Money, QuestionAnswer } from "@material-ui/icons";

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
      <Box
        sx={{ display: { xs: "flex", sm: "flex", md: "none", width: "100%" } }}
      >
        <IconButton
          onClick={handleOpen}
          color="inherit"
          size="large"
          component="span"
        >
          <DehazeIcon size="large" />
        </IconButton>
        <Box flexGrow={1} />
        {token !== null && user !== null ? <AccountMenu /> : null}
      </Box>
      <Box
        sx={{
          display: { xs: "none", sm: "none", md: "flex" },
          alignItems: "center",
          width: "100%",
        }}
      >
        <Box className={classes.containerImage}>
          <Avatar component={Link} to={`/`}>
            <img
              className={classes.image}
              src={datos.imgEmpresaUrl}
              alt="imagen logo"
            />
          </Avatar>
        </Box>
        <Box display="flex" alignContent="center" justifyItems="center" mx={1}>
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
          onClick={() =>
            setTimeout(() => {
              window.scrollTo(0, 0);
            }, 200)
          }
        >
          Inicio
        </Button>
        <Button
          color="inherit"
          sx={{ textTransform: "none", fontSize: 17, mx: 1 }}
          component={Link}
          to={`/`}
          onClick={() =>
            setTimeout(() => {
              window.scrollTo(0, 2000);
            }, 200)
          }
        >
          Preguntas Frecuentes
        </Button>
        {/* <Button
          color="inherit"
          sx={{ textTransform: "none", fontSize: 17, mx: 1 }}
          component={Link}
          to={`/sorteos/verificador`}
        >
          Verificar Boleto
        </Button> */}
        <Button
          color="inherit"
          sx={{ textTransform: "none", fontSize: 17, mx: 1 }}
          component={Link}
          to={`/sorteos/boletos`}
          onClick={() =>
            setTimeout(() => {
              window.scrollTo(0, 0);
            }, 200)
          }
        >
          Comprar Boleto
        </Button>
        {token !== null && user !== null ? <AccountMenu /> : null}
      </Box>

      {/* MODO RESPONSIVO */}
      <Drawer anchor="left" open={openDrawer} onClose={handleOpen}>
        <Box height="100%">
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
              <ListItemButton component={Link} to={`/`} onClick={() => {
                handleOpen();
                setTimeout(() => {
                  window.scrollTo(0, 0);
                }, 200)
              }}>
                <ListItemIcon>
                  <Home />
                </ListItemIcon>
                <ListItemText primary="Inicio" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component={Link} to={`/`} onClick={() => {
                handleOpen();
                setTimeout(() => {
                  window.scrollTo(0, 2000);
                }, 200)
              }}>
                <ListItemIcon>
                  <QuestionAnswer />
                </ListItemIcon>
                <ListItemText primary="Preguntas Frecuentes" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton
                component={Link}
                to={`/sorteos/boletos`}
                onClick={() => {
                  handleOpen();
                  setTimeout(() => {
                    window.scrollTo(0, 0);
                  }, 200)
                }}
              >
                <ListItemIcon>
                  <Money />
                </ListItemIcon>
                <ListItemText primary="Comprar Boleto" />
              </ListItemButton>
            </ListItem>
            {/* <ListItem disablePadding>
              <ListItemButton
                component={Link}
                to={`/sorteos/verificador`}
                onClick={() => {
                  handleOpen();
                  setTimeout(() => {
                    window.scrollTo(0, 0);
                  }, 200)
                }}
              >
                <ListItemIcon>
                  <Verified />
                </ListItemIcon>
                <ListItemText primary="Verificador boletos" />
              </ListItemButton>
            </ListItem> */}
          </List>
        </Box>
      </Drawer>
    </Fragment>
  );
}
