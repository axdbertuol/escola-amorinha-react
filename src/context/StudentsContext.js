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
    case "add_task":
      return { ...state, students: [...state.students, action.payload] };
    case "remove_task":
      return {
        ...state,
        students: state.students.filter((task) => task.id !== action.payload),
      };
    case "set_students_from_local_storage":
      return {
        ...state,
        students: action.payload,
      };
    case "handle_task_checked":
      return {
        ...state,
        students: state.students.map((task) => {
          if (task.id === action.payload.id) {
            task = { ...task, checked: !task.checked };
            console.log({ task });
          }
          return task;
        }),
      };
    default:
      return state;
  }
};

const addStudent = (dispatch) => (student) => {
  dispatch({ type: "add_student", payload: student });
};

addStudent.propTypes = {
  tasks: PropTypes.object.isRequired,
};
const removeStudent = (dispatch) => (id) => {
  dispatch({ type: "remove_student", payload: id });
};
removeStudent.propTypes = {
  id: PropTypes.string.isRequired,
};

const setStudentsFromLocalStorage = (dispatch) => (students) => {
  console.log(typeof students);
  console.log("studs from localStorage", students);
  dispatch({ type: "set_students_from_local_storage", payload: students });
};

setStudentsFromLocalStorage.propTypes = {
  tasks: PropTypes.array.isRequired,
};

export const { Context, Provider } = createDataContext(
  dataReducer, // reducer
  { addStudent, removeStudent, setStudentsFromLocalStorage }, // functions  (actions)
  { students: [] } // state
);
