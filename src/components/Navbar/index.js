import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

import Link from "../Link";
import useStyles from "./style";

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
