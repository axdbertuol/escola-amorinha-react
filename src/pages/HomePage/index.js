import React, { useState } from "react";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
// import { makeStyles } from '@material-ui/core/styles';

import Header from "../../components/Header";
import StudentListPage from "../StudentListPage";
import StudentRegisterPage from "../StudentRegisterPage";

const HomePage = () => {
  const [linkPicked, setLinkPicked] = useState("");
  return (
    <Container maxWidth="sm">
      <Header title="Lista de Alunos" />
      <ButtonGroup
        color="primary"
        fullWidth
        aria-label="outlined primary button group"
      >
        <Button variant="contained" color="primary">
          Registration
        </Button>
        <Button variant="contained" color="secondary">
          Student List
        </Button>
        {/* <Button>Three</Button> */}
      </ButtonGroup>
    </Container>
  );
};

export default HomePage;
