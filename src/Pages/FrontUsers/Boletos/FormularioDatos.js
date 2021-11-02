import React, { Fragment, useState } from "react";

import {
  TextField,
  Typography,
  Box,
  Container,
} from "@material-ui/core";
import { withRouter } from "react-router";
import clienteAxios from "../../../Config/axios";
import PagoPayPal from "./pago_paypal"
import { PaginaContext } from "../../../Context/PaginaContext";

function FormularioDatos({sorteo}) {

  const [datosBoleto, setDatosBoleto] = useState([]);
  const { boletos_seleccionados } = React.useContext(PaginaContext);

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

  if(!boletos_seleccionados.length) return null

  console.log(boletos_seleccionados);

  let items = [{	
    sku: boletos_seleccionados[0]._id,
    name: 'Promoción boletos 4x1',
    price: sorteo.precio_boleto,
    quantity: 1,
    currency: 'MXN'
}];

let order = {
    customer: datosBoleto.nombres,
    total: sorteo.precio_boleto,
    items: items
}

  return (
    <Fragment>
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
      <Box sx={{display: "flex", justifyContent: "center", my: 2}}>
        <PagoPayPal order={order} datosBoleto={datosBoleto} />
      </Box>
      </Container>
      
    </Fragment>
  );
}

export default withRouter(FormularioDatos);
