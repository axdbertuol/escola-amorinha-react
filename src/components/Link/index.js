import React from "react";
import { NavLink } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    textDecoration: "none",
    // backgroundColor: theme.palette.primary.dark,
    flexGrow: 1,
    padding: "1rem",
    justifyItems: "center",
    fontFamily: "Roboto, sans-serif",
    fontWeight: "600",
    borderLeftRadius: "5px",
    textAlign: "center",
    color: theme.palette.secondary.light,
    // borderRight: "1px solid #000",
  },
  active: {
    backgroundColor: theme.palette.primary.light,
    // color: "red",
  },
}));
const Link = ({ children, to, color }) => {
  const classes = useStyles();
  return (
    <NavLink
      // activeClassName={classes.active}
      className={classes.root}
      to={to}
      color={color || ""}
    >
      <Typography
        style={{
          letterSpacing: "5px",
          color: "secondary",
        }}
      >
        {children}
      </Typography>
    </NavLink>
  );
};

export default Link;
