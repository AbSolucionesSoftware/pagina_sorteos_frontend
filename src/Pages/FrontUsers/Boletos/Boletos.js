import React, { useEffect, useState } from 'react';

import { Box, Button, Chip, Grid, IconButton, InputBase, Paper,  Typography } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search';
import { Link } from 'react-router-dom';
import clienteAxios from '../../../Config/axios';
import { makeStyles } from '@material-ui/styles';
import { PaginaContext } from '../../../Context/PaginaContext';

const useStyles = makeStyles((theme) => ({
    
    containerImagen: {
		height: 500,
        width: 500
	},
    image: {
		minHeight: '100%',
        minWidth: '100%',
        display: 'flex',
        justifyItems: 'center',
        alignContent: 'center',
        alignItems: 'center'
	},
   
}));

export default function Boletos({type}) {
    const { datos } = React.useContext(PaginaContext);
    const classes = useStyles();
    const [sorteo, setSorteo] = useState([]);
    const [boletos, setBoletos] = useState([]);
    const [numeroBoleto, setNumeroBoleto] = useState([]);

    const traerSorteoActivo = async () => {
        await clienteAxios
        .get(`/sorteo/getSorteoActivo`)
        .then((res) => {
            setSorteo(res.data.sorteo);
            setBoletos(res.data.sorteo.boletos);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    const traerDatosBoleto = async () => {
        console.log("si entra la condicion");
        await clienteAxios
        .post(`/sorteo/buscarBoleto/${datos._id}`, numeroBoleto)
        .then((res) => {
            console.log(res.data);
            setBoletos(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    useEffect(() => {
        traerSorteoActivo();
    }, []);

    const pressEnter = (e) => {
        if(!e.target.defaultValue) return;
        traerDatosBoleto();
    };

    if(!sorteo) return null

    return (
        <>
            <Box textAlign='center'>  
                <Box p={4}>
                    <Typography variant="h6">
                        Fecha del sorteo: <b>{sorteo ? sorteo.fecha_sorteo : null}</b>
                    </Typography>
                    <Typography variant='h3'>
                        <b>{ sorteo ?  sorteo.nombre_sorteo  : null}</b>
                    </Typography>
                </Box>
            </Box>
            <Box style={{backgroundColor: 'white'}}>
                <Box textAlign="center" p={2}>
                    <Typography variant='h4'>
                        <b>¡Premios!</b>
                    </Typography>
                </Box>
                {/* {
                    sorteo?.lista_premios?.map((premio, index) => {
                        return(
                            <Box display="flex" justifyContent="center" alignItems="center" justifyItems="center" textAlign="center" p={1}>
                                <Box p={1}>
                                    <Typography variant='h5'>
                                        <b>{index+1}° Lugar  </b>
                                    </Typography>
                                </Box>
                                <Box p={1}>
                                    <Typography variant='h5'>
                                        <b>  {premio.premio} </b>
                                    </Typography>
                                </Box>
                            </Box>
                        )
                    })
                } */}
            </Box>
            {
                type === 'FRENTE' ? (
                    <Box p={3} textAlign="center">
                        <Button
                            href="/sorteos/boletos"
                            style={{color: 'white' , backgroundColor: 'black' }}
                        >
                            <Typography variant="h4">
                                <b>Ver Boletos</b>
                            </Typography> 
                        </Button>
                    </Box>
                ) : (
                    <Box p={2} textAlign="center">
                        <Typography variant="h6">
                            <b>Lista de boletos abajo</b>
                        </Typography>
                    </Box>
                )
            }
            <Box p={2} mt={2} textAlign='center' display="flex" justifyContent="center" justifyItems="center" style={{backgroundColor: 'white'}}>  
                <Box textAlign='center' style={{width: "70%", height: '80%'}} >
                    <img 
                        style={{width: '100%', height: '100%', display: "flex", justifyContent: "center"}}
                        src={sorteo.imgSorteoBoletosUrl}
                        alt="Imagen de sorteo"
                    />
                </Box>
            </Box>

            {
                type === 'FRENTE' ? null : (
                    <>
                        <Box textAlign="center" p={2}>
                            <Typography variant='h3'>
                                <b>¡Boletos Disponibles!</b>
                            </Typography>
                        </Box>
                        <Box p={3} style={{backgroundColor: "white"}} textAlign="center">
                            <Typography variant="h5">
                                <b>Precio Boleto</b>
                            </Typography>
                            <Typography variant="h2">
                                <b>$ {sorteo.precio_boleto}.00 Mx.</b>
                            </Typography>
                        </Box>
                        <Box textAlign="center" p={2}>
                            <Box display="flex" justifyItems="center" justifyContent="center">
                                <Box p={1} >
                                    <Chip
                                        style={{backgroundColor: "white"}}
                                        label={<Box p={1}><Typography variant='h5'><b>0000</b></Typography></Box>}
                                    />
                                </Box>
                                <Box p={1} >
                                    <Typography variant="h6">
                                        <b>Blancos boletos disponibles</b>
                                    </Typography>
                                </Box>
                            </Box>
                            <Box display="flex" justifyItems="center" justifyContent="center">
                                <Box p={1} >
                                    <Chip
                                        style={{backgroundColor: "#2e7d32"}}
                                        label={<Box p={1}><Typography variant='h5'><b>0000</b></Typography></Box>}
                                    />
                                </Box>
                                <Box p={1} >
                                    <Typography variant="h6">
                                        <b>Verdes boletos vendidos</b>
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>
                       
                        <Box display='flex' justifyItems='center' alignContent='center' textAlign='center'> 
                            <Box width="50%" p={1}>
                                <Paper
                                    component="form"
                                    sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 'auto' }}
                                >
                                    <InputBase
                                        sx={{ ml: 1, flex: 1 }}
                                        placeholder="Busca tu boleto"
                                        inputProps={{ 'aria-label': 'busca tu boleto' }}
                                        onKeyPress={pressEnter}
                                        onChange={(e) => setNumeroBoleto({...numeroBoleto, numeroBoleto: e.target.value })}
                                    />
                                    <IconButton 
                                        type="submit" 
                                        sx={{ p: '10px' }} 
                                        aria-label="search"
                                        onClick={traerDatosBoleto}
                                    >
                                        <SearchIcon />
                                    </IconButton>
                                </Paper>
                            </Box>
                        </Box>
                        <Grid container lg={12}>
                            {
                                boletos?.map((boleto) => {
                                    return(
                                        boleto.vendido === true ? (
                                            <Box p={.5} >
                                                <Chip
                                                    style={{backgroundColor: "#2e7d32"}}
                                                    label={<Box p={1}><Typography><b>{boleto.numero_boleto}</b></Typography></Box>}
                                                />
                                            </Box>
                                        ):(
                                            <Box p={.5} >
                                                <Chip
                                                    style={{backgroundColor: "white" }}
                                                    component={Link}
                                                    to={`/sorteos/comprar-boleto/${boleto.numero_boleto}/${boleto._id}`}
                                                    label={<Box p={1}><Typography><b>{boleto.numero_boleto}</b></Typography></Box>}
                                                />
                                            </Box>
                                        )
                                    );
                                })
                            }
                        </Grid>
                    </>
                )
            }
        </>
    )
}
