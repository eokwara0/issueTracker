import React from "react";

import { Snackbar, Button, IconButton, Alert } from "@mui/material";
import { Close } from "@mui/icons-material";



export default function SnackBar(props) {
  function handleClose() {
    props.closeAlert();
  }

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <Close fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <Snackbar
      open={props.alert.open}
      autoHideDuration={6000}
      onClose={handleClose}
    >
      <Alert
        color={props.alert.color}
        sx={{ fontSize: "1.3rem" }}
        onClose={handleClose}
      >
        {props.alert.message}
        <strong>Check it out!</strong>{" "}
      </Alert>
    </Snackbar>
  );
}
