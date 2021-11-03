import React, { useContext, useState } from 'react';

import Button from '@mui/material/Button';
import { Dialog } from '@material-ui/core';
import { DialogActions, DialogContent, DialogTitle, TextField, Typography } from '@mui/material';
import { makeStyles } from '@material-ui/styles';
import { Box } from '@mui/system';
import clienteAxios from '../../../Config/axios';
import { AdminContext } from '../../../Context/AdminContext';
import { Add } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
    formInputFlex: {
        display: 'flex',
    }
}));

export default function CrearPregunta({ setLoading}) {
	const { datos, setReload, setAlert  } = useContext(AdminContext);
    const [open, setOpen] = useState(false);
    const [preguntas, setPreguntas] = useState([]);
	const token = localStorage.getItem('tokenSorteos');

    const handleClickOpen =()=>{
        setOpen(!open);
    };

    const obtenerCampos = (e) =>{
        setPreguntas({
			...preguntas, [e.target.name]: e.target.value
        })
    };

    const enviarDatos = async () => {
        setLoading(true);
        await clienteAxios
			.put(`/empresa/actionEmpresa/preguntas/${datos._id}`, preguntas, 
            {
				headers: {
					Authorization: `bearer ${token}`
				}
			})
			.then((res) => {
                setLoading(false);
                setAlert({ message: 'Pregunta agregada con Exito!', status: 'success', open: true });
                setReload(true);
                handleClickOpen();
                console.log(res);
			})
			.catch((err) => {
                setLoading(false);
                setAlert({ message: 'Ocurrio un problema en el servidor', status: 'error', open: true });
                setReload(true);
                console.log(err);
			});
    }

    const classes = useStyles();

    return (
        <div>
            <Button 
                size='large'
                startIcon={<Add />}
                variant="text"
                onClick={handleClickOpen}
            >
                Agregar pregunta
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
                    {"Nueva Pregunta"}
                </DialogTitle>

                <DialogContent>
                    <div className={classes.formInputFlex}>
                        <Box width="100%" p={1}>
                            <Typography variant='h6'>
                                Pregunta:
                            </Typography>
                            <TextField
                                fullWidth
                                size="small"
                                name="pregunta"
                                id="form-producto-clave-alterna"
                                variant="outlined"
                                onChange={obtenerCampos}
                            />
                        </Box>
                    </div>
                    <div className={classes.formInputFlex}>
                        <Box width="100%" p={1}>
                            <Typography variant='h6'>
                                Respuesta de Pregunta:
                            </Typography>
                            <TextField
                                fullWidth
                                size="small"
                                name="respuesta"
                                multiline
                                rows={4}
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
