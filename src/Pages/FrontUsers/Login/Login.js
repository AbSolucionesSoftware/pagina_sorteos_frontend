import { Avatar, Box, Button, Grid, Paper, TextField, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles';
import React, { useState } from 'react';
import jwt_decode from 'jwt-decode';
import clienteAxios from '../../../Config/axios';
import SnackBarMessages from '../../../Components/SnackBarMessages';
import { PaginaContext } from '../../../Context/PaginaContext';

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
		width: 130,
		height: 130
	},
    formInputFlex: {
		display: 'flex',
	}
}));

export default function Login() {
    const classes = useStyles();
    const { datos } = React.useContext(PaginaContext);

    const [ loading, setLoading] = useState(false);
    const [validate, setValidate] = useState(false);
    const [inicioSesion, setIncioSesion] = useState([]);
    const [alert, setAlert] = useState({ message: "", status: "", open: false });

    const obtenerCampos = (e) =>{
        setIncioSesion({
			...inicioSesion, [e.target.name]: e.target.value
        })
    };

    const iniciarSesion = async (e) => {
		e.preventDefault();

		if (!inicioSesion.nameUser || !inicioSesion.password) {
			setValidate(true);
			return;
		}
		setLoading(true);
		await clienteAxios
			.post('/empresa/logIn/', inicioSesion)
			.then((res) => {
                console.log(res);
				const decoded = jwt_decode(res.data.token);
				setLoading(false);
				const token = res.data.token;
				localStorage.setItem('token', token);
				localStorage.setItem('user', JSON.stringify(decoded));
				const user = JSON.parse(localStorage.getItem('user'));
                console.log(user);
				window.location.href = '/admin';

			})
			.catch((err) => {
				setLoading(false);
                console.log(err);
				if (err.response){
					setAlert({
                        message: `¡Listo !`,
                        status: "success",
                        open: true,
                      });
				} else {
					setAlert({
                        message: `¡Listo !`,
                        status: "success",
                        open: true,
                      });
				}
			});
	};

    return (
        <Grid container justifyContent="center">
            <SnackBarMessages alert={alert} setAlert={setAlert} />	
            <Grid lg={3} xs={12}>
                <Box mt={4} />
                <Paper className={classes.root} elevation={3} >
                    <Box sx={{display: 'flex', justifyContent: 'center'}}>
                        <Box className={classes.containerImage}>
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
                            Iniciar Sesion
                        </Typography>
                    </Box>
                    <div className={classes.formInputFlex}>
                        <Box width="100%" p={1}>
                            <Typography>
                                <b>Usuario: </b>
                            </Typography>
                            <TextField
                                error={!inicioSesion.nameUser && validate}
                                helperText={!inicioSesion.nameUser && validate ? 'Esta campo es requerido' : null}
                                fullWidth
                                size="small"
                                name="nameUser"
                                id="form-producto-clave-alterna"
                                variant="outlined"
                                onChange={obtenerCampos}
                            />
                        </Box>
                    </div>
                    <div className={classes.formInputFlex}>
                        <Box width="100%" p={1}>
                            <Typography>
                                <b>Contrasena: </b>
                            </Typography>
                            <TextField
                                fullWidth
                                error={!inicioSesion.password && validate}
								helperText={!inicioSesion.password && validate ? 'Esta campo es requerido' : null}
                                size="small"
                                type='password'
                                name="password"
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
                            onClick={iniciarSesion}
                        >
                            Iniciar Sesión
                        </Button>
                    </Box>
                </Paper>
            </Grid>
        </Grid>
    )
}
