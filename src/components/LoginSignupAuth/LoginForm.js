import React, { Fragment } from "react";
import { TextField, Input, Checkbox } from "@mui/material";
import useInput from "../../hooks/use-input";
import { Link, useHistory } from "react-router-dom";
import { login } from "../../lib/api";
import { useContext } from "react";
import AuthContext from "../../store/auth-context";
import { IconButton, InputAdornment } from "@material-ui/core";
Chrome
const LoginForm = (props) => {
  const authCtx = useContext(AuthContext);
  const history = useHistory();
  const label = { inputProps: { "aria-label": "Checkbox demo" } };
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
    <Fragment>
      <form onSubmit={loginSubmitHandler}>
        <TextField
          id="standard-basic"
          label="Email"
          variant="standard"
          value={enteredEmail}
          onChange={emailChangedHandler}
          onBlur={emailBlurHandler}
          error={emailInputHasError}
          helperText={emailInputHasError ? "Valid email is required!" : " "}
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
        />
        {/* <Input
          id="standard-adornment-password"
          type={values.showPassword ? "text" : "password"}
          value={values.password}
          onChange={handleChange("password")}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
              >
                {values.showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
        /> */}
        {/* <br />
        <Checkbox defaultChecked label="Keep me signin" /> */}
        <br />
        <Button
          variant="contained"
          type="submit"
          disabled={!formIsValid}
          // sx={{ backgroundColor: "black" }}
        >
          Login
        </Button>
      </form>
    </Fragment>
  );
};

export default LoginForm;
