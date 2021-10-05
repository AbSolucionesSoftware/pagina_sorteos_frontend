import { Accordion, AccordionDetails, AccordionSummary, Box, Container, Paper, Typography } from '@material-ui/core';
import React, { Fragment, useState } from 'react'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { PaginaContext } from '../../../Context/PaginaContext';

export default function Preguntas() {
    const { datos } = React.useContext(PaginaContext);

    const [expanded, setExpanded] = useState(false);
    
    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };
    return (
        <Fragment>
            <Container maxWidth="lg">
                <Box mt={5} mb={3} textAlign='center' >
                    <Typography variant='h3'>
                        <b>Preguntas frecuentes</b>
                    </Typography>
                </Box>
                {
                    datos?.preguntas?.map((pregunta, index) => {
                        return(
                            <Box p={.3}>
                            <Paper elevation={8}>
                                <Accordion 
                                    expanded={expanded === index} 
                                    onChange={handleChange(index)}
                                    style={{background:'#1B1B1B', color:'white'}}
                                >
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel1bh-content"
                                        id="panel1bh-header"
                                    >
                                        <Typography variant='h5' sx={{ width: '100%', flexShrink: 0 }}>
                                            {pregunta.pregunta}
                                        </Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Typography variant='h6'>
                                            {pregunta.respuesta}
                                        </Typography>
                                    </AccordionDetails>
                                </Accordion>
                            </Paper>
                            </Box>
                        )
                    })
                }
            </Container>
        </Fragment>
    )
}
