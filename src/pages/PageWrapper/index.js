import { IconButton } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import ListAltIcon from "@material-ui/icons/ListAlt";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import React, { useContext } from "react";

import { Context as AuthContext } from "../../context/AuthContext";
import Copyright from "../../components/Copyright";
import Navbar from "../../components/Navbar";
import useStyles from "./style";

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
