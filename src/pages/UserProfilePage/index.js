import React, { useContext } from "react";
import { Grid, Paper, ButtonBase, Typography, colors } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import PageWrapper from "../PageWrapper";
import { Context as AuthContext } from "../../context/AuthContext";

const useStyles = makeStyles((theme) => ({
  root: {},
  paper: {
    flexGrow: 1,
    padding: theme.spacing(2),
    marginTop: "1rem",
    // maxWidth: 500,
    backgroundColor: theme.palette.secondary.main,
    border: `5px solid ${theme.palette.primary.dark}`,
    borderRadius: "10px",
    // marginBottom: "5rem",
    boxShadow: theme.shadows[10],
  },

  label: {
    fontWeight: "500",
  },
}));
const GridRow = ({ label, value, labelStyle, colorAlternate = false }) => {
  return (
    <Grid
      container
      direction="row"
      xs={8}
      style={{
        backgroundColor: colorAlternate ? colors.grey[200] : colors.grey[400],
        justifyContent: "center",
        alignContent: "center",
        padding: "10px",
      }}
      justifyContent="flex-start"
    >
      <Grid item xs={2}>
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

const UserProfilePage = () => {
  const {
    state: { user },
  } = useContext(AuthContext);
  const classes = useStyles();

  return (
    <PageWrapper size="md">
      <Paper className={classes.paper}>
        <Grid
          container
          direction="row"
          spacing={2}
          style={{ justifyContent: "center", margin: "1rem" }}
        >
          <GridRow
            label={"Nome"}
            labelStyle={classes.label}
            value={user.name}
          />
          <GridRow
            label={"E-mail"}
            labelStyle={classes.label}
            value={user.email}
            colorAlternate
          />
          <GridRow
            label={"Cargo"}
            labelStyle={classes.label}
            value={user.job}
          />
          <GridRow
            label={"Turmas"}
            labelStyle={classes.label}
            value={user.classNumbers.join()}
            colorAlternate
          />
        </Grid>
      </Paper>
    </PageWrapper>
  );
};

export default UserProfilePage;
