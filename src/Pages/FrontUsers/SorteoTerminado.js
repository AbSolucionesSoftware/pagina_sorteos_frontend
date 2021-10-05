import { Paper, Grid, Typography, Box } from '@material-ui/core'
import React, { Fragment } from 'react'

export default function SorteoTerminado() {
    return (
        <Fragment>
            <Grid lg={4} xs={12}>
                <Paper elevantion={3}>
                    <Box textAlign='center' p={2}>
                        <Typography variant='h4'>
                            Gracias por tu apoyo!
                        </Typography>
                    </Box> 
                    <Box textAlign='center' p={2}>
                        <Typography variant='h4'>
                            La lista de Boletos se ha agotado!
                        </Typography>
                    </Box> 
                    <Box textAlign='center' p={2}>
                        <Typography variant='h6'>
                            Te esperamos a las 8pm (Hora CDMX)!
                        </Typography>
                    </Box>
                </Paper>
            </Grid>
        </Fragment>
    )
}
