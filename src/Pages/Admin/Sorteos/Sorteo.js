import React from 'react';
import { Container, Grid, Typography } from '@material-ui/core';
import { Box } from '@material-ui/system';
import GenerarSorteo from './GenerarSorteo';

export default function SorteoAdministrador() {
    return (
        <Container>
            <Grid item lg={10}>
                <Box display='flex'>
                    <Box sx={{ flexGrow: 1 }}>
                        <Typography variant='h6'>
                            Sorteo en turno
                        </Typography>
                    </Box>
                    <Box>
                        <GenerarSorteo />
                    </Box>
                </Box>
            </Grid>
        </Container>
    )
}
