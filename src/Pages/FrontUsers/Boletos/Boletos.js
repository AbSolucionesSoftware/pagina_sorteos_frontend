import React from 'react';

import { Box, Chip, Container, Grid, IconButton, InputBase, Paper,  Typography } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search';
import { Link } from 'react-router-dom';

export default function Boletos() {
    return (
        <Container>
            <Grid>
                <Box mt={2} textAlign='center'>  
                    <Typography variant='h3'>
                        <b>¡Boletos Disponibles!</b>
                    </Typography>
                </Box>
                <Box display='flex' justifyItems='center' alignContent='center' textAlign='center'> 
                    <Box width="50%" p={1}>
                        <Paper
                            component="form"
                            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 'auto' }}
                        >
                            <InputBase
                                sx={{ ml: 1, flex: 1 }}
                                placeholder="Busca tu boleto"
                                inputProps={{ 'aria-label': 'busca tu boleto' }}
                            />
                            <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
                                <SearchIcon />
                            </IconButton>
                        </Paper>
                    </Box>
                </Box>
            </Grid>
            <Grid container>
                <Grid  item lg={12}>
                    <Box display='flex'>
                        <Box p={1}>
                            <Chip
                                style={{background: 'white'}}
                                component={Link}
                                to={`/sorteos/comprar-boleto/2525/i5s5s5s5s`}
                                label={<Box p={1}><Typography variant='h5'><b>0525</b></Typography></Box>}
                            />
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </Container>
    )
}
