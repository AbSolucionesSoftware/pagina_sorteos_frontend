import React from 'react';
import { Grid, Paper, Box, Typography } from '@mui/material';
import { makeStyles } from '@material-ui/styles';
import PagoPaypal from './pago_paypal';

const useStyles = makeStyles(() => ({
    image: {
		maxHeight: '100%',
		maxWidth: '100%',
        display: 'flex',
        justifyItems: 'center',
        alignContent: 'center',
        alignItems: 'center'
	},
    formInputFlex: {
		display: 'flex',
	}
}));

export default function RealizarCompra() {

    const classes = useStyles();

    return (
        <>
           <Grid container justifyContent="center">
                <Grid lg={4} md={6} xs={11}>
                    <Paper className={classes.root} elevation={3}>
                        <Box p={2} textAlign='center'>
                            <Typography variant='h5'>
                                Completa los datos para completar tu compra
                            </Typography>
                        </Box>
                        <Box>
                            <PagoPaypal />
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </>
    )
}
