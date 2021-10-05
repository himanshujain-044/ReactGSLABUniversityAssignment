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
const columns = [
  { id: "courseName", label: "Cournsename" },
  { id: "enrolled", label: "Enrolled" },
];

// function createData(name, code, population, size) {
//   const density = population / size;
//   return { name, code, population, size, density };
// }

const rows = [
  { courseName: "Nodejs", enrolled: 3, id: 1 },
  { courseName: "HTML/CSS", enrolled: 2, id: 2 },
  { courseName: "React", enrolled: 13, id: 3 },
  { courseName: "Nodejs", enrolled: 3, id: 4 },
  { courseName: "HTML/CSS", enrolled: 2, id: 5 },
  { courseName: "React", enrolled: 13, id: 6 },
  { courseName: "Nodejs", enrolled: 3, id: 7 },
  { courseName: "HTML/CSS", enrolled: 2, id: 8 },
  { courseName: "React", enrolled: 13, id: 9 },
  { courseName: "Nodejs", enrolled: 3, id: 10 },
  { courseName: "HTML/CSS", enrolled: 2, id: 11 },
  { courseName: "React", enrolled: 13, id: 12 },
  { courseName: "Nodejs", enrolled: 3, id: 13 },
  { courseName: "HTML/CSS", enrolled: 2, id: 14 },
  { courseName: "React", enrolled: 13, id: 15 },
  { courseName: "Nodejs", enrolled: 3, id: 16 },
  { courseName: "HTML/CSS", enrolled: 2, id: 17 },
  { courseName: "React", enrolled: 13, id: 18 },
];

const CommonTable = (props) => {
  const courseCtx = useContext(CourseContext);
  const history = useHistory();
  const [show, setShow] = React.useState(false);
  const [page, setPage] = React.useState(0);
  const [isShowModal, setIsShowModal] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const showCourseHandler = (id) => {
    setIsShowModal(true);
    // console.log(courseCtx.showCourseModal)
    courseCtx.toggleShowCourse(true);
    // return <ShowCourseModal id={id} />;
    // console.log(id);
    // console.log(event.target.dataset);
    // console.log(event.target.value);
    // history.push("/show-course-detail-modal");
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
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
              .map((row) => {
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={row.id}
                    data-msg="Hello"
                    onClick={showCourseHandler}
                  >
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        // <ShowCourseModal>{value}</ShowCourseModal>
                        <TableCell
                          key={column.id}
                          onClick={() => {
                            showCourseHandler(row.id);
                          }}
                        >
                          {value}
                          {show && <ShowCourseModal id={row.id} />}
                        </TableCell>
                      );
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
      {isShowModal && <ShowCourseModal />}
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
