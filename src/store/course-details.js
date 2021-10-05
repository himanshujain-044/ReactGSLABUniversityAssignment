import React, { useCallback, useEffect, useState } from "react";

const CourseContext = React.createContext({
  showCourseModal: true,
  toggleShowCourse(bool) {},
});

export const CourseContextProvider = (props) => {
  const [showCourseModal, setShowCourseModal] = useState(true);
  const [formValue, setformValue] = useState("");
  const toggleShowCourseModlHandler = (bool) => {
    // console.log(showCourseModal);
    setShowCourseModal(bool);
  };
  const contextValue = {
    showCourseModal,

    toggleShowCourse: toggleShowCourseModlHandler,
  };
  return (
    <CourseContext.Provider value={contextValue}>
      {props.children}
    </CourseContext.Provider>
  );
};

export default CourseContext;
