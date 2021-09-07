import createDataContext from "./createDataContext";
import PropTypes from "prop-types";
import { verifyUser as verifyUserFromDB } from "../mock/api";
import { apiServer } from "../mock/server";

/**
 * The data reducer
 *
 * @param {object} state - The state object
 * @param {object} action - The action object
 */

const authReducer = (state, action) => {
  switch (action.type) {
    case "add_user":
      return { ...state, user: action.payload };
    case "set_token":
      return { ...state, token: action.payload };
    default:
      return state;
  }
};

const addUser = (dispatch) => (user) => {
  if (typeof user == "object" || Array.isArray(user)) {
    // addUserDB(student);
    dispatch({ type: "add_user", payload: "user" });
  }
};

addUser.propTypes = {
  user: PropTypes.array.isRequired,
};

const authenticateUser = (dispatch) => async (user) => {
  const userData = await verifyUserFromDB(user);
  console.log("data", userData);
  if (userData) {
    try {
      // get token from api
      const response = await fetch(`/api/auth-token/${userData.id}`);
      const token = await response.json();
      localStorage.setItem("token", token);
      dispatch({ type: "add_user", payload: userData });
      dispatch({ type: "set_token", payload: token });
    } catch (error) {
      console.log(error);
    }
  }
};

authenticateUser.propTypes = {
  user: PropTypes.array.isRequired,
};

const tryLocalSignin = (dispatch) => async () => {
  // debugger;
  const token = localStorage.getItem("token");
  if (!token) {
    return;
  }
  try {
    // get token from api
    const response = await fetch(`/api/auth-token-verify/${token}`);
    const data = await response.json();
    console.log("tokenVerifyResponse", data.user);
    // localStorage.setItem("token", data);
    if (data.user) {
      dispatch({ type: "add_user", payload: data.user });
      dispatch({ type: "set_token", payload: token });
    } else {
      // redirect to login page
    }
  } catch (error) {
    console.log(error);
    // redirect to login page
  }
};

const setToken = (dispatch) => (token) => {
  dispatch({ type: "set_token", payload: token });
};

export const { Context, Provider } = createDataContext(
  authReducer, // reducer
  {
    addUser,
    authenticateUser,
    tryLocalSignin,
  }, // functions  (actions)
  { user: {}, token: null } // state
);
