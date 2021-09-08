import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {},
  paper: {
    flexGrow: 1,
    padding: theme.spacing(2),
    marginTop: "1rem",
    // maxWidth: 500,
    backgroundColor: theme.palette.secondary.light,
    color: theme.palette.primary.main,
    border: `5px solid ${theme.palette.primary.dark}`,
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
}));

export default useStyles;
