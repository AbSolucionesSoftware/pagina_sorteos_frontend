import React, { useCallback, useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, CircularProgress, Dialog, AppBar, DialogActions, DialogContent, Slide, Tab, Tabs, Typography } from '@material-ui/core';
import { Box } from '@material-ui/system';
import FormularioSorteo from './FormularioSorteo';  
import GeneradorNumeros from './GeneradorNumeros';
import clienteAxios from '../../../Config/axios';
import { AdminContext } from '../../../Context/AdminContext';

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
            <Typography>{children}</Typography>
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
  
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }
  

export default function GenerarSorteo({loading, setLoading}) {
	const { setAlert } = useContext(AdminContext);
    const [ open, setOpen ] = useState(false);
    const [ preview, setPreview ] = useState('');
    const [ dataImagen, setDataImagen ]= useState([]);
    const [ value, setValue ] = React.useState(0);
    const [ recargar, setRecargar ] = useState(false);
    const token = localStorage.getItem('token');
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
      setSorteoFinal([]);
      setOpen(!open);
    };

    const enviarDatos = async () => {
      setRecargar(true);
      const input ={
        "nombre_sorteo": sorteoFinal.nombre_sorteo,
        "fecha_sorteo": sorteoFinal.fecha_sorteo,
        "lista_premios": sorteoFinal.lista_premios,
        "boletos": sorteoFinal.boletos,
        "precio_boleto":sorteoFinal.precio_boleto,
      }

      const formData = new FormData();
        formData.append( "nombre_sorteo", sorteoFinal.nombre_sorteo);
        formData.append( "fecha_sorteo", sorteoFinal.fecha_sorteo);
        formData.append( "lista_premios", sorteoFinal.lista_premios);
        formData.append( "boletos", sorteoFinal.boletos);
        formData.append( "precio_boleto", sorteoFinal.precio_boleto);
        if (dataImagen.imagen) {
          formData.append("imagen", dataImagen.imagen);
      }
      await clienteAxios
      .post(`/sorteo/crearSorteo`, formData, 
      {headers: 
        {
          'Content-Type': 'multipart/form-data',
          Authorization: `bearer ${token}`
        }
      })
      .then((res) => {
        console.log(res.data)
        setLoading(true);
        setRecargar(false);
        // setSorteoFinal([]);
        setAlert({ message: 'Sorteo creado con exito!', status: 'success', open: true });
        // handleDrawerOpen();
      })
      .catch((err) => {
        console.log(err)
        setLoading(true);
        // setSorteoFinal([]);
        setRecargar(false);
        setAlert({ message: 'Ocurrio un problema en el servidor', status: 'error', open: true });
        // handleDrawerOpen();
      });
  };

  return (
      <div>
        <Box p={1} >
          <Button
              variant='outlined'
              size='large'
              color='primary'
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
          <AppBar position="static" color="default" elevation={0}>
            <Box display="flex" justifyContent="space-between">
              <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                  <Tab label="Informacion Sorteo" {...a11yProps(0)} />
                  <Tab label="Generar Numeros" {...a11yProps(1)} />
              </Tabs> 
            </Box>
          </AppBar>
          <DialogContent>
              <TabPanel value={value} index={0}>
                <FormularioSorteo 
                  sorteoFinal={sorteoFinal} 
                  setSorteoFinal={setSorteoFinal}  
                  preview={preview} 
                  setPreview={setPreview} 
                  dataImagen={dataImagen}
                  setDataImagen={setDataImagen}
                />
              </TabPanel>
              <TabPanel value={value} index={1}>
                <GeneradorNumeros sorteoFinal={sorteoFinal} setSorteoFinal={setSorteoFinal} />
              </TabPanel>
          </DialogContent>
          <DialogActions>
              <Button color='primary' variant='contained' onClick={handleDrawerOpen}>Cancelar</Button>
              <Button color='error' variant='contained' onClick={enviarDatos}>Guardar</Button>
          </DialogActions>
        </Dialog>
      </div>
  )
}
