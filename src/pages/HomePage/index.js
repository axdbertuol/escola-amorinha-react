import { Link, useHistory } from "react-router-dom";
import Container from "@material-ui/core/Container";
import React, { useContext, useEffect, useState } from "react";

import { Context as AuthContext } from "../../context/AuthContext";
import PageWrapper from "../PageWrapper";
import useStudentsContext from "../../hooks/useStudentsContext";
import { Paper, Typography } from "@material-ui/core";

import useStyles from "./style";

const HomePage = () => {
  const classes = useStyles();
  const history = useHistory();
  const {
    state: { user },
  } = useContext(AuthContext);
  const [studsInClassA, setStudsInClassA] = useState([]);
  const [studsInClassB, setStudsInClassB] = useState([]);
  const [studsInClassC, setStudsInClassC] = useState([]);
  const [studsInClassD, setStudsInClassD] = useState([]);
  const {
    state: { students },
    didPopulate,
  } = useStudentsContext();

  useEffect(() => {
    if (students && students.length > 0 && didPopulate) {
      setStudsInClassA(
        students.filter(({ classNumber }) => "A" === classNumber)
      );
      setStudsInClassB(
        students.filter(({ classNumber }) => "B" === classNumber)
      );
      setStudsInClassC(
        students.filter(({ classNumber }) => "C" === classNumber)
      );
      setStudsInClassD(
        students.filter(({ classNumber }) => "D" === classNumber)
      );
    }
  }, [students, didPopulate]);
  return (
    <PageWrapper size="sm">
      <Container className={classes.paper}>
        <Typography variant="h4"> Bem vindo {user.name}</Typography>
      </Container>
      <Container className={classes.paper}>
        <Typography variant="body2">
          Há {studsInClassA && studsInClassA.map(({ name }) => name).length}{" "}
          estudantes na Classe A
        </Typography>
        <Typography variant="body2">
          Há {studsInClassB && studsInClassB.map(({ name }) => name).length}{" "}
          estudantes na Classe B
        </Typography>
        <Typography variant="body2">
          Há {studsInClassC && studsInClassC.map(({ name }) => name).length}{" "}
          estudantes na Classe C
        </Typography>
        <Typography variant="body2">
          Há {studsInClassD && studsInClassD.map(({ name }) => name).length}{" "}
          estudantes na Classe D
        </Typography>
      </Container>
    </PageWrapper>
  );
};

export default HomePage;
