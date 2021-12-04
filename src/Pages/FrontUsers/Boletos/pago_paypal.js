import React, { useState } from "react";
import ReactDOM from "react-dom";
import Paypal from "paypal-checkout";
import { Box } from "@material-ui/core";
import { Fragment } from "react";
import clienteAxios from "../../../Config/axios";
import PagoResult from "./PagoResult";
import { PaginaContext } from "../../../Context/PaginaContext";

export default function PagoPaypal({
  order,
  datosBoleto,
  setAlert,
  handleClose,
}) {
  const token = localStorage.getItem("tokenSorteos");
  const [open, setOpen] = useState(false);
  const [dataPago, setDataPago] = useState({ status: "", data: "" });
  const { boletos_seleccionados } = React.useContext(PaginaContext);

  const paypalConfig = {
    currency: "MXN",
    env: "sandbox", //sandbox o production
    client: {
      sandbox: process.env.REACT_APP_PAYPAL_SANDBOX,
      /* production: process.env.REACT_APP_PAYPAL_LIVE */
    },
  };

  const PayPalButton = Paypal.Button.driver("react", { React, ReactDOM });

  const payment = (data, actions) => {
    const payment = {
      transactions: [
        {
          amount: {
            total: order.total,
            currency: paypalConfig.currency,
          },
          description: "Compra boletos promoción 4x1",
          custom: order.customer || "",
          item_list: {
            items: order.items,
          },
        },
      ],
      note_to_payer: "Contáctanos para cualquier aclaración",
    };

    return actions.payment.create({ payment });
  };

  const onAuthorize = (data, actions) => {
    return actions.payment
      .execute()
      .then(async (response) => {
        console.log(response);
        await clienteAxios
          .post(
            `/pago`,
            {
              cliente: datosBoleto,
              boletos: boletos_seleccionados,
              total: order.total,
              id_paypal: response.id,
              pagado: true,
            },
            {
              headers: {
                Authorization: `bearer ${token}`,
              },
            }
          )
          .then((res) => {
            setOpen(true);
            setDataPago({
              status: "success",
              data: { boletos_seleccionados, datosBoleto, folio: res.data.folio  },
            });
          })
          .catch((err) => {
            setOpen(true);
            setDataPago({
              status: "error",
              data: { boletos_seleccionados, paypal: "Error" },
            });
          });
      })
      .catch((error) => {
        console.log(error);
        setAlert({
          open: true,
          message: error,
          status: "error",
        });
      });
  };

  const onError = (error) => {
    console.log(error);
    setAlert({
      message: "Hubo un error con la solicitud",
      status: "error",
      open: true,
    });
  };

  const onCancel = (data, actions) => {
    setAlert({
      message: "Solicitud cancelada",
      status: "error",
      open: true,
    });
  };

  return (
    <Fragment>
      <Box
        display="flex"
        justifyContent="center"
        style={
          !datosBoleto.nombres ||
          !datosBoleto.apellidos ||
          !datosBoleto.estado ||
          !datosBoleto.telefono
            ? {
                pointerEvents: "none",
                opacity: 0.4,
              }
            : null
        }
      >
        <PayPalButton
          env={paypalConfig.env}
          client={paypalConfig.client}
          payment={(data, actions) => payment(data, actions)}
          onAuthorize={(data, actions) => onAuthorize(data, actions)}
          onCancel={(data, actions) => onCancel(data, actions)}
          onError={(error) => onError(error)}
          style={{
            label: "pay",
            size: "medium",
            shape: "rect",
            color: "blue",
          }}
          commit
          locale="es_MX"
        />
      </Box>
      <PagoResult
        open={open}
        setOpen={setOpen}
        dataPago={dataPago}
        handleCloseForm={handleClose}
      />
    </Fragment>
  );
}
