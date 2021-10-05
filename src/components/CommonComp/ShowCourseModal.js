import * as React from "react";
import Box from "@mui/material/Box";
// import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import CourseContext from "../../store/course-details";
import AuthContext from "../../store/auth-context";
import { useContext } from "react";
import { TextField, Button } from "@mui/material";
// import { ClassNames } from "@emotion/react";
import useHttp from "../../hooks/use-http";
import useInput from "../../hooks/use-input";
import classes from "./ShowCourseModal.module.css";
import { passwordChange } from "../../lib/api";
// import ChangePassword from "./ChangePassword";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  //   alignItems:"center",
  //   justifyContent: "center",
  //   borderRadius: "18px",
  border: "none",
  transform: "translate(-50%, -50%)",
  width: 350,
  bgcolor: "white",
  //   border: "none",
  //   boxShadow: 24,
  p: 4,
};

const ShowCourseModal = (props) => {
  // const [oldPassword, setOldPassword] = React.useState("");
  // const [newPassword, setNewPassword] = React.useState("");
  const courseCtx = useContext(CourseContext);
  const authCtx = useContext(AuthContext);
  const [isNewPasswordMatches, setIsNewPasswordMatches] = React.useState(true);
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
  //   const [open, setOpen] = React.useState(courseCtx.showCourseModal);
  //   const handleOpen = () => setOpen(true);
  const handleClose = () => {
    // console.log(courseCtx.showCourseModal);
    courseCtx.toggleShowCourse(false);
  };
  //   let isNewPas <form onSubmit={changePasswordHandler}>swordMatches = true;
  const changePasswordHandler = () => {
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
    console.log(response);
  };
  const isPasswordChange = true;
  let passwordChangeContent = "";
  if (isPasswordChange) {
    passwordChangeContent = (
      <div className={classes.passwordForm}>
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
              oldPasswordInputHasError
                ? "Length should be more than 8 char"
                : " "
            }
          />
          <TextField
            id="standard-basic"
            label="New password"
            variant="standard"
            value={enteredNewPassword}
            onChange={newPasswordChangedHandler}
            onBlur={newPasswordBlurHandler}
            error={newPasswordInputHasError}
            helperText={
              newPasswordInputHasError
                ? "Length should be more than 8 char"
                : " "
            }
          />
          <TextField
            id="standard-basic"
            label="Confirm new password"
            variant="standard"
            value={enteredCofirmNewPassword}
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
            <p className={classes.passowrdNotMatches}>
              New password does not match with confirm new password !
            </p>
          )}
          <div>
            <Button onClick={handleClose}>Cancel</Button>

            <Button type="submit">Change password</Button>
          </div>
        </form>
      </div>
    );
  }
  //   console.log(props);
  return (
    <div>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <Modal
        open={courseCtx.showCourseModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {!isPasswordChange && (
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Text in a modal
            </Typography>
          )}
          {!isPasswordChange && (
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            </Typography>
          )}
          {passwordChangeContent}
        </Box>
      </Modal>
    </div>
  );
};
export default ShowCourseModal;

// import React from "react";
// import { Modal } from "@material-ui/core";
// const rows = [
//   { courseName: "Nodejs", enrolled: 3, id: 1 },
//   { courseName: "HTML/CSS", enrolled: 2, id: 2 },
//   { courseName: "React", enrolled: 13, id: 3 },
//   { courseName: "Nodejs", enrolled: 3, id: 4 },
//   { courseName: "HTML/CSS", enrolled: 2, id: 5 },
//   { courseName: "React", enrolled: 13, id: 6 },
//   { courseName: "Nodejs", enrolled: 3, id: 7 },
//   { courseName: "HTML/CSS", enrolled: 2, id: 8 },
//   { courseName: "React", enrolled: 13, id: 9 },
//   { courseName: "Nodejs", enrolled: 3, id: 10 },
//   { courseName: "HTML/CSS", enrolled: 2, id: 11 },
//   { courseName: "React", enrolled: 13, id: 12 },
//   { courseName: "Nodejs", enrolled: 3, id: 13 },
//   { courseName: "HTML/CSS", enrolled: 2, id: 14 },
//   { courseName: "React", enrolled: 13, id: 15 },
//   { courseName: "Nodejs", enrolled: 3, id: 16 },
//   { courseName: "HTML/CSS", enrolled: 2, id: 17 },
//   { courseName: "React", enrolled: 13, id: 18 },
// ];
// const ShowCourseModal = (props) => {
//   const [open, setOpen] = React.useState(true);
// //   const handleOpen = () => setOpen(true);
//   const handleClose = () => setOpen(false);
// //   const courseDetail = rows.find((course) => {
// //     return course.id === 2;
// //   });

// //   console.log(courseDetail);
//   return (
//     <Modal
//       open={open}
//       onClose={handleClose}
//       aria-labelledby="modal-modal-title"
//       aria-describedby="modal-modal-description"
//     >
//       Helllo
//     </Modal>
//   );
// };

// export default ShowCourseModal;
