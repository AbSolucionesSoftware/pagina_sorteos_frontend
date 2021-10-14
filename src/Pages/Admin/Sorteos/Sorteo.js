import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Button, CircularProgress, Container, FormControlLabel, Grid, Paper, Switch, TextField, Typography } from '@material-ui/core';
import { Box } from '@material-ui/system';
import GenerarSorteo from './GenerarSorteo';
import BoletosSorteo from './BoletosSorteo';
import clienteAxios from '../../../Config/axios';
import { makeStyles } from '@material-ui/styles';
import EliminarSorteo from './EliminarSorteo';
import SnackBarMessages from '../../../Components/SnackBarMessages';
import { AdminContext } from '../../../Context/AdminContext';
import { useDropzone } from 'react-dropzone';

const useStyles = makeStyles((theme) => ({
    imagen: {
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

export default function SorteoAdministrador() {
	const { alert, setAlert } = useContext(AdminContext);

    const classes = useStyles();

    const [ loading, setLoading ] = useState(false);
    const [ sorteo, setSorteo ] = useState([]);
    const [ preview, setPreview ] = useState('');
    const [ dataImagen, setDataImagen ]= useState([]);

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
        if (sorteo) {
            setPreview(sorteo.imgSorteoBoletosUrl);
        }
    }, [sorteo]);

    useEffect(() => {
        traerSorteoActivo();
    }, [loading]);

    const obtenerCampos = (e) => {
        setSorteo({...sorteo, [e.target.name]: e.target.value})
    }

    if (loading)
	return (
		<Box display="flex" justifyContent="center" alignItems="center" height="30vh">
			<CircularProgress />
		</Box>
	);
    
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
                                
                                {sorteo ? 
                                    <Box display="flex" justifyContent="flex-end" p={1}>
                                        <BoletosSorteo loading={loading} setLoading={setLoading} sorteo={sorteo} />
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
                                    <Box
                                        className={classes.dropZone}
                                        {...getRootProps()}
                                        height={250}
                                        width="100%"
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
                            <Box display="flex" justifyContent="flex-end">
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
                            </Box>
                        </Paper>
                    </Box>
                </Grid>
            </Grid>
        </Container>
    )
}
