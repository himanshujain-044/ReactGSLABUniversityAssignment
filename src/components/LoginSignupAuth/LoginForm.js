import React, { Fragment } from "react";
import useInput from "../../hooks/use-input";
import { useHistory } from "react-router-dom";
import { login } from "../../lib/api";
import { useContext } from "react";
import AuthContext from "../../store/auth-context";
import {
  TextField,
  InputLabel,
  FormControl,
  Input,
  FormHelperText,
} from "@mui/material";
import { IconButton, InputAdornment } from "@material-ui/core";
import Button from "../CommonComp/UI/Button";
import { Visibility, VisibilityOff } from "@material-ui/icons";

const LoginForm = (props) => {
  const authCtx = useContext(AuthContext);
  const history = useHistory();
  let formIsValid = false;
  const [values, setValues] = React.useState({
    showPassword: false,
  });
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

  if (enteredPasswordIsValid && enteredEmailIsValid) {
    formIsValid = true;
  }

  const handleClickShowPassword = () => {
    setValues({
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const loginSubmitHandler = async (event) => {
    event.preventDefault();
    const data = await login({
      email: enteredEmail,
      password: enteredPassword,
    });
    authCtx.login({ ...data });
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
          required
          value={enteredEmail}
          onChange={emailChangedHandler}
          onBlur={emailBlurHandler}
          error={emailInputHasError}
          helperText={emailInputHasError ? "Valid email is required!" : " "}
        />
        <FormControl
          sx={{ marginBottom: 3, width: "62.5%" }}
          variant="standard"
        >
          <InputLabel htmlFor="standard-adornment-password">
            Password
          </InputLabel>
          <Input
            id="standard-adornment-password"
            type={values.showPassword ? "text" : "password"}
            value={enteredPassword}
            required
            onChange={passwordChangedHandler}
            onBlur={passwordBlurHandler}
            error={passwordInputHasError}
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
          />
          {passwordInputHasError && (
            <FormHelperText sx={{ color: "red" }}>
              Password length should be more than 8 char !
            </FormHelperText>
          )}
        </FormControl>

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
        <Button variant="contained" type="submit" disabled={!formIsValid}>
          Login
        </Button>
      </form>
    </Fragment>
  );
};

export default LoginForm;
