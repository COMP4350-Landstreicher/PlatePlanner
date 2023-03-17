import { Box, Button, Dialog, DialogActions, CssBaseline, DialogContent, Typography } from '@mui/material';
import React from 'react';

export default function DelPopup(props) {

  const yes = () => {
    props.setResponse(true);
    props.handleClose();
  }

  const no = () => {
    props.setResponse(false);
    props.handleClose();

  }
  return (
    <Dialog
      open={props.open}
      onClose={props.handleClose}
      scroll='paper'
      aria-labelledby="dialog"
      fullWidth={true}
      maxWidth='md'

    >

      <CssBaseline />
      <DialogContent>
        <Typography variant="h6" width="90%" marginTop='40px' color="#283d25">
                                <Box component="span" fontWeight='fontWeightBold'>Really delete?</Box>
        </Typography>
      </DialogContent>

      <DialogActions>
                <Button
                    onClick={yes}
                    variant="outlined"
                    color="secondary"
                    sx={{ marginRight: "30px", marginBottom: "10px", borderColor: "#FF0000", color:"#FF0000" }}
                >Yes, delete</Button>
                <Button
                    onClick={no}
                    variant="outlined"
                    color="secondary"
                    sx={{ marginRight: "30px", marginBottom: "10px" }}
                >No, keep</Button>

      </DialogActions>
    </Dialog>

  );
}