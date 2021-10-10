import React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import ShowCourseModal from "./ShowCourseModal";
import { useContext } from "react";
import useHttp from "../../hooks/use-http";
import AuthContext from "../../store/auth-context";
import { enrollUserCourse, getAllCourses } from "../../lib/api";
import Button from "../CommonComp/UI/Button";
import CommonSnackbar from "./Snackbar";
import classes from "./CommonTable.module.css";

const CommonTable = (props) => {
  let snackbar = "";
  let rows = props.tableRows;
  let columns = props.tableColumns;
  const authCtx = useContext(AuthContext);
  const [page, setPage] = React.useState(0);
  const [latestUpdatedCourses, setLatestUpdatedCourses] = React.useState(false);
  const [modalRequiredDetail, setModalRequiredDetail] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  let {
    sendRequest: enrollUserCourseReq,
    status: enrollStatus,
    data: enrollResponse,
  
  } = useHttp(enrollUserCourse);

  let {
    sendRequest: getAllCoursesReq,
    status: allCourseStatus,
    data: allCourseresponse,
    error: allCourseError,
  } = useHttp(getAllCourses, true);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const enrollCourseHandler = (courseDetail) => {
    const courseDetailAndToken = {
      ...courseDetail,
      token: authCtx.token,
    };
    delete courseDetailAndToken.index;
    setLatestUpdatedCourses(true);
    enrollUserCourseReq(courseDetailAndToken);
  };

  if (enrollStatus === "completed" && latestUpdatedCourses) {
    setLatestUpdatedCourses(false);
    getAllCoursesReq({ token: authCtx.token, email: authCtx.email });
  }
  if (allCourseStatus === "completed" && enrollStatus === "completed") {
    rows = allCourseresponse;
    snackbar = (
      <CommonSnackbar
        message={enrollResponse.message}
        statusCode={enrollResponse.status}
      />
    );
  }
  const showCourseHandler = (courseDetail) => {
    setModalRequiredDetail({
      isShowModal: true,
      token: authCtx.token,
      createdBy: courseDetail.email,
      courseName: courseDetail.courseName,
    });
  };
  return (
    <Paper
      sx={{
        width: "98%",
        overflow: "hidden",
        marginRight: "10px",
        marginLeft: "3px",
      }}
    >
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  style={{ backgroundColor: "black", color: "white" }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={row.id}
                    data-msg="Hello"
                  >
                    {columns.map((column) => {
                      const value = row[column.id];
                      if (column.id === "courseImg") {
                        console.log("columnid");
                        return (
                          <TableCell
                            key={column.id}
                            onClick={() => {
                              if (column.id === "Coursename") {
                                showCourseHandler({
                                  email: row.createdByEmail,
                                  courseName: row.Coursename,
                                });
                              }
                            }}
                          >
                            <div className={classes.courseImg}>
                              <img
                                src={value}
                                width="100px"
                                height="100px"
                                alt="BigCo Inc. logo"
                              />
                            </div>
                          </TableCell>
                        );
                      } else if (column.id !== "Enrollbtn") {
                        return (
                          <TableCell
                            key={column.id}
                            onClick={() => {
                              if (column.id === "Coursename") {
                                showCourseHandler({
                                  email: row.createdByEmail,
                                  courseName: row.Coursename,
                                });
                              }
                            }}
                          >
                            <span className={classes.courseName}> {value}</span>
                          </TableCell>
                        );
                      } else {
                        return (
                          <TableCell
                            key={column.id}
                            onClick={() => {
                              enrollCourseHandler({
                                email: row.createdByEmail,
                                courseName: row.Coursename,
                                index,
                              });
                            }}
                          >
                            <Button disabled={value}>Enroll</Button>
                          </TableCell>
                        );
                      }
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      <ShowCourseModal
        modalRequiredDetail={modalRequiredDetail}
        handleCloseModal={() => setModalRequiredDetail(false)}
      />

      {snackbar}
    </Paper>
  );
};
export default CommonTable;
