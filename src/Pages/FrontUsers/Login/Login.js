import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Container,
  TextField,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React, { useState } from "react";
import jwt_decode from "jwt-decode";
import clienteAxios from "../../../Config/axios";
import SnackBarMessages from "../../../Components/SnackBarMessages";
import { PaginaContext } from "../../../Context/PaginaContext";

const useStyles = makeStyles((theme) => ({
  image: {
    maxHeight: "100%",
    maxWidth: "100%",
    display: "flex",
    justifyItems: "center",
    alignContent: "center",
    alignItems: "center",
  },
  containerImage: {
    width: 130,
    height: 130,
  },
}));

export default function Login(props) {
  const classes = useStyles();
  const { datos } = React.useContext(PaginaContext);

  const [loading, setLoading] = useState(false);
  const [validate, setValidate] = useState(false);
  const [inicioSesion, setIncioSesion] = useState([]);
  const [alert, setAlert] = useState({ message: "", status: "", open: false });
  const user = localStorage.getItem("userSorteos");
  const token = localStorage.getItem("tokenSorteos");

  if (token || user) {
    props.history.push("/");
  }

  const obtenerCampos = (e) => {
    setIncioSesion({
      ...inicioSesion,
      [e.target.name]: e.target.value,
    });
  };

  const iniciarSesion = async (e) => {
    e.preventDefault();

    if (!inicioSesion.nameUser || !inicioSesion.password) {
      setValidate(true);
      return;
    }
    setLoading(true);
    await clienteAxios
      .post("/empresa/logIn/", inicioSesion)
      .then((res) => {
        const decoded = jwt_decode(res.data.token);
        const token = res.data.token;
        localStorage.setItem("tokenSorteos", token);
        localStorage.setItem("userSorteos", JSON.stringify(decoded));
        setLoading(false);
        window.location.href = "/admin";
      })
      .catch((err) => {
        setLoading(false);
        if (err.response && err.response.data) {
          setAlert({
            message: err.response.data.message,
            status: "error",
            open: true,
          });
        } else {
          setAlert({
            message: `Error del seridor`,
            status: "error",
            open: true,
          });
        }
      });
  };

  return (
    <Box my={10}>
      <SnackBarMessages alert={alert} setAlert={setAlert} />
      <Container maxWidth="xs">
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Box className={classes.containerImage}>
            <Avatar sx={{ width: 135, height: 135 }}>
              <img
                className={classes.image}
                src={datos.imgEmpresaUrl}
                alt="imagen logo"
              />
            </Avatar>
          </Box>
        </Box>
        <Box p={2} textAlign="center">
          <Typography variant="h4">Iniciar Sesión</Typography>
        </Box>
        <form autoComplete="off" onSubmit={iniciarSesion}>
          <TextField
            label="Usuario"
            error={!inicioSesion.nameUser && validate}
            helperText={
              !inicioSesion.nameUser && validate
                ? "Esta campo es requerido"
                : null
            }
            fullWidth
            size="small"
            name="nameUser"
            variant="outlined"
            onChange={obtenerCampos}
            margin="normal"
          />
          <TextField
            label="Contraseña"
            fullWidth
            error={!inicioSesion.password && validate}
            helperText={
              !inicioSesion.password && validate
                ? "Esta campo es requerido"
                : null
            }
            size="small"
            type="password"
            name="password"
            id="form-producto-clave-alterna"
            variant="outlined"
            onChange={obtenerCampos}
            margin="normal"
          />
          <Box my={3} display="flex" justifyContent="center">
            <Button
              color="primary"
              size="large"
              variant="contained"
              type="submit"
              disabled={loading}
              startIcon={
                loading ? <CircularProgress color="inherit" size={18} /> : null
              }
            >
              Iniciar Sesión
            </Button>
          </Box>
        </form>
      </Container>
    </Box>
  );
}
