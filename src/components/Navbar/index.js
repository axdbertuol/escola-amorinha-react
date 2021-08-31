import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    width: "70vw",
  },
  active: {
    backgroundColor: theme.palette.primary.main,
  },
}));
const Navbar = ({ children }) => {
  const classes = useStyles();

  return (
    <nav className={classes.root}>
      <ButtonGroup
        variant="contained"
        color="primary"
        aria-label="contained primary button group"
      >
        <Button>One</Button>
        <Button>Two</Button>
        <Button>Three</Button>
      </ButtonGroup>
    </nav>
  );
};

export default Navbar;
