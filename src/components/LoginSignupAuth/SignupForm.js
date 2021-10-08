import React, { Fragment } from "react";
import useInput from "../../hooks/use-input";
import {
  TextField,
  Select,
  InputLabel,
  FormControl,
  MenuItem,
  OutlinedInput,
  FilledInput,
  Input,
  FormHelperText,
  NativeSelect,
} from "@mui/material";
import useHttp from "../../hooks/use-http";
import { signup } from "../../lib/api";
import LoadingSpinner from "../../LoadingSpinner/LoadingSpinner";
import CommonSnackbar from "../CommonComp/Snackbar";
import Button from "../CommonComp/UI/Button";
import { IconButton, InputAdornment } from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
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

  const [showPassword, setshowPassword] = React.useState(false);

   const [values, setValues] = React.useState({
     amount: "",
     password: "",
     weight: "",
     weightRange: "",
     showPassword: false,
   });

   const passwordHandleChange = (prop) => (event) => {
     setValues({ ...values, [prop]: event.target.value });
   };

   const handleClickShowPassword = () => {
     setValues({
       ...values,
       showPassword: !values.showPassword,
     });
   };

   const handleMouseDownPassword = (event) => {
     event.preventDefault();
   };
  const fileChangedHandler = (event) => {
    console.log(event.target.files[0]);
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);

    reader.onload = (_event) => {
      // this.msg = "";
      console.log(reader.result);
      // this.url = reader.result;
    };
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
        <FormControl sx={{ m: 1, width: "80%" }} variant="standard">
          <InputLabel htmlFor="standard-adornment-password">
            Password
          </InputLabel>
          <Input
            id="standard-adornment-password"
            type={values.showPassword ? "text" : "password"}
            value={values.password}
            onChange={passwordHandleChange("password")}
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
        </FormControl>
        {/* <Input
          id="standard-basic"
          label="Password"
          type={values.showPassword ? "text" : "password"}
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
         
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
              >
                {values.showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          }
          
        />  */}
        <br />
        <FormControl sx={{ m: 1, minWidth: 267, marginBottom: "20px" }}>
          <InputLabel variant="standard" htmlFor="uncontrolled-native">
            Role
          </InputLabel>
          <NativeSelect defaultValue="Student" onChange={handleChange}>
            <option value="Student">Student</option>
            <option value="Instructor">Instructor</option>
          </NativeSelect>
        </FormControl>
        <br />
        <FormControl sx={{ m: 1, width: "80%" }} variant="standard">
          <InputLabel htmlFor="standard-adornment-password">
            Password
          </InputLabel>
          <Input
            id="standard-adornment-password"
            type="file"
            value={enteredPassword}
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
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
        {/* <TextField
          id="standard-basic"
          label="Name"
          variant="standard"
          value={enteredName}
          type="file"
          onChange={fileChangedHandler}
          onBlur={nameBlurHandler}
          error={nameInputHasError}
          helperText={nameInputHasError ? "Valid email is required!" : " "}
          sx={{ width: "80%" }}
        /> */}
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
