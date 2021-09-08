import {
  Grid,
  Paper,
  ButtonBase,
  Typography,
  colors,
  Divider,
} from "@material-ui/core";
import { Button } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

import useStudentsContext from "../../hooks/useStudentsContext";
import PageWrapper from "../PageWrapper";
import { getLabel, parseDate } from "../../utils/functions";
import useStyles from "./style";

const StudentDetailPage = () => {
  let history = useHistory();
  const params = useParams();
  const classes = useStyles();
  const [currentStudent, setCurrentStudent] = useState(null);
  const {
    state: { students },
  } = useStudentsContext();

  useEffect(() => {
    if (!currentStudent) {
      const student = students.find(({ id }) => id === params.id);
      if (student) {
        setCurrentStudent(student);
      }
    }
  }, [currentStudent, params.id, students]);

  return (
    <PageWrapper size="sm">
      <TableContainer className={classes.paper} component={Paper}>
        <Typography
          variant="h3"
          style={{ textAlign: "center", marginBottom: "1rem" }}
        >
          Dados do Estudante
        </Typography>
        <Divider />
        <Table>
          <TableBody>
            {currentStudent &&
              Object.entries(currentStudent).map((entry, index) => {
                console.log("oi", entry);
                let label = entry[0];
                let value = entry[1];
                if (label === "tableData") return null;
                if (typeof value === "boolean") {
                  value = value ? "Sim" : "Não";
                } else if (label === "foodRestriction") {
                  value = value.description || "Não";
                } else if (label === "authorizedPeople" && value[0]) {
                  value = value
                    .map(({ name, relation }) =>
                      name ? `${name} - ${relation}` : ""
                    )
                    .join(", ");
                } else if (label === "birthday") {
                  value = parseDate(new Date(value));
                }
                return (
                  <TableRow key={getLabel(label)}>
                    <TableCell className={classes.label}>
                      {getLabel(label)}
                    </TableCell>
                    <TableCell>{value}</TableCell>
                  </TableRow>
                );
              })}
            <Button
              variant="contained"
              color="primary"
              onClick={() => history.goBack()}
            >
              Voltar
            </Button>
          </TableBody>
        </Table>
      </TableContainer>
    </PageWrapper>
  );
};

export default StudentDetailPage;
