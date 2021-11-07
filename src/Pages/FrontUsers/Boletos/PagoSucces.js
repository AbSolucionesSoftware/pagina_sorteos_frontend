import { Typography } from "@material-ui/core";
import { CheckCircleOutlineTwoTone } from "@material-ui/icons";
import { Box } from "@material-ui/system";
import React from "react";

export default function PagoSuccess({ data }) {
  const { boletos_seleccionados, datosBoleto } = data;

  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <div>
        <Box display="flex" justifyContent="center" alignItems="center">
          <CheckCircleOutlineTwoTone
            style={{ fontSize: 150, color: "#4caf50" }}
          />
        </Box>
        <Box mt={4} textAlign="center">
          <Typography variant="h5">
            <b>¡Su pago ha sido realizado!</b>
          </Typography>
          <Typography variant="h5">
            Has comprado los siguientes boletos
          </Typography>
          <Typography variant="h5">
            <b>
              {boletos_seleccionados?.map((res) => `${res.numero_boleto} `)}
            </b>
          </Typography>
          <Typography variant="h6">Compra realizada por</Typography>
          <Typography variant="h6">
            <b>{datosBoleto.nombres}</b>
          </Typography>
        </Box>
      </div>
    </Box>
  );
}
