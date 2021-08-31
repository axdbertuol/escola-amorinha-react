import { Grid, Paper, ButtonBase, Typography, colors } from "@material-ui/core";
import { Button } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory, useParams } from "react-router-dom";

import useStudentsContext from "../../hooks/useStudentsContext";
import PageWrapper from "../PageWrapper";
import { getLabel, parseDate } from "../../utils/functions";

const useStyles = makeStyles((theme) => ({
  root: {},
  paper: {
    flexGrow: 1,
    padding: theme.spacing(2),
    // margin: "auto",
    // maxWidth: 500,
    backgroundColor: theme.palette.secondary.main,
    border: `5px solid ${theme.palette.primary.dark}`,
    borderRadius: "10px",
    // marginBottom: "5rem",
    boxShadow: theme.shadows[10],
  },
  image: {
    width: 128,
    height: 128,
  },
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
  },
  label: {
    fontWeight: "500",
  },
}));

const GridRow = ({ label, value, labelStyle, colorAlternate = false }) => {
  console.log("cheguei");
  return (
    <Grid
      container
      direction="row"
      xs
      style={{
        // padding: "10px",
        backgroundColor: colorAlternate ? colors.grey[200] : colors.grey[400],
      }}
      spacing={2}
      gutterBottom
      justifyContent="flex-start"
      flexGrow={"0"}
    >
      <Grid item xs={4}>
        <Typography variant="body2" className={labelStyle}>
          {label}
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography variant="body2">{value || ""}</Typography>
      </Grid>
    </Grid>
  );
};

const StudentDetailPage = () => {
  let history = useHistory();
  const params = useParams();
  const classes = useStyles();
  const [currentStudent, setCurrentStudent] = useState(null);
  const {
    state: { students },
    removeStudent,
    // didPopulate,
  } = useStudentsContext();

  // const renderGridRows = () => {
  //   const ordered = Object.
  // }
  useEffect(() => {
    if (!currentStudent) {
      const student = students.find(({ id }) => id === params.id);
      if (student) {
        setCurrentStudent(student);
      }
    }
  }, []);

  return (
    <PageWrapper size="md">
      {currentStudent ? (
        <Paper className={classes.paper}>
          <Grid container spacing={2}>
            <Grid item>
              <ButtonBase className={classes.image}>
                <img
                  className={classes.img}
                  alt="complex"
                  src="https://picsum.photos/200"
                />
              </ButtonBase>
            </Grid>
            <Grid item xs direction={"row"} container>
              <Grid
                item
                container
                xs={10}
                direction="row"
                spacing={2}
                justifyContent={"flex-start"}
                style={{ padding: "1rem" }}
              >
                <Grid item xs>
                  {Object.entries(currentStudent).map((entry, index) => {
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
                      <GridRow
                        label={getLabel(label)}
                        value={value}
                        labelStyle={classes.label}
                        colorAlternate={index % 2 === 0}
                        key={label + "-" + index}
                      />
                    );
                  })}
                </Grid>
              </Grid>
              <Grid item xs>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => history.goBack()}
                >
                  Voltar
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      ) : (
        ""
      )}
    </PageWrapper>
  );
};

export default StudentDetailPage;
