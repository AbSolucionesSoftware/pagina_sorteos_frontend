import { AppBar, Button, CircularProgress, Grid, IconButton, InputBase, Paper, Slide, TextField, Typography } from '@material-ui/core';
import { Box } from '@material-ui/system';
import { Dialog, DialogActions, DialogContent } from '@mui/material';
import React, { useContext, useState, useEffect } from 'react';
import SearchIcon from '@material-ui/icons/Search';
import { AdminContext } from '../../../../Context/AdminContext';
import SnackBarMessages from '../../../../Components/SnackBarMessages';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function BoletosEliminados({boletos}) {
    
    const { setAlert, alert } = useContext(AdminContext);
    const [ open, setOpen ] = useState(false);
    const [infoBoleto, setInfoBoleto] = useState([]);

    const [boletosActuales, setBoletosActuales] = useState([]);
    const [ openBoleto, setOpenBoleto ] = useState(false);


    const handleDrawerOpen = () => {
        setOpen(!open);
    };


    // const handleDrawerOpenBoleto = () => {
    //     setOpenBoleto(!openBoleto);
    // };

    // const obtenerDatos =(e)=>{
    //     setInfoBoleto({...infoBoleto, [e.target.name]: e.target.value})
    // }

    // const buscarBoletos = (e) => {
    //     if(e.target.value === ''){
    //         setBoletosActuales(boletos);
    //     }else{
    //         console.log(e.target.value);
    //         const data = boletos.filter((b) => b.numero_boleto.indexOf(e.target.value) > -1);
    //         setBoletosActuales(data);
    //     }
        
    // }

    // useEffect(() => {
    //     if(boletos){
    //         console.log("entro");
    //         setBoletosActuales(boletos);
    //     }
    // }, [boletos])


    return (
        <div>
            <SnackBarMessages alert={alert} setAlert={setAlert} />
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
                    {/* <Box p={2}>
                        <Paper
                            component="form"
                            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 'auto' }}
                        >
                            <InputBase
                                sx={{ ml: 1, flex: 1 }}
                                placeholder="Buscar boleto"
                                inputProps={{ 'aria-label': 'busca tu boleto' }}
                                onChange={(e) => buscarBoletos(e)}
                            />
                            <IconButton sx={{ p: '10px' }} aria-label="search">
                                <SearchIcon />
                            </IconButton>
                        </Paper>
                    </Box> */}
                </Box>
            </AppBar>
              <DialogContent>
                <Grid container>
                    {
                        boletos?.map((element, index) => {
                            return(
                                <Box 
                                    key={index}
                                    p={1}
                                >
                                    <Paper elevantion={3} style={{backgroundColor: (element.vendido === true ? "#2e7d32" : "")}} >
                                        <Box p={1} >
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
                  <Button color='error' variant='contained' onClick={() => handleDrawerOpen()}>Cerrar</Button>
              </DialogActions>
          </Dialog>
        </div>
    )
}
