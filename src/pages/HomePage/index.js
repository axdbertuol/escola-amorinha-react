import React, { useContext } from "react";

import PageWrapper from "../PageWrapper";
import Header from "../../components/Header";
import { Context as StudentsContext } from "../../context/StudentsContext";

import { Link, useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { useEffect } from "react";

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
    state: { students },
    addStudent,
  } = useContext(StudentsContext);

  useEffect(() => {
    const populateStudents = async () => {
      try {
        const response = await fetch("/api/students");
        const data = await response.json();
        console.log("randomStudents", data);
        data.students.forEach((student) => {
          addStudent(student);
        });
      } catch (error) {
        console.log("fetch error", error);
      }
    };
    if (students.length === 0) {
      populateStudents();
    }
  }, []);

  return <PageWrapper>Homepage</PageWrapper>;
};

export default HomePage;
