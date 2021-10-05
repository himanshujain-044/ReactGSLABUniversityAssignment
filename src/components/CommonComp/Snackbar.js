import React from "react";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Slide from "@mui/material/Slide";
// import { Alert } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const CommonSnackbar = (props) => {
  const message = props.message || "Something went wrong!";
  const statusCode = props.statusCode;
  const isError = [401, 400, 404, 500].includes(statusCode);
  const [state, setState] = React.useState({
    open: true,
    Transition: Slide,
    vertical: "bottom",
    horizontal: "center",
  });
  const { vertical, horizontal, open } = state;
  const handleClose = () => {
    setState({
      ...state,
      open: false,
    });
  };

  const action = (
    <React.Fragment>
      <Button color="secondary" size="small" onClick={handleClose}>
        Ok
      </Button>
    </React.Fragment>
  );

  return (
    <Snackbar
      open={open}
      anchorOrigin={{ vertical, horizontal }}
      onClose={handleClose}
      autoHideDuration={3000}
      TransitionComponent={state.Transition}
      message={message}
      key={state.Transition.name}
      action={action}
    >
      <Alert
        onClose={handleClose}
        severity={isError ? "error" : "success"}
        sx={{ width: "100%" }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default CommonSnackbar;
