import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import "./header.css";

const useStyles = makeStyles((theme) => ({
  root: {
    ...theme.typography.h2,
    fontFamily: "Montserrat', sans-serif;",
    fontSmooth: "normal",
    textAlign: "center",
    color: theme.palette.primary.main,
    fontWeight: "300",
    // padding: theme.spacing(1),
  },
}));

const Header = ({ title }) => {
  const classes = useStyles();
  return (
    <header className="header">
      <Typography
        className={classes.root}
        variant="h3"
        component="h2"
        color="primary"
      >
        {title}
      </Typography>
    </header>
  );
};

export default Header;
