import React, { useCallback, useContext, useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useDropzone } from "react-dropzone";
import { Box } from "@material-ui/system";
import { makeStyles } from "@material-ui/styles";
import clienteAxios from "../../../Config/axios";

import { CircularProgress } from "@mui/material";
import { AdminContext } from "../../../Context/AdminContext";

const useStyles = makeStyles((theme) => ({
  imagen: {
    maxHeight: "100%",
    maxWidth: "100%",
    display: "flex",
    justifyItems: "center",
    alignContent: "center",
    alignItems: "center",
  },
  containerImage: {
    width: 130,
    height: 130,
  },
  formInputFlex: {
    display: "flex",
  },
  dropZone: {
    width: 550,
    height: 280,
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    border: "dashed 2px",
    borderColor: "#aaaaaa",
  },
  input_100: {
    width: "100%"
  },
  m: {
    margin: "0px 5px"
  }
}));

export default function Card_Premio({id,premio,sorteo, sSetLoading, sloading}) {

  const classes = useStyles();

  // console.log(premio);

  const [open, setOpen] = useState(false);
  // const [dataDialog, setDataDialog] = useState(premio);

  const [preview, setPreview] = useState("");
  const [dataImagen, setDataImagen] = useState([]);
  const [nombrePremio, setNombrePremio] = useState(premio?.nombre_premio ? premio.nombre_premio : "");
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");
  const { setAlert } = useContext(AdminContext);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOnChangeNamePremio = (e) => {
    setNombrePremio(e.target.value);
  } 

  const handleClickSaveDataPremio = async (e) => {
    console.log(dataImagen.imagen);
    console.log(nombrePremio);
    setLoading(true);
    const formData = new FormData();
    formData.append("nombre_premio",nombrePremio);
    if (dataImagen.imagen) {
      formData.append("imagen", dataImagen.imagen);
    }
    await clienteAxios
      .put(`/sorteo/edit/lista/premios/${sorteo._id}/premio/${id}`, formData , {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setLoading(false);
        setAlert({ message: "Sorteo guardado", status: "success", open: true });
        handleClose();
        sSetLoading(!sloading);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        setAlert({
          message: "Ocurrio un problema.",
          status: "error",
          open: true,
        });
      });
  }

  const onDrop = useCallback(
    (files) => {
      setPreview(URL.createObjectURL(files[0]));
      setDataImagen({
        ...dataImagen,
        imagen: files[0],
      });
    },
    [dataImagen, setDataImagen, setPreview]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  useEffect(() => {
    if(premio.imagen.url){
      setPreview(premio.imagen.url);
    }
  }, [premio])

  if(!premio) return null

  return (
    <div>
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          component="img"
          height="140"
          src={premio.imagen.url === "" ? "http://fremontgurdwara.org/wp-content/uploads/2020/06/no-image-icon-2.png" : premio.imagen.url}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Premio {id}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {premio.nombre_premio === "" ? "" : premio.nombre_premio }
          </Typography>
        </CardContent>
        <CardActions>
          <Button onClick={handleClickOpen} size="small">Editar</Button>
          {/* <Button size="small">Eliminar</Button> */}
        </CardActions>
      </Card>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Premio {id}</DialogTitle>
        <DialogContent>
                <Box
                  className={classes.dropZone}
                  {...getRootProps()}
                  height={250}
                  width="100%"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  textAlign="center"
                >
                  <input {...getInputProps()} />
                  {dataImagen.imagen || preview ? (
                    <Box
                      height={230}
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                    >
                      <img
                        alt="imagen del banner"
                        src={preview}
                        className={classes.imagen}
                      />
                    </Box>
                  ) : isDragActive ? (
                    <Typography>Suelta tu imagen aquí...</Typography>
                  ) : (
                    <Typography>
                      Arrastra y suelta tu imagen aquí, o selecciona una imagen
                      haciendo click aquí
                    </Typography>
                  )}
                </Box>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              name="nombre_premio"
              value={nombrePremio === "" ? "" : nombrePremio }
              onChange={(e) => handleOnChangeNamePremio(e)}
              type="email"
              fullWidth
              variant="standard"
            />
            <Button
              variant="contained"
              color="primary"
              onClick={(e) => handleClickSaveDataPremio(e)}
              startIcon={
                loading ? <CircularProgress color="inherit" size={18} /> : ""
              }
              disabled={loading}
            >
              
              Guardar
            </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
