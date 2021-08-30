import React, { useState } from "react";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import Fade from "@material-ui/core/Fade";
import PersonTwoToneIcon from "@material-ui/icons/PersonTwoTone";

import { useHistory, NavLink } from "react-router-dom";
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
    // alignItems: "center",
    width: "25rem",
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
  const history = useHistory();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

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
      </nav>
      <Container maxWidth={size || "sm"}>
        <div>{children}</div>
      </Container>
    </>
  );
};

export default PageWrapper;
