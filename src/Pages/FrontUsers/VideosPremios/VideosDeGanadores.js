import React, { Fragment, useState } from 'react'
import { Box, Container, Grid, IconButton, Typography } from '@material-ui/core'
import ItemsCarousel from 'react-items-carousel';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { PaginaContext } from '../../../Context/PaginaContext';
import ReactPlayer from 'react-player';

export default function VideosDeGanadores() {
    const { datos } = React.useContext(PaginaContext);

    const [activeItemIndex, setActiveItemIndex] = useState(0);
    const chevronWidth = 40;

    return (
        <Fragment>
            <Container>
                <Grid lg={12} xs={12}>
                    <Box textAlign="center" sx={{display: 'flex', justifyContent: 'center', mt: 6, p: 1 }}>
                        <Typography variant='h3'>
                            <b>Ganadores de Rifas y Sorteos de la Suerte</b>
                        </Typography>
                    </Box>
                    <Box textAlign="center" sx={{display: 'flex', justifyContent: 'center', mt: 1, mb: 2, p: 1 }}>
                        <Typography variant='h4'>
                            Tu puedes ser el proximo Ganador
                        </Typography>   
                    </Box>
                    <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                        <ItemsCarousel
                            requestToChangeActive={setActiveItemIndex}
                            activeItemIndex={activeItemIndex}
                            numberOfCards={3}
                            gutter={40}
                            leftChevron={
                                <IconButton aria-label="delete" disabled color="primary">
                                    <ArrowBackIosIcon />
                                </IconButton>
                            }
                            rightChevron={
                                <IconButton aria-label="delete" disabled color="primary">
                                    <ArrowForwardIosIcon />
                                </IconButton>
                            }
                            outsideChevron
                            infiniteLoop={true}
                            chevronWidth={chevronWidth}
                        >
                            {
                                datos?.videos_ganadores?.map((video) => {
                                    return(
                                        <Box>
                                            <Box textAlign="center">
                                                <Typography variant='subtitle1'>
                                                    <b>{video.titulo_video}</b>
                                                </Typography>
                                            </Box>
                                            <Box>
                                                <ReactPlayer 
                                                    url={video.link_video}
                                                    width="360px" 
                                                    height="230px"
                                                />
                                            </Box>
                                        </Box>
                                    )
                                })
                            }
                        </ItemsCarousel>                     
                    </Box>
                    <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
                        <ItemsCarousel
                            requestToChangeActive={setActiveItemIndex}
                            activeItemIndex={activeItemIndex}
                            numberOfCards={3}
                            gutter={40}
                            leftChevron={
                                <IconButton aria-label="delete" disabled color="primary">
                                    <ArrowBackIosIcon />
                                </IconButton>
                            }
                            rightChevron={
                                <IconButton aria-label="delete" disabled color="primary">
                                    <ArrowForwardIosIcon />
                                </IconButton>
                            }
                            outsideChevron
                            infiniteLoop={true}
                            chevronWidth={chevronWidth}
                        >
                            {
                                datos?.videos_ganadores?.map((video) => {
                                    return(
                                        <Box>
                                            <Box textAlign="center">
                                                <Typography variant='subtitle1'>
                                                    <b>{video.titulo_video}</b>
                                                </Typography>
                                            </Box>
                                            <Box>
                                                <ReactPlayer 
                                                    url={video.link_video}
                                                    width="360px" 
                                                    height="230px"
                                                />
                                            </Box>
                                        </Box>
                                    )
                                })
                            }
                        </ItemsCarousel>        
                    </Box>
                </Grid>
            </Container>
        </Fragment>
    )
}
