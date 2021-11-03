import React, { useContext, useState } from "react";
import { Button } from "@material-ui/core";
import { AdminContext } from "../../../Context/AdminContext";
import clienteAxios from "../../../Config/axios";
import { CircularProgress } from "@mui/material";
import { Edit } from "@material-ui/icons";

export default function EditarSorteo({ sorteo, dataImagen }) {
  const [loading, setLoading] = useState(false);
  const { setAlert } = useContext(AdminContext);
  const token = localStorage.getItem("tokenSorteos");

  const editarSorteo = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("nombre_sorteo", sorteo.nombre_sorteo);
    formData.append("fecha_sorteo", sorteo.fecha_sorteo);
    /* formData.append( "lista_premios", JSON.stringify(sorteo.lista_premios)); */
    /* formData.append( "boletos",  JSON.stringify(sorteo.boletos)); */
    formData.append("precio_boleto", sorteo.precio_boleto);
    if (dataImagen.imagen) {
      formData.append("imagen", dataImagen.imagen);
    }

    await clienteAxios
      .put(`/sorteo/editarSorteo/${sorteo._id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setLoading(false);
        setAlert({ message: "Sorteo guardado", status: "success", open: true });
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        setAlert({
          message: "Ocurrio un problema en el servidor",
          status: "error",
          open: true,
        });
      });
  };

  return (
    <Button
      variant="contained"
      color="primary"
      onClick={() => editarSorteo()}
      startIcon={
        loading ? <CircularProgress color="inherit" size={18} /> : <Edit />
      }
      disabled={loading}
    >
      Editar Sorteo
    </Button>
  );
}
