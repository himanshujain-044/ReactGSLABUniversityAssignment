// import logo from "./logo.svg";
import "./App.css";
import { Route, Link, Switch, Redirect } from "react-router";
import Header from "./components/Layout/Header";
import LoginSignup from "./components/LoginSignupAuth/LoginSignup";
import Student from "./components/Student/Student";
import Instructor from "./components/Instructor/Instructor";
import ShowCourseModal from "./components/CommonComp/ShowCourseModal";
import AuthContext from "./store/auth-context";
import { useContext } from "react";
import AddCourse from "./components/Instructor/AddCourse";
import ChangePassword from "./components/CommonComp/ChangePassword";
// import CommonSnackbar from "./components/CommonComp/Snackbar";
// import ShowCourseModal from "./components/CommonComp/ShowCourseModal";

function App() {
  const authCtx = useContext(AuthContext);
  // console.log(authCtx.isLoggedIn);
  const isUserLoggedIn = authCtx.isLoggedIn;
  return (
    <div className="App">
      <Header />
      <div className="div">
        <Switch>
          <Route path="/login" exact>
            <LoginSignup />
          </Route>
          {isUserLoggedIn && (
            <>
              <Route path="/student" exact>
                <Student />
              </Route>
              <Route path="/instructor" exact>
                <Instructor />
              </Route>
              <Route path="/add-new-course" exact>
                <AddCourse />
              </Route>
              <Route path="/show-course-detail-modal" exact>
                <ShowCourseModal />
              </Route>
              <Route path="/change-password" exact>
                <ChangePassword />
              </Route>
            </>
          )}
          <Route path="*" exact>
            <Redirect to="/login" />
          </Route>
        </Switch>
      </div>
      {/* <ChangePassword
        isDialogOpened={true}
        // handleCloseDialog={ch}
      /> */}
    </div>
  );
}

export default App;
