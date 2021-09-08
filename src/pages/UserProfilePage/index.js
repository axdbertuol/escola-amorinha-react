import React, { useContext } from "react";
import {
  Grid,
  Paper,
  ButtonBase,
  Typography,
  colors,
  Divider,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import PageWrapper from "../PageWrapper";
import { Context as AuthContext } from "../../context/AuthContext";

const useStyles = makeStyles((theme) => ({
  root: {},
  paper: {
    flexGrow: 1,
    padding: theme.spacing(2),
    marginTop: "1rem",
    // maxWidth: 500,
    backgroundColor: theme.palette.secondary.light,
    color: theme.palette.primary.main,
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

  const rows = [
    { label: "Nome", value: user.name },
    { label: "Email", value: user.email },
    { label: "Job", value: user.job },
    { label: "Turmas", value: user.classNumbers.join() },
    // {label: "Nome", value: user.name}
  ];

  return (
    <PageWrapper size="sm">
      <TableContainer className={classes.paper} component={Paper}>
        <Typography
          variant="h3"
          style={{ textAlign: "center", marginBottom: "1rem" }}
        >
          Profile
        </Typography>
        <Divider />
        <Table>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.label}>
                <TableCell className={classes.label}>{row.label}</TableCell>
                <TableCell>{row.value}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </PageWrapper>
  );
};

export default UserProfilePage;
