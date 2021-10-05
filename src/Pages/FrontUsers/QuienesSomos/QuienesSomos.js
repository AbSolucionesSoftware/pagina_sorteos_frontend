import { Box, Container, Grid, Typography } from '@material-ui/core'
import { makeStyles} from '@material-ui/styles';
import React, { Fragment } from 'react'
import { PaginaContext } from '../../../Context/PaginaContext';

const useStyles = makeStyles({
    image: {
		height: '100%',
		width: '100%',
	},
	containerImage:{
		width: '90%',
		height: '100%'
	}
});

export default function QuienesSomos() {
    const { datos } = React.useContext(PaginaContext);
    return (
        <Fragment>
            <Box sx={{display: 'flex', textAlign: 'center', justifyContent: 'center',p: 1, m: 1, mt: 8}} >
                <Typography variant='h3'>
                    <b>¿Quienes somos?</b>
                </Typography>
            </Box>
            <Container maxWidth="lg">
                <Grid container>
                    <Grid item lg={11} xs={12}>
                        <Box sx={{mt: 2, p: 1 }}>
                            <Typography variant='h4'>
                               <b>{datos.nombre_empresa}</b>
                            </Typography>
                        </Box>
                        <Box sx={{ p: 1, mb: 5 }}>
                            <Typography textAlign='justify' variant='h6'>
                                {datos.quienes_somos}
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Fragment>
    )
}
