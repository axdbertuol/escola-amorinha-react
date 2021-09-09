import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {},
  paper: {
    flexGrow: 1,
    padding: theme.spacing(2),
    margin: "2rem 0",
    backgroundColor: theme.palette.common.white,
    border: "2px solid " + theme.palette.primary.main,
    // maxWidth: 500,
    color: theme.palette.primary.main,
    borderRadius: "10px",
    // marginBottom: "5rem",
    boxShadow: theme.shadows[10],
  },
  modal: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  label: {
    fontWeight: "500",
  },
  title: {
    padding: "10px",
    color: theme.palette.primary.main,
    textAlign: "center",
  },
}));

export default useStyles;
