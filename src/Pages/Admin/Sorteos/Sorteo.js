import React, { useEffect, useState } from 'react';
import { Button, Container, FormControlLabel, Grid, Paper, Switch, TextField, Typography } from '@material-ui/core';
import { Box } from '@material-ui/system';
import GenerarSorteo from './GenerarSorteo';
import BoletosSorteo from './BoletosSorteo';
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
	containerImage:{
		width: 130,
		height: 130
	},
    formInputFlex: {
		display: 'flex',
	}
}));

export default function SorteoAdministrador() {

    const classes = useStyles();

    const [sorteo, setSorteo] = useState([]);

    const traerSorteoActivo = async () => {
        await clienteAxios
        .get(`/sorteo/getSorteoActivo`)
        .then((res) => {
            setSorteo(res.data.sorteo);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    useEffect(() => {
        traerSorteoActivo();
    }, []);

    const obtenerCampos =()=>{

    }

    const activarSorteos =()=>{

    }

    return (
        <Container>
            <Grid item lg={10}>
                <Box display='flex'>
                    <Box sx={{ flexGrow: 1 }}>
                        <Typography variant='h6'>
                            Sorteo en turno
                        </Typography>
                    </Box>
                    {sorteo ? 
                        <Box display="flex" justifyContent="flex-end" p={1}>
                            <BoletosSorteo />
                        </Box>
                        : null
                    }
                    {sorteo ? 
                        <Box display="flex" justifyContent="flex-end" p={1}>
                            <FormControlLabel
                                control={
                                <Switch
                                    // checked={state.checkedB}
                                    onChange={activarSorteos}
                                    name="checkedB"
                                    color="primary"
                                />
                                }
                                label="Activar Sorteo"
                            />
                        </Box>
                        : null
                    }
                    {!sorteo ? 
                        <GenerarSorteo />
                    : null
                    }
                </Box>
            </Grid>
            <Grid container>
                <Grid item lg={12}>
                    <Box p={2}>
                        <Paper elevation={3} width="100%">
                           
                            <Box p={1}>
                                <div className={classes.formInputFlex}>
                                    <Box width="100%" p={1}>
                                        <Typography>
                                            <b>Nombre Sorteo: </b>
                                        </Typography>
                                        <TextField
                                            fullWidth
                                            size="small"
                                            name="nombre_sorteo"
                                            value={sorteo ? sorteo.nombre_sorteo : ''}
                                            id="form-producto-clave-alterna"
                                            variant="outlined"
                                            onChange={obtenerCampos}
                                        />
                                    </Box>
                                    <Box width="100%" p={1}>
                                        <Typography>
                                            <b>Fecha Sorteo: </b>
                                        </Typography>
                                        <TextField
                                            fullWidth
                                            size="small"
                                            name="fecha_sorteo"
                                            value={ sorteo ? sorteo.fecha_sorteo : "" }
                                            type="date"
                                            id="form-producto-clave-alterna"
                                            variant="outlined"
                                            onChange={obtenerCampos}
                                        />
                                    </Box>
                                </div>
                                <div className={classes.formInputFlex}>
                                    <Box width="100%" p={1}>
                                        <Typography>
                                            <b>Lista de Premios: </b>
                                        </Typography>
                                        {sorteo?.lista_premios?.map((premio, index) =>{
                                            return(
                                                <Box p={1}>
                                                    <Typography>
                                                        <b>{index+1}° Lugar</b>
                                                    </Typography>
                                                    <TextField
                                                        fullWidth
                                                        size="small"
                                                        name="fecha_sorteo"
                                                        value={sorteo ? premio.premio : ''}
                                                        id="form-producto-clave-alterna"
                                                        variant="outlined"
                                                        onChange={obtenerCampos}
                                                    />
                                                </Box>
                                            )
                                        })}
                                    </Box>
                                    <Box width="100%" p={1}>
                                        <Typography>
                                            <b>Precio de boleto: </b>
                                        </Typography>
                                        <TextField
                                            fullWidth
                                            size="small"
                                            name="precio_boleto"
                                            value={ sorteo ? sorteo.precio_boleto : "" }
                                            id="form-producto-clave-alterna"
                                            variant="outlined"
                                            onChange={obtenerCampos}
                                        />
                                    </Box>
                                </div>
                            </Box>
                        </Paper>
                    </Box>
                </Grid>
            </Grid>
        </Container>
    )
}
