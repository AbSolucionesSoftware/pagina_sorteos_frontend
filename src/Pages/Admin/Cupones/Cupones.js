import React, { useState, useEffect, useContext } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import SnackBarMessages from "../../../Components/SnackBarMessages";
import { AdminContext } from "../../../Context/AdminContext";
import clienteAxios from "../../../Config/axios";
import { Box } from "@material-ui/system";

import moment from "moment";
import 'moment/locale/es';

moment.locale('es');

export default function Cupones({setRefreash, refreash, cuponesSorteo, sorteo }) {
  const { alert, setAlert } = useContext(AdminContext);

  const [cantidad, setCantidad] = useState("");

  

  //Crear states
  // const [cuponesBase, setCuponesBase] = useState([]);

  //Crear funcion que envia la cantidad de cupones a la base de datos
  const enviarCuponesBase = async (e) => {
    try {
      

      await clienteAxios.post(`/sorteo/crear/cupones/${sorteo._id}`,{cantidad})
      .then((res) => {
        console.log(res);
        setRefreash(!refreash);
        setAlert({ message: "Cupones generados", status: "success", open: true });
        setCantidad("");
      })
      .catch((err) => {
        console.log(err);
        setAlert({
          message: "Ocurrio un problema en el servidor",
          status: "error",
          open: true,
        });
      });

      
    } catch (error) {
      setAlert({
        message: "Ocurrio un problema en el servidor",
        status: "error",
        open: true,
      });
    }
  };

  const onChangeCantidadCuponnes = (e) => {
    try {
      setCantidad(e.target.value)
    } catch (error) {
      console.log("error")
    }
  }

  return (
    <div>
      <SnackBarMessages alert={alert} setAlert={setAlert} />
      <TextField 
        value={cantidad} 
        onChange={(e) => onChangeCantidadCuponnes(e)} 
        id="outlined-basic" 
        label="Codigos" 
        variant="outlined" 
      />
      <Button
        size="large"
        variant="text"
        style={{ padding: 15 }}
        endIcon={<SendIcon />}
        loading={false}
        onClick={(e) => enviarCuponesBase(e)}
      >
        Generar
      </Button>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>Cupon</TableCell>
              <TableCell align="center">Nombre del cliente</TableCell>
              <TableCell align="center">Boletos</TableCell>
              <TableCell align="center">Estado</TableCell>
              <TableCell align="center">Creado el</TableCell>
              <TableCell align="center">Canjeado el</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cuponesSorteo.map((cupon, index) => (
              <RowsTableCupon cupon={cupon} index={index} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
//format dddd Do MMMM YYYY

const RowsTableCupon = ({cupon, index}) => {
  
  return (
    <TableRow
      key={index}
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
    >
      <TableCell component="th" scope="row">
        {cupon.cupon}
      </TableCell>
      <TableCell align="center">{`${cupon.cliente ? cupon.cliente.nombres : ''} ${cupon.cliente ? cupon.cliente.apellidos : ''}`}</TableCell>
      <TableCell align="center">
        <BoletosRow cupon={cupon} />
      </TableCell>
      <TableCell align="center">{cupon.canjeado ? "Canjeado" : "No canjeado"}</TableCell>
      <TableCell align="center">
        {cupon.fecha_creado ? moment(cupon.fecha_creado).locale('es-mx').format("dddd Do MMMM YYYY") : '' }
      </TableCell>
      <TableCell align="center">
        {cupon.fecha_pago ? moment(cupon.fecha_pago,"YYYYMMDD").locale('es-mx').format("dddd Do MMMM YYYY") : '' }
      </TableCell>
    </TableRow>
  );
};


const BoletosRow = ({cupon}) => {
  return(
    <div>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        {cupon.boletos.map((boleto) => {
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
