// import { Button } from "@material-ui/core";
import { TextField } from "@mui/material";
import React, { Fragment } from "react";
import useInput from "../../hooks/use-input";
import { Link, useHistory } from "react-router-dom";
import { login } from "../../lib/api";
import { useContext } from "react";
import AuthContext from "../../store/auth-context";
import classes from "./AddCourse.module.css";
import { styled } from "@mui/material/styles";
import useHttp from "../../hooks/use-http";
import { addCourse } from "../../lib/api";
import Button from "../CommonComp/UI/Button";
import LoadingSpinner from "../../LoadingSpinner/LoadingSpinner";
import CommonSnackbar from "../CommonComp/Snackbar";

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
    value: enteredCourseName,
    isValid: enteredCourseNameIsValid,
    hasError: courseNameInputHasError,
    valueChangeHandler: courseNameChangedHandler,
    inputBlurHandler: courseNameBlurHandler,
    reset: resetCourseNameInput,
  } = useInput((value) => value.trim().length > 0);

  const {
    value: enteredDuration,
    isValid: enteredDurationIsValid,
    hasError: durationInputHasError,
    valueChangeHandler: durationChangedHandler,
    inputBlurHandler: durationBlurHandler,
    reset: resetDurationInput,
  } = useInput((value) => value.trim().length > 0);
  const {
    value: enteredPrerequisites,
    isValid: enteredPrerequisitesIsValid,
    hasError: prerequisitesInputHasError,
    valueChangeHandler: prerequisitesChangedHandler,
    inputBlurHandler: prerequisitesBlurHandler,
    reset: resetPrerequisitesInput,
  } = useInput((value) => value.trim().length > 0);
  let formIsValid = false;
  const { sendRequest, status, data: response, error } = useHttp(addCourse);
  if (
    enteredCourseNameIsValid &&
    enteredDurationIsValid &&
    enteredPrerequisitesIsValid
  ) {
    formIsValid = true;
  }
  const cancelHandler = () => {
    history.push("/instructor");
  };
  const addCourseSubmitHandler = async (event) => {
    event.preventDefault();
    const courseDetailAndToken = {
      courseName: enteredCourseName,
      duration: enteredDuration,
      prerequisites: enteredPrerequisites,
      token: authCtx.token,
    };
    sendRequest(courseDetailAndToken);
    // console.log(enteredEmail, enteredPassword);
    // const { data } = await login({
    //   // email: enteredEmail,
    //   // password: enteredPassword,
    // });
    // console.log(data);
    // authCtx.login({ ...data });
    // console.log(authCtx);
    // if (data.role === "Student") {
    //   history.push("/student");
    // }
    // if (data.role === "Instructor") {
    //   history.push("/instructor");
    // }
    resetCourseNameInput();
    resetDurationInput();
    resetPrerequisitesInput();
  };
  if (status === "pending") {
    return <LoadingSpinner />;
  }
  let snackbar;
  if (status === "completed") {
    snackbar = (
      <CommonSnackbar message={response.message} statusCode={response.status} />
    );
  }
  return (
    <div className={classes.section}>
      <h4>Add your course</h4>
      <form onSubmit={addCourseSubmitHandler}>
        <TextField
          id="standard-basic"
          label="Course name"
          variant="standard"
          required
          value={enteredCourseName}
          onChange={courseNameChangedHandler}
          onBlur={courseNameBlurHandler}
          error={courseNameInputHasError}
          helperText={courseNameInputHasError ? "Atleast provide 1 char" : " "}
        />

        <TextField
          id="standard-basic"
          label="Duration(in Hours)"
          variant="standard"
          required
          value={enteredDuration}
          onChange={durationChangedHandler}
          onBlur={durationBlurHandler}
          error={durationInputHasError}
          helperText={
            durationInputHasError
              ? "Password is required(min len 6 char)!"
              : " "
          }
        />
        <TextField
          id="standard-basic"
          label="Prerequisite"
          variant="standard"
          required
          value={enteredPrerequisites}
          onChange={prerequisitesChangedHandler}
          onBlur={prerequisitesBlurHandler}
          error={prerequisitesInputHasError}
          helperText={
            prerequisitesInputHasError
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
        <Button variant="contained" type="submit" disableRipple>
          Add course
        </Button>
        {/* <Button
          variant="contained"
          type="submit"
          disabled={!formIsValid}
          // sx={{ backgroundColor: "black" }}
        >
          Add course
        </Button> */}
      </form>
      {snackbar}
    </div>
  );
};

export default AddCourse;
