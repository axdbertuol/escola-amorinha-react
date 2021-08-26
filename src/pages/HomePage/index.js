import React, { useState } from "react";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";

import Header from "../../components/Header";

import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    justifyItems: "center",
    justifyContent: "center",
    "& > *": {
      margin: theme.spacing(2),
    },
  },
}));
// const useStyles = makeStyles((theme) => ({
//   root: {
//     backgroundColor: "red",
//     ...theme.root,
//   },
// }));
const HomePage = ({ children }) => {
  const [pageTitle, setPageTitle] = useState("Registro de Alunos");
  const classes = useStyles();
  return (
    <Container maxWidth="sm">
      <Header title={pageTitle} />
      <nav className={classes.root}>
        <ButtonGroup variant="contained" color="secondary">
          <Link to={"/"} component={Button}>
            Home
          </Link>
          <Link to={"/register"} component={Button}>
            Registration
          </Link>
          <Link to={"/list"} component={Button}>
            Student List
          </Link>
        </ButtonGroup>
      </nav>
      {children}
    </Container>
  );
};

export default HomePage;
