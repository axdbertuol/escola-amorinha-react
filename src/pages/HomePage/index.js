import React, { useContext, useEffect } from "react";

import PageWrapper from "../PageWrapper";
import Header from "../../components/Header";

import { Link, useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

import useStudentsContext from "../../hooks/useStudentsContext";
import { Context as AuthContext } from "../../context/AuthContext";

const useStyles = makeStyles((theme) => ({
  nav: {
    display: "flex",
    alignItems: "center",
    justifyItems: "center",
    justifyContent: "center",
    "& > *": {
      margin: theme.spacing(2),
    },
  },
}));

const HomePage = () => {
  const classes = useStyles();
  const history = useHistory();
  const {
    state: { user },
    verifyUser,
  } = useContext(AuthContext);

  useStudentsContext();

  useEffect(() => {
    verifyUser({ email: "alexandre@teste.com", password: "12345" });
  }, []);

  return <PageWrapper></PageWrapper>;
};

export default HomePage;
