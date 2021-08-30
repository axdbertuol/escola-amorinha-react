import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.secondary.light,
    border: `5px solid ${theme.palette.primary.dark}`,
    borderRadius: "10px",
    marginBottom: "5rem",
    boxShadow: theme.shadows[10],

    // height: "500px",
    width: "100%",
  },
  searchbar: {
    backgroundColor: theme.palette.secondary.main,
    borderRadius: "10px",
    border: `2px solid ${theme.palette.primary.dark}`,
    overflow: "hidden",
    marginBottom: "0.2rem",
    width: "70%",
  },
}));

export default useStyles;
