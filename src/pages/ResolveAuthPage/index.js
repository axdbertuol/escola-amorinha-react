import React, { useContext, useEffect } from "react";

import PageWrapper from "../PageWrapper";
import Header from "../../components/Header";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Link, useHistory, Redirect } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

import useStudentsContext from "../../hooks/useStudentsContext";
import { Context as AuthContext } from "../../context/AuthContext";

const ResolveAuthPage = () => {
  const history = useHistory();
  const {
    state: { user, token },
    tryLocalSignin,
  } = useContext(AuthContext);

  useEffect(() => {
    tryLocalSignin();
    if (!token && !localStorage.getItem("token")) {
      console.log("oi");
      history.push("/login");
    } else {
      history.push("/home");
    }
  }, []);

  return <CircularProgress />;
};

export default ResolveAuthPage;
