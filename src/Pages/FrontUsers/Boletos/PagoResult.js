import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Slide from "@mui/material/Slide";
import PagoSuccess from "./PagoSucces";
import PagoError from "./PagoFail";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function PagoResult({
  open,
  setOpen,
  handleCloseForm,
  dataPago,
}) {
  const { status, data } = dataPago;

  const handleClose = () => {
    setOpen(false);
    handleCloseForm();
    window.location.reload();
  };

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      fullWidth
      maxWidth="xs"
    >
      <DialogContent>
        {status === "success" ? <PagoSuccess data={data} /> : <PagoError />}
      </DialogContent>
      <DialogActions sx={{ justifyContent: "center" }}>
        <Button onClick={handleClose}>Cerrar</Button>
      </DialogActions>
    </Dialog>
  );
}
