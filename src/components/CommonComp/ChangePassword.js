import React, { useState, useContext, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import AuthContext from "../../store/auth-context";
import LoadingSpinner from "../../LoadingSpinner/LoadingSpinner";
import useInput from "../../hooks/use-input";
import useHttp from "../../hooks/use-http";
import { passwordChange } from "../../lib/api";
import classes from "./ChangePassword.module.css";
import { useHistory } from "react-router";
import CommonSnackbar from "./Snackbar";

const ChangePassword = (props) => {
  let snackbar = "";
  const authCtx = useContext(AuthContext);
  const history = useHistory();
  const [isNewPasswordMatches, setIsNewPasswordMatches] = useState();

  const {
    sendRequest,
    status,
    data: response,
    error,
  } = useHttp(passwordChange);

  useEffect(() => {
    setIsNewPasswordMatches(true);
  }, []);

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

  const changePasswordHandler = (event) => {
    event.preventDefault();
    if (enteredNewPassword !== enteredCofirmNewPassword) {
      setIsNewPasswordMatches(false);
    }
    if (enteredNewPassword === enteredCofirmNewPassword) {
      setIsNewPasswordMatches(true);
      sendRequest({
        oldPassword: enteredOldPassword,
        newPassword: enteredNewPassword,
        confirmNewPassword: enteredCofirmNewPassword,
        token: authCtx.token,
      });
    }
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
