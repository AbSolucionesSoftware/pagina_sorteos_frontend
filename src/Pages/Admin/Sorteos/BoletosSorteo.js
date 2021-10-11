import { AppBar, Button, Grid, IconButton, InputBase, Paper, Slide, TextField, Typography } from '@material-ui/core';
import { Box } from '@material-ui/system';
import { Dialog, DialogActions, DialogContent } from '@mui/material';
import React, { useContext, useState } from 'react';
import SearchIcon from '@material-ui/icons/Search';
import clienteAxios from '../../../Config/axios';
import { AdminContext } from '../../../Context/AdminContext';


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function BoletosSorteo({sorteo}) {
	const { setAlert } = useContext(AdminContext);

    const [ open, setOpen ] = useState(false);
    const [infoBoleto, setInfoBoleto] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleDrawerOpen = () => {
        setOpen(!open);
    };

    const [ openBoleto, setOpenBoleto ] = useState(false);

    const handleDrawerOpenBoleto = () => {
        setOpenBoleto(!openBoleto);
    };

    const desactivarSorteo = async () => {
        setLoading(true);
        await clienteAxios
        .put(`/sorteo/buscarBoleto/${sorteo._id}`,{sorteo_activo: false })
        .then((res) => {
            setAlert(res.data.message);
            setLoading(false);
        })
        .catch((err) => {
            setLoading(false);
            setAlert(err.message)
        });
    };

    
    return (
        <>
            <Box display="flex" justifyContent="flex-end">
                <Button
                    variant='contained'
                    size='large'
                    color='primary'
                    onClick={handleDrawerOpen}
                >
                    Ver Boletos
                </Button>
            </Box>
            <Dialog
              open={open}
              TransitionComponent={Transition}
              keepMounted
              fullWidth
              maxWidth='lg'
              onClose={handleDrawerOpen}
              aria-describedby="alert-dialog-slide-description"
          >
            <AppBar position="static" color="default" elevation={0}>
                <Box display="flex">
                    <Box p={2}>
                        <Typography variant="h5">
                            Lista de Boletos participantes
                        </Typography>
                    </Box>
                    <Box p={2}>
                        <Paper
                            component="form"
                            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 'auto' }}
                        >
                            <InputBase
                                sx={{ ml: 1, flex: 1 }}
                                placeholder="Buscar boleto"
                                inputProps={{ 'aria-label': 'busca tu boleto' }}
                            />
                            <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
                                <SearchIcon />
                            </IconButton>
                        </Paper>
                    </Box>
                </Box>
            </AppBar>
              <DialogContent>
                <Grid container lg={12}>
                    {
                        sorteo?.boletos?.map((element) => {
                            return(
                                <Box 
                                    p={1}
                                    onClick={() => {
                                        handleDrawerOpenBoleto()
                                        setInfoBoleto(element)
                                    }}
                                >
                                    <Paper elevantion={3}>
                                        <Box p={1}>
                                            <Typography> <b>{element.numero_boleto}</b> </Typography>
                                        </Box>
                                    </Paper>
                                </Box>
                            )
                        })
                    }
                </Grid>
              </DialogContent>
              <DialogActions>
                  <Button color='primary' variant='contained' onClick={handleDrawerOpen}>Cancelar</Button>
              </DialogActions>
          </Dialog>


          <Dialog
            open={openBoleto}
            TransitionComponent={Transition}
            keepMounted
            fullWidth
            maxWidth='xs'
            onClose={handleDrawerOpenBoleto}
            aria-describedby="alert-dialog-slide-description"
          >
              <DialogContent>
                    <Box textAlign="center">
                        <Typography variant="h5">
                            <b>Informacion de Boleto</b>
                        </Typography>
                        
                    </Box>
                    <Grid lg={12}>
                        <Box display="flex" width="100%" p={1}>
                            <Typography variant="h6">
                                <b>No. de Boleto: </b> {infoBoleto.numero_boleto}
                            </Typography>
                        </Box>
                        <Box display="flex" width="100%" p={1}>
                            <Typography variant="h6">
                                <b>Nombres: </b> {infoBoleto.nombres}
                            </Typography>
                            <TextField
                                fullWidth
                                size="small"
                                name="nombres"
                                id="form-producto-clave-alterna"
                                variant="outlined"
                            />
                        </Box>
                        <Box display="flex" width="100%" p={1}>
                            <Typography variant="h6">
                                <b>Apellidos: </b> {infoBoleto.apellidos}
                            </Typography>
                            <TextField
                                fullWidth
                                size="small"
                                name="apellidos"
                                id="form-producto-clave-alterna"
                                variant="outlined"
                            />
                        </Box>
                        <Box display="flex" width="100%" p={1}>
                            <Typography variant="h6">
                                <b>Telefono: </b> {infoBoleto.telefono}
                            </Typography>
                            <TextField
                                fullWidth
                                size="small"
                                name="telefono"
                                id="form-producto-clave-alterna"
                                variant="outlined"
                            />
                        </Box>
                        <Box display="flex" width="100%" p={1}>
                            <Typography variant="h6">
                                <b>Estado: </b> {infoBoleto.estado}
                            </Typography>
                            <TextField
                                fullWidth
                                size="small"
                                name="estado"
                                id="form-producto-clave-alterna"
                                variant="outlined"
                            />
                        </Box>
                        <Box display="flex" width="100%" p={1}>
                            <Typography variant="h6">
                                <b>Pagado: </b> {infoBoleto.domicilio}
                            </Typography>
                        </Box>
                    </Grid>
              </DialogContent>
              <DialogActions>
                <DialogActions>
                    <Button color='primary' variant='contained' onClick={handleDrawerOpenBoleto}>Aceptar</Button>
                    {
                        infoBoleto.vendido === false ? (
                            <Button color='primary' variant='contained' onClick={handleDrawerOpenBoleto}>Registrar</Button>
                        ):(null)
                    }
                </DialogActions>
              </DialogActions>
          </Dialog>


        </>
    )
}
