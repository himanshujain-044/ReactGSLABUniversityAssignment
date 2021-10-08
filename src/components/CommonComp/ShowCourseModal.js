import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import CourseContext from "../../store/course-details";
import AuthContext from "../../store/auth-context";
import { useContext } from "react";
import { TextField, Button } from "@mui/material";
import useHttp from "../../hooks/use-http";
import useInput from "../../hooks/use-input";
import classes from "./ShowCourseModal.module.css";
import { passwordChange } from "../../lib/api";

import { getParticularCourses } from "../../lib/api";

import LoadingSpinner from "../../LoadingSpinner/LoadingSpinner";

const style = {
  //   position: "absolute",
  //   top: "50%",
  //   left: "50%",
  //   alignItems: "center",
  //   justifyContent: "center",
  borderRadius: "18px",
  // m: "20px",
  // p:"20px",
  //   border: "none",
  //   transform: "translate(-50%, -50%)",
  //   width: 350,
  //   bgcolor: "white",
  border: "none",
  //   boxShadow: 24,
  //   p: 4,
  textAlign: "center",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 250,
  bgcolor: "background.paper",
  //   border: "2px solid #000",
  boxShadow: 24,
  p: 5,
  // m: 5,
};

const ShowCourseModal = ({ modalRequiredDetail, handleCloseModal }) => {
  // console.log(isModalOpened, handleCloseModal, courseDetailAndToken);
  const token = useContext(AuthContext).token;
  //   courseDetail.token = token;
  const {
    sendRequest,
    status,
    data: response,
    error,
  } = useHttp(getParticularCourses);
  const [courseDetail, setCourseDetail] = React.useState({ courseName: "" });
  React.useEffect(() => {
    const courseDetailAndToken = { ...modalRequiredDetail };
    delete courseDetailAndToken.isShowModal;
    console.log("Hii");
    if (modalRequiredDetail) {
      sendRequest(courseDetailAndToken);
    }
  }, [sendRequest, modalRequiredDetail]);
  // console.log(courseDetailAndToken);
  //   if (courseDetailAndToken) {
  //     console.log("hii");
  //     sendRequest(courseDetailAndToken);
  //   }
  // console.log("nrw", courseDetailAndToken);
  // console.log(status);

  // if (status === "completed" && response === "No courses available") {
  //   return <h4>No corses available</h4>;
  // }
  // let courseDetail = "";
  // React.useEffect(() => {
  //   if (status === "completed") {
  //     // const vs = JSON.parse(response);
  //     // console.log("gu",vs);
  //     // setCourseDetail({ courseName: response.courseName });
  //   }
  // }, [status, response]);
  if (status === "pending") {
    return <LoadingSpinner />;
  }
  // console.log("resposne", response);
  const handleClose = () => {
    handleCloseModal(false);
  };

  return (
    status === "completed" && (
      <div>
        <Modal
          open={modalRequiredDetail.isShowModal}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              <h3> {response.courseName}</h3>
            </Typography>

            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <b>Duration-</b>
              {response.duration}
              &nbsp; &nbsp;
              <b>Prereqisites-</b>
              {response.prerequisites}
              <p>
                <b>No. of students enrolled-</b>
                {response.numberOfStuEnrolled}
              </p>
            </Typography>
            <div
              style={{
                border: "1px solid black",
                borderRadius: "5px",
                marginBottom: "10px",
              }}
            >
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <b>About Author</b>
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <b>Name-</b>
                {response.instructorName}
                &nbsp; &nbsp;
                <b>Email-</b>
                {response.createdBy}
              </Typography>
            </div>
            <span onClick={handleClose} className={classes.closeSpan}>
              Click here to close
            </span>
          </Box>
        </Modal>
      </div>
    )
  );
};
export default ShowCourseModal;
