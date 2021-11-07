import { Typography } from "@material-ui/core";
import { HighlightOffTwoTone } from "@material-ui/icons";
import { Box } from "@material-ui/system";
import React from "react";

export default function PagoError() {
  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <div>
        <Box display="flex" justifyContent="center" alignItems="center">
          <HighlightOffTwoTone
            style={{ fontSize: 150, color: "#ef5350" }}
          />
        </Box>
        <Box mt={4} textAlign="center">
          <Typography variant="h5">
            <b>¡Su pago ha sido rechazado!</b>
          </Typography>
          <Typography variant="h5">
            Lo sentimos, hubo un problema con su pago
          </Typography>
        </Box>
      </div>
    </Box>
  );
}
