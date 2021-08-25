import { useEffect, useState, useContext } from "react";
import { Context as StudentsContext } from "../context/StudentsContext";

const useLocalStorage = () => {
  const {
    state: { students },
    addStudent,
    removeStudent,
  } = useContext(StudentsContext);

  const [saveToLocalStorage, setSaveToLocalStorage] = useState(false);

  useEffect(() => {
    if (students && saveToLocalStorage) {
      console.log("students in useLocalStorage", students);
      localStorage.setItem("students", JSON.stringify(students));
      setSaveToLocalStorage(false);
    }
  }, [students, saveToLocalStorage]);

  return [setSaveToLocalStorage, addStudent, removeStudent];
};

export default useLocalStorage;
