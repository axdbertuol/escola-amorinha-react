import React, { useContext } from "react";

import PageWrapper from "../PageWrapper";
import Header from "../../components/Header";

import { Link, useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

import useStudentsContext from "../../hooks/useStudentsContext";

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
  useStudentsContext();

  return <PageWrapper></PageWrapper>;
};

export default HomePage;
