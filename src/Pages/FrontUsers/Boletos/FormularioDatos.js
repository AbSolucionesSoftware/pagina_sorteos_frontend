import React, {useState} from 'react';

import { Grid, Paper,TextField, Button, Typography, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { withRouter } from 'react-router';
import clienteAxios from '../../../Config/axios';


const useStyles = makeStyles(() => ({
    image: {
		maxHeight: '100%',
		maxWidth: '100%',
        display: 'flex',
        justifyItems: 'center',
        alignContent: 'center',
        alignItems: 'center'
	},
    formInputFlex: {
		display: 'flex',
	}
}));

function FormularioDatos(props) {

    const boletoNumber = props.match.params.numero;

    const idBoleto = props.match.params.idBoleto;

    const classes = useStyles();
    const [datosBoleto, setDatosBoleto] = useState([]);

    const obtenerDatos =(e)=>{
        setDatosBoleto({...datosBoleto, [e.target.name]: e.target.value})
    }

    const GuardarDatos = async () => {
        await clienteAxios
        .put(`/sorteo/comprarBoletoSorteo/${idBoleto}`)
        .then((res) => {
            console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    return (
        <>
           <Grid container justifyContent="center">
                <Grid lg={4} md={6} xs={11}>
                    <Paper className={classes.root} elevation={3}>
                        <Box p={2} textAlign='center'>
                            <Typography variant='h5'>
                                Por favor completa tus datos para continuar la compra de tu boleto
                            </Typography>
                        </Box>
                        <Box p={1} textAlign='center'>
                            <Typography variant='h4'>
                                <b>Boleto:  </b>
                            </Typography>
                        </Box>
                        <div className={classes.formInputFlex}>
                            <Box width="100%" p={1}>
                                <Typography>
                                    <b>Nombre's: </b>
                                </Typography>
                                <TextField
                                    fullWidth
                                    size="small"
                                    name="nombres"
                                    id="form-producto-clave-alterna"
                                    variant="outlined"
                                />
                            </Box>
                            <Box width="100%" p={1}>
                                <Typography>
                                    <b>Apellido's: </b>
                                </Typography>
                                <TextField
                                    fullWidth
                                    size="small"
                                    name="apellidos"
                                    id="form-producto-clave-alterna"
                                    variant="outlined"
                                />
                            </Box>
                        </div>
                        <div className={classes.formInputFlex}>
                            <Box width="100%" p={1}>
                                <Typography>
                                    <b>Estado: </b>
                                </Typography>
                                <TextField
                                    fullWidth
                                    size="small"
                                    name="estado"
                                    id="form-producto-clave-alterna"
                                    variant="outlined"
                                />
                            </Box>
                            <Box width="100%" p={1}>
                                <Typography>
                                    <b>Celular: </b>
                                </Typography>
                                <TextField
                                    fullWidth
                                    size="small"
                                    name="telefono"
                                    id="form-producto-clave-alterna"
                                    variant="outlined"
                                />
                            </Box>
                        </div>
                        <Box textAlign="center" >
                            <Button
                                color="primary"
                                variant="contained"
                            >
                                Guardar
                            </Button>
                        </Box>

                    </Paper>
                </Grid>
            </Grid>
        </>
    )
};

export default withRouter(FormularioDatos);