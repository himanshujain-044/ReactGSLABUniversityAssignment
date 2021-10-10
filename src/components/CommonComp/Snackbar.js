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
  // let snackbarSeverity = "";
  // if (isError) {
  //   snackbarSeverity = (
  //     <Alert
  //       severity="error"
  //       onClose={handleClose}
  //       // sx={{ width: "100%" }}
  //     >
  //       {message}
  //     </Alert>
  //   );
  // } else {
  //   snackbarSeverity = (
  //     <Alert
  //       severity="success"
  //       onClose={handleClose}
  //       // sx={{ width: "100%" }}
  //     >
  //       {message}
  //     </Alert>
  //   );
  // }
  console.log(isError);
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
      {/* {isError && (
        <Alert
          severity="error"
          onClose={handleClose}
          // sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      )} */}
      {/* {snackbarSeverity} */}
      <Alert
        severity={isError ? "error" : "success"}
        onClose={handleClose}
        // sx={{ width: "100%" }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default CommonSnackbar;

// (isError === true || isError === false) && (
