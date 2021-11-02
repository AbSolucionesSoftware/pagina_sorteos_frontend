import React from "react";
import ReactDOM from "react-dom";
import Paypal from "paypal-checkout";
import { Box } from "@material-ui/core";
import { Fragment } from "react";
import clienteAxios from "../../../Config/axios";

export default function PagoPaypal({ order, datosBoleto }) {
  const token = localStorage.getItem("token");

  const paypalConfig = {
    currency: "MXN",
    env: "sandbox", //sandbox o production
    client: {
      sandbox: process.env.REACT_APP_PAYPAL_SANDBOX,
      /* production: process.env.REACT_APP_PAYPAL_LIVE */
    },
  };

  console.log(order);

  const PayPalButton = Paypal.Button.driver("react", { React, ReactDOM });

  const payment = (data, actions) => {
    const payment = {
			transactions: [
				{
					amount: {
						total: order.total,
						currency: paypalConfig.currency
					},
					description: 'Compra boletos promoción 4x1',
					custom: order.customer || '',
					item_list: {
						items: order.items
					}
				}
			],
			note_to_payer: 'Contáctanos para cualquier aclaración'
		};

		return actions.payment.create({ payment });
  };

  const onAuthorize = (data, actions) => {
    return actions.payment
	 		.execute()
	 		.then(async (response) => {
				 console.log(response);
	 			/* await clienteAxios
	 				.post(
	 					`/pay/confirm/paypal`,
	 					{
	 						idPaypal: response.id,
	 						courses: compra.courses,
	 						username: compra.user.name,
	 						idUser: compra.user._id,
	 						total: total,
	 						typePay: 'paypal'
	 					},
	 					{
	 						headers: {
	 							Authorization: `bearer ${token}`
	 						}
	 					}
	 				)
	 				.then((res) => {
	 					window.location.href = `/payment_success/${res.data.idPay}`;
	 				})
	 				.catch((err) => {
	 					if (err.response) {
	 						window.location.href = `/payment_failed/paypal/${err.response.data.message}`;
	 					} else {
	 						window.location.href = `/payment_failed/paypal/Al parecer no se a podido conectar al servidor`;
	 					}
	 				}); */
	 		})
	 		.catch((error) => {
				 console.log(error);
	 			/* setSnackbar({
					open: true,
					mensaje: error,
					status: 'error'
				}); */
	 		});
  };

  const onError = (error) => {
	  console.log(error);
  };

  const onCancel = (data, actions) => {};

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
            size: "large",
            shape: "rect",
            color: "blue",
          }}
          commit
          locale="es_MX"
        />
      </Box>
    </Fragment>
  );
}
