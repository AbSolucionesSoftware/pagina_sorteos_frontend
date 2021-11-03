import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Slide,
  Typography,
} from "@material-ui/core";
import clienteAxios from "../../../Config/axios";
import { makeStyles } from "@material-ui/styles";
import { Box } from "@material-ui/system";
import React, { useCallback, useContext, useState } from "react";
import { useDropzone } from "react-dropzone";
import { AdminContext } from "../../../Context/AdminContext";
import { Alert, CircularProgress } from "@mui/material";
import SnackBarMessages from "../../../Components/SnackBarMessages";
import { Add } from "@material-ui/icons";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
  input: {
    display: "none",
  },
  imagen: {
    maxHeight: "100%",
    maxWidth: "100%",
  },
  dropZone: {
    width: 500,
    height: 230,
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    border: "dashed 2px",
    borderColor: "#aaaaaa",
  },
}));

export default function RegistroBanner() {
  const { setAlert, setReload } = useContext(AdminContext);
  const classes = useStyles();
  const [preview, setPreview] = useState("");
  const [dataImagen, setDataImagen] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const token = localStorage.getItem("tokenSorteos");

  const handleDrawerOpen = () => {
    setOpen(!open);
  };

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
  if (loading)
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="30vh"
      >
        <CircularProgress />
      </Box>
    );
  const subirImagen = async () => {
    setLoading(true);
    if (!dataImagen.imagen || !preview) {
      return;
    } else if (
      preview &&
      preview.includes("https://prueba-tienda.s3.us-west-1.amazonaws.com")
    ) {
      return;
    }
    const formData = new FormData();
    formData.append("imagen", dataImagen.imagen);

    await clienteAxios
      .post(`/bannerAdmin/newBanner/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `bearer ${token}`,
        },
      })
      .then((res) => {
        setReload(true);
        handleDrawerOpen();
        setLoading(false);
        setAlert({
          message: "Banner agregado con exito!",
          status: "success",
          open: true,
        });
      })
      .catch((err) => {
        setReload(true);
        handleDrawerOpen();
        setLoading(false);
        setAlert({
          message: "Ocurrio un problema en el servidor!",
          status: "error",
          open: true,
        });
      });
  };

  return (
    <div>
      <SnackBarMessages alert={alert} setAlert={setAlert} />
      <Button onClick={handleDrawerOpen} variant="text" color="primary" startIcon={<Add />} size="large">
        Agregar Nuevo
      </Button>

      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        fullWidth
        maxWidth="md"
        onClose={handleDrawerOpen}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Registro de nuevo Banner Publicitario"}</DialogTitle>
        <DialogContent>
          <Grid item lg={12}>
            <Box
              textAlign="center"
              display="flex"
              justifyContent="center"
              mt={3}
            >
              <Alert severity="info">
                Tamaño recomendado para su imagen: Alto: 690px, Ancho: 1920px
              </Alert>
            </Box>
          </Grid>
          <Grid container justify="center" item lg={12}>
            <Box
              className={classes.dropZone}
              {...getRootProps()}
              height={300}
              width="100%"
              display="flex"
              justifyContent="center"
              alignItems="center"
              textAlign="center"
            >
              <input {...getInputProps()} />
              {dataImagen.imagen || preview ? (
                <Box
                  height={200}
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
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button color="error" variant="contained" onClick={handleDrawerOpen}>
            Cancelar
          </Button>
          <Button color="primary" variant="contained" onClick={subirImagen}>
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
