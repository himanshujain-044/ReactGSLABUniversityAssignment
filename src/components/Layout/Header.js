import React, { Fragment, useContext } from "react";
import { Menu, MenuItem, Button } from "@material-ui/core";
import AuthContext from "../../store/auth-context";
import { FaUserCircle } from "react-icons/fa";
import { useHistory, useLocation } from "react-router";
import classes from "./Header.module.css";
import { logout } from "../../lib/api";
import dummyUser from "../../assets/dummyUser.png";


const Header = (props) => {
  const history = useHistory();
  const location = useLocation();
  const authCtx = useContext(AuthContext);
  let { token, email, name, role, isLoggedIn, profile } = authCtx;
  if (!profile) {
    profile = dummyUser;
  }
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
  const myCourseChangeHandler = () => {
    history.push("/student");
  };

  const addCourseHandler = () => {
    history.push("/add-new-course");
  };

  const getAllCourseHandler = () => {
    history.push("/all-course");
  };

  const changePasswordHandler = () => {
    setAnchorEl(null);
    history.push("/change-password");
  };

  return (
    <Fragment>
      <header className={classes.header}>
        <h1 className={isLoggedIn ? classes.heading : classes.headingNotLogin}>
          {isLoggedIn ? "" : "Welcome to "}GSLab University
        </h1>

        {token && (
          <div className={classes.headerBtn}>
            {role === "Instructor" && (
              <Button
                variant="contained"
                size="small"
                style={{
                  color: "black",
                  backgroundColor: "white",
                  fontFamily: "sans-serif",
                }}
                className={classes.addCourseBtn}
                onClick={addCourseHandler}
              >
                Add Course
              </Button>
            )}
            {role === "Student" &&
              (location.pathname === "/student" ||
                location.pathname === "/change-password") && (
                <Button
                  variant="contained"
                  size="small"
                  onClick={getAllCourseHandler}
                  style={{ color: "black", backgroundColor: "white" }}
                >
                  All Courses
                </Button>
              )}
            {role === "Student" && location.pathname === "/all-course" && (
              <Button
                variant="contained"
                size="small"
                onClick={myCourseChangeHandler}
                style={{ color: "black", backgroundColor: "white" }}
              >
                My courses
              </Button>
            )}
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
                <div className={classes.profile}>
                  <img
                    src={profile}
                    width="100px"
                    height="100px"
                    alt="BigCo Inc. logo"
                  />
                </div>
              </MenuItem>
              <MenuItem>
                Name:<b>{name}</b>
              </MenuItem>
              <MenuItem>
                Email:<b>{email}</b>
              </MenuItem>
              <MenuItem onClick={changePasswordHandler}>
                Change password
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
