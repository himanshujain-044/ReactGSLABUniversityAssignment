import React, { Fragment, useContext, useEffect } from "react";
import { Button, Menu, MenuItem } from "@material-ui/core";
import AuthContext from "../../store/auth-context";
import { AiOutlinePlus } from "react-icons/ai";
import { FaUserCircle } from "react-icons/fa";
// import HeaderCartButton from "./HeaderCartButton";
import { useHistory } from "react-router";
import bgImg from "../../assets/bgImg.jpg";
import classes from "./Header.module.css";
import { logout } from "../../lib/api";
import { styled } from "@mui/material/styles";
import CourseContext from "../../store/course-details";
// import ShowCourseModal from "../CommonComp/ShowCourseModal";
// import ChangePassword from "../CommonComp/ChangePassword";
// import AuthContext from "../../store/auth-context";
const BootstrapBut = styled(Button)({
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

const Header = (props) => {
  // const {email,name} = JSON.parse(localStorage.getItem())
  // const [isChangePassword, setIsChangePassword] = React.useState();
  // useEffect(() => {
  //   setIsChangePassword(false);
  // }, [setIsChangePassword]);
  // useEffect(() => {}, [isChangePassword]);
  const history = useHistory();
  const authCtx = useContext(AuthContext);
  const courseCtx = useContext(CourseContext);
  const { token, email, name, role, isLoggedIn } = authCtx;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const logoutHandler = async () => {
    setAnchorEl(null);
    const { data } = await logout(token);
    if (data) {
      console.log("logout");
      authCtx.logout();
      history.push("/login");
    }
  };
  const addCourseHandler = () => {
    history.push("/add-new-course");
    // courseCtx.formValue("add-course");
  };
  // let isChangePassword = false;
  const changePasswordHandler = () => {
    // console.log("Print");
    // isChangePassword = true;
    // setIsChangePassword(true);
    // courseCtx.formValue("change-password");
    history.push("/change-password");
  };
  // const ch = () => setIsChangePassword(false);
  return (
    <Fragment>
        <header className={classes.header}>
        <h1 className={isLoggedIn ? classes.heading : classes.headingNotLogin}>
          {isLoggedIn ? "" : "Welcome to "}GSLab University
        </h1>

        {token && (
          <div className={classes.headerBtn}>
            <div className={classes.logoutIcon}>
              {role === "Instructor" && (
                <BootstrapBut
                  variant="contained"
                  size="small"
                  className={classes.button}
                  onClick={addCourseHandler}
                >
                  Add Course
                </BootstrapBut>
              )}
              {role === "Student" && (
                <Button
                  variant="contained"
                  size="small"
                  // style={{ color: "black", backgroundColor: "white" }}
                  className={classes.button}
                >
                  All Courses
                </Button>
              )}
            </div>

            <div className={classes.logoutIcon}>
              <FaUserCircle
                id="basic-button"
                aria-controls="basic-menu"
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
              />
            </div>

            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem>
                Name:<b>{name}</b>
              </MenuItem>
              <MenuItem>
                Email:<b>{email}</b>
              </MenuItem>
              <MenuItem onClick={changePasswordHandler}>
                Change passowrd
              </MenuItem>
              <MenuItem onClick={logoutHandler}>Logout</MenuItem>
            </Menu>
          </div>
        )}
      </header>
    </Fragment>
  );
};

export default Header;
