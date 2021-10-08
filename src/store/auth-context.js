import React, { useCallback, useEffect, useState } from "react";

const AuthContext = React.createContext({
  token: null,
  isLoggedIn: false,
  name: "",
  role: "",
  email: "",
  profile: "",
  login(userData) {},
  logout() {},
});
let logoutTimer = "";
export const AuthContextProvider = (props) => {
  //   const tokenData = retrieveStoredToken();

  //   let initialToken;
  //   if (tokenData) {
  //     initialToken = tokenData.token;
  //   }
  //   const retrieveStoredUserData = () => {
  //     const storedUserData = JSON.parse(localStorage.getItem("userData"));
  //     if (!storedUserData) {
  //       return null;
  //     }
  //     setUserData({ ...storedUserData });
  //     return storedUserData;
  //     //   const { token: storedToken, expireTime: storedExpirationDate } =
  //     //     localStorage.getItem("userData")

  //     //   const storedExpirationDate = localStorage.getItem("expirationTime");

  //     //   const remainingTime = calculateRemainingTime(storedExpirationDate);

  //     //   if (remainingTime <= 3600) {
  //     //     localStorage.removeItem("userData");
  //     //     // localStorage.removeItem("expirationTime");
  //     //     return null;
  //     //   }

  //     //   return {
  //     //     token: storedToken,
  //     //     duration: remainingTime,
  //     //   };
  //   };
  let initailUserData = JSON.parse(localStorage.getItem("userData"));

  const [userData, setUserData] = useState({ ...initailUserData });
  //   const [name, setName] = useState(null);
  //   const [token, setRole] = useState(null);

  //   useEffect(() => {
  //     setUserData(retrieveStoredUserData());
  //     console.log("running for refreshing");
  //   }, []);
  const userIsLoggedIn = !!userData.token;
  const loginHandler = (newUserData) => {
    // const totalRemainingTime = calculateRemainingTime(expirationTime);
    // const userData = {
    //   token: tokenId,
    //   expireTime: expirationTime,
    // };

    setUserData({ ...newUserData });
    // const userData = {};
    // localStorage.setItem("userData", userData);
    localStorage.setItem("userData", JSON.stringify({ ...newUserData }));
    logoutTimer = setTimeout(logoutHandler, 1000 * 60 * 60);
    // localStorage.setItem("expirationTime", expirationTime);
    // logoutTimer = setTimeout(logoutHandler, totalRemainingTime);
  };
  const logoutHandler = () => {
    setUserData({});
    localStorage.removeItem("userData");
    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }
  };

  const contextValue = {
    token: userData.token,
    isLoggedIn: userIsLoggedIn,
    name: userData.name,
    role: userData.role,
    email: userData.email,
    profile: userData.profile,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};
export default AuthContext;
