import React, { useCallback, useEffect, useState } from 'react';
import { Divider, IconButton, Grid, Paper, TextField, Typography, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { Box } from '@material-ui/system';
import { useDropzone } from 'react-dropzone';
import { Delete } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
    formInputFlex: {
        display: 'flex',
    },
    imagen:{
        maxHeight: '100%',
        maxWidth: '100%'
      },
      dropZone: {
          width: 500,
          height: 230,
          display:"flex",
          justifyContent: "center",
          alignContent: "center",
          border: 'dashed 2px',
          borderColor: '#aaaaaa'
      }
}));

export default function FormularioSorteo({sorteoFinal, setSorteoFinal, dataImagen, setDataImagen, preview, setPreview}) {

    const classes = useStyles();
    const [ premiosSorteo, setPremiosSorteo ] = useState([]);
    const [ listaPremios, setListaPremios ] = useState([]);
    
    const onDrop = useCallback(
		(files) => {
			setPreview(URL.createObjectURL(files[0]));
			setDataImagen({
				...dataImagen,
				imagen: files[0]
			});
		},
		[ dataImagen, setDataImagen, setPreview ]
	);
	const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

    useEffect(() => {
        if (sorteoFinal) {
            setPreview(sorteoFinal.imgSorteoBoletosUrl);
        }
    }, []);

    const obtenerCamposSorteo = (e) => {
        setSorteoFinal({...sorteoFinal,  [e.target.name]: e.target.value});
    };

    const obtenerPremios = (e) => {
        setPremiosSorteo({...premiosSorteo, [e.target.name]: e.target.value});
    };

    const agregarPremio = () => {
        listaPremios.push(premiosSorteo);
        setSorteoFinal({...sorteoFinal,  lista_premios: listaPremios});
        setPremiosSorteo([]);
    };

    function borrarExtra(key) {
        listaPremios.forEach(function(elemento, indice, array) {
            if(key === indice){
                listaPremios.splice(key, 1);
            }
        })
        setSorteoFinal({...sorteoFinal, lista_premios: listaPremios});
    };

    return (
        <div>
            <Paper elevation={6}>
            <Grid item lg={11}>
                <Box display='flex'>
                    <Box p={2} sx={{ flexGrow: 1 }}>
                        <Typography variant='h5'>
                            <b>Información de Sorteo</b>
                        </Typography>
                    </Box>
                </Box>
            </Grid>
                <Box p={2}>
                <div className={classes.formInputFlex}>
                    <Box width="100%" p={1}>
                        <Typography>
                            Nombre Sorteo:
                        </Typography>
                        <TextField
                            fullWidth
                            size="small"
                            name="nombre_sorteo"
                            value={sorteoFinal.nombre_sorteo ? sorteoFinal.nombre_sorteo : ""}
                            variant="outlined"
                            onChange={obtenerCamposSorteo}
                        />  
                    </Box>
                    <Box width="100%" p={1}>
                        <Typography>
                            Precio del boleto:
                        </Typography>
                        <TextField
                            fullWidth
                            size="small"
                            name="precio_boleto"
                            value={sorteoFinal.precio_boleto ? sorteoFinal.precio_boleto : ""}
                            variant="outlined"
                            onChange={obtenerCamposSorteo}
                        />  
                    </Box>
                    <Box width="100%" p={1}>
                        <Typography>
                            Fecha de Sorteo:
                        </Typography>
                        <TextField
                            fullWidth
                            size="small"
                            name="fecha_sorteo"
                            type='Date'
                            value={sorteoFinal.fecha_sorteo ? sorteoFinal.fecha_sorteo : ""}
                            variant="outlined"
                            onChange={obtenerCamposSorteo}
                        />
                    </Box>
                </div>
                <Box p={2} width='80%'>
                    <Divider/>
                </Box>
                <Box mt={1}>
                    <Typography variant='h6'>
                    <b>Lista de Premios:</b>
                    </Typography>
                </Box>
                <div className={classes.formInputFlex}>
                    <Box width="100%" p={1}>
                        <Typography>
                            Premio:
                        </Typography>
                        <TextField
                            fullWidth
                            size="small"
                            value={premiosSorteo.premio ? premiosSorteo.premio : ""}
                            name="premio"
                            id="form-producto-clave-alterna"
                            variant="outlined"
                            onChange={obtenerPremios}
                        />
                    </Box>
                    <Box width="30%" display="flex" alignItems="center" mt={3} >
                        <Button
                            color="primary"
                            variant="contained"
                            onClick={() => agregarPremio()}                   
                        >
                            Agregar
                        </Button>
                    </Box>
                </div>
                {
                    listaPremios?.map((premio, index) => {
                        return(
                            <div className={classes.formInputFlex}>
                                <Box width="85%" p={1} key={index}>
                                    <Paper elevation={5}>
                                        <Box display="flex">
                                            <Box p={1} display="flex" alignItems='center' sx={{ flexGrow: 1 }}>
                                                <Typography>
                                                    {premio.premio}
                                                </Typography>
                                            </Box>
                                            <Box p={1}>
                                                <IconButton
                                                    color="primary"
                                                    onClick={()=>borrarExtra(index)}
                                                >
                                                    <Delete style={{fontSize: 30}} />
                                                </IconButton>
                                            </Box>
                                        </Box>
                                    </Paper>
                                </Box>
                            </div>
                        )
                    })
                }
                <Box p={2} width='80%'>
                    <Divider/>
                </Box>
                <Box>
                    <Typography variant='h6'>
                        <b>Imagen Promocional</b>
                    </Typography>
                </Box>
                <div className={classes.formInputFlex}>
                    <Box
                        className={classes.dropZone}
                        {...getRootProps()}
                        height={250}
                        width='50%'
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        textAlign="center"
                    >
                        <input {...getInputProps()} />
                        {dataImagen.imagen || preview ? (
                            <Box height={200} display="flex" justifyContent="center" alignItems="center">
                                <img alt="imagen del banner" src={preview} className={classes.imagen} />
                            </Box>
                        ) : isDragActive ? (
                            <Typography>Suelta tu imagen aquí...</Typography>
                        ) : (
                            <Typography>
                                Arrastra y suelta tu imagen aquí, o selecciona una imagen haciendo click aquí
                            </Typography>
                        )}
                    </Box>
                </div>
            </Box>
        </Paper>
        </div>
    )
}
