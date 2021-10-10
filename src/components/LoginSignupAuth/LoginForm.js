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
import useHttp from "../../hooks/use-http";
import LoadingSpinner from "../../LoadingSpinner/LoadingSpinner";
import CommonSnackbar from "../CommonComp/Snackbar";
import Student from "../Student/Student";

const LoginForm = (props) => {
  const authCtx = useContext(AuthContext);
  const history = useHistory();
  let snackbar = "";
  let formIsValid = false;
  const [values, setValues] = React.useState({
    showPassword: false,
  });

  const { sendRequest, status, data: response } = useHttp(login);

  const {
    value: enteredEmail,
    isValid: enteredEmailIsValid,
    hasError: emailInputHasError,
    valueChangeHandler: emailChangedHandler,
    inputBlurHandler: emailBlurHandler,
  
  } = useInput((value) => value.includes("@"));

  const {
    value: enteredPassword,
    isValid: enteredPasswordIsValid,
    hasError: passwordInputHasError,
    valueChangeHandler: passwordChangedHandler,
    inputBlurHandler: passwordBlurHandler,
  
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
    sendRequest({ email: enteredEmail, password: enteredPassword });
  };

  if (status === "pending") {
    return <LoadingSpinner />;
  }
  if (status === "completed") {
    if ([401, 404, 400, 402].includes(response.status)) {
      snackbar = (
        <CommonSnackbar
          message={response.message}
          statusCode={response.status}
        />
      );
    }
    if (response.status === 200) {
      authCtx.login({ ...response });
    }
    if (authCtx.role) {
      history.push("/student");
    }

    // console.log("g", response.role);
    // setTimeout(() => {
    //   console.log(authCtx);
    // }, 1);
    // if (authCtx.role === "Student") {
    //   console.log("hii");
    //   history.push("/student");
    // }
    // authCtx.login({ ...response });
    // setIsFormSubmitted(false);
    // console.log(response.message);
    // if ([401, 404, 400, 402].includes(response.status)) {
    //   console.log("insde 400");
    //   snackbar = (
    //     <CommonSnackbar
    //       message={response.message}
    //       statusCode={response.status}
    //     />
    //   );
    //   // console.log(snackbar)
    // } else {
    //   console.log(response);
    // }
    // history.push("/student");
  }
  // if (status === "completed" && authCtx.role) {
  //   console.log("jiiii");
  //   console.log(authCtx.role);
  //   history.push("/student");
  // }
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
      {snackbar}
    </Fragment>
  );
};

export default LoginForm;
