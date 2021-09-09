import React, { useContext } from "react";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import PersonTwoToneIcon from "@material-ui/icons/PersonTwoTone";
import MenuIcon from "@material-ui/icons/Menu";
import { makeStyles } from "@material-ui/core/styles";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import AccountCircle from "@material-ui/icons/AccountCircle";
import ListAltIcon from "@material-ui/icons/ListAlt";
import { Divider, IconButton } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import Link from "../../components/Link";
import Navbar from "../../components/Navbar";
import { Context as AuthContext } from "../../context/AuthContext";

const useStyles = makeStyles((theme) => ({
  nav: {
    display: "flex",
    marginTop: "1rem",
    borderBottom: "4px solid " + theme.palette.primary.dark,
    borderBottomRightRadius: "5px",
    borderBottomLeftRadius: "5px",
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
  contentContainer: {
    minHeight: "85vh",
    // width: "100px",
  },
  mainContainer: {
    width: "80%",
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    // borderRight: "1px solid " + theme.palette.primary.main,
    // borderLeft: "1px solid " + theme.palette.primary.main,
  },
  footer: {
    padding: "1rem",
    justifyContent: "center",
    backgroundColor: theme.palette.primary.main,
  },
}));

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      Alexandre Bertuol {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const makeIcons = (history, job) => {
  return (
    <>
      {job === "Diretor" && (
        <IconButton color="secondary" onClick={() => history.push("/register")}>
          <PersonAddIcon />
        </IconButton>
      )}
      <IconButton color="secondary" onClick={() => history.push("/list")}>
        <ListAltIcon />
      </IconButton>
      <IconButton color="secondary" onClick={() => history.push("/profile")}>
        <AccountCircle />
      </IconButton>
    </>
  );
};

const PageWrapper = ({ children, title = "Escolinha Amorinha", size }) => {
  const classes = useStyles();
  let history = useHistory();
  const {
    state: { user },
  } = useContext(AuthContext);

  const subtitle = `${user.job} ${user.name}`;
  return (
    <div className={classes.mainContainer}>
      <Navbar
        title={title}
        titleRoute={"/"}
        subtitle={subtitle}
        icons={makeIcons(history, user.job)}
      />
      <Container maxWidth={size || "sm"} className={classes.contentContainer}>
        {children}
      </Container>
      <Box className={classes.footer}>
        <Copyright />
      </Box>
    </div>
  );
};

export default PageWrapper;
