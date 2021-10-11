import React, { useContext, useEffect, useState } from 'react';
import { Button, CircularProgress, Container, FormControlLabel, Grid, Paper, Switch, TextField, Typography } from '@material-ui/core';
import { Box } from '@material-ui/system';
import GenerarSorteo from './GenerarSorteo';
import BoletosSorteo from './BoletosSorteo';
import clienteAxios from '../../../Config/axios';
import { makeStyles } from '@material-ui/styles';
import EliminarSorteo from './EliminarSorteo';
import SnackBarMessages from '../../../Components/SnackBarMessages';
import { AdminContext } from '../../../Context/AdminContext';

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
	const { alert, setAlert } = useContext(AdminContext);

    const classes = useStyles();

    const [loading, setLoading] = useState(false);
    const [sorteo, setSorteo] = useState([]);

    const traerSorteoActivo = async () => {
        await clienteAxios
            .get(`/sorteo/getSorteoActivo`)
            .then((res) => {
                setLoading(false);
                setSorteo(res.data.sorteo);
            })
            .catch((err) => {
                setLoading(false);
                console.log(err);
            });
    };

    useEffect(() => {
        traerSorteoActivo();
    }, [loading]);

    const obtenerCampos =()=>{

    }

    if (loading)
	return (
		<Box display="flex" justifyContent="center" alignItems="center" height="30vh">
			<CircularProgress />
		</Box>
	);
console.log(sorteo)
    return (
        <Container>
            <SnackBarMessages alert={alert} setAlert={setAlert} />
            <Grid item lg={10}>
                <Box display='flex'>
                    <Box sx={{ flexGrow: 1 }}>
                        <Typography variant='h6'>
                            Sorteo en turno
                        </Typography>
                    </Box>
                    {sorteo ? null :
                        <Box>
                            <GenerarSorteo loading={loading} setLoading={setLoading} /> 
                        </Box>
                    }
                </Box>
            </Grid>
            <Grid container>
                <Grid item lg={12}>
                    <Box p={2}>
                        <Paper elevation={3} width="100%">
                            <Box display="flex" justifyContent="flex-end">
                                {!sorteo ? null :
                                    <Box>
                                        <EliminarSorteo sorteo={sorteo} loading={loading} setLoading={setLoading} /> 
                                    </Box>
                                }
                                {!sorteo ? null :
                                    <Box p={1}>
                                        <Button
                                            size='large'
                                            variant="contained"
                                            color="primary"
                                        >
                                            Editar Sorteo
                                        </Button>
                                    </Box>
                                }
                                {sorteo ? 
                                    <Box display="flex" justifyContent="flex-end" p={1}>
                                        <BoletosSorteo sorteo={sorteo} />
                                    </Box>
                                    : null
                                }
                            </Box>
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
