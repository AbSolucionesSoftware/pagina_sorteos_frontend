import { Box, Grid } from '@material-ui/core'
import React from 'react'
import { PaginaContext } from '../../../Context/PaginaContext'
import BannerPromocional from '../Banner/BannerPromocional'
import Preguntas from '../PreguntasFrecuentes/Preguntas'
import QuienesSomos from '../QuienesSomos/QuienesSomos'
import RelojSorteo from '../RelojSorteo/RelojSorteo'
import VideosDeGanadores from '../VideosPremios/VideosDeGanadores'
import { Parallax } from 'rc-scroll-anim';
import Boletos from '../Boletos/Boletos';

export default function Home() {
    const { datos } = React.useContext(PaginaContext);
    console.log(datos);
    return (
        <Grid style={{background: '#76ff03'}}>
            <Box>
                <BannerPromocional />
            </Box>
            <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
                {datos?.quienes_somos === undefined ? null : (
                    <Box style={{background: 'black', color: '#76ff03' }}>
                        <QuienesSomos />
                    </Box>
                )}
                {datos?.preguntas?.length === 0 ? null : (
                    <Box>
                        <Preguntas />
                    </Box>
                )}
                <Box style={{background: 'black', color: '#76ff03' }}>
                    <RelojSorteo />
                </Box>
            </Box>

            <Box>
                <Boletos type="FRENTE" />
            </Box>
            
            <Grid item lg={12} sx={{ display: { xs: 'none', sm: 'none', md: 'block', lg: 'block'} }}>
            {datos?.quienes_somos === undefined ? null : (
                <Box
                    style={{background: 'black', color: '#76ff03' }}
                    height='auto'
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                >
                        <Parallax
                            animation={{ x: 0, opacity: 1, playScale: [ 0.0, 0.8 ] }}
                            style={{ transform: 'translateX(80px)', opacity: 0 }}
                        >
                            <Box>
                                <QuienesSomos />
                            </Box>
                        </Parallax>
                </Box>
            )}
                {datos?.preguntas?.length === 0 ? null : (
                    <Box
                        height='auto'
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                    >
                            <Parallax
                                animation={{ x: 0, opacity: 1, playScale: [ 0.0, 0.8 ] }}
                                style={{ transform: 'translateX(-80px)', opacity: 0 }}
                            >
                                <Box>
                                    <Preguntas />
                                </Box>
                            </Parallax>
                    </Box>
                )}
                <Box
                    style={{background: 'black', color: '#76ff03' }}
                    height="auto"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                >
                    <Parallax
                        animation={{ x: 0, opacity: 1, playScale: [ 0.0, 0.8 ] }}
                        style={{ transform: 'translateX(80px)', opacity: 0 }}
                    >
                        <Box>
                            <RelojSorteo />
                        </Box>
                    </Parallax>
                </Box>
            </Grid>
            {datos?.videos_ganadores?.length === 0 ? null : (
                <Box pt={3} pb={3} p={2}>
                    <VideosDeGanadores />
                </Box>
            )}
        </Grid>
    )
}
