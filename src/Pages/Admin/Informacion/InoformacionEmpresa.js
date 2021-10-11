import { Button, Container, CircularProgress, Divider, Grid, Paper, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/styles';
import { useDropzone } from 'react-dropzone';
import { AdminContext } from '../../../Context/AdminContext';
import clienteAxios from '../../../Config/axios';
import SnackBarMessages from '../../../Components/SnackBarMessages'

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



export default function InoformacionEmpresa() {
	const { datos, setDatos, alert, setAlert } = useContext(AdminContext);
    const [ dataImagen, setDataImagen ]= useState([]);
    const [loading, setLoading] = useState(false);
	const token = localStorage.getItem('token');
    const [ preview, setPreview ] = useState('');
    const classes = useStyles();

    // EDICION DE LA IMAGEN
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
        if (datos) {
            setPreview(datos.imgEmpresaUrl);
        }
    }, []);

    if (loading)
	return (
		<Box display="flex" justifyContent="center" alignItems="center" height="30vh">
			<CircularProgress />
		</Box>
	);
    // FIN DE LA EDICION DE LA IMAGEN

    const obtenerCampos = (e) =>{
        setDatos({
			...datos, [e.target.name]: e.target.value
        })
    };
    console.log(datos);

    const enviarDatos = async () => {
        setLoading(true);
        const formData = new FormData();
        formData.append("nombre_empresa", datos.nombre_empresa);
        formData.append("propietario", datos.propietario);
        formData.append("telefono", datos.telefono);
        formData.append("calle_numero", datos.calle_numero);
        formData.append("cp", datos.cp);
        formData.append("colonia", datos.colonia);
        formData.append("ciudad", datos.ciudad);
        formData.append("quienes_somos", datos.quienes_somos);
        if (datos.facebook === undefined  || datos.instagram  === ""){
            formData.append("facebook",  '');
        }else{
            formData.append("facebook", datos.facebook);
        }
        if( datos.instagram  === undefined || datos.instagram  === ""){
            formData.append("instagram", '');
        }else{
            formData.append("instagram", datos.instagram);
        }
        if( datos.twiter  === undefined  || datos.instagram  === ""){
            formData.append("twiter", '');
        }else{
            formData.append("twiter", datos.twiter);
        }
        if (dataImagen.imagen) {
            formData.append("imagen", dataImagen.imagen);
        }
        await clienteAxios
			.put(`/empresa/empresaSorteo/${datos._id}`, formData, 
            {
				headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `bearer ${token}`
                }
			})
			.then((res) => {
                console.log(res.data)
                setLoading(false);
                setAlert({ message: 'Informacion editada con exito!', status: 'success', open: true });
			})
			.catch((err) => {
                setLoading(false);
                setAlert({ message: 'Ocurrio un problema en el servidor', status: 'error', open: true });
                console.log(err);
			});
    };
    
    return (
        <Container>
            <Grid item lg={11}>
                <Box display='flex'>
                    <Box p={2} sx={{ flexGrow: 1 }}>
                        <Typography variant='h5'>
                            <b>Información de Sorteo</b>
                        </Typography>
                    </Box>
                </Box>
            </Grid>
            <Grid item lg={11}>
                <Paper elevation={6}>
                <Box p={2}>
                    <div className={classes.formInputFlex}>
                        <Box width="100%" p={1}>
                            <Typography>
                                <b>Nombre Empresa:</b>
                            </Typography>
                            <TextField
                                fullWidth
                                size="small"
                                value={datos.nombre_empresa ? datos.nombre_empresa : ""}
                                name="nombre_empresa"
                                id="form-producto-clave-alterna"
                                variant="outlined"
                                onChange={obtenerCampos}
                            />  
                        </Box>
                        <Box width="100%" p={1}>
                            <Typography>
                                <b>Propietario</b>
                            </Typography>
                            <TextField
                                fullWidth
                                size="small"
                                value={datos.propietario ? datos.propietario : ""}
                                name="propietario"
                                id="form-producto-clave-alterna"
                                variant="outlined"
                                onChange={obtenerCampos}
                            />
                        </Box>
                        <Box width="100%" p={1}>
                            <Typography>
                                <b>Telefono:</b>
                            </Typography>
                            <TextField
                                fullWidth
                                size="small"
                                value={datos.telefono ? datos.telefono : ""}
                                name="telefono"
                                id="form-producto-clave-alterna"
                                variant="outlined"
                                onChange={obtenerCampos}
                            />
                        </Box>
                    </div>
                    <Box p={2} width='80%'>
                        <Divider/>
                    </Box>
                    <div className={classes.formInputFlex}>
                        <Box width="100%" p={1}>
                            <Typography >
                                <b>Quienes somos?:</b>
                            </Typography>
                            <TextField
                                fullWidth
                                size="small"
                                multiline
                                rows={5}
                                value={datos.quienes_somos ? datos.quienes_somos : ""}
                                name="quienes_somos"
                                id="form-producto-clave-alterna"
                                variant="outlined"
                                onChange={obtenerCampos}
                            />  
                        </Box>
                    </div>
                    <Box p={2} width='80%'>
                        <Divider/>
                    </Box>
                    <Box mt={1}>
                        <Typography variant='h6'>
                            <b>Datos Domiciliarios:</b>
                        </Typography>
                    </Box>
                    <div className={classes.formInputFlex}>
                        <Box width="100%" p={1}>
                            <Typography>
                                <b>Domicilio:</b>
                            </Typography>
                            <TextField
                                fullWidth
                                size="small"
                                value={datos.calle_numero ? datos.calle_numero : ""}
                                name="calle_numero"
                                id="form-producto-clave-alterna"
                                variant="outlined"
                                onChange={obtenerCampos}
                            />
                        </Box>
                        <Box width="100%" p={1}>
                            <Typography>
                                <b>Colonia:</b>
                            </Typography>
                            <TextField
                                fullWidth
                                size="small"
                                value={datos.colonia ? datos.colonia : ""}
                                name="colonia"
                                id="form-producto-clave-alterna"
                                variant="outlined"
                                onChange={obtenerCampos}
                            />
                        </Box>
                        <Box width="100%" p={1}>
                            <Typography>
                                <b>C.P.:</b>
                            </Typography>
                            <TextField
                                fullWidth
                                size="small"
                                value={datos.cp ? datos.cp : ""}
                                name="cp"
                                id="form-producto-clave-alterna"
                                variant="outlined"
                                onChange={obtenerCampos}
                            />
                        </Box>
                        <Box width="100%" p={1}>
                            <Typography>
                                <b>Ciudad:</b>
                            </Typography>
                            <TextField
                                fullWidth
                                size="small"
                                value={datos.ciudad ? datos.ciudad : ""}
                                name="ciudad"
                                id="form-producto-clave-alterna"
                                variant="outlined"
                                onChange={obtenerCampos}
                            />
                        </Box>
                    </div>
                    <Box p={2} width='80%'>
                        <Divider/>
                    </Box>
                    <Box mt={1}>
                        <Typography variant='h6'>
                            <b>Redes Sociales</b>
                        </Typography>
                    </Box>
                    <div className={classes.formInputFlex}>
                        <Box width="100%" p={1}>
                            <Typography>
                                <b>Facebook:</b>
                            </Typography>
                            <TextField
                                fullWidth
                                size="small"
                                value={datos.facebook ? datos.facebook : ""}
                                name="facebook"
                                id="form-producto-clave-alterna"
                                variant="outlined"
                                onChange={obtenerCampos}
                            />
                        </Box>
                        <Box width="100%" p={1}>
                            <Typography>
                                <b>Instagram:</b>
                            </Typography>
                            <TextField
                                fullWidth
                                size="small"
                                value={datos.instagram ? datos.instagram : ""}
                                name="instagram"
                                id="form-producto-clave-alterna"
                                variant="outlined"
                                onChange={obtenerCampos}
                            />
                        </Box>
                        <Box width="100%" p={1}>
                            <Typography>
                                <b>Twitter:</b>
                            </Typography>
                            <TextField
                                fullWidth
                                size="small"
                                value={datos.twitter ? datos.twitter : ""}
                                name="twitter"
                                id="form-producto-clave-alterna"
                                variant="outlined"
                                onChange={obtenerCampos}
                            />
                        </Box>
                    </div>
                    <Box p={2} width='80%'>
                        <Divider/>
                    </Box>
                    <Box>
                        <Typography variant='h6'>
                            <b>Imagen de tu empresa</b>
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
                    <Box
                        sx={{display: 'flex', justifyContent: 'flex-end' }}
                    >
                        <Button
                            variant='outlined'
                            size='large'
                            color='primary'
                            startIcon={<AddIcon/>}
                            onClick={enviarDatos}
                        >
                            Guardar
                        </Button>
                    </Box>
                </Box>
                </Paper>
            </Grid>
        </Container>
    )
}
