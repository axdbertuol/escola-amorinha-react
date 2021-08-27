import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.primary.contrastText,
    border: `5px solid ${theme.palette.secondary.light}`,
    borderRadius: "10px",
    marginBottom: "5rem",
    boxShadow: theme.shadows[10],

    paddingTop: "5rem",
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
}));

export default useStyles;
