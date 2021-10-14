import { Avatar, Box, Chip, Button, Dialog, DialogActions, DialogContent, Grid, Paper, Slide, TextField, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles';
import React, { useState } from 'react';
import { PaginaContext } from '../../../Context/PaginaContext';
import clienteAxios from '../../../Config/axios';
import { Link } from 'react-router-dom';

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


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function Verificador() {
    const { datos } = React.useContext(PaginaContext);
    const classes = useStyles();
    const [ verBoleto, setVerBoleto ] = useState([]);
    const [ numeroBoleto, setNumeroBoleto ] = useState('');
    const [ open, setOpen ] = useState(false);

    const traerDatos = async () => {
        console.log("si entra la condicion");
        await clienteAxios
        .post(`/sorteo/buscarBoleto/${datos._id}`, numeroBoleto)
        .then((res) => {
            setVerBoleto(res.data[0]);
            if (res.data[0]) {
                handleDrawerOpenBoleto();
            }
        })
        .catch((err) => {
          console.log(err);
        });
    };

    const obtenerCampos = (e) =>{
        setNumeroBoleto({...numeroBoleto, [e.target.name]: e.target.value});
    };

    const handleDrawerOpenBoleto =()=>{setOpen(!open)};

    return (
        <>
            <Grid container justifyContent="center">
                <Grid lg={3} md={4} xs={12}>
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
                                onClick={traerDatos}
                            >
                                Verificar
                            </Button>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>

            <Dialog
                open={open}
                TransitionComponent={Transition}
                fullWidth
                maxWidth='xs'
                onClose={handleDrawerOpenBoleto}
                aria-describedby="alert-dialog-slide-description"
            >
                {console.log(verBoleto)}
                <DialogContent>
                    <Grid>
                        {verBoleto.vendido === true ? (
                            <Box p={2} textAlign="center">
                                <Typography variant="h5">
                                    Lo sentimos este boleto ya no esta disponible
                                </Typography>
                            </Box>
                        ):(
                            <>
                                <Box p={2} textAlign="center">
                                    <Typography variant="h5">
                                        Boleto disponible
                                    </Typography>
                                    <Box>
                                        <Typography>
                                            Presiona sobre boleto para poder realizar tu comprar
                                        </Typography>
                                    </Box>
                                </Box>
                                <Box display="flex" justifyItems="center" justifyContent="center">
                                    <Box p={1}>
                                        <Chip
                                            style={{backgroundColor: "white", border: ' solid 2px' }}
                                            component={Link}
                                            to={`/sorteos/comprar-boleto/${verBoleto.numero_boleto}/${verBoleto._id}`}
                                            label={<Box p={1}><Typography variant='h5'><b>{verBoleto.numero_boleto}</b></Typography></Box>}
                                        />
                                    </Box>
                                </Box>

                            </>
                        )}
                    </Grid> 
                </DialogContent>
                <DialogActions>
                    <Button color='error' variant='contained' onClick={handleDrawerOpenBoleto}>Cerrar</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

