import { Button, Grid, Slide, Typography } from '@material-ui/core'
import { Box } from '@material-ui/system'
import { Dialog, DialogActions, DialogContent } from '@mui/material'
import React, { useState } from 'react'

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function BoletosSorteo() {

    const [ open, setOpen ] = useState(false);

    const handleDrawerOpen = () => {
        setOpen(!open);
    };
    
    return (
        <>
            <Box display="flex" justifyContent="flex-end">
                <Button
                    variant='contained'
                    size='large'
                    color='primary'
                    onClick={handleDrawerOpen}
                >
                    Ver Boletos
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
                <Box>
                    <Typography>
                        Hola mundo
                    </Typography>
                </Box>
              </DialogContent>
              <DialogActions>
                  <Button color='primary' variant='contained' onClick={handleDrawerOpen}>Cancelar</Button>
              </DialogActions>
          </Dialog>
        </>
    )
}
