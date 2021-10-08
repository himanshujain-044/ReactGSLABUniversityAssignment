import { dateRangePickerDayClasses } from "@mui/lab";
import moment from "moment";
const serverBaseUrl = "http://localhost:8080";

export async function login(loginCredentials) {
  const response = await fetch(`${serverBaseUrl}/login`, {
    method: "POST",
    body: JSON.stringify(loginCredentials),
    headers: {
      "Content-Type": "application/json",
    },
  });

  //   console.log(response);
  const data = await response.json();
  // console.log(data);
  if (!response.ok) {
    throw new Error(data.message || "Could not fetch quotes.");
  }

  //   const transformedQuotes = [];

  //   for (const key in data) {
  //     const quoteObj = {
  //       id: key,
  //       ...data[key],
  //     };

  //     transformedQuotes.push(quoteObj);
  //   }
  console.log(data.email);
  return { data };
}

export async function signup(userData) {
  const response = await fetch(`${serverBaseUrl}/signup`, {
    method: "POST",
    body: JSON.stringify(userData),
    headers: {
      "Content-Type": "application/json",
    },
  });

  //   console.log(response);
  const data = await response.json();
  //   console.log("hii",data);
  //   if (!response.ok) {
  //     // console.log(data);
  //     throw new Error(data.message || "Could not fetch quotes.");
  //   }

  //   const transformedQuotes = [];

  //   for (const key in data) {
  //     const quoteObj = {
  //       id: key,
  //       ...data[key],
  //     };

  //     transformedQuotes.push(quoteObj);
  //   }
  //   console.log(data.email);
  //   console.log(data);
  return data;
}
export async function logout(token) {
  const response = await fetch(`${serverBaseUrl}/logout`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Token is not valid");
  }

  return { data };
}

export async function passwordChange(data) {
  const { token } = data;
  const passwordData = {
    ...data,
  };
  delete passwordData.token;
  const response = await fetch(`${serverBaseUrl}/change-password`, {
    method: "PATCH",
    body: JSON.stringify(passwordData),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const responseJSON = await response.json();
  console.log(responseJSON);
  return responseJSON;
}

export async function getUserEnrolledCourses(token) {
  const response = await fetch(`${serverBaseUrl}/usercourses`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not fetch quotes.");
  }

  const transformedUserCourses = [];
  if (data.data.enrolledCourses) {
    data.data.enrolledCourses.forEach((element, index) => {
      const convertedCourseDetails = {
        Coursename: element.courseName,
        Progress: "In process",
        createdByEmail: element.email,
        id: index,
      };
      if (moment(new Date()).diff(moment(element.date), "days") > 15) {
        convertedCourseDetails.Progess = "Completed";
      }
      transformedUserCourses.push(convertedCourseDetails);
    });
  } else {
    return data;
  }

  console.log(transformedUserCourses);
  return transformedUserCourses;
}

export async function getAllCourses(userData) {
  const { token, email } = userData;
  const response = await fetch(`${serverBaseUrl}/allcourses`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not fetch quotes.");
  }

  const transformedUserCourses = [];
  console.log(data.data);
  if (data.data !== "No courses available") {
    data.data.forEach((element, index) => {
      const convertedCourseDetails = {
        Coursename: element.courseName,
        Enrollbtn: element.enrolledStu.includes(email),
        createdByEmail: element.createdBy,
        id: index,
      };

      transformedUserCourses.push(convertedCourseDetails);
    });
  } else {
    return data.data;
  }

  console.log(transformedUserCourses);
  return transformedUserCourses;
}

export async function getParticularCourses(courseDetailsAndToken) {
  const { token } = courseDetailsAndToken;
  delete courseDetailsAndToken.token;
  const response = await fetch(
    `${serverBaseUrl}/paticularcourse?createdBy=${courseDetailsAndToken.createdBy}&courseName=${courseDetailsAndToken.courseName}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not fetch quotes.");
  }

  // const transformedUserCourses = [];
  // console.log("ff", data.data);

  // console.log("HIItra", transformedUserCourses);
  return data.data;
}

export async function enrollUserCourse(courseDetailsAndToken) {
  const token = courseDetailsAndToken.token;
  const courseDetail = {
    createdBy: courseDetailsAndToken.email,
    courseName: courseDetailsAndToken.courseName,
  };
  const response = await fetch(`${serverBaseUrl}/enrollcourse`, {
    method: "PATCH",
    body: JSON.stringify(courseDetail),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  //   console.log(response);
  const data = await response.json();
  // console.log(data);
  //   if (!response.ok) {
  //     throw new Error(data.message || "Could not fetch quotes.");
  //   }

  //   const transformedQuotes = [];

  //   for (const key in data) {
  //     const quoteObj = {
  //       id: key,
  //       ...data[key],
  //     };

  //     transformedQuotes.push(quoteObj);
  //   }
  console.log(data);
  return data;
}

export async function getInstructorCourses(token) {
  //   const { token, email } = userData;
  const response = await fetch(`${serverBaseUrl}/courses`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();

  //   if (!response.ok) {
  //     throw new Error(data.message || "Could not fetch quotes.");
  //   }

  const transformedUserCourses = [];
  console.log(data.data);
  if (data.data !== "No courses available") {
    data.data.forEach((element, index) => {
      const convertedCourseDetails = {
        Coursename: element.courseName,
        Enrolled: element.enrolledStu.length,
        createdByEmail: element.createdBy,
        id: index,
      };

      transformedUserCourses.push(convertedCourseDetails);
    });
  } else {
    return data.data;
  }

  console.log(transformedUserCourses);
  return transformedUserCourses;
}

export async function addCourse(courseDetailsAndToken) {
  const token = courseDetailsAndToken.token;
  const courseDetail = {
    courseName: courseDetailsAndToken.courseName,
    duration: courseDetailsAndToken.duration,
    prerequisites: courseDetailsAndToken.prerequisites,
  };
  const response = await fetch(`${serverBaseUrl}/addcourse`, {
    method: "POST",
    body: JSON.stringify(courseDetail),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  //   console.log(response);
  const data = await response.json();
  // console.log(data);
  //   if (!response.ok) {
  //     throw new Error(data.message || "Could not fetch quotes.");
  //   }

  //   const transformedQuotes = [];

  //   for (const key in data) {
  //     const quoteObj = {
  //       id: key,
  //       ...data[key],
  //     };

  //     transformedQuotes.push(quoteObj);
  //   }
  console.log(data);
  return data;
}
