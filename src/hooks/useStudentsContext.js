import { useContext, useEffect, useState } from "react";
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

  const [didPopulate, setDidPopulate] = useState(false);

  const populateState = async () => {
    if (state.students && !didPopulate && state.students.length === 0) {
      await populate(addStudent, setClassNumber, setAuthPeopleRelation);
      setDidPopulate(true);
    }
  };
  useEffect(() => {
    populateState();
  }, []);

  return {
    state,
    addStudent,
    removeStudent,
    editStudent,
    setClassNumber,
    setAuthPeopleRelation,
    didPopulate,
  };
};

export default useStudentsContext;
