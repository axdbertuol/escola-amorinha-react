import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: "10px",
    margin: "2rem 0",
    boxShadow: theme.shadows[10],
    border: "2px solid " + theme.palette.primary.main,

    padding: "15px",
    "& .MuiTextField-root": {
      margin: theme.spacing(2),
    },
  },
  form: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
  },

  twoFieldsRow: {
    display: "flex",
    justifyContent: "space-between",
    flexGrow: 1,
  },
  formGroup: {
    margin: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
    minWidth: "15rem",
  },
  marginTop2: {
    marginTop: theme.spacing(2),
  },
  title: {
    padding: "10px",
    color: theme.palette.primary.main,
    textAlign: "center",
  },
}));

export default useStyles;
