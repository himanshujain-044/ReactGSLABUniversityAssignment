import React from "react";
import SignupForm from "./SignupForm";
import styles from "./LoginSignup.module.css";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import LoginForm from "./LoginForm";
import { styled, Tabs } from "@material-ui/core";

const LoginSignup = (props) => {
 const AntTabs = styled(Tabs)({
  borderBottom: '1px solid #e8e8e8',
  '& .MuiTabs-indicator': {
    backgroundColor: 'black',
    color: 'black',
  },
  // '&.Mui-selected': {
  //   color: 'green',
  //   // fontWeight: theme.typography.fontWeightMedium,
  // },
  // color: 'red',
});
  const AntTab = styled((props) => <Tab disableRipple {...props} />)(
    ({ theme }) => ({
      textTransform: "none",
      minWidth: 0,
      [theme.breakpoints.up("sm")]: {
        minWidth: 0,
      },
      fontWeight: theme.typography.fontWeightRegular,
      marginRight: theme.spacing(1),
      // color: 'black',
      fontFamily: [
        "-apple-system",
        "BlinkMacSystemFont",
        '"Segoe UI"',
        "Roboto",
        '"Helvetica Neue"',
        "Arial",
        "sans-serif",
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(","),
      "&:hover": {
        // color: 'green',
        opacity: 1,
      },
      "&.Mui-selected": {
        // color: 'green',
        fontWeight: theme.typography.fontWeightMedium,
      },
      "&.Mui-focusVisible": {
        // backgroundColor: 'black',
      },
    })
  );

  const StyledTabs = styled((props) => (
    <Tabs
      {...props}
      TabIndicatorProps={{
        children: <span className="MuiTabs-indicatorSpan" />,
      }}
    />
  ))({
    "& .MuiTabs-indicator": {
      display: "flex",
      justifyContent: "center",
      backgroundColor: "transparent",
    },
    "& .MuiTabs-indicatorSpan": {
      maxWidth: 40,
      width: "100%",
      backgroundColor: "#635ee7",
    },
  });

  styles.tab = [];
  styles.tab[0] = styles.default_tab;
  const StyledTab = styled((props) => <Tab disableRipple {...props} />)(
    ({ theme }) => ({
      textTransform: "none",
      fontWeight: theme.typography.fontWeightRegular,
      fontSize: theme.typography.pxToRem(15),
      marginRight: theme.spacing(1),
      color: "rgba(255, 255, 255, 0.7)",
      "&.Mui-selected": {
        color: "red",
      },
      "&.Mui-focusVisible": {
        backgroundColor: "rgba(100, 95, 228, 0.32)",
      },
    })
  );
  const [value, setValue] = React.useState("login");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={styles.section}>
      <Box sx={{ width: "100%", typography: "body1" }}>
        <TabContext value={value}>
          <Box sx={{ borderColor: "divider" }}>
            <TabList
              onChange={handleChange}
              aria-label="lab API tabs example"
              centered
              sx={{ textColor: "success.main" }}
              // textColor="success"
              // indicatorColor="grey"
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
      {/* <Box sx={{ width: "100%" }}>
        {/* <Box sx={{ bgcolor: "#fff" }}> */}
      {/* <AntTabs
          value={value}
          onChange={handleChange}
          centered
          aria-label="ant example"
        >
          <AntTab label="Login" />
          <AntTab label="Signup" />
          <Box> */}
      {/* <StyledTabs
            value={value}
            onChange={handleChange}
            aria-label="styled tabs example"
          >
            <StyledTab label="Workflows" />
            <StyledTab label="Datasets" />
            <StyledTab label="Connections" />
          </StyledTabs> */}
      {/* <Tabs value={value} onChange={handleChange}>
              <Tab label="Login" value="login" />
              <Tab label="Signup" value="signup" />
            </Tabs>
          </Box>
        </AntTabs> */}
      {/* <Box sx={{ p: 3 }} /> */}
      {/* </Box> */}
      {/* </Box> */}
    </div>
  );
};

export default LoginSignup;
