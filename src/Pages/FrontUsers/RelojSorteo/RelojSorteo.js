import React, { Fragment, useState } from 'react';
import { Grid, Typography, Box, Button } from '@material-ui/core';
import { PaginaContext } from '../../../Context/PaginaContext';
import moment from 'moment';

export default function RelojSorteo() {

    const { datosSorteo } = React.useContext(PaginaContext);
    const [reloj, setReloj] = useState('');
    if(!datosSorteo) {return null}

    var final = moment(datosSorteo.fecha_sorteo);

    const relojDeInicio = () => {
        var inicio = moment();
        var duracion = final.diff(inicio);
        var intervalo = moment(duracion);
        var mes = intervalo.month()+1;
        var diaDelMes = intervalo.date();
        var hora = intervalo.hour();
        var minuto = intervalo.minute();
        var segundo = intervalo.second();
        // var resultado = (intervalo.format("MM/DD HH:mm:ss"));
        // setReloj(resultado);
        // setReloj(mes + " Meses " + diaDelMes + " Dias " + hora + " Horas " + minuto + " Minutos " + segundo);
    };

    setInterval(relojDeInicio, 1000);

    return (
        <Fragment>
            <Grid lg={12}>
                <Box p={5}>
                    <Box sx={{ display: { xs: 'none', sm: 'block' } }} textAlign='center' >
                        <Typography variant='h3'>
                            <b>Tiempo restante para el sorteo</b> 
                        </Typography>
                    </Box>
                    <Box mt={3} sx={{ display: { xs: 'block', sm: 'none' } }} textAlign='center'>
                        <Typography variant='h5'>
                            <b>Tiempo restante para el sorteo</b> 
                        </Typography>
                    </Box>
                    <Box mt={3} mb={2} sx={{ display: { xs: 'none', sm: 'block' } }} textAlign='center' >
                        <Typography variant='h1'>
                            {reloj}
                        </Typography>
                    </Box>
                    <Box mt={3} mb={2} sx={{ display: { xs: 'block', sm: 'none' } }} textAlign='center'>
                        <Typography variant='h4'>
                            {reloj}
                        </Typography>
                    </Box>
                    <Box p={1} textAlign='center'>
                        <Box p={1}>
                            <Typography variant="h5">
                                <b>Aun estas a tiempo de adquirir tu boleto</b>
                            </Typography>
                        </Box>
                        <Box p={1}>
                            <Button
                                href="/sorteos/boletos"
                                style={{color:'black' , background: '#76ff03' }}
                            >
                                <Typography variant="h5">
                                    <b>Comprar Boleto</b>
                                </Typography> 
                            </Button>
                        </Box>
                    </Box>
                </Box>



            </Grid>
        </Fragment>
    )
}
