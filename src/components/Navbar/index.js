import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";

import Link from "../Link";

const useStyles = makeStyles((theme) => ({
  root: {
    // flexGrow: 1,
  },
  menu: {
    backgroundColor: theme.palette.secondary.main,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 4,
    fontFamily: "Montserrat, sans-serif",
    color: theme.palette.secondary.light,
    letterSpacing: "3px",
    fontWeight: "600",
    fontSize: "0.9rem",
    // marginLeft: "auto",
  },
  subtitle: {
    // justifySelf: "end",
    marginLeft: "auto",

    // flexGrow: 1,
    fontFamily: "Roboto, sans-serif",
    color: theme.palette.secondary.light,
    // letterSpacing: "3px",
    fontStyle: "italic",
    fontWeight: "600",
    fontSize: "0.7rem",
    paddingRight: "1rem",
  },
  links: {
    display: "flex",
    backgroundColor: theme.palette.primary.light,
    justifyContent: "center",
  },
}));

const Navbar = ({ title, titleRoute, subtitle, icons }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar color="primary" position="static">
        <Toolbar style={{ display: "flex" }}>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>

          <Link to={titleRoute} className={classes.title}>
            {title}
          </Link>
          <Typography className={classes.subtitle}>
            <small>Você está logado como</small> {subtitle}
          </Typography>

          <div className={classes.links}>{icons && icons}</div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
