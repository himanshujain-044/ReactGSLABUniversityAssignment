import React from "react";
import SignupForm from "./SignupForm";
import styles from "./LoginSignup.module.css";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import LoginForm from "./LoginForm";

const LoginSignup = (props) => {
  const [value, setValue] = React.useState("login");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={styles.section}>
      <Box sx={{ width: "100%", typography: "body1" }}>
        <TabContext value={value}>
          <Box sx={{ borderColor: "divider" }}>
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
};

export default LoginSignup;
