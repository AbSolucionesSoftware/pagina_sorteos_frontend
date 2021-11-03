import React, { useEffect, useState } from 'react'
import { Box, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon,  Typography } from '@material-ui/core';

import DehazeIcon from '@material-ui/icons/Dehaze';
import HomeIcon from '@material-ui/icons/Home';
import ContactSupportIcon from '@material-ui/icons/ContactSupport';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import ConfirmationNumberIcon from '@material-ui/icons/ConfirmationNumber';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import OndemandVideoIcon from '@material-ui/icons/OndemandVideo';
import RestoreFromTrashIcon from '@material-ui/icons/RestoreFromTrash';

import useStyles from '../Navegation/Styles';
import { Link } from 'react-router-dom';
import clienteAxios from '../../Config/axios';
import { AdminContext } from '../../Context/AdminContext';
import Error404 from '../../Pages/FrontUsers/Error';

export default function NavegacionAdministrador() {
    const { setDatos, reload, datos, setReload } = React.useContext(AdminContext);
    
    const classes = useStyles();
    const [openDrawer, setOpenDrawer] = useState(false);
    const [drawerResponsive, setDrawerResponsive] = useState(false);

    const handleOpenResponsive = () => {
        setDrawerResponsive(!drawerResponsive);
    };

    const traerDatos = async () => {
        await clienteAxios
        .get(`/empresa/empresaSorteo`)
        .then((res) => {
            setDatos(res.data.empresa);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    useEffect(() => {
        traerDatos()
        setReload(false);
    }, [reload]);

    if(!datos){<Error404 />};

    return (
        <>
             <Box sx={{ display: { xs: 'block', sm: 'none' }}}>
                <IconButton 
                    onClick={handleOpenResponsive}
                    color="success" 
                    size='large' 
                    component="span"
                >
                    <DehazeIcon size='large' />
                </IconButton>
            </Box>

            <Box sx={{ display: { xs: 'none',md: 'block', lg: 'block', xl: 'block' } }}>
                <Drawer
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                    className={classes.appbar}
                    variant="permanent"
                    anchor="left"
                    open={openDrawer}
                >
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
                            <ListItemButton component={Link} to={`/admin`}>
                                <ListItemIcon>
                                    <HomeIcon />
                                </ListItemIcon>
                                <Typography>
                                    Panel Administrador
                                </Typography>
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton component={Link} to={`/admin/publicidad-banners`}>
                                <ListItemIcon>
                                    <ContactSupportIcon />
                                </ListItemIcon>
                                <Typography>
                                    Banner Publicitario
                                </Typography>
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton component={Link} to={`/admin/preguntas-frecuentes`}>
                                <ListItemIcon>
                                    <VerifiedUserIcon />
                                </ListItemIcon>
                                <Typography>
                                    Preguntas Frecuentes
                                </Typography>
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton component={Link} to={`/admin/videos-promocionales`}>
                                <ListItemIcon>
                                    <OndemandVideoIcon />
                                </ListItemIcon>
                                <Typography>
                                    Lista Videos Promocional
                                </Typography>
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton component={Link} to={`/admin/sorteos-boletos`}>
                                <ListItemIcon>
                                    <ConfirmationNumberIcon />
                                </ListItemIcon>
                                <Typography>
                                    Generar Sorteo
                                </Typography>
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton component={Link} to={`/admin/sorteos-eliminados`}>
                                <ListItemIcon>
                                    <RestoreFromTrashIcon />
                                </ListItemIcon>
                                <Typography>
                                    Sorteos eliminados
                                </Typography>
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton 
                                component={Link} 
                                to={`/`}
                                onClick={ () =>{
                                    localStorage.removeItem('userSorteos')
                                    localStorage.removeItem('tokenSorteos')
                                }}
                            >
                                <ListItemIcon>
                                    <ExitToAppIcon />
                                </ListItemIcon>
                                <Typography>
                                    Cerrar Sesión
                                </Typography>
                            </ListItemButton>
                        </ListItem>
                    </List>
                </Drawer>
            </Box>
            <Drawer
                anchor='left'
                open={drawerResponsive}
                onClose={handleOpenResponsive}
            >
                <Box sx={{display: 'flex', justifyContent: 'center'}}>
                    <Box className={classes.containerImageDrawer}>
                        <img 
                            className={classes.image}
                            src='https://i.pinimg.com/originals/45/11/b7/4511b76b8452f9afdaf45f6678facbbe.png' 
                            alt="imagen logo" 
                        />
                    </Box>
                </Box>
                <List>
                    <ListItem disablePadding>
                        <ListItemButton component={Link} to={`/admin`}>
                            <ListItemIcon>
                                <HomeIcon />
                            </ListItemIcon>
                            <Typography>
                                Panel Administrador
                            </Typography>
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton component={Link} to={`/admin/publicidad-banners`}>
                            <ListItemIcon>
                                <ContactSupportIcon />
                            </ListItemIcon>
                            <Typography>
                                Banner Publicitario
                            </Typography>
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton component={Link} to={`/admin/preguntas-frecuentes`}>
                            <ListItemIcon>
                                <VerifiedUserIcon />
                            </ListItemIcon>
                            <Typography>
                                Preguntas Frecuentes
                            </Typography>
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton component={Link} to={`/admin/videos-promocionales`}>
                            <ListItemIcon>
                                <OndemandVideoIcon />
                            </ListItemIcon>
                            <Typography>
                                Lista Videos Promocional
                            </Typography>
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton component={Link} to={`/admin/sorteos-boletos`}>
                            <ListItemIcon>
                                <ConfirmationNumberIcon />
                            </ListItemIcon>
                            <Typography>
                                Generar Sorteo
                            </Typography>
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton component={Link} to={`/admin/sorteos-eliminados`}>
                            <ListItemIcon>
                                <RestoreFromTrashIcon />
                            </ListItemIcon>
                            <Typography>
                               Sorteos eliminados
                            </Typography>
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton 
                            component={Link} 
                            to={`/`}
                            onClick={ () =>{
                                localStorage.removeItem('userSorteos')
                                localStorage.removeItem('tokenSorteos')
                            }}
                        >
                            <ListItemIcon>
                                <ExitToAppIcon />
                            </ListItemIcon>
                            <Typography>
                                Cerrar Sesión
                            </Typography>
                        </ListItemButton>
                    </ListItem>
                </List>
            </Drawer>
        </>
    )
}
