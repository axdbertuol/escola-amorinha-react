import { useContext, useEffect, useState } from "react";

import { Context as StudentsContext } from "../context/StudentsContext";
import {
  fetchAuthPeopleRelation,
  fetchStudents,
  fetchClassNumbers,
} from "../mock/api";

const useStudentsContext = () => {
  const {
    state: { students, classNumber, authorizedPeopleRelation },
    addStudent,
    removeStudent,
    editStudent,
    setStudents,
    setClassNumber,
    setAuthPeopleRelation,
  } = useContext(StudentsContext);

  const [didPopulate, setDidPopulate] = useState(false);

  useEffect(() => {
    const setClassNumbersState = async () => {
      const classNumbers = await fetchClassNumbers();
      console.log("classNumbers", classNumbers);
      setClassNumber(classNumbers);
    };
    if (classNumber.length === 0) {
      setClassNumbersState();
    }
  }, [setClassNumber, classNumber]);

  useEffect(() => {
    const setAuthPeopleRelationState = async () => {
      const authPeopleRelation = await fetchAuthPeopleRelation();
      console.log("authPeopleRelation", authPeopleRelation);

      setAuthPeopleRelation(authPeopleRelation);
    };
    if (authorizedPeopleRelation.length === 0) {
      setAuthPeopleRelationState();
    }
  }, [setAuthPeopleRelation, authorizedPeopleRelation]);

  useEffect(() => {
    const setStudentsState = async () => {
      const studentsFromApi = await fetchStudents();
      console.log("Students", studentsFromApi);
      setStudents(studentsFromApi);
    };
    if (students.length === 0) {
      setStudentsState();
      setDidPopulate(true);
    }
  }, [setStudents, students]);

  return {
    state: { students, classNumber, authorizedPeopleRelation },
    addStudent,
    removeStudent,
    editStudent,
    setStudents,
    setClassNumber,
    setAuthPeopleRelation,
    didPopulate,
  };
};

export default useStudentsContext;
