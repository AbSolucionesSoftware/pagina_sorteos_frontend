import { Container, Grid, Typography } from '@material-ui/core'
import { Box } from '@material-ui/system'
import React from 'react';
import imagen from './Error.png'

export default function Error404() {
    return (
        <>
            <Container>
                <Grid item lg={12}>
                    <Box textAlign="center" p={2}>
                        <Typography variant="h3">
                            Esta pagina no se encuentra disponible
                        </Typography>
                        <img 
                            src={imagen}
                            alt="Imagen de error"
                            width="50%"
                            height="50%"
                        />
                    </Box>
                </Grid>
            </Container>
        </>
    )
}
