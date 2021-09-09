import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {},
  paper: {
    backgroundColor: theme.palette.common.white,
    flexGrow: 1,
    padding: theme.spacing(2),
    border: "2px solid " + theme.palette.primary.main,
    margin: "2rem 0",
    // maxWidth: 500,
    borderRadius: "10px",
    // marginBottom: "5rem",
    boxShadow: theme.shadows[10],
  },
  image: {
    width: 128,
    height: 128,
  },
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
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
