/* import {
  Avatar,
  Box,
  Chip,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Grid,
  Slide,
  TextField,
  Typography,
  Container,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles"; */
import React/* , { useState } */ from "react";
/* import { PaginaContext } from "../../../Context/PaginaContext";
import clienteAxios from "../../../Config/axios";
import { Link } from "react-router-dom"; */
import Error404 from "../Error";
/* 
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
    width: 135,
    height: 135,
  },
  formInputFlex: {
    display: "flex",
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
}); */

export default function Verificador() {
 /*  const { datos } = React.useContext(PaginaContext);
  const classes = useStyles();
  /* const [verBoleto, setVerBoleto] = useState([]); */
/*   const [numeroBoleto, setNumeroBoleto] = useState("");
  const [open, setOpen] = useState(false);

  const traerDatos = async (e) => {
    e.preventDefault();
    await clienteAxios
      .post(`/sorteo/buscarBoleto/${datos._id}`, numeroBoleto)
      .then((res) => {
          console.log(res);
        setVerBoleto(res.data[0]);
        if (res.data[0]) {
          handleDrawerOpenBoleto();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const obtenerCampos = (e) => {
    setNumeroBoleto(e.target.value );
  };

  const handleDrawerOpenBoleto = () => {
    setOpen(!open);
  }; */

  return (
    <Error404 />
  )

  /* return (
    <Box>
      <Container maxWidth="xs" sx={{ mt: 10 }}>
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
          <Typography variant="h4">Verficador de Boletos</Typography>
        </Box>
        <form autoComplete="off" onSubmit={traerDatos}>
          <TextField
            label="Numero de boleto"
            fullWidth
            type="number"
            size="small"
            name="numeroBoleto"
            variant="outlined"
            onChange={obtenerCampos}
            margin="normal"
          />
          <Box p={3} display="flex" justifyContent="center">
            <Button
              color="primary"
              size="large"
              variant="contained"
              type="submit"
            >
              Verificar
            </Button>
          </Box>
        </form>
      </Container>

      <Dialog
        open={open}
        TransitionComponent={Transition}
        fullWidth
        maxWidth="xs"
        onClose={handleDrawerOpenBoleto}
        aria-describedby="alert-dialog-slide-description"
      >
        {console.log(verBoleto)}
        <DialogContent>
          <Grid>
            {verBoleto.vendido === true ? (
              <Box p={2} textAlign="center">
                <Typography variant="h5">
                  Lo sentimos este boleto ya no esta disponible
                </Typography>
              </Box>
            ) : (
              <>
                <Box p={2} textAlign="center">
                  <Typography variant="h5">Boleto disponible</Typography>
                  <Box>
                    <Typography>
                      Presiona sobre boleto para poder realizar tu comprar
                    </Typography>
                  </Box>
                </Box>
                <Box
                  display="flex"
                  justifyItems="center"
                  justifyContent="center"
                >
                  <Box p={1}>
                    <Chip
                      style={{ backgroundColor: "white", border: " solid 2px" }}
                      component={Link}
                      to={`/sorteos/comprar-boleto/${verBoleto.numero_boleto}/${verBoleto._id}`}
                      label={
                        <Box p={1}>
                          <Typography variant="h5">
                            <b>{verBoleto.numero_boleto}</b>
                          </Typography>
                        </Box>
                      }
                    />
                  </Box>
                </Box>
              </>
            )}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            color="error"
            variant="contained"
            onClick={handleDrawerOpenBoleto}
          >
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  ); */
}
