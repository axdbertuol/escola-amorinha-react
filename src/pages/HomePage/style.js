import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  nav: {
    display: "flex",
    alignItems: "center",
    justifyItems: "center",
    justifyContent: "center",
    "& > *": {
      margin: theme.spacing(2),
    },
  },
  paper: {
    flexGrow: 1,
    padding: theme.spacing(2),
    margin: "2rem 0",
    border: "2px solid " + theme.palette.primary.main,
    // maxWidth: 500,
    color: theme.palette.primary.main,
    borderRadius: "10px",
    // marginBottom: "5rem",
    boxShadow: theme.shadows[10],
    backgroundColor: theme.palette.common.white,
  },
}));

export default useStyles;
