import React, { Fragment, useState } from "react";
import SnackBarMessages from "../../../Components/SnackBarMessages";

import {
  TextField,
  Typography,
  Box,
  Container,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio
} from "@material-ui/core";
import { withRouter } from "react-router";
import PagoPayPal from "./pago_paypal";
import { PaginaContext } from "../../../Context/PaginaContext";
import Cupon from './Cupon_pay';

function FormularioDatos({ sorteo, handleClose }) {
  const [datosBoleto, setDatosBoleto] = useState([]);
  const [payValue, setPayValue] = useState('Cupon')
  const { boletos_seleccionados } = React.useContext(PaginaContext);
  const [alert, setAlert] = useState({
    message: "",
    status: "",
    open: false,
  });

  const obtenerDatos = (e) => {
    setDatosBoleto({ ...datosBoleto, [e.target.name]: e.target.value });
  };

  /* const GuardarDatos = async () => {
    await clienteAxios
      .put(`/sorteo/comprarBoletoSorteo/${idBoleto}`)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }; */

  if (!boletos_seleccionados.length) return null;

  let items = [
    {
      sku: boletos_seleccionados[0]._id,
      name: "Promoción boletos 4x1",
      price: sorteo.precio_boleto,
      quantity: 1,
      currency: "MXN",
    },
  ];

  let order = {
    customer: datosBoleto.nombres,
    total: sorteo.precio_boleto,
    items: items,
  };

  const handleChangeValuePay = (e) => {
    setPayValue(e.target.value);
  }
  

  return (
    <Fragment>
      <SnackBarMessages alert={alert} setAlert={setAlert} />
      <Box p={2} textAlign="center">
        <Typography variant="h5">
          Por favor completa tus datos para continuar la compra de tu boleto
        </Typography>
      </Box>
      <Container maxWidth="xs">
        <TextField
          fullWidth
          onChange={obtenerDatos}
          size="small"
          name="nombres"
          id="form-producto-clave-alterna"
          variant="outlined"
          label="Nombres"
          margin="dense"
        />
        <TextField
          fullWidth
          onChange={obtenerDatos}
          size="small"
          name="apellidos"
          id="form-producto-clave-alterna"
          variant="outlined"
          label="Apellido"
          margin="dense"
        />
        <TextField
          fullWidth
          onChange={obtenerDatos}
          size="small"
          name="estado"
          id="form-producto-clave-alterna"
          variant="outlined"
          label="Estado"
          margin="dense"
        />
        <TextField
          fullWidth
          onChange={obtenerDatos}
          size="small"
          name="telefono"
          id="form-producto-clave-alterna"
          variant="outlined"
          label="Telefono"
          margin="dense"
        />
        <FormControl component="fieldset">
          {/* <FormLabel component="legend">Opciones de canjeo</FormLabel> */}
          <RadioGroup
            // aria-label="opcionesDeCanjeo"
            defaultValue="Cupon"
            name="radio-buttons-group"
            value={payValue}
            onChange={handleChangeValuePay}
          >
            <FormControlLabel
              value="Cupon"
              control={<Radio />}
              label="Cupon"
            />
            <FormControlLabel value="Paypal" control={<Radio />} label="Paypal" />
          </RadioGroup>
        </FormControl>
        <Box sx={{ display: "flex", justifyContent: "center", my: 2 }}>
          {payValue === "Cupon" ? (
            <Cupon 
              order={order} 
              datosBoleto={datosBoleto} 
              setAlert={setAlert}
              handleClose={handleClose}
            />
          ):(
            <PagoPayPal
            order={order}
            datosBoleto={datosBoleto}
            setAlert={setAlert}
            handleClose={handleClose}
          />
          )
        }
          
        </Box>
      </Container>
    </Fragment>
  );
}

export default withRouter(FormularioDatos);
