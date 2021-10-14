import React, { Fragment, useState } from 'react';
import { Grid, Typography, Box, Button } from '@material-ui/core';
import { PaginaContext } from '../../../Context/PaginaContext';
import moment from 'moment';

export default function RelojSorteo() {

    const { datosSorteo } = React.useContext(PaginaContext);
    const [reloj, setReloj] = useState('');
    const [ meses, setMeses ] = useState('');
    const [ dias , setDias ] = useState('');
    const [ horas , setHoras ] = useState('');
    const [ minutos , setMinutos ] = useState('');
    const [ segundos , setSegundos ] = useState('');


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
        setMeses(mes);
        setDias(diaDelMes);
        setHoras(hora);
        setMinutos(minuto);
        setSegundos(segundo);
    };

    setInterval(relojDeInicio, 1000);

    return (
        <>
            <Grid lg={12}>
                <Box>
                    <Box sx={{ display: { xs: 'none', sm: 'block' } }} textAlign='center' >
                        <Typography variant='h3'>
                            <b>Tiempo restante para el sorteo</b> 
                        </Typography>
                    </Box>
                    <Box mt={3} sx={{ display: { xs: 'block', sm: 'none' } }} textAlign='center'>
                        <Typography variant='h5'>
                            <b>Tiempo restante para el proximo sorteo</b> 
                        </Typography>
                    </Box>
                    <Box sx={{ display: { xs: 'none', sm: 'block' } }} textAlign='center' >
                        <Box display="flex" textAlign='center' >
                            <Box display="flex" flexDirection="column" p={3} ml={3}>
                                <Box>
                                    <Typography  variant='h1' >
                                        <b>{dias}</b>
                                    </Typography>
                                </Box>
                                <Box>
                                    <Typography variant="h6">
                                        <b>dias</b>
                                    </Typography>
                                </Box>
                            </Box>
                            <Box display="flex" flexDirection="column" p={3} ml={3}>
                                <Box>
                                    <Typography  variant='h1' >
                                        <b>{horas}</b>
                                    </Typography>
                                </Box>
                                <Box>
                                    <Typography variant="h6">
                                        <b>horas</b>
                                    </Typography>
                                </Box>
                            </Box>
                            <Box display="flex" flexDirection="column" p={3} ml={3}>
                                <Box>
                                    <Typography  variant='h1' >
                                        <b>{minutos}</b>
                                    </Typography>
                                </Box>
                                <Box>
                                    <Typography variant="h6">
                                        <b>minutos</b>
                                    </Typography>
                                </Box>
                            </Box>
                            <Box display="flex" flexDirection="column" p={3} ml={3}>
                                <Box>
                                    <Typography  variant='h1' >
                                        <b>{segundos}</b>
                                    </Typography>
                                </Box>
                                <Box>
                                    <Typography variant="h6">
                                        <b>segundos</b>
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                    <Box 
                        p={2} 
                        sx={{ display: { xs: 'block', sm: 'none' } }} 
                        textAlign='center' 
                        justifyContent="center"
                        alignItems="center"
                        justifyItems="center"
                    >
                        <Box display="flex" >
                            <Box display="flex" flexDirection="column" p={1}>
                                <Box>
                                    <Typography>
                                        <b>{dias}</b>
                                    </Typography>
                                </Box>
                                <Box>
                                    <Typography>
                                        <b>dias</b>
                                    </Typography>
                                </Box>
                            </Box>
                            <Box display="flex" flexDirection="column" p={1}>
                                <Box>
                                    <Typography>
                                        <b>{horas}</b>
                                    </Typography>
                                </Box>
                                <Box>
                                    <Typography>
                                        <b>horas</b>
                                    </Typography>
                                </Box>
                            </Box>
                            <Box display="flex" flexDirection="column" p={1}>
                                <Box>
                                    <Typography>
                                        <b>{minutos}</b>
                                    </Typography>
                                </Box>
                                <Box>
                                    <Typography>
                                        <b>minutos</b>
                                    </Typography>
                                </Box>
                            </Box>
                            <Box display="flex" flexDirection="column" p={1}>
                                <Box>
                                    <Typography>
                                        <b>{segundos}</b>
                                    </Typography>
                                </Box>
                                <Box>
                                    <Typography>
                                        <b>segundos</b>
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                    <Box p={1} textAlign='center'>
                        <Box p={1}>
                            <Typography variant="h5">
                                <b>¡Aun estas a tiempo de adquirir tu boleto!</b>
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
        </>
    )
}
