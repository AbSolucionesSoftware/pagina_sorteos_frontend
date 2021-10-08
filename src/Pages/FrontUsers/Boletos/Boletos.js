import React, { useEffect, useState } from 'react';

import { Box, Chip, Container, Grid, IconButton, InputBase, Paper,  Typography } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search';
import { Link } from 'react-router-dom';
import clienteAxios from '../../../Config/axios';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
    image: {
		maxHeight: '100%',
		maxWidth: '100%',
        display: 'flex',
        justifyItems: 'center',
        alignContent: 'center',
        alignItems: 'center'
	},
    containerImagen: {
		display: 'flex',
	}
}));

export default function Boletos() {
    const classes = useStyles();
    const [sorteo, setSorteo] = useState([]);

    const traerSorteoActivo = async () => {
        await clienteAxios
        .get(`/sorteo/getSorteoActivo`)
        .then((res) => {
            setSorteo(res.data.sorteo);
            console.log(res.data.sorteo);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    useEffect(() => {
        traerSorteoActivo();
    }, []);

    return (
        <Container>
            <Grid>
            <Box mt={2} textAlign='center'>  
                <Box p={2}>
                    <Typography variant='h3'>
                        <b>{ sorteo.nombre_sorteo }</b>
                    </Typography>
                </Box>
            </Box>
            <Box>
                <Box textAlign="center" p={2}>
                    <Typography variant='h4'>
                        <b>¡Premios!</b>
                    </Typography>
                </Box>
                {
                    sorteo?.lista_premios?.map((premio, index) => {
                        return(
                            <Box textAlign="center" p={1}>
                                <Typography variant='h6'>
                                    <b>{index+1}° Lugar {premio.premio} </b>
                                </Typography>
                            </Box>
                        )
                    })
                }
            </Box>
            <Box mt={2} textAlign='center'>  
                <Box p={2} >
                    <img 
                        src={''}
                        alt="Imagen de sorteo"
                    />
                </Box>
            </Box>
            </Grid>
            
            <Grid>
                <Box textAlign="center" p="2">
                    <Typography variant='h3'>
                        <b>¡Boletos Disponibles!</b>
                    </Typography>
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
                            />
                            <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
                                <SearchIcon />
                            </IconButton>
                        </Paper>
                    </Box>
                </Box>
                <Grid item lg={12}>
                    <Box display='flex'>
                        {
                            sorteo?.boletos?.map((boleto) => {
                                return(
                                    <Box p={1}>
                                        <Chip
                                            style={{background: 'white'}}
                                            component={Link}
                                            to={`/sorteos/comprar-boleto/${boleto.numero_boleto}/${boleto._id}`}
                                            label={<Box p={1}><Typography variant='h5'><b>{boleto.numero_boleto}</b></Typography></Box>}
                                        />
                                    </Box>
                                );
                            })
                        }
                    </Box>
                </Grid>
            </Grid>
        </Container>
    )
}
