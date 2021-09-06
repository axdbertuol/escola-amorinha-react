import React from "react";
import Container from "@material-ui/core/Container";
import PersonTwoToneIcon from "@material-ui/icons/PersonTwoTone";
import MenuIcon from "@material-ui/icons/Menu";
import { makeStyles } from "@material-ui/core/styles";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import AccountCircle from '@material-ui/icons/AccountCircle';
import ListAltIcon from "@material-ui/icons/ListAlt";
import { Divider, IconButton } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import Link from "../../components/Link";
import Navbar from "../../components/Navbar";

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

const makeIcons = (history) => {

  return (
    <>
      <IconButton color="secondary" onClick={() => history.push('/register')}>
        <PersonAddIcon />
      </IconButton>
      <IconButton color="secondary" onClick={() => history.push('/list')}>
        <ListAltIcon />
      </IconButton>
      <IconButton color="secondary" onClick={() => history.push('/list')}>
        <AccountCircle />
      </IconButton>
    </>
  );
};

const PageWrapper = ({ children, title = "Escolinha Amorinha", size }) => {
  const classes = useStyles();
  let history = useHistory();


  return (
    <>
      <Navbar title={title} icons={makeIcons(history)} />
      <Container maxWidth={size || "sm"}>
        <div>{children}</div>
      </Container>
    </>
  );
};

export default PageWrapper;
