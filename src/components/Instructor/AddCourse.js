// import { Button } from "@material-ui/core";
import { TextField } from "@mui/material";
import React from "react";
import useInput from "../../hooks/use-input";
import { useContext } from "react";
import { useHistory } from "react-router-dom";
import AuthContext from "../../store/auth-context";
import classes from "./AddCourse.module.css";
import useHttp from "../../hooks/use-http";
import { addCourse } from "../../lib/api";
import Button from "../CommonComp/UI/Button";
import LoadingSpinner from "../../LoadingSpinner/LoadingSpinner";
import CommonSnackbar from "../CommonComp/Snackbar";
import { IconButton } from "@material-ui/core";
import { PhotoCamera } from "@material-ui/icons";

const AddCourse = () => {
  const authCtx = useContext(AuthContext);
  const history = useHistory();
  const [courseImg, setCourseImg] = React.useState();
  const [courseImgName, setCourseImgName] = React.useState();

  const { sendRequest, status, data: response, error } = useHttp(addCourse);

  const {
    value: enteredCourseName,
   
    hasError: courseNameInputHasError,
    valueChangeHandler: courseNameChangedHandler,
    inputBlurHandler: courseNameBlurHandler,
    reset: resetCourseNameInput,
  } = useInput((value) => value.trim().length > 0);

  const {
    value: enteredDuration,
    
    hasError: durationInputHasError,
    valueChangeHandler: durationChangedHandler,
    inputBlurHandler: durationBlurHandler,
    reset: resetDurationInput,
  } = useInput((value) => value.trim().length > 0);

  const {
    value: enteredPrerequisites,
  
    hasError: prerequisitesInputHasError,
    valueChangeHandler: prerequisitesChangedHandler,
    inputBlurHandler: prerequisitesBlurHandler,
    reset: resetPrerequisitesInput,
  } = useInput((value) => value.trim().length > 0);

  const cancelHandler = () => {
    history.push("/instructor");
  };
  const fileChangedHandler = (event) => {
    setCourseImgName(event.target.files[0].name);
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);

    reader.onload = (_event) => {
      setCourseImg(reader.result);
    };
  };

  const addCourseSubmitHandler = async (event) => {
    event.preventDefault();
    const courseDetailAndToken = {
      courseName: enteredCourseName,
      duration: enteredDuration,
      prerequisites: enteredPrerequisites,
      courseImg: courseImg,
      token: authCtx.token,
    };
    sendRequest(courseDetailAndToken);
    resetCourseNameInput();
    resetDurationInput();
    resetPrerequisitesInput();
  };
  if (status === "pending") {
    return <LoadingSpinner />;
  }
  let snackbar;
  if (status === "completed" && !error) {
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
        <input
          accept="image/*"
          style={{ display: "none" }}
          id="icon-button-file"
          type="file"
          onChange={fileChangedHandler}
        />
        <label htmlFor="icon-button-file">
          Upload course image
          <IconButton component="span">
            <PhotoCamera />
          </IconButton>
          {courseImgName && <span>{courseImgName}</span>}
        </label>

        <br />
        <br />

        <span className={classes.span} onClick={cancelHandler}>
          Cancel
        </span>

        <Button variant="contained" type="submit" disableRipple>
          Add course
        </Button>
      </form>
      {snackbar}
    </div>
  );
};

export default AddCourse;
