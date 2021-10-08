import React, { useEffect, useContext, Fragment } from "react";
import CommonTable from "../CommonComp/CommonTable";
import useHttp from "../../hooks/use-http";
import { getAllCourses } from "../../lib/api";
import AuthContext from "../../store/auth-context";
import LoadingSpinner from "../../LoadingSpinner/LoadingSpinner";

const AllCourses = (props) => {
  const authCtx = useContext(AuthContext);
  const {
    sendRequest,
    status,
    data: response,
    error,
  } = useHttp(getAllCourses, true);
  useEffect(() => {
    const userData = {
      token: authCtx.token,
      email: authCtx.email,
    };
    sendRequest(userData);
  }, [sendRequest, authCtx.token, authCtx.email]);

  console.log(response);
  if (status === "pending") {
    <LoadingSpinner />;
  }

  let tableColumns = [
    { id: "Coursename", label: "Course Name" },
    { id: "courseImg", label: "Course image" },
    { id: "Enrollbtn", label: "Enrolled" },
  ];
  return (
    <Fragment>
      <h1>All courses</h1>
      <hr style={{ width: "100px", marginBottom: "10px" }} />
      {status === "completed" && response === "No courses available" && (
        <p>No course available now</p>
      )}
      {status === "completed" && (
        <CommonTable tableColumns={tableColumns} tableRows={response} />
      )}
    </Fragment>
  );
};
export default AllCourses;
