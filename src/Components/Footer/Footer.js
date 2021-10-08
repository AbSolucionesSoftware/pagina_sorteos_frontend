import { Avatar, Box, Grid, IconButton, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles';
import React from 'react';
import { PaginaContext } from '../../Context/PaginaContext';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import TwitterIcon from '@material-ui/icons/Twitter';

const useStyles = makeStyles({
    image: {
		maxHeight: '100%',
		maxWidth: '100%',
	},
	containerImage:{
		width: 130,
		height: 130
	}
});

export default function Footer() {
    const { datos } = React.useContext(PaginaContext);
    const classes = useStyles();    
    
    if (!datos) {return null}

    return (
        <Grid style={{background: 'black', color: 'white'}}>
            <Grid container >
                <Grid item lg={12} xs={12}>
                    <Box sx={{p: 3}} textAlign='center'>
                        <Typography variant='h4'>
                            ¿Tienes dudas?, ¡Escríbenos!
                        </Typography>
                        <Box p={1}>
                            <Typography variant='h3'>
                                <b>{datos.telefono}</b>
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} >
                            <Box>
                                {datos.instagram === '' || datos.instagram === undefined ? null : (
                                    <IconButton
                                        href={datos.instagram}
                                        target="_blank"
                                    >
                                        <InstagramIcon style={{color:'white', fontSize: 60}}/>
                                    </IconButton>
                                )}
                            </Box>
                            <Box>
                                {datos.facebook === '' || datos.facebook === undefined ? null : (
                                    <IconButton
                                        href={datos.facebook}
                                        target="_blank"
                                    >
                                        <FacebookIcon style={{color:'white', fontSize: 60}}/>
                                    </IconButton>
                                )}
                            </Box>
                            <Box>
                                {datos.twitter === '' || datos.twitter === undefined ? null : (
                                    <IconButton
                                        href={datos.twitter}
                                        target="_blank"
                                    >
                                        <TwitterIcon style={{color:'white', fontSize: 60}}/>
                                    </IconButton>
                                )}
                            </Box>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
            <Grid item lg={12} xs={12}  sx={{ display: { xs: 'none', sm: 'none', md: 'block', lg: 'block'}}}>
                <Box sx={{display: 'flex', justifyContent: 'center', textAlign: 'center', alignItems: 'center' }}>
                    <Box 
                        className={classes.containerImage} 
                    >
                        <Avatar
                            sx={{ width: 120, height: 120 }}
                        >
                            <img 
                                className={classes.image}
                                src={datos.imgEmpresaUrl} 
                                alt="imagen logo" 
                            />
                        </Avatar>
                    </Box>
                    <Box p={1}>
                        <Typography variant="h6">
                            <b>{datos.nombre_empresa}</b>
                        </Typography>
                    </Box>
                    <Box p={1}>
                        <Typography variant="h6">
                            <b>{datos.calle_numero}, {datos.colonia}, CP{datos.cp}, {datos.ciudad}</b>
                        </Typography>
                    </Box>
                    <Box p={1}>
                        <Typography variant="h6">
                            <b>Contacto: </b> {datos.telefono}
                        </Typography>
                    </Box>
                </Box>
            </Grid>
            <Grid container justifyContent='center'>
                <Box textAlign='center'>
                    © Copyright 2021 Sorteos y Rifas de la Suerte. Sitio desarrollado por Ab Soluciones Empresariales
                </Box>
            </Grid>
        </Grid>
    )
}
