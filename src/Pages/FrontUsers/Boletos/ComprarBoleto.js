import * as React from 'react';
import {Box, Grid, StepLabel} from '@mui/material';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import FormularioDatos from './FormularioDatos';
import RealizarCompra from './RealizarCompra';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(() => ({
  buton:{
      width: "50%"
  },
  butonEnvio: {
      width: "50%",
      fontWeight: 600
  },
  table: {
      minWidth: "auto",
  },
  column: {
      flexBasis: '70%',
  },
  column2: {
      flexBasis: '15%',
  },
}));


export default function ComprarBoleto() {
  const classes = useStyles();


  
  function getSteps() {
      return ['Informacion Boleto', 'Comprar'];
  };

  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  function getStepContent(step) {
    switch (step) {
      case 0:
        return (
          <FormularioDatos />
        );
        case 1:
          return (
            <RealizarCompra />
          )
    }
  }

  return (
    <>
        <Grid item lg={12}>
            <Box mt={3}>
                <Stepper activeStep={activeStep} alternativeLabel>
                    {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel>
                            <Typography component={'span'} variant="h4">
                                {label}
                            </Typography>
                        </StepLabel>
                    </Step>
                    ))}
                </Stepper>
            </Box>
        </Grid>

        <div>
            {activeStep === steps.length ? (
            <div>
                <Button onClick={handleReset}>Volver</Button>
            </div>
            ) : (
            <div>
                <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>
                <Box display="flex" justifyContent="center">
                        <Box p={1}>
                            <Button
                                variant="contained" 
                                color="error"
                                disabled={activeStep === 0}
                                onClick={handleBack}
                                className={classes.backButton}
                            >
                                Atras
                            </Button>
                        </Box>
                        {activeStep === steps.length -1 ? (
                            null
                            // <Box p={1}>
                            //     <Button
                            //         className={classes.backButton}
                            //         variant="contained" 
                            //         color="primary"
                            //     >
                                    
                            //     </Button>
                            // </Box>
                        ) : (
                            <Box p={1}>
                                <Button variant="contained" color="primary" onClick={handleNext}
                                    disabled={activeStep === 2 ? true : false}
                                >
                                    Siguiente
                                </Button>
                            </Box>
                           
                        )}
                </Box>
            </div>
            )}
        </div>
    </>
  )
}
