import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Slide from "@mui/material/Slide";
import { PaginaContext } from "../../../Context/PaginaContext";
import FormularioDatos from './FormularioDatos';
import { Close } from "@material-ui/icons";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ComprarBoletos({sorteo}) {
  const [open, setOpen] = React.useState(false);
  const { boletos_seleccionados } = React.useContext(
    PaginaContext
  );

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        disabled={boletos_seleccionados.length !== 4}
        onClick={handleClickOpen}
      >
        Comprar boletos
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogContent>
            <FormularioDatos sorteo={sorteo} />
        </DialogContent>
        <DialogActions sx={{justifyContent: 'center'}}>
          <Button onClick={handleClose} startIcon={<Close />}>Cancelar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
