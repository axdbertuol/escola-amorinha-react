import React, { useState } from "react";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";

import PageWrapper from "../PageWrapper";
import Header from "../../components/Header";

import { Link, useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

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

  return <PageWrapper>Homepage</PageWrapper>;
};

export default HomePage;
