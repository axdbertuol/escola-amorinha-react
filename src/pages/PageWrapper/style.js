import { makeStyles } from "@material-ui/core";

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

export default useStyles;
