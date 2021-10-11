import { Accordion, AccordionDetails, AccordionSummary, Grid,  Container, Typography } from '@material-ui/core';
import { Box } from '@material-ui/system';
import BoletosSorteo from '../BoletosSorteo';
import React, { useEffect, useState } from 'react'
import clienteAxios from '../../../../Config/axios';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { makeStyles } from '@material-ui/styles';


const useStyles = makeStyles((theme) => ({
    formInputFlex: {
        display: 'flex',
    },
    imagen:{
        maxHeight: '100%',
        maxWidth: '100%'
    },
}));

export default function SorteosEliminados() {
    const classes = useStyles();
    const [loading, setLoading] = useState(false);
    const [sorteo, setSorteo] = useState([]);
    const [expanded, setExpanded] = useState(false);
    const [ openModal, setOpenModal ] = useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };
    const handleModal = () => setOpenModal(!openModal);

    const traerSorteoActivo = async () => {
        await clienteAxios
            .get(`/sorteo/getSorteosEliminados`)
            .then((res) => {
                setLoading(false);
                setSorteo(res.data.sorteos);
            })
            .catch((err) => {
                setLoading(false);
            });
    };

    useEffect(() => {
        traerSorteoActivo();
    }, [loading]);

    console.log(sorteo)

    return (
        <>
            <Container>
                <Grid container item lg={12}>
                    <Box textAlign="center">
                        <Typography>
                            Sorteos Eliminados
                        </Typography>
                    </Box>
                </Grid>
                <Grid item lg={10} xs={12}>
                    {
                        sorteo?.map((sorteo, index) =>{
                            return(
                                <Box p={1}>
                                    <Accordion key={index} expanded={expanded === index} onChange={handleChange(index)}>
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel1bh-content"
                                        >   
                                            <Box sx={{ flexGrow: 1 }}>
                                                <Typography  sx={{ width: '100%', flexShrink: 0 }}>
                                                    <b>{sorteo.nombre_sorteo}</b>
                                                </Typography>
                                            </Box>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <Grid item lg={12}>
                                                <div className={classes.formInputFlex}>
                                                    <Box width="100%" p={1}>
                                                        <Typography>
                                                            <b>Fecha del Sorteo:</b>
                                                        </Typography>
                                                        <Typography>
                                                            {sorteo.fecha_sorteo}
                                                        </Typography>
                                                    </Box>
                                                    <Box width="100%" p={1}>
                                                        <Typography>
                                                            <b>Precio del Boleto</b>
                                                        </Typography>
                                                        <Typography>
                                                            {sorteo.precio_boleto}
                                                        </Typography>
                                                    </Box>
                                                </div>
                                                <Box>
                                                    <BoletosSorteo sorteo={sorteo} /> 
                                                </Box>
                                            </Grid>
                                        </AccordionDetails>
                                    </Accordion>
                                </Box>
                            )
                        })
                    }
                </Grid>
            </Container>

        </>
    )
}
