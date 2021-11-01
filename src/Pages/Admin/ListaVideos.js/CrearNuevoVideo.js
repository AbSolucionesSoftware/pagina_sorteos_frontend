import React, { useContext, useState } from 'react';

import Button from '@mui/material/Button';
import { Dialog } from '@material-ui/core';
import Add from '@material-ui/icons/Add';
import { DialogActions, DialogContent, DialogTitle, TextField, Typography } from '@mui/material';
import { makeStyles } from '@material-ui/styles';
import { Box } from '@mui/system';
import clienteAxios from '../../../Config/axios';
import { AdminContext } from '../../../Context/AdminContext';

const useStyles = makeStyles((theme) => ({
    formInputFlex: {
        display: 'flex',
    }
}));

export default function CrearNuevoVideo({ setLoading}) {
	const { datos, setReload, /* alert, */ setAlert } = useContext(AdminContext);

    const [open, setOpen] = useState(false);
    const [video, setVideo] = useState([]);
	const token = localStorage.getItem('token');

    const handleClickOpen =()=>{
        setOpen(!open);
    };

    const obtenerCampos = (e) =>{
        setVideo({
			...video, [e.target.name]: e.target.value
        })
    };

    const enviarDatos = async () => {
        setLoading(true);
        await clienteAxios
			.put(`/empresa/actionEmpresa/videos/${datos._id}`, video, 
            {
				headers: {
					Authorization: `bearer ${token}`
				}
			})
			.then((res) => {
                setAlert({ message: 'Video Nuevo Agregado!', status: 'success', open: true });
                setLoading(false);
                setReload(true);
                handleClickOpen();
                console.log(res);
			})
			.catch((err) => {
                setAlert({ message: 'Ocurrio un problema en el servidor', status: 'error', open: true });
                setLoading(false);
                setReload(true);
                console.log(err);
			});
    }

    const classes = useStyles();

    return (
        <div>
            <Button 
                size='large'
                startIcon={<Add/>}
                variant="text"
                onClick={handleClickOpen}
            >
                Agregar Video
            </Button>

            <Dialog
                open={open}
                onClose={handleClickOpen}
                fullWidth
                maxWidth='sm'
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Nueva Video Promocional"}
                </DialogTitle>

                <DialogContent>
                    <div className={classes.formInputFlex}>
                        <Box width="100%" p={1}>
                            <Typography variant='h6'>
                                Ttitulo de video:
                            </Typography>
                            <TextField
                                fullWidth
                                size="small"
                                name="titulo_video"
                                id="form-producto-clave-alterna"
                                variant="outlined"
                                onChange={obtenerCampos}
                            />
                        </Box>
                    </div>
                    <div className={classes.formInputFlex}>
                        <Box width="100%" p={1}>
                            <Typography variant='h6'>
                                Enlace del Video:
                            </Typography>
                            <TextField
                                fullWidth
                                size="small"
                                name="link_video"
                                id="form-producto-clave-alterna"
                                variant="outlined"
                                onChange={obtenerCampos}
                            />
                        </Box>
                    </div>
                </DialogContent>

                <DialogActions>
                    <Button 
                        variant='outlined'
                        color='error'
                        onClick={handleClickOpen}
                    >
                        Cancelar
                    </Button>
                    <Button 
                        onClick={enviarDatos} 
                        autoFocus
                        variant='contained'
                        color='primary'
                    >
                        Agregar
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}