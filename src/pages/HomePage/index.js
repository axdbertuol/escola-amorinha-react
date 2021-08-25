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
        <ButtonGroup color="secondary">
          <Link to={"/register"}>
            <Button>Registration</Button>
          </Link>
          <Link to={"/list"}>
            <Button>Student List</Button>
          </Link>
        </ButtonGroup>
      </nav>
      {children}
    </Container>
  );
};

export default HomePage;
