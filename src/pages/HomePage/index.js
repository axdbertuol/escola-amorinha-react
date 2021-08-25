import React, { useState } from "react";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
// import { makeStyles } from '@material-ui/core/styles';

import Header from "../../components/Header";
import StudentListPage from "../StudentListPage";
import StudentRegisterPage from "../StudentRegisterPage";

// const useStyles = makeStyles((theme) => ({
//   root: {
//     backgroundColor: "red",
//     ...theme.root,
//   },
// }));
const HomePage = () => {
  const [linkPicked, setLinkPicked] = useState("");
  const [pageTitle, setPageTitle] = useState("Registro de Alunos");
  return (
    <Container maxWidth="sm">
      <Header title={pageTitle} />
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
      </ButtonGroup>
      <StudentRegisterPage />
      {/* <StudentListPage /> */}
    </Container>
  );
};

export default HomePage;
