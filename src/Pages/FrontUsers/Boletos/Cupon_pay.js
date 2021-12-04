import React, {useState, useContext} from 'react';
import {Button, TextField} from "@material-ui/core";
import clienteAxios from '../../../Config/axios';
import { PaginaContext } from '../../../Context/PaginaContext';
import PagoResult from './PagoResult';

export default function Cupon_pay({datosBoleto, order, setAlert, handleClose}) {

    const [cuponValue, setCuponValue] = useState('');
    const [open, setOpen] = useState(false);
    const [dataPago, setDataPago] = useState({ status: "", data: "" });
    const token = localStorage.getItem("tokenSorteos");

    const { boletos_seleccionados } = useContext(PaginaContext);

    const handleChangeCuponValue = (e) => {
        setCuponValue(e.target.value)
    }

    const handleSubmitExchangeCupon = async () => {
        try {
            if(cuponValue === ''){
                setAlert({
                    open: true,
                    message: 'Agrege un cupon',
                    status: "error",
                });
            }else{
                const folio = await clienteAxios.post(
                    `/pago/cupon/${cuponValue}`,
                    {
                        cliente: datosBoleto,
                        boletos: boletos_seleccionados,
                        total: order.total,
                        pagado: true
                    },
                    {
                        headers: {
                            Authorization: `bearer ${token}`,
                        },
                    }
                );

                setOpen(true);
                    setDataPago({
                      status: "success",
                      data: { boletos_seleccionados, datosBoleto, folio: folio.data.folio },
                    });
                
            }
        } catch (error) {
            console.log(error.response);
            setAlert({
                open: true,
                message: error.response.data.message,
                status: "error",
            });
        }
    }

    return (
        <div style={{display: "flex"}} >
            <TextField
              id="cupon"
              label="Canjear Cupon"
              fullWidth
              size="small"
              variant="outlined"
              name="cupon"
              style={{padding: '1px'}}
            // margin="normal"
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
              value={cuponValue}
              onChange={handleChangeCuponValue}
            />
            <Button
                // style={{margin: "0px 10px"}}
                variant='outlined'
                color='primary'
                size='large'
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
                  onClick={() => handleSubmitExchangeCupon()}
            >
                Canjear
            </Button>
            <PagoResult
                open={open}
                setOpen={setOpen}
                dataPago={dataPago}
                handleCloseForm={handleClose}
            />
        </div>
    )
}
