import { Button, Dialog, DialogActions, DialogTitle } from '@material-ui/core'
import { Box } from '@material-ui/system'
import React, { useContext, useState } from 'react'
import clienteAxios from '../../../Config/axios';
import { AdminContext } from '../../../Context/AdminContext';

export default function EliminarSorteo({sorteo, loading, setLoading, setRefreash, refreash, setPreview}) {
	const { setAlert } = useContext(AdminContext);

    const [open, setOpen] = useState(false);

    const handleModal =()=> {setOpen(!open)};

    const desactivarSorteo = async () => {
        setLoading(true);
        await clienteAxios
        .put(`/sorteo/activeSorteo/${sorteo._id}`,{sorteo_activo: false })
        .then((res) => {
            setAlert({ message: 'Sorteo desactivado', status: 'success', open: true });
            setRefreash(!refreash);
            setLoading(!loading);
            setPreview("");
        })
        .catch((err) => {
            setLoading(!loading);
            setAlert({ message: 'Ocurrio un problema en el servidor', status: 'error', open: true });
        });
    };

    return (
        <>
            <Box display="flex" justifyContent="flex-end" p={1}>
                <Button
                    size='large'
                    color="error"
                    variant="contained"
                    onClick={() => handleModal()}
                >
                    Desactivar sorteo
                </Button>
            </Box>

            <Dialog open={open} onClose={handleModal}>
				<DialogTitle>{'¿Seguro que quieres desactivar este sorteo?'}</DialogTitle>
				<DialogActions>
					<Button onClick={handleModal} color="primary">
						Cancelar
					</Button>
					<Button color="primary" autoFocus variant="contained" onClick={() => desactivarSorteo()}>
						Desactivar
					</Button>
				</DialogActions>
			</Dialog>

        </>
    )
}
