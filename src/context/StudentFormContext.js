import createDataContext from "./createDataContext";
import PropTypes from "prop-types";

/**
 * The data reducer
 *
 * @param {object} state - The state object
 * @param {object} action - The action object
 */
const initialState = {
  name: "",
  surname: "",
  sponsorName: "",
  sponsorPhone: "",
  sponsorType: "pais",
  emergencyPhone: "",
  foodRestriction: {
    have: "no",
    description: "",
  },
  authorizeStudentImage: "yes",
  authorizedPeople: [{ id: "", name: "", sponsorType: "" }],
};

const dataReducer = (state, action) => {
  switch (action.type) {
    case "set_student_form_data":
    case "set_sponsor_type":
    case "set_name":
    case "set_surname":
    case "set_sponsor_name":
    case "set_sponsor_phone":
    case "set_emergency_phone":
    case "set_auth_student_image":
      console.log({
        ...state,
        ...action.payload,
      });
      return {
        ...state,
        ...action.payload,
      };
    case "set_food_restriction":
      return {
        ...state,
        foodRestriction: { ...state.foodRestriction, ...action.payload },
      };
    case "add_authorized_person":
      console.log({
        ...state,
        authorizedPeople: [...state.authorizedPeople, action.payload],
      });
      return {
        ...state,
        authorizedPeople: [...state.authorizedPeople, action.payload],
      };
    default:
      return state;
  }
};

const setStudentFormData = (dispatch) => (data) => {
  dispatch({ type: "set_student_form_data", payload: data });
};
const setName = (dispatch) => (data) => {
  dispatch({ type: "set_name", payload: data });
};
const setSurname = (dispatch) => (data) => {
  dispatch({ type: "set_surname", payload: data });
};
const setSponsorName = (dispatch) => (data) => {
  dispatch({ type: "set_sponsor_name", payload: data });
};
const setSponsorPhone = (dispatch) => (data) => {
  dispatch({ type: "set_sponsor_phone", payload: data });
};
const setSponsorType = (dispatch) => (data) => {
  dispatch({ type: "set_sponsor_type", payload: data });
};
const setEmergencyPhone = (dispatch) => (data) => {
  dispatch({ type: "set_emergency_phone", payload: data });
};
const setFoodRestriction = (dispatch) => (data) => {
  dispatch({ type: "set_food_restriction", payload: data });
};
const addAuthorizedPerson = (dispatch) => (data) => {
  console.log(data);
  dispatch({ type: "add_authorized_person", payload: data });
};

export const { Context, Provider } = createDataContext(
  dataReducer, // reducer
  {
    addAuthorizedPerson,
    setStudentFormData,
    setName,
    setSurname,
    setSponsorName,
    setSponsorPhone,
    setSponsorType,
    setEmergencyPhone,
    setFoodRestriction,
  }, // functions  (actions)
  {
    ...initialState,
  } // state
);
