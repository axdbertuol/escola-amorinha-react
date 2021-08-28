import React, { useState } from "react";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";

import Header from "../../components/Header";

import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  nav: {
    display: "flex",
    alignItems: "center",
    justifyItems: "center",
    justifyContent: "center",
    marginTop: "1rem",
    marginBottom: "10rem",
    "& > *": {
      // margin: theme.spacing(2),
    },
  },
}));

const PageWrapper = ({ children, title = "Escolinha Amorinha", size }) => {
  const classes = useStyles();
  const history = useHistory();

  return (
    <Container maxWidth={size || "sm"}>
      <nav className={classes.nav}>
        <ButtonGroup variant="contained" color="secondary">
          <Button onClick={() => history.push("/")}>Home</Button>
          <Button onClick={() => history.push("/register")}>
            Registration
          </Button>
          <Button onClick={() => history.push("/list")}>Student List</Button>
        </ButtonGroup>
      </nav>

      <div>{children}</div>
    </Container>
  );
};

export default PageWrapper;
