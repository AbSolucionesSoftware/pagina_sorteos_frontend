import React,{useContext, useEffect, useState} from 'react';
import { Button, Grid, Paper, Typography } from '@material-ui/core'
import { Box } from '@material-ui/system'
import RegistroBanner from './RegistroBanner'
import clienteAxios from '../../../Config/axios';
import { AdminContext } from '../../../Context/AdminContext';
import { CircularProgress, Dialog, DialogActions, DialogTitle} from '@mui/material';
import { makeStyles } from '@material-ui/styles';
import SnackBarMessages from '../../../Components/SnackBarMessages';

const useStyles = makeStyles(() => ({
    imagen:{
        maxHeight: '100%',
        maxWidth: '100%',
        display: 'flex',
        justifyContent: 'center',
        textAlign: 'center',
        alignItems: 'center'
    },
    containerImagen: {
        display: 'flex',
        justifyContent: 'center',
        textAlign: 'center',
        alignItems: 'center',
        width: '70%'
    }
}))

export default function BannerAdmin() {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));
	const { alert, setAlert, reload, setReload } = useContext(AdminContext);
    const classes = useStyles();

    const [loading, setLoading] = useState(false);
    const [ openModal, setOpenModal ] = useState(false);
    const [banners, setBanners] = useState([]);
    const handleModal = () => (setOpenModal(!openModal));
    const [ idBanner, setIdBanner] = useState('');

    const traerDatos = async () => {
        setLoading(true);
        await clienteAxios
        .get(`/bannerAdmin/banner-company`)
        .then((res) => {
            setLoading(false);
            setBanners(res.data);
        })
        .catch((err) => {
            setLoading(false);
            console.log(err);
        });
    };

    const handleClickDelete = async () => {
        setLoading(true);
        await clienteAxios
			.delete(`/bannerAdmin/${idBanner}`, 
            {
				headers: {
					Authorization: `bearer ${token}`
				}
			})
			.then((res) => {
                console.log(res);
                handleModal();
                setReload(true);
                setAlert({ message: 'Banner eliminado con exito!', status: 'success', open: true });
                setLoading(false);
			})
			.catch((err) => {
                console.log(err);
                handleModal();
                setReload(true);
                setAlert({ message: 'Ocurrio un problema en el servidor', status: 'error', open: true });
                setLoading(false);
			});
    };

    useEffect(() => {
        traerDatos();
    }, [reload]);

    if (loading)
	return (
		<Box display="flex" justifyContent="center" alignItems="center" height="30vh">
			<CircularProgress />
		</Box>
	);
    
    return (
        <div>
            <SnackBarMessages alert={alert} setAlert={setAlert} />
            <Grid item lg={12}>
                <Box textAlign="center">
                    <Typography variant="h4">
                        Publicidad
                    </Typography>
                    <Box mt={3}>
                        <Typography variant="h6">
                            Apartado publicitario para la zona de frente de tu pagína web
                        </Typography>
                    </Box>
                </Box>
            </Grid>
            
            <RegistroBanner />
            {
                banners?.bannersComapny?.map((banner) => {
                    return(
                        <Grid item lg={12} xs={12}>
                            <Box textAlign='center' p={2}>
                                <Paper elevation={8}>
                                    <Box display="flex" justifyContent='flex-start' p={1}>
                                        <Button
                                            color="error"
                                            variant='contained'
                                            size='large'
                                            onClick={() => {
                                                handleModal() 
                                                setIdBanner(banner._id) 
                                            }}
                                        >
                                            Eliminar
                                        </Button>
                                    </Box>
                                    <Box p={1} className={classes.containerImagen}>
                                        <img className={classes.imagen} alt="imagen de banner" src={banner.imgBannerAdminUrl} />
                                    </Box>
                                </Paper>
                            </Box>
                        </Grid>
                    )
                })
            }
            <Dialog open={openModal} onClose={handleModal}>
				<DialogTitle>{'¿Seguro que quieres eliminar esto?'}</DialogTitle>
				<DialogActions>
					<Button onClick={handleModal} color="primary">
						Cancelar
					</Button>
					<Button color="primary" autoFocus variant="contained" onClick={() => handleClickDelete()}>
						Eliminar
					</Button>
				</DialogActions>
			</Dialog>
        </div>
    )
}
