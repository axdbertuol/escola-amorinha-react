import createDataContext from "./createDataContext";
import PropTypes from "prop-types";

/**
 * The data reducer
 *
 * @param {object} state - The state object
 * @param {object} action - The action object
 */

const dataReducer = (state, action) => {
  switch (action.type) {
    case "add_student":
      console.log({
        ...state,
        students: [...state.students, action.payload],
      });
      return { ...state, students: [...state.students, action.payload] };
    case "remove_student":
      return {
        ...state,
        students: state.students.filter((task) => task.id !== action.payload),
      };
    case "edit_student":
      // deep copy
      let newStudents = JSON.parse(JSON.stringify(state.students));
      // indexOf not working for some reaSON
      const index = newStudents
        .map((student, index) => {
          console.log("apareceporra", student.id);
          debugger;
          if (student.id === action.payload.id) {
            return index;
          }
          return -1;
        })
        .filter((id) => id !== -1);
      console.log("tacertoisso", index);
      if (index[0] !== -1) {
        newStudents[index] = action.payload.data;
      }
      return { ...state, students: newStudents };
    case "set_students_from_local_storage":
      return {
        ...state,
        students: action.payload,
      };
    default:
      return state;
  }
};

const addStudent = (dispatch) => (student) => {
  console.log("studs from context", student);
  dispatch({ type: "add_student", payload: student });
};

addStudent.propTypes = {
  student: PropTypes.array.isRequired,
};
const editStudent = (dispatch) => (id, data) => {
  // console.log("studs from context", student);

  dispatch({ type: "edit_student", payload: { id, data } });
};

editStudent.propTypes = {
  tasks: PropTypes.object.isRequired,
};
const removeStudent = (dispatch) => (id) => {
  dispatch({ type: "remove_student", payload: id });
};
removeStudent.propTypes = {
  id: PropTypes.string.isRequired,
};

const setStudentsFromLocalStorage = (dispatch) => () => {
  if (localStorage.getItem("students")) {
    const students = JSON.parse(localStorage.getItem("students"));
    dispatch({ type: "set_students_from_local_storage", payload: students });
  }
};

setStudentsFromLocalStorage.propTypes = {
  tasks: PropTypes.array.isRequired,
};

export const { Context, Provider } = createDataContext(
  dataReducer, // reducer
  { addStudent, removeStudent, editStudent, setStudentsFromLocalStorage }, // functions  (actions)
  { students: [] } // state
);
