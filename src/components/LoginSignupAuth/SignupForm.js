import React, { Fragment } from "react";
import useInput from "../../hooks/use-input";
import {
  TextField,
  Button,
  Select,
  InputLabel,
  FormControl,
  MenuItem,
} from "@mui/material";
import useHttp from "../../hooks/use-http";
import { signup } from "../../lib/api";
import LoadingSpinner from "../../LoadingSpinner/LoadingSpinner";
import CommonSnackbar from "../CommonComp/Snackbar";

const SignupForm = (props) => {
  const {
    value: enteredName,
    isValid: enteredNameIsValid,
    hasError: nameInputHasError,
    valueChangeHandler: nameChangedHandler,
    inputBlurHandler: nameBlurHandler,
    reset: resetNameInput,
  } = useInput((value) => value.trim().length > 0);

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
  } = useInput((value) => value.trim().length > 8);
  let formIsValid = false;
  let snackbar = "";
  const { sendRequest, status, data: response, error } = useHttp(signup);
  if (enteredPasswordIsValid && enteredEmailIsValid && enteredNameIsValid) {
    formIsValid = true;
  }
  const signupSubmitHandler = (event) => {
    event.preventDefault();
    // console.log(enteredEmail, enteredPassword, enteredName, role);
    sendRequest({
      name: enteredName,
      email: enteredEmail,
      password: enteredPassword,
      role: role,
    });
    setRole("Student");
    resetEmailInput();
    resetPasswordInput();
    resetNameInput();
  };
  const [role, setRole] = React.useState("Student");

  const handleChange = (event) => {
    setRole(event.target.value);
  };

  if (status === "pending") {
    return <LoadingSpinner />;
  }

  if (status === "completed") {
    snackbar = (
      <CommonSnackbar message={response.message} statusCode={response.status} />
    );
  }
  return (
    <Fragment>
      <form onSubmit={signupSubmitHandler}>
        <TextField
          id="standard-basic"
          label="Name"
          variant="standard"
          value={enteredName}
          onChange={nameChangedHandler}
          onBlur={nameBlurHandler}
          error={nameInputHasError}
          helperText={nameInputHasError ? "Valid email is required!" : " "}
          sx={{ width: "80%" }}
        />
        <TextField
          id="standard-basic"
          label="Email"
          variant="standard"
          value={enteredEmail}
          onChange={emailChangedHandler}
          onBlur={emailBlurHandler}
          error={emailInputHasError}
          helperText={emailInputHasError ? "Valid email is required!" : " "}
          sx={{ width: "80%" }}
        />
        <TextField
          id="standard-basic"
          label="Password"
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
          sx={{ width: "80%" }}
        />
        <br />
        <FormControl variant="standard" sx={{ m: 1, minWidth: 267 }}>
          <InputLabel id="demo-simple-select-standard-label">Role</InputLabel>
          <Select value={role} onChange={handleChange} label="role">
            <MenuItem value="Student">Student</MenuItem>
            <MenuItem value="Instructor">Instructor</MenuItem>
          </Select>
        </FormControl>
        <br />
        <Button
          variant="contained"
          type="submit"
          disabled={!formIsValid}
          style={{
            marginTop: "20px",
          }}
        >
          Signup
        </Button>
      </form>
      {snackbar}
      {/* {status === "completed" && (
        <CommonSnackbar message="already" statusCode={400} />
      )} */}
    </Fragment>
  );
};

export default SignupForm;
