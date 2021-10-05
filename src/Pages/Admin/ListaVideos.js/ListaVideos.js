import { Accordion, AccordionDetails, AccordionSummary, Button, CircularProgress, Container, Dialog, DialogActions, DialogTitle, Grid, IconButton, Typography } from '@mui/material'
import React, { useContext, useState } from 'react';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ReactPlayer from 'react-player';
import { Box } from '@mui/system';
import { AdminContext } from '../../../Context/AdminContext';
import { Delete } from '@material-ui/icons';
import clienteAxios from '../../../Config/axios';
import SnackBarMessages from '../../../Components/SnackBarMessages';


export default function ListaVideos() {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));
    const [expanded, setExpanded] = useState(false);
	const { datos, setReload, setAlert, alert } = useContext(AdminContext);
    const [ openModal, setOpenModal ] = useState(false);
    const [loading, setLoading] = useState(false);
    const [videoId, setVideoId] = useState('');

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const handleModal = () => setOpenModal(!openModal);
    const handleClickDelete = async () => {
        setLoading(true);
        await clienteAxios
			.delete(`/empresa/actionEmpresa/videos/${user._id}/${videoId}`, 
            {
				headers: {
					Authorization: `bearer ${token}`
				}
			})
			.then((res) => {
                handleModal();
                setReload(true);
                setAlert({ message: 'Video Eliminado con exito!', status: 'success', open: true });
                setLoading(false);
			})
			.catch((err) => {
                handleModal();
                setReload(true);
                setAlert({ message: 'Ocurrio un problema en el servidor', status: 'error', open: true });
                setLoading(false);
			});
    };

    if (loading)
	return (
		<Box display="flex" justifyContent="center" alignItems="center" height="30vh">
			<CircularProgress />
		</Box>
	);

    return (
        <Container>
            <SnackBarMessages alert={alert} setAlert={setAlert} />
            <Grid item lg={10} xs={12}>
                {
                    datos.videos_ganadores?.map((video, index)=>{
                        return(
                            <Accordion expanded={expanded === index} onChange={handleChange(index)}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                >   
                                    <Box sx={{ flexGrow: 1 }}>
                                        <Typography  sx={{ width: '100%', flexShrink: 0 }}>
                                            {video.titulo_video}
                                        </Typography>
                                    </Box>
                                    <Box mr={2}>
                                        <IconButton 
                                            color="primary" 
                                            onClick={() => {
                                                    handleModal() 
                                                    setVideoId(video._id) 
                                            }}
                                        >
                                            <Delete />
                                        </IconButton>
                                    </Box>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Box>
                                        <ReactPlayer 
                                            url={video.link_video}
                                            width="290px" 
                                            height="230px" 
                                        />
                                    </Box>
                                </AccordionDetails>
                            </Accordion>
                        )
                    })
                }
            </Grid>
            <Dialog open={openModal} onClose={handleModal}>
				<DialogTitle>{'¿Seguro que quieres eliminar esto?'}</DialogTitle>
				<DialogActions>
					<Button onClick={handleModal} color="primary">
						Cancelar
					</Button>
					<Button color="primary" autoFocus variant="contained" onClick={() => handleClickDelete()}>
						Eliminar
					</Button>
				</DialogActions>
			</Dialog>
        </Container>
    )
};
