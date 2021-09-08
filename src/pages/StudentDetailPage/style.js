import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {},
  paper: {
    flexGrow: 1,
    padding: theme.spacing(2),
    marginTop: "1rem",
    // maxWidth: 500,
    backgroundColor: theme.palette.secondary.main,
    border: `5px solid ${theme.palette.primary.dark}`,
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
}));

export default useStyles;
