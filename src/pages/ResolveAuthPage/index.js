import React, { useContext, useEffect } from "react";

import CircularProgress from "@material-ui/core/CircularProgress";
import { Link, useHistory, Redirect, useLocation } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

import { Context as AuthContext } from "../../context/AuthContext";

const useStyles = makeStyles((theme) => ({
  root: {
    // display: "flex",
    // alignContent: "center",
    position: "absolute",
    top: "40%",
    left: "50%",
  },
}));

const ResolveAuthPage = () => {
  let history = useHistory();
  let location = useLocation();
  const classes = useStyles();
  const {
    state: { user, token },
    tryLocalSignin,
  } = useContext(AuthContext);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      tryLocalSignin();
      if (token !== null) {
        if (location.state && location.state.from.pathname) {
          history.push(location.state.from.pathname);
        } else {
          history.push("/home");
        }
      }
    } else if (token === null && !localStorage.getItem("token")) {
      history.push("/login");
    }
  }, [history, token, tryLocalSignin, location]);

  return (
    <div className={classes.root}>
      <CircularProgress />
    </div>
  );
};

export default ResolveAuthPage;
