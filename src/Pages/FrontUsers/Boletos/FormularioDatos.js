import React from 'react';

import { Grid, Paper,TextField, Button, Typography, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { withRouter } from 'react-router';


const useStyles = makeStyles((theme) => ({
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

    const classes = useStyles();

    return (
        <>
           <Grid container justifyContent="center">
                <Grid lg={4} xs={12}>
                    <Paper className={classes.root} elevation={3}>
                        <Box p={2} textAlign='center'>
                            <Typography variant='h5'>
                                Por favor completa tus datos para cotinuar tu compra
                            </Typography>
                        </Box>
                        <Box p={1} textAlign='center'>
                            <Typography variant='h4'>
                                <b>Boleto: {boletoNumber} </b>
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
                                    name="celular"
                                    id="form-producto-clave-alterna"
                                    variant="outlined"
                                />
                            </Box>
                        </div>
                        <Box p={3} textAlign='center'>
                            <Button
                                color='primary'
                                size='large'
                                variant='contained'
                            >
                                Iniciar Sesión
                            </Button>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </>
    )
};

export default withRouter(FormularioDatos);