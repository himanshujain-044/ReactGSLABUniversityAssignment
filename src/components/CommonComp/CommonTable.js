import React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { useHistory } from "react-router-dom";
import ShowCourseModal from "./ShowCourseModal";
import CourseContext from "../../store/course-details";
import { useContext } from "react";
import useHttp from "../../hooks/use-http";
import AuthContext from "../../store/auth-context";
import { enrollUserCourse, getAllCourses } from "../../lib/api";
import { findAllByDisplayValue } from "@testing-library/react";
import Button from "../CommonComp/UI/Button";
import CommonSnackbar from "./Snackbar";

const CommonTable = (props) => {
  let rows = props.tableRows;
  let columns = props.tableColumns;
  const token = useContext(AuthContext).token;
  const {
    sendRequest: enrollUserCourseReq,
    status: enrollStatus,
    data: enrollResponse,
    error: enrollError,
  } = useHttp(enrollUserCourse);
  const {
    sendRequest: getAllCoursesReq,
    status: allCourseStatus,
    data: allCourseresponse,
    error: allCourseError,
  } = useHttp(getAllCourses, true);
  const authCtx = useContext(AuthContext);

  const courseCtx = useContext(CourseContext);
  // const history = useHistory();
  // const [show, setShow] = React.useState(false);
  const [page, setPage] = React.useState(0);
  const [latestUpdatedCourses, setLatestUpdatedCourses] = React.useState(false);
  // const [courseDetailAndToken, setCourseDetailAndToken] = React.useState(null);
  const [modalRequiredDetail, setModalRequiredDetail] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  // console.log("insideta", props.tableRows);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  // let va = false;
  const enrollCourseHandler = (courseDetail) => {
    // index = courseDetail.index;
    const courseDetailAndToken = {
      ...courseDetail,
      token: authCtx.token,
    };
    delete courseDetailAndToken.index;
    setLatestUpdatedCourses(true);
    enrollUserCourseReq(courseDetailAndToken);
  };
  let snackbar = "";
  if (enrollStatus === "completed" && latestUpdatedCourses) {
    console.log("Yes it hs been competed");
    setLatestUpdatedCourses(false);
    getAllCoursesReq({ token: authCtx.token, email: authCtx.email });
  }
  if (allCourseStatus === "completed") {
    rows = allCourseresponse;
    snackbar = (
      <CommonSnackbar
        message={enrollResponse.message}
        statusCode={enrollResponse.status}
      />
    );
    console.log("Courseecomplete", allCourseresponse);
  }
  // if (status === "completed") {
  //   if (response.data === "Course enrolled successfully") {
  //     // rows[index]["Enrollbtn"] = true;
  //     console.log(rows[index]);
  //   }
  //   console.log(response);
  // }
  const showCourseHandler = (courseDetail) => {
    // courseDetail.token = authCtx.token;
    // console.log(courseDetail)
    // setCourseDetailAndToken({
    //   token: authCtx.token,
    //   createdBy: courseDetail.email,
    //   courseName: courseDetail.courseName,
    // });
    setModalRequiredDetail({
      isShowModal: true,
      token: authCtx.token,
      createdBy: courseDetail.email,
      courseName: courseDetail.courseName,
    });
    // courseCtx.toggleShowCourse(true);
  };
  // if (courseDetailAndToken && !isShowModal) {
  //   console.log("inside", isShowModal);
  //   console.log("indise", courseDetailAndToken);
  //   setIsShowModal(true);
  // }
  // console.log(courseDetailAndToken);
  return (
    <Paper
      sx={{
        width: "98%",
        overflow: "hidden",
        marginRight: "10px",
        marginLeft: "3px",
      }}
    >
      {/* <button  onClick={showCourseHandler}>
        Clcik me
      </button> */}
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
                    // onClick={showCourseHandler}
                  >
                    {columns.map((column) => {
                      const value = row[column.id];
                      if (column.id !== "Enrollbtn") {
                        return (
                          // <ShowCourseModal>{value}</ShowCourseModal>
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
                            {value}
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
// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableCell from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import TableRow from "@mui/material/TableRow";
// import Paper from "@mui/material/Paper";
// import classes from "./CommonTable.module.css";

// // function createData(Cou, calories, fat, carbs, protein) {
// //   return { name, calories, fat, carbs, protein };
// // }

// const rows = [
//   { courseName: "Nodejs", enrolled: 3, id: 1 },
//   { courseName: "HTML/CSS", enrolled: 2, id: 2 },
//   { courseName: "React", enrolled: 13, id: 3 },
// ];

// const CommonTable = (props) => {
//   const tableRow = [
//     { columnName: "Coursename", id: 1 },
//     { columnName: "Enrolled", id: 2 },
//   ];

//   return (
//     <TableContainer component={Paper}>
//       <Table aria-label="simple table" className={classes.Table}>
//         <TableHead>
//           Coursee Table
//           <TableRow className={classes.TableRow}>
//             {/* {tableRow.map((row) => (
//               <TableCell className={classes.TableCell} key={row.id}>
//                 {row.columnName}
//               </TableCell>
//             ))} */}
//             <TableCell className={classes.TableCell}>"course"</TableCell>
//             <TableCell className={classes.TableCell}>"entroled"</TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {rows.map((row) => (
//             <TableRow
//               key={row.id}
//               sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
//             >
//               <TableCell component="th" scope="row">
//                 {row.courseName}
//               </TableCell>
//               <TableCell align="right">{row.enrolled}</TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </TableContainer>
//   );
// };
// export default CommonTable;
