import React, { useContext, useState } from 'react'
import { CircularProgress, Container } from '@mui/material'
import { Box } from '@mui/system';
import CrearNuevoVideo from './CrearNuevoVideo'
import ListaVideos from './ListaVideos';
import SnackBarMessages from '../../../Components/SnackBarMessages';
import { AdminContext } from '../../../Context/AdminContext';

export default function VideosPromocionales() {
	const {  alert, setAlert } = useContext(AdminContext);
    const [ loading, setLoading ] = useState(false);

    if (loading)
	return (
		<Box display="flex" justifyContent="center" alignItems="center" height="30vh">
			<CircularProgress />
		</Box>
	);
    
    return (
        <Container>
            <SnackBarMessages alert={alert} setAlert={setAlert} />
            <Box display="flex" justifyContent="flex-end" mb={2}>
                <CrearNuevoVideo loading={loading} setLoading={setLoading} />
            </Box>
            <ListaVideos />
        </Container>
    )
}
