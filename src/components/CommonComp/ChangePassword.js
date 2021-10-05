import React, { useState, useContext, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
// import CourseContext from "../../store/course-details";
import AuthContext from "../../store/auth-context";
// import {} from "react";
import LoadingSpinner from "../../LoadingSpinner/LoadingSpinner";
import useInput from "../../hooks/use-input";
import useHttp from "../../hooks/use-http";
import { passwordChange } from "../../lib/api";
import classes from "./ChangePassword.module.css";
import { useHistory } from "react-router";
import CommonSnackbar from "./Snackbar";

const ChangePassword = (props) => {
  const [isNewPasswordMatches, setIsNewPasswordMatches] = useState();
  let snackbar = "";
  useEffect(() => {
    setIsNewPasswordMatches(true);
  }, []);
  const authCtx = useContext(AuthContext);
  const history = useHistory();
  console.log("chnagepassowrdinside");
  const {
    value: enteredOldPassword,
    isValid: enteredOldPasswordIsValid,
    hasError: oldPasswordInputHasError,
    valueChangeHandler: oldPasswordChangedHandler,
    inputBlurHandler: oldPasswordBlurHandler,
    reset: resetOldPasswordInput,
  } = useInput((value) => value.trim().length > 8);
  const {
    value: enteredNewPassword,
    isValid: enteredNewPasswordIsValid,
    hasError: newPasswordInputHasError,
    valueChangeHandler: newPasswordChangedHandler,
    inputBlurHandler: newPasswordBlurHandler,
    reset: resetNewPasswordInput,
  } = useInput((value) => value.trim().length > 8);
  const {
    value: enteredCofirmNewPassword,
    isValid: enteredConfirmNewPasswordIsValid,
    hasError: confirmNewPasswordInputHasError,
    valueChangeHandler: confirmNewPasswordChangedHandler,
    inputBlurHandler: confirmNewPasswordBlurHandler,
    reset: resetConfirmNewPasswordInput,
  } = useInput((value) => value.trim().length > 8);

  const {
    sendRequest,
    status,
    data: response,
    error,
  } = useHttp(passwordChange);
  const changePasswordHandler = (event) => {
    event.preventDefault();
    if (enteredNewPassword !== enteredCofirmNewPassword) {
      setIsNewPasswordMatches(false);
    }
    console.log("Changepaswoerd");
    sendRequest({
      oldPassword: enteredOldPassword,
      newPassword: enteredNewPassword,
      confirmNewPassword: enteredCofirmNewPassword,
      token: authCtx.token,
    });
    // console.log("isndie",response);
  };
  if (status === "pending") {
    return <LoadingSpinner />;
  }
  if (status === "completed") {
    if (status === "completed") {
      snackbar = (
        <CommonSnackbar
          message={response.message}
          statusCode={response.status}
        />
      );
    }
  }
  return (
    <div className={classes.section}>
      <h4>Change your password</h4>
      <form onSubmit={changePasswordHandler}>
        <TextField
          id="standard-basic"
          label="Old password"
          variant="standard"
          value={enteredOldPassword}
          onChange={oldPasswordChangedHandler}
          onBlur={oldPasswordBlurHandler}
          error={oldPasswordInputHasError}
          required
          helperText={
            oldPasswordInputHasError ? "Length should be more than 8 char" : " "
          }
        />
        <TextField
          id="standard-basic"
          label="New password"
          variant="standard"
          value={enteredNewPassword}
          required
          onChange={newPasswordChangedHandler}
          onBlur={newPasswordBlurHandler}
          error={newPasswordInputHasError}
          helperText={
            newPasswordInputHasError ? "Length should be more than 8 char" : " "
          }
        />
        <TextField
          id="standard-basic"
          label="Confirm new password"
          variant="standard"
          value={enteredCofirmNewPassword}
          required
          onChange={confirmNewPasswordChangedHandler}
          onBlur={confirmNewPasswordBlurHandler}
          error={confirmNewPasswordInputHasError}
          helperText={
            confirmNewPasswordInputHasError
              ? "Length should be more than 8 char"
              : " "
          }
        />
        <br />
        {!isNewPasswordMatches && (
          <p className={classes.passwordNotMatches}>
            New password does not match with confirm new password !
          </p>
        )}
        <div>
          <Button onClick={history.goBack}>Cancel</Button>

          <Button type="submit">Change password</Button>
        </div>
      </form>
      {snackbar}
    </div>
  );
};

export default ChangePassword;
