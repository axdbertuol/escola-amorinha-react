import React, { useContext, useState } from "react";
import Button from "@material-ui/core/Button";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Typography from "@material-ui/core/Typography";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import FormGroup from "@material-ui/core/FormGroup";
import { makeStyles } from "@material-ui/core/styles";
import { TextField } from "@material-ui/core";

import { Context as StudentFormDataContext } from "../../context/StudentFormContext";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "",
    border: "1px solid #000",
    borderTop: "none",
    borderRadius: "10px",
    marginBottom: "5rem",
    paddingBottom: "5rem",
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
  // textField: {
  //   width: "25rem",
  // },
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
  },
}));

const StudentRegisterPage = () => {
  const {
    state,
    addAuthorizedPerson,
    setStudentFormData,
    setSponsorType,
    setFoodRestriction,
  } = useContext(StudentFormDataContext);
  const [authorizedPeople, setAuthorizedPeople] = useState([]);
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <form className={classes.form}>
        <TextField
          className={classes.textField}
          required
          id="name"
          label="Nome"
        />
        <TextField
          className={classes.textField}
          required
          id="surname"
          label="Sobrenome"
        />
        <TextField
          required
          id="sponsorName"
          fullWidth
          className={classes.textField}
          label="Nome do responsável pela criança"
        />
        <TextField
          required
          fullWidth
          id="parentPhone"
          className={classes.textField}
          label="Telefone de Contato do Responsável pela criança"
        />
        <div className={classes.formGroup}>
          <FormControl component="fieldset" required>
            <FormLabel component="legend">
              Quem devemos chamar em caso de emergência?
            </FormLabel>
            <RadioGroup
              row
              aria-label="Quem devemos chamar em caso de emergência?"
              name="sponsorRadio"
              value={state.sponsorType}
              onChange={(e) => {
                setSponsorType({ sponsorType: e.target.value });
              }}
            >
              <FormControlLabel value="pais" control={<Radio />} label="Pais" />
              <FormControlLabel value="tios" control={<Radio />} label="Tios" />
              <FormControlLabel value="avós" control={<Radio />} label="Avós" />
              <FormControlLabel
                value="padrinhos"
                control={<Radio />}
                label="Padrinhos"
              />
            </RadioGroup>
          </FormControl>
        </div>
        <TextField fullWidth id="sponsorPhone" label="Telefone de Emergência" />
        <div className={classes.formGroup}>
          <FormControl component="fieldset" required>
            <FormLabel component="legend">
              Possui alguma restrição alimentar?
            </FormLabel>
            <RadioGroup
              row
              aria-label="Possui alguma restrição alimentar?"
              name="foodRestrictionRadio"
              value={state.foodRestriction.have}
              onChange={(e) => {
                setFoodRestriction({ have: e.target.value });
              }}
            >
              <FormControlLabel value={"no"} control={<Radio />} label="Não" />
              <FormControlLabel value={"yes"} control={<Radio />} label="Sim" />
            </RadioGroup>
          </FormControl>
        </div>
        {state.foodRestriction.have === "yes" && (
          <TextField
            required
            id="foodRestrictionList"
            fullWidth
            label="Descrição da Restrição Alimentar"
            multiline
            rows={4}
          />
        )}
        <div className={classes.formGroup}>
          <FormControl component="fieldset" required>
            <FormLabel component="legend">
              Autoriza fotos e vídeos da criança para uso escolar?
            </FormLabel>
            <RadioGroup
              row
              aria-label="Possui alguma restrição alimentar?"
              name="authorizeStudentImageRadio"
              value={state.authorizeStudentImage}
              onChange={(e) => {
                setStudentFormData({ authorizeStudentImage: e.target.value });
              }}
            >
              <FormControlLabel value={"yes"} control={<Radio />} label="Sim" />
              <FormControlLabel value={"no"} control={<Radio />} label="Não" />
            </RadioGroup>
          </FormControl>
        </div>
        <FormControl component="fieldset" required>
          <FormLabel component="legend">
            Lista de Autorizados a pegar a criança
          </FormLabel>
          <div className={classes.formGroup}>
            <FormGroup id="person-1" row name="AuthorizedPeopleList">
              <TextField
                label="Nome"
                name="name"
                onChange={(e) => {
                  console.log("name", e);
                }}
                required
              />
              <TextField
                label="Parentesco"
                name="parentesco"
                onChange={(e) => {
                  console.log("parentesco", e);
                  // addAuthorizedPerson(personName, personParenthood);
                }}
                required
              />
            </FormGroup>
          </div>
        </FormControl>
        <Fab size="small" color="primary" aria-label="add">
          <AddIcon />
        </Fab>
      </form>
    </div>
  );
};

export default StudentRegisterPage;
