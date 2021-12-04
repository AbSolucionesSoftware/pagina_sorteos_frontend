import {
  Avatar,
  Box,
  Chip,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Grid,
  Slide,
  TextField,
  Typography,
  Container,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles"; 
import React , { useState }  from "react";
import { PaginaContext } from "../../../Context/PaginaContext";
import clienteAxios from "../../../Config/axios";
import { Link } from "react-router-dom"; 
import Error404 from "../Error";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import SnackBarMessages from "../../../Components/SnackBarMessages";

import moment from "moment";
import 'moment/locale/es';

moment.locale('es');

const useStyles = makeStyles((theme) => ({
  image: {
    maxHeight: "100%",
    maxWidth: "100%",
    display: "flex",
    justifyItems: "center",
    alignContent: "center",
    alignItems: "center",
  },
  containerImage: {
    width: 135,
    height: 135,
  },
  formInputFlex: {
    display: "flex",
  },
}));

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
}); 

export default function Verificador() {
  const { datos } = React.useContext(PaginaContext);
  const classes = useStyles();
  const [verBoleto, setVerBoleto] = useState(""); 
   const [numeroBoleto, setNumeroBoleto] = useState("");
  const [open, setOpen] = useState(false);
  const [alert, setAlert] = useState({})

  const traerDatos = async (e) => {
    e.preventDefault();
    console.log("llego");
    console.log(numeroBoleto);
    if(!numeroBoleto) return;
    await clienteAxios
      .get(`/sorteo/folio/compra/${numeroBoleto}`)
      .then((res) => {
          console.log(res);
        setVerBoleto(res.data.folio);
      })
      .catch((err) => {
        console.log(err.response);
        setAlert({ message: err.response.data.message, status: 'error', open: true });
      });
  };

  const obtenerCampos = (e) => {
    setNumeroBoleto(e.target.value );
  };

  const handleDrawerOpenBoleto = () => {
    setOpen(!open);
  }; 


  return (
    <Box height="90vh" >
      <SnackBarMessages alert={alert} setAlert={setAlert} />
      <Container maxWidth="xs" sx={{ mt: 10 }}>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Box className={classes.containerImage}>
            <Avatar sx={{ width: 135, height: 135 }}>
              <img
                className={classes.image}
                src={datos.imgEmpresaUrl}
                alt="imagen logo"
              />
            </Avatar>
          </Box>
        </Box>
        <Box p={2} textAlign="center">
          <Typography variant="h4">Verficador de Boletos</Typography>
        </Box>
        <form autoComplete="off" onSubmit={traerDatos}>
          <Box display="flex" justifyContent="center" alignItems="center" >
            <Box>
              <TextField
                label="Folio de compra"
                fullWidth
                size="small"
                name="numeroBoleto"
                variant="outlined"
                onChange={obtenerCampos}
              />
            </Box>
            <Box>
              <Button
                color="primary"
                size="large"
                variant="contained"
                type="submit"
              >
                Verificar
              </Button>
            </Box>
          </Box>
          
          <Box p={3} display="flex" justifyContent="center">
            
          </Box>
        </form>
      </Container>

      <Container maxWidth="md" >
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell>Folio de compra</TableCell>
                <TableCell align="center">Nombre</TableCell>
                <TableCell align="center">Apellido</TableCell>
                <TableCell align="center">Fecha de compra</TableCell>
                <TableCell align="center">Cupon</TableCell>
                <TableCell align="center">Boletos</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
            <TableRow
                  key={"data"}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {verBoleto.folio ? verBoleto.folio : "-"}
                  </TableCell>
                  <TableCell align="center">{verBoleto.cliente ? verBoleto.cliente.nombres : "-"}</TableCell>
                  <TableCell align="center">{verBoleto.cliente ? verBoleto.cliente.apellidos : "-"}</TableCell>
                  <TableCell align="center">{verBoleto.createdAt  ? moment(verBoleto.createdAt).locale('es-mx').format("dddd Do MMMM YYYY") : '-' }</TableCell>
                  <TableCell align="center">{verBoleto ? verBoleto.cupon ? "Si" : "No" : "-"}</TableCell>
                  <TableCell align="center">
                    <BoletosRow cupon={verBoleto} />
                  </TableCell>
                </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </Box>
  ); 
}


const BoletosRow = ({cupon}) => {
  return(
    <div>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        {cupon?.boletos?.map((boleto) => {
          return (
            <div style={
              {
                padding: '0px 12px',
                border: "1px solid black",
                borderRadius:"5px",
                marginRight: "4px",
                backgroundColor: 'green',
                color: 'white',
                fontSize: '12px'
              }
            }>
              <p>{boleto.numero_boleto}</p>
            </div>
          )
        })}
        
      </Box>

    </div>
  )
}
