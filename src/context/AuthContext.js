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

const verifyUser = (dispatch) => async (user) => {
  const data = await verifyUserFromDB(user);
  console.log("data", data);
  if (data) {
    dispatch({ type: "add_user", payload: data });
  }
};

verifyUser.propTypes = {
  user: PropTypes.array.isRequired,
};

export const { Context, Provider } = createDataContext(
  authReducer, // reducer
  {
    addUser,
    verifyUser,
  }, // functions  (actions)
  { user: {} } // state
);
