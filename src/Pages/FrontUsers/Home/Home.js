import { Box, Grid } from '@material-ui/core'
import React from 'react'
import { PaginaContext } from '../../../Context/PaginaContext'
import BannerPromocional from '../Banner/BannerPromocional'
import Preguntas from '../PreguntasFrecuentes/Preguntas'
import QuienesSomos from '../QuienesSomos/QuienesSomos'
import RelojSorteo from '../RelojSorteo/RelojSorteo'
import VideosDeGanadores from '../VideosPremios/VideosDeGanadores'
import { Parallax } from 'rc-scroll-anim';
export default function Home() {
    
    return (
        <Grid style={{background: '#76ff03'}}>
            <Box pb={3}>
                <BannerPromocional />
            </Box>
            <Box pt={3} pb={3}>
            </Box>
            <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
                <Box my={5} style={{background: 'black', color: '#76ff03' }}>
                    <QuienesSomos />
                </Box>
                <Box my={5} >
                    <Preguntas />
                </Box>
                <Box my={5}  style={{background: 'black', color: '#76ff03' }}>
                    <RelojSorteo />
                </Box>
            </Box>
            <Grid item xs={12} sx={{ display: { xs: 'none', sm: 'none', md: 'block', lg: 'block'} }} >
                <Box
                    style={{background: 'black', color: '#76ff03' }}
                    height='auto'
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                >
                        <Parallax
                            animation={{ x: 0, opacity: 1, playScale: [ 0.0, 0.8 ] }}
                            style={{ transform: 'translateX(100px)', opacity: 0 }}
                        >
                            <Box my={5}>
                                <QuienesSomos />
                            </Box>
                        </Parallax>
                </Box>
                <Box
                    height='auto'
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                >
                        <Parallax
                            animation={{ x: 0, opacity: 1, playScale: [ 0.0, 0.8 ] }}
                            style={{ transform: 'translateX(-100px)', opacity: 0 }}
                        >
                            <Box my={5}>
                                <Preguntas />
                            </Box>
                        </Parallax>
                </Box>
                <Box
                    style={{background: 'black', color: '#76ff03' }}
                    height="auto"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                >
                    <Parallax
                        animation={{ x: 0, opacity: 1, playScale: [ 0.0, 0.8 ] }}
                        style={{ transform: 'translateX(100px)', opacity: 0 }}
                    >
                        <Box my={5}>
                            <RelojSorteo />
                        </Box>
                    </Parallax>
                </Box>
            </Grid>
            <Box pt={3} pb={3}>
                <VideosDeGanadores />
            </Box>
        </Grid>
    )
}
