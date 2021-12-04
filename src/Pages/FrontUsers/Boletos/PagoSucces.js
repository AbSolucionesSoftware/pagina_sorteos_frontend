import { Typography } from "@material-ui/core";
import { CheckCircleOutlineTwoTone } from "@material-ui/icons";
import { Box } from "@material-ui/system";
import React from "react";

export default function PagoSuccess({ data }) {
  const { boletos_seleccionados, datosBoleto, folio } = data;

  console.log(folio)

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
            ¡Su pago ha sido realizado!
          </Typography>
          <Typography variant="h5">
            Has comprado los siguientes boletos
          </Typography>
          <Typography p={2} variant="h5" style={{fontWeight: "bold"}}>
            No. Folio de compra:
          </Typography>
          <Typography p={2} variant="h4" style={{fontWeight: "bold"}} >
            {folio.folio}
          </Typography>
          <Typography variant="h5">
            Boletos:
          </Typography>
          <Typography variant="h5">
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              p={2}
            >
              {boletos_seleccionados?.map((res) =>  
                    <div style={
                    {
                      padding: '0px 12px',
                      border: "1px solid black",
                      borderRadius:"5px",
                      marginRight: "4px",
                      backgroundColor: 'green',
                      color: 'white',
                      fontSize: '12px'
                    }
                  }>
                    <p>{res.numero_boleto}</p>
                  </div>
              )}
            </Box>
          </Typography>
          <Typography variant="h6">Compra realizada por</Typography>
          <Typography variant="h6">
            <b>{`${datosBoleto.nombres} ${datosBoleto.apellidos}`}</b>
          </Typography>
        </Box>
      </div>
    </Box>
  );
}

