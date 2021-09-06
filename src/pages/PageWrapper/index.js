import React from "react";
import Container from "@material-ui/core/Container";
import PersonTwoToneIcon from "@material-ui/icons/PersonTwoTone";
import MenuIcon from "@material-ui/icons/Menu";
import { makeStyles } from "@material-ui/core/styles";
import Link from "../../components/Link";
import { Divider, IconButton } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  nav: {
    display: "flex",
    marginTop: "1rem",
    borderBottom: "4px solid " + theme.palette.primary.dark,
    borderBottomRightRadius: "5px",
    borderBottomLeftRadius: "5px",
    overflow: "hidden",
    width: "30rem",
    margin: "0 auto",
    backgroundColor: "transparent",
    boxShadow: theme.shadows["10"],
    marginBottom: "1rem",
    "& > .MuiButtonGroup-root": {
      alignItems: "center",
    },
  },
  links: {
    display: "flex",
    flexGrow: 1,

    backgroundColor: theme.palette.primary.light,
    justifyContent: "center",
  },
}));

const PageWrapper = ({ children, title = "Escolinha Amorinha", size }) => {
  const classes = useStyles();
  // const history = useHistory();

  return (
    <>
      <nav className={classes.nav}>
        <IconButton color="primary">
          <PersonTwoToneIcon />
        </IconButton>
        <Divider light flexItem orientation="vertical" />
        <div className={classes.links}>
          <Link to="/">Home</Link>
          <Link to="/register">Register</Link>
          <Link to="/list">List</Link>
        </div>
        <IconButton color="primary">
          <MenuIcon color="secondary" />
        </IconButton>
      </nav>
      <Container maxWidth={size || "sm"}>
        <div>{children}</div>
      </Container>
    </>
  );
};

export default PageWrapper;
