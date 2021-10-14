import React, { useEffect, useState } from 'react'
import { Avatar, Box, Drawer, Grid, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from '@material-ui/core';

import DehazeIcon from '@material-ui/icons/Dehaze';
import HomeIcon from '@material-ui/icons/Home';
import ContactSupportIcon from '@material-ui/icons/ContactSupport';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import ConfirmationNumberIcon from '@material-ui/icons/ConfirmationNumber';

import useStyles from './Styles';
import { HashLink } from 'react-router-hash-link';
import { Link } from 'react-router-dom';
import clienteAxios from '../../Config/axios';
import { PaginaContext } from '../../Context/PaginaContext';

export default function Navegacion() {
    const { datos, setDatos, reload, setReload, setDatosSorteo } = React.useContext(PaginaContext);
    const classes = useStyles();
    const [openDrawer, setOpenDrawer] = useState(false);
    const user = JSON.parse(localStorage.getItem('user'));

    const handleOpen = () => {
        setOpenDrawer(!openDrawer);
    };

    const traerDatos = async () => {
        await clienteAxios
        .get(`/empresa/empresaSorteo`)
        .then((res) => {
            setDatos(res.data.empresa)
        })
        .catch((err) => {
          console.log(err);
        });
    };

    const traerSorteoActivo = async () => {
        await clienteAxios
        .get(`/sorteo/getSorteoActivo`)
        .then((res) => {
            setDatosSorteo(res.data.sorteo);
        })
        .catch((err) => {
          console.log(err);
        });
    };
  
    useEffect(() => {
        traerSorteoActivo();
        traerDatos();
        setReload(false);
    }, [reload]);

    if (!datos) return null

    return (
        <>
            <Box sx={{ display: { xs: 'block', sm: 'none' }}}>
                <IconButton 
                    onClick={handleOpen}
                    color="success" 
                    size='large' 
                    component="span"
                >
                    <DehazeIcon size='large' />
                </IconButton>
            </Box>
            <Grid container>
                <Grid item lg={5} justifyContent='center'>
                    <Box sx={{display: 'flex', justifyContent: 'left', alignItems: 'center'}}>
                        <Box sx={{ display: { xs: 'none', lg: 'block'} }} className={classes.containerImage}>
                            <Avatar
                                component={Link} to={`/`}
                                sx={{ width: 85, height: 85 }}
                            >
                                <img 
                                    className={classes.image}
                                    src={datos.imgEmpresaUrl} 
                                    alt="imagen logo" 
                                />
                            </Avatar>
                        </Box>
                        <Box sx={{ display: { xs: 'block', md: 'none', lg: 'none'} }} className={classes.containerImageRes}>
                            <Avatar
                                component={Link} to={`/`}
                                sx={{ width: 30, height: 30 }}
                            >
                                <img 
                                    className={classes.imageRes}
                                    src={datos.imgEmpresaUrl} 
                                    alt="imagen logo" 
                                />
                            </Avatar>
                        </Box>
                        <Box display="flex" alignContent="center" justifyItems='center' >
                            <Typography variant='h6'>
                                <b>{datos.nombre_empresa}</b>
                            </Typography>
                        </Box>
                    </Box>
                </Grid>
                <Grid item lg={7} sx={{ display: { xs: 'none', sm: 'none', md: 'block', lg: 'block'} }}>
                    <Box sx={{display: 'flex', justifyContent: 'flex-end',  alignItems: 'center'}} mt={2}>
                        <Grid>
                            <ListItem button component={Link} to={`/`}>
                                <ListItemText>
                                    <Typography variant='h6' >
                                        <b>Inicio</b>
                                    </Typography>
                                </ListItemText>
                            </ListItem>
                        </Grid>
                        <Grid>
                            <ListItem button component={Link} to={`/`}>
                                <ListItemText>
                                    <Typography variant='h6' >
                                        <b>Preguntas Frecuentes</b>
                                    </Typography>
                                </ListItemText>
                            </ListItem>
                        </Grid>
                        <Grid>
                            <ListItem button component={Link} to={`/sorteos/verificador`}>
                                <ListItemText>
                                    <Typography variant='h6' >
                                        <b>Verificar Boleto</b>
                                    </Typography>
                                </ListItemText>
                            </ListItem>
                        </Grid>
                        <Grid>
                            <ListItem button component={Link} to={`/sorteos/boletos`}>
                                <ListItemText>
                                    <Typography variant='h6' >
                                        <b>Comprar Boleto</b>
                                    </Typography>
                                </ListItemText>
                            </ListItem>
                        </Grid>
                        <Grid>
                            <ListItem button component={Link} to={`/sorteos/login`}>
                                <ListItemText>
                                    <Typography variant='h6' >
                                        <b>Sesion</b>
                                    </Typography>
                                </ListItemText>
                            </ListItem>
                        </Grid>
                    </Box>
                </Grid>
            </Grid>

            {/* MODO RESPONSIVO */}
            <Drawer
                anchor='left'
                open={openDrawer}
                onClose={handleOpen}
            >
                <Box height="100%" style={{background: 'black', color: '#76ff03'}}>
                <Box sx={{display: 'flex', justifyContent: 'center'}}>
                    <Box className={classes.containerImageDrawer}>
                        <img 
                            className={classes.image}
                            src={datos.imgEmpresaUrl} 
                            alt="imagen logo" 
                        />
                    </Box>
                </Box>
                <List>
                    <ListItem disablePadding>
                        <ListItemButton component={Link} to={`/`} onClick={handleOpen}>
                            <ListItemIcon>
                                <HomeIcon />
                            </ListItemIcon>
                            <Typography>
                                <b>Inicio</b>
                            </Typography>
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton component={Link} to={`/`} onClick={handleOpen}>
                            <ListItemIcon>
                                <ContactSupportIcon />
                            </ListItemIcon>
                            <Typography>
                            <b>Preguntas Frecuentes</b>
                            </Typography>
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton component={Link} to={`/sorteos/boletos`} onClick={handleOpen}>
                            <ListItemIcon>
                                <ConfirmationNumberIcon />
                            </ListItemIcon>
                            <Typography>
                            <b>Comprar Boleto</b>
                            </Typography>
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton component={Link} to={`/sorteos/verificador`} onClick={handleOpen}>
                            <ListItemIcon>
                                <HomeIcon />
                            </ListItemIcon>
                            <Typography>
                            <b>Verificador boletos</b>
                            </Typography>
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton component={Link} to={`/sorteos/login`} onClick={handleOpen}>
                            <ListItemIcon>
                                <ConfirmationNumberIcon />
                            </ListItemIcon>
                            <Typography>
                            <b>Sesion</b>
                            </Typography>
                        </ListItemButton>
                    </ListItem>
                </List>
                </Box>
            </Drawer>
        </>
    )
}
