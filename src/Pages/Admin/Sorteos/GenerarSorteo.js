import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, CircularProgress, Dialog, AppBar, DialogActions, DialogContent, Slide, Tab, Tabs } from '@material-ui/core';
import { Box } from '@material-ui/system';
import FormularioSorteo from './FormularioSorteo';  
import GeneradorNumeros from './GeneradorNumeros';
import clienteAxios from '../../../Config/axios';
import { AdminContext } from '../../../Context/AdminContext';
import { Add } from '@material-ui/icons';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            {children}
          </Box>
        )}
      </div>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };
  

export default function GenerarSorteo({loading, setLoading, setRefreash, refreash }) {

	const { setAlert } = useContext(AdminContext);
    const [ open, setOpen ] = useState(false);
    
    const [ dataImagen, setDataImagen ]= useState([]);
    const [ value, setValue ] = React.useState(0);
    const [ recargar, setRecargar ] = useState(false);
    const token = localStorage.getItem('tokenSorteos');
    const [ sorteoFinal, setSorteoFinal ] = useState([])

  if (recargar)
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="30vh">
        <CircularProgress />
      </Box>
    );

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    const handleDrawerOpen = () => {
      setOpen(!open);
    };


    const enviarDatos = async () => {
      if(!sorteoFinal.nombre_sorteo || !sorteoFinal.fecha_sorteo || !sorteoFinal.precio_boleto || !sorteoFinal.boletos){
        setAlert({ message: 'Datos inconpletos', status: 'error', open: true });
      }else{
        if(sorteoFinal.boletos) if(sorteoFinal.boletos.length === 0) return
        const formData = new FormData();
        formData.append( "nombre_sorteo", sorteoFinal.nombre_sorteo);
        formData.append( "fecha_sorteo", sorteoFinal.fecha_sorteo);
        formData.append( "boletos",  JSON.stringify(sorteoFinal.boletos));
        formData.append( "precio_boleto", sorteoFinal.precio_boleto);
        if (dataImagen.imagen) {
          formData.append("imagen", dataImagen.imagen);
        }
        setLoading(true);
        await clienteAxios
        .post(`/sorteo/crearSorteo/`, formData, 
        {headers: 
          {
            'Content-Type': 'multipart/form-data',
            Authorization: `bearer ${token}`
          }
        })
        .then((res) => {
          setSorteoFinal([]);
          setAlert({ message: 'Sorteo creado con exito!', status: 'success', open: true });
          setRefreash(!refreash);
          setLoading(!loading);
          handleDrawerOpen();
        })
        .catch((err) => {
          console.log(err)
          setLoading(!loading);
          setSorteoFinal([]);
          setAlert({ message: 'Ocurrio un problema en el servidor', status: 'error', open: true });
          handleDrawerOpen();
        });
      }
      
  };

  return (
      <div>
        <Box p={1} >
          <Button
              variant='text'
              size='large'
              color='primary'
              startIcon={<Add />}
              onClick={handleDrawerOpen}
          >
            Generar Sorteo
          </Button>
        </Box>
        <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            fullWidth
            maxWidth='lg'
            onClose={handleDrawerOpen}
            aria-describedby="alert-dialog-slide-description"
        >
          <DialogContent>
                <FormularioSorteo 
                  sorteoFinal={sorteoFinal} 
                  setSorteoFinal={setSorteoFinal}  
                  dataImagen={dataImagen}
                  setDataImagen={setDataImagen}
                />
                <GeneradorNumeros sorteoFinal={sorteoFinal} setSorteoFinal={setSorteoFinal} />
          </DialogContent>
          <DialogActions>
              <Button color='primary' variant='contained' onClick={handleDrawerOpen}>Cancelar</Button>
              <Button color='error' variant='contained' onClick={enviarDatos}>Guardar</Button>
          </DialogActions>
        </Dialog>
      </div>
  )
}
