import React, { useContext, useEffect } from "react";
import { Context as StudentsContext } from "../context/StudentsContext";
import { populate } from "../mock/api";

const useStudentsContext = () => {
  const {
    state,
    addStudent,
    removeStudent,
    editStudent,
    setClassNumber,
    setAuthPeopleRelation,
  } = useContext(StudentsContext);

  useEffect(() => {
    if (state.students.length === 0) {
      populate(addStudent, setClassNumber, setAuthPeopleRelation);
    }
  }, []);

  return {
    state,
    addStudent,
    removeStudent,
    editStudent,
    setClassNumber,
    setAuthPeopleRelation,
  };
};

export default useStudentsContext;
