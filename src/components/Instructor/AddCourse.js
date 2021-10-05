import { Button } from "@material-ui/core";
import { TextField } from "@mui/material";
import React, { Fragment } from "react";
import useInput from "../../hooks/use-input";
import { Link, useHistory } from "react-router-dom";
import { login } from "../../lib/api";
import { useContext } from "react";
import AuthContext from "../../store/auth-context";
import classes from "./AddCourse.module.css";
import { styled } from "@mui/material/styles";

const BootstrapButton = styled(Button)({
  boxShadow: "none",
  textTransform: "none",
  fontSize: 16,
  padding: "6px 12px",
  border: "1px solid",
  //   lineHeight: 1.5,
  borderRadius: "5px",
  backgroundColor: "black",
  color: "white",
  height: "38px",
  //   borderColor: "#0063cc",
  //   fontFamily: [
  //     "-apple-system",
  //     "BlinkMacSystemFont",
  //     '"Segoe UI"',
  //     "Roboto",
  //     '"Helvetica Neue"',
  //     "Arial",
  //     "sans-serif",
  //     '"Apple Color Emoji"',
  //     '"Segoe UI Emoji"',
  //     '"Segoe UI Symbol"',
  //   ].join(","),
  "&:hover": {
    backgroundColor: "While",
    color: "black",
    // borderColor: "#0062cc",
    // boxShadow: "none",
  },
  //   "&:active": {
  //     boxShadow: "none",
  //     backgroundColor: "#0062cc",
  //     borderColor: "#005cbf",
  //   },
  //   "&:focus": {
  //     boxShadow: "0 0 0 0.2rem rgba(0,123,255,.5)",
  //   },
});

const AddCourse = () => {
  const authCtx = useContext(AuthContext);
  const history = useHistory();
  const {
    value: enteredEmail,
    isValid: enteredEmailIsValid,
    hasError: emailInputHasError,
    valueChangeHandler: emailChangedHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmailInput,
  } = useInput((value) => value.includes("@"));

  const {
    value: enteredPassword,
    isValid: enteredPasswordIsValid,
    hasError: passwordInputHasError,
    valueChangeHandler: passwordChangedHandler,
    inputBlurHandler: passwordBlurHandler,
    reset: resetPasswordInput,
  } = useInput((value) => value.trim().length > 6);
  let formIsValid = false;

  if (enteredPasswordIsValid && enteredEmailIsValid) {
    formIsValid = true;
  }
  const cancelHandler = () => {
    history.push("/instructor");
  };
  const loginSubmitHandler = async (event) => {
    event.preventDefault();
    console.log(enteredEmail, enteredPassword);
    const { data } = await login({
      email: enteredEmail,
      password: enteredPassword,
    });
    console.log(data);
    authCtx.login({ ...data });
    console.log(authCtx);
    if (data.role === "Student") {
      history.push("/student");
    }
    if (data.role === "Instructor") {
      history.push("/instructor");
    }
    resetEmailInput();
    resetPasswordInput();
  };

  return (
    <div className={classes.section}>
      <h4>Add your course</h4>
      <form onSubmit={loginSubmitHandler}>
        <TextField
          id="standard-basic"
          label="Course name"
          variant="standard"
          value={enteredEmail}
          onChange={emailChangedHandler}
          onBlur={emailBlurHandler}
          error={emailInputHasError}
          helperText={emailInputHasError ? "Valid email is required!" : " "}
        />

        <TextField
          id="standard-basic"
          label="Duration(in Hours)"
          variant="standard"
          value={enteredPassword}
          onChange={passwordChangedHandler}
          onBlur={passwordBlurHandler}
          error={passwordInputHasError}
          helperText={
            passwordInputHasError
              ? "Password is required(min len 6 char)!"
              : " "
          }
        />
        <TextField
          id="standard-basic"
          label="Prerequisite"
          variant="standard"
          value={enteredPassword}
          onChange={passwordChangedHandler}
          onBlur={passwordBlurHandler}
          error={passwordInputHasError}
          helperText={
            passwordInputHasError
              ? "Password is required(min len 6 char)!"
              : " "
          }
        />
        <br />

        <span className={classes.span} onClick={cancelHandler}>
          Cancel
        </span>
        {/* <Button variant="outlined" size="small">
          Outlined
        </Button> */}
        {/* <Button
          variant="contained"
          type="submit"
          size="small"
        //   className={classes.button}
          sx={{ backgroundColor: "black" }}
        >
          Add course
        </Button> */}
        <BootstrapButton variant="contained" disableRipple>
          Add course
        </BootstrapButton>
        {/* <Button
          variant="contained"
          type="submit"
          disabled={!formIsValid}
          // sx={{ backgroundColor: "black" }}
        >
          Add course
        </Button> */}
      </form>
    </div>
  );
};

export default AddCourse;
