import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
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

export default useStyles;
