import React, { useState } from "react";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";

import Header from "../../components/Header";

import { useHistory } from "react-router-dom";
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
const PageWrapper = ({ children, title, size }) => {
  const [pageTitle, setPageTitle] = useState(title || "App da Escolinha");
  const classes = useStyles();
  const history = useHistory();

  return (
    <Container maxWidth={size || "sm"}>
      <Header title={pageTitle} />
      <nav className={classes.root}>
        <ButtonGroup variant="contained" color="secondary">
          <Button onClick={() => history.push("/")}>Home</Button>
          <Button onClick={() => history.push("/register")}>
            Registration
          </Button>
          <Button onClick={() => history.push("/list")}>Student List</Button>
        </ButtonGroup>
      </nav>
      {children}
    </Container>
  );
};

export default PageWrapper;
