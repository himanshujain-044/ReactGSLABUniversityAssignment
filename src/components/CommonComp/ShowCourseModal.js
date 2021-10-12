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
  // bgcolor: "background.paper",
  width: "300px",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 5,
};

const ShowCourseModal = ({ modalRequiredDetail, handleCloseModal }) => {
  const { sendRequest, status, data: response } = useHttp(getParticularCourses);
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
              <img
                src={response.courseImg}
                width="100px"
                height="100px"
                alt={response.courseName}
              />
              <h3> {response.courseName}</h3>
            </Typography>

            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              {/* <b>Duration-</b>
              {response.duration}
              &nbsp; &nbsp;
              <b>Prereqisites-</b>
              {response.prerequisites}
              <p>
                <b>No. of students enrolled-</b>
                {response.numberOfStuEnrolled}
              </p> */}
              {/* <div
                style={{
                  textAlign: "center",
                  alignItems: "center",
                  border: "1px solid black",
                }}
              > */}
              <table
                style={{
                  width: "100%",
                  marginLeft: "auto",
                  marginRright: "auto",
                  border: "1px solid black",
                }}
              >
                <tr>
                  <th
                    style={{
                      backgroundColor: "black",
                      color: "white",
                    }}
                  >
                    Duration:
                  </th>
                  <td>{response.duration}</td>
                </tr>
                <tr>
                  <th
                    style={{
                      backgroundColor: "black",
                      color: "white",
                    }}
                  >
                    Prereqisites:
                  </th>
                  <td> {response.prerequisites}</td>
                </tr>
                <tr>
                  <th
                    style={{
                      backgroundColor: "black",
                      color: "white",
                    }}
                  >
                    students enrolled:
                  </th>
                  <td> {response.numberOfStuEnrolled}</td>
                </tr>
              </table>
              {/* </div> */}
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
              <Typography id="modal-modal-description" sx={{ mt: 3 }}>
                <table
                  style={{
                    width: "100%",
                    marginLeft: "auto",
                    marginRright: "auto",
                    border: "1px solid black",
                  }}
                >
                  <tr>
                    <th
                      style={{
                        backgroundColor: "black",
                        color: "white",
                      }}
                    >
                      Name:
                    </th>
                    <td>{response.instructorName}</td>
                  </tr>
                  <tr>
                    <th
                      style={{
                        backgroundColor: "black",
                        color: "white",
                      }}
                    >
                      Email:
                    </th>
                    <td>{response.createdBy}</td>
                  </tr>
                  <tr>
                    <th
                      style={{
                        backgroundColor: "black",
                        color: "white",
                      }}
                    >
                      Telephone:
                    </th>
                    <td>555 77 855</td>
                  </tr>
                </table>
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
