import React from "react";
// import TextField from "@mui/material/TextField";
import SignupForm from "./SignupForm";
import styles from "./LoginSignup.module.css";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

import LoginForm from "./LoginForm";
import { Tabs, Typography } from "@material-ui/core";
const LoginSignup = (props) => {
  const [value, setValue] = React.useState("login");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={styles.section}>
      <Box sx={{ width: "100%", typography: "body1" }}>
        <TabContext value={value}>
          <Box sx={{  borderColor: "divider" }}>
            <TabPanel value="1">Item One</TabPanel>
            <TabList
              onChange={handleChange}
              aria-label="lab API tabs example"
              centered
            >
              <Tab label="Login" value="login" />
              <Tab label="Signup" value="signup" />
            </TabList>
          </Box>
          <TabPanel value="login">
            <LoginForm />
          </TabPanel>
          <TabPanel value="signup">
            <SignupForm />
          </TabPanel>
        </TabContext>
      </Box>
    </div>
  );

  // function TabPanel(props) {
  //   const { children, value, index, ...other } = props;

  //   return (
  //     <div
  //       role="tabpanel"
  //       hidden={value !== index}
  //       id={`simple-tabpanel-${index}`}
  //       aria-labelledby={`simple-tab-${index}`}
  //       {...other}
  //     >
  //       {value === index && (
  //         <Box sx={{ p: 3 }}>
  //           <Typography>{children}</Typography>
  //         </Box>
  //       )}
  //     </div>
  //   );
  // }

  // TabPanel.propTypes = {
  //   children: "login",
  //   // i/PropTypes.number.isRequired,
  // };

  // function a11yProps(index) {
  //   return {
  //     id: `simple-tab-${index}`,
  //     "aria-controls": `simple-tabpanel-${index}`,
  //   };
  // }

  // const [value, setValue] = React.useState("login");

  // const handleChange = (event, newValue) => {
  //   // event.preventDefault();
  //   setValue(newValue);
  // };

  // return (
  // <div className={styles.section}>
  //   <Box sx={{ width: "100%", typography: "body1" }}>
  //     <TabContext value={value}>
  //       <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
  //         <Tabs onChange={handleChange} centered>
  //           <Tab label="Login" value={"login"} wrapped/>
  //           <Tab label="Signup" value={"signup"} />
  //         </Tabs>
  //       </Box>

  //       <TabPanel value={"login"}>
  //         <LoginForm />
  //       </TabPanel>
  //       <TabPanel value={"signup"}>
  //         <SignupForm />
  //       </TabPanel>

  //     </TabContext>
  //   </Box>

  {
    /* <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="Item One" {...a11yProps(0)} />
            <Tab label="Item Two" {...a11yProps(1)} />
            <Tab label="Item Three" {...a11yProps(2)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          Item One
        </TabPanel>
        <TabPanel value={value} index={1}>
          Item Two
        </TabPanel>
        <TabPanel value={value} index={2}>
          Item Three
        </TabPanel>
      </Box> */
  }
  // </div>
  // <div className={styles.section}>
  //   <form>
  //     <div></div>
  //     <div></div>
  //     <TextField id="standard-basic" label="Email" variant="standard" />
  //     <TextField id="standard-basic" label="Password" variant="standard" />
  //   </form>
  // </div>
  // );
};

export default LoginSignup;
