import { Button,  Grid, Paper, TextField, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { Box } from '@material-ui/system';
import React, { useState } from 'react';

const useStyles = makeStyles((theme) => ({
    formInputFlex: {
        display: 'flex',
    },
    imagen:{
        maxHeight: '100%',
        maxWidth: '100%'
      },
      dropZone: {
          width: 500,
          height: 230,
          display:"flex",
          justifyContent: "center",
          alignContent: "center",
          border: 'dashed 2px',
          borderColor: '#aaaaaa'
      }
}));
export default function GeneradorNumeros({sorteoFinal, setSorteoFinal}) {
    const classes = useStyles();
    const [cifrasBoletos, setCifrasBoletos] = useState([]);
    const boletos = [];

    const obtenerCampos = (e) => {
        setCifrasBoletos({...cifrasBoletos, [e.target.name]: parseInt(e.target.value)})
    };

    const GenerarNumeros = () => {
        for (let i = cifrasBoletos.numero_inicial; i < cifrasBoletos.numero_final+1; i++) {
            var num = i.toString();
            const resultado = num.padStart(cifrasBoletos.cantidad_cifras, "0");
            let arrayBoleto =  {
                    numero_boleto: resultado,
                    nombres: '',
                    telefono: '',
                    apellidos: '',
                    estado: '',
                    fecha_pago: '',
                    vendido: false,
            };
            boletos.push(arrayBoleto);
        };
        setSorteoFinal({...sorteoFinal, boletos: boletos})
        setCifrasBoletos([]);
    };

    return (
        <div>
            <Paper elevation={6}>
                <Grid item lg={11}>
                    <Box display='flex'>
                        <Box p={2} sx={{ flexGrow: 1 }}>
                            <Typography variant='h5'>
                                <b>Generador de boletos</b>
                            </Typography>
                        </Box>
                        
                    </Box>
                </Grid>

                <Box p={2}>
                    <div className={classes.formInputFlex}>
                        <Box width="100%" p={1}>
                            <Typography>
                                Cantidad de cifras:
                            </Typography>
                            <TextField
                                fullWidth
                                size="small"
                                type='number'
                                value={cifrasBoletos.cantidad_cifras  ? cifrasBoletos.cantidad_cifras : ''}
                                name="cantidad_cifras"
                                variant="outlined"
                                onChange={obtenerCampos}
                            />  
                        </Box>
                        <Box width="100%" p={1}>
                            <Typography>
                                Numero inicial
                            </Typography>
                            <TextField
                                fullWidth
                                size="small"
                                type='number'
                                name="numero_inicial"
                                value={cifrasBoletos.numero_inicial || cifrasBoletos.numero_inicial === 0  ? cifrasBoletos.numero_inicial : ''}
                                variant="outlined"
                                onChange={obtenerCampos}
                            />
                        </Box>
                        <Box width="100%" p={1}>
                            <Typography>
                                Numero final:
                            </Typography>
                            <TextField
                                fullWidth
                                size="small"
                                type='number'
                                name="numero_final"
                                value={cifrasBoletos.numero_final ? cifrasBoletos.numero_final : ''}
                                variant="outlined"
                                onChange={obtenerCampos}
                            />
                        </Box>
                        <Box width="100%" p={1}>
                            <Typography>
                                Numero final:
                            </Typography>
                            <Button
                                variant='outlined'
                                color='primary'
                                size='large'
                                onClick={()=> GenerarNumeros()}
                            >
                                Generar
                            </Button>
                        </Box>
                    </div>
                </Box>
                <Grid container lg={12}>
                    {
                        sorteoFinal?.boletos?.map((element,index) => {
                            return(
                                <Box key={index} p={1}>
                                    <Paper elevantion={3}>
                                        <Box p={1}>
                                            <b>{element.numero_boleto}</b>
                                        </Box>
                                    </Paper>
                                </Box>
                            )
                        })
                    }
                </Grid>
            </Paper>
        </div>
    )
}
