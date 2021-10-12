import { Avatar, Box, Button, Grid, Paper, TextField, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles';
import React, { useState } from 'react';
import { PaginaContext } from '../../../Context/PaginaContext';
import clienteAxios from '../../../Config/axios';

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
		width: 135,
		height: 135
	},
    formInputFlex: {
		display: 'flex',
		
	}
}));

export default function Verificador() {
    const { datos } = React.useContext(PaginaContext);
    const classes = useStyles();
    const [verBoleto, setVerBoleto] = useState([]);
    const [numeroBoleto, setNumeroBoleto] = useState('');
    console.log(numeroBoleto);
    console.log(datos._id);

    const traerDatos = async () => {
        await clienteAxios
        .post(`/sorteo/buscarBoleto/${datos._id}`,{numeroBoleto: "0002"})
        .then((res) => {
            console.log(res)
        })
        .catch((err) => {
          console.log(err);
        });
    };


    const obtenerCampos = (e) =>{
        setNumeroBoleto({...numeroBoleto, [e.target.name]: e.target.value});
    };

    return (
        <>
            <Grid container justifyContent="center">
                <Grid lg={3} xs={12}>
                    <Paper className={classes.root} elevation={3} >
                        <Box mt={6} sx={{display: 'flex', justifyContent: 'center'}}>
                            <Box sx={{ p: 2 }} className={classes.containerImage}>
                                <Avatar
                                    sx={{ width: 135, height: 135 }}
                                >
                                    <img 
                                        className={classes.image}
                                        src={datos.imgEmpresaUrl}
                                        alt="imagen logo" 
                                    />
                                </Avatar>
                            </Box>
                        </Box>
                        <Box p={2} textAlign='center'>
                            <Typography variant='h4'>
                                Verficar Boletos
                            </Typography>
                        </Box>
                        <div className={classes.formInputFlex}>
                            <Box width="100%" p={1}>
                                <Typography>
                                    <b>Numero de boleto: </b>
                                </Typography>
                                <TextField
                                    fullWidth
                                    type='number'
                                    size="small"
                                    name="numeroBoleto"
                                    id="form-producto-clave-alterna"
                                    variant="outlined"
                                    onChange={obtenerCampos}
                                />
                            </Box>
                        </div>
                        <Box p={3} textAlign='center'>
                            <Button
                                color='primary'
                                size='large'
                                variant='contained'
                                // onClick={traerDatos}
                            >
                                Verificar
                            </Button>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </>
    )
}

