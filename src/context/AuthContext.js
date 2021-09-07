import createDataContext from "./createDataContext";
import PropTypes from "prop-types";
import {
  verifyUser as verifyUserFromDB,
  getAuthToken,
  verifyAuthToken,
} from "../mock/api";
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
    const token = await getAuthToken(userData.id);
    localStorage.setItem("token", token);
    dispatch({ type: "add_user", payload: userData });
    dispatch({ type: "set_token", payload: token });
  }
};

authenticateUser.propTypes = {
  user: PropTypes.array.isRequired,
};

const tryLocalSignin = (dispatch) => async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    return;
  }
  const user = await verifyAuthToken(token);
  if (user) {
    dispatch({ type: "add_user", payload: user });
    dispatch({ type: "set_token", payload: token });
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
