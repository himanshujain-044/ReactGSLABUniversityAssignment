import React, { Fragment } from "react";
import useInput from "../../hooks/use-input";
import {
  TextField,
  InputLabel,
  FormControl,
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
import { PhotoCamera, Visibility, VisibilityOff } from "@material-ui/icons";
const SignupForm = (props) => {
  let formIsValid = false;
  let snackbar = "";
  const [role, setRole] = React.useState("Student");
  const [profile, setProfile] = React.useState();
  const [profileName, setProfileName] = React.useState();

  const { sendRequest, status, data: response, error } = useHttp(signup);

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

  if (enteredPasswordIsValid && enteredEmailIsValid && enteredNameIsValid) {
    formIsValid = true;
  }
  const signupSubmitHandler = (event) => {
    event.preventDefault();
    const data = {
      name: enteredName,
      email: enteredEmail,
      password: enteredPassword,
      role: role,
      profile: profile,
    };
    console.log(data);
    sendRequest(data);
    setRole("Student");
    resetEmailInput();
    resetPasswordInput();
    resetNameInput();
    setProfile("");
  };

  const handleChange = (event) => {
    setRole(event.target.value);
  };

  const [values, setValues] = React.useState({
    showPassword: false,
  });
  const handleClickShowPassword = () => {
    setValues({
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const fileChangedHandler = (event) => {
    setProfileName(event.target.files[0].name);
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);

    reader.onload = (_event) => {
      console.log(reader.result);
      setProfile(reader.result);
    };
  };
  if (status === "pending") {
    return <LoadingSpinner />;
  }

  if (status === "completed") {
    console.log(response);
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
          required
          value={enteredName}
          onChange={nameChangedHandler}
          onBlur={nameBlurHandler}
          error={nameInputHasError}
          helperText={nameInputHasError ? "Please provide a valid name" : " "}
          sx={{ width: "80%" }}
        />
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
          sx={{ width: "80%" }}
        />
        <FormControl sx={{ m: 1, width: "80%" }} variant="standard">
          <InputLabel htmlFor="standard-adornment-password">
            Password
          </InputLabel>
          <Input
            id="standard-adornment-password"
            required
            type={values.showPassword ? "text" : "password"}
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

        <br />
        <br />

        <FormControl sx={{ m: 1, width: "80%", marginBottom: "20px" }}>
          <InputLabel variant="standard" htmlFor="uncontrolled-native">
            Role
          </InputLabel>
          <NativeSelect defaultValue="Student" onChange={handleChange}>
            <option value="Student">Student</option>
            <option value="Instructor">Instructor</option>
          </NativeSelect>
        </FormControl>
        <br />

        <input
          accept="image/*"
          style={{ display: "none" }}
          id="icon-button-file"
          type="file"
          onChange={fileChangedHandler}
        />
        <label htmlFor="icon-button-file">
          Click here to upload profile
          <IconButton component="span">
            <PhotoCamera />
          </IconButton>
          {profileName && <span>{profileName}</span>}
        </label>
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
    </Fragment>
  );
};

export default SignupForm;
