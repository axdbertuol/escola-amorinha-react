import { useEffect, useState, useContext } from "react";
import { Context as StudentsContext } from "../context/StudentsContext";

const useLocalStorage = () => {
  const {
    state: { students },
    addStudents,
    removeStudent,
    editStudent,
  } = useContext(StudentsContext);

  const [saveToLocalStorage, setSaveToLocalStorage] = useState(false);
  const getStudentFromLocalStorage = (id) => {
    const studsFromLS = JSON.parse(localStorage.getItem("students"));
    return studsFromLS.find((stud) => stud.id === id);
  };
  useEffect(() => {
    if (students && saveToLocalStorage) {
      console.log("students in useLocalStorage", students);
      localStorage.setItem("students", JSON.stringify(students));
      setSaveToLocalStorage(false);
    }
  }, [students, saveToLocalStorage]);

  return [
    setSaveToLocalStorage,
    getStudentFromLocalStorage,
    addStudents,
    removeStudent,
    editStudent,
  ];
};

export default useLocalStorage;
