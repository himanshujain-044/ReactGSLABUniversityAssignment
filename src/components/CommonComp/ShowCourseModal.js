import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import useHttp from "../../hooks/use-http";
import classes from "./ShowCourseModal.module.css";
import { getParticularCourses } from "../../lib/api";
import LoadingSpinner from "../../LoadingSpinner/LoadingSpinner";

const style = {
  borderRadius: "18px",
  border: "none",
  textAlign: "center",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 5,
};

const ShowCourseModal = ({ modalRequiredDetail, handleCloseModal }) => {
  const {
    sendRequest,
    status,
    data: response,
    error,
  } = useHttp(getParticularCourses);
  React.useEffect(() => {
    const courseDetailAndToken = { ...modalRequiredDetail };
    delete courseDetailAndToken.isShowModal;
    if (modalRequiredDetail) {
      sendRequest(courseDetailAndToken);
    }
  }, [sendRequest, modalRequiredDetail]);
  if (status === "pending") {
    return <LoadingSpinner />;
  }
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
              <b>Click here to close</b>
            </span>
          </Box>
        </Modal>
      </div>
    )
  );
};
export default ShowCourseModal;
