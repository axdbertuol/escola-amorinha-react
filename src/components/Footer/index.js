import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.background,
  },
}));

const Footer = ({ title, className }) => {
  const classes = useStyles();
  return (
    <header className="header">
      <Typography
        className={className}
        // variant="h3"
        // component="h2"
        // color="primary"
      >
        {title}
      </Typography>
    </header>
  );
};

export default Footer;
