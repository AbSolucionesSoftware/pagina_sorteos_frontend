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
import { borderRadius } from "@mui/system";
import { green } from "@mui/material/colors";


function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

export default function Cupones({setRefreash, refreash, setCuponesSorteo, cuponesSorteo, sorteo }) {
  const { alert, setAlert } = useContext(AdminContext);

  const [cantidad, setCantidad] = useState("");

  //Crear states
  const [cuponesBase, setCuponesBase] = useState([]);

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
