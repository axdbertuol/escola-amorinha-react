import React from "react";
import { FieldArray, Formik, useFormikContext } from "formik";
import * as yup from "yup";
import "yup-phone-lite";
import { AsYouType } from "libphonenumber-js";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import Button from "@material-ui/core/Button";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import InputLabel from "@material-ui/core/InputLabel";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import DeleteIcon from "@material-ui/icons/Delete";
import { makeStyles } from "@material-ui/core/styles";
import { TextField } from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";

import useLocalStorage from "../../hooks/useLocalStorage";

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

const validationSchema = yup.object({
  id: yup.string(),
  name: yup
    .string("Digite o nome")
    .max(40)
    .matches(/^[a-zA-Z ]+$/, "Digite um nome válido")
    .required("Campo obrigatório!"),
  surname: yup
    .string()
    .max(40)
    .matches(/^[a-zA-Z ]+$/, "Digite um nome válido")
    .required("Campo obrigatório!"),
  birthday: yup.date("dd/MM/yyyy").nullable().required("Campo obrigatório!"),
  sponsorName: yup
    .string()
    .matches(/^[a-zA-Z ]+$/, "Digite um nome válido")
    .required("Campo obrigatório!"),
  sponsorPhone: yup
    .string()
    .phone("BR", "Número inválido")
    .required("Campo obrigatório!"),
  sponsorType: yup.string().required("Campo obrigatório!"),
  emergencyPhone: yup
    .string()
    .phone("BR", "Número inválido")
    .required("Campo obrigatório!"),
  foodRestriction: yup
    .object({
      have: yup.string().required(),
      description: yup.string().optional(),
    })
    .nullable(),
  authorizeStudentImage: yup.string().required(),
  authorizedPeople: yup.array().of(
    yup.object({
      name: yup
        .string("Digite o nome")
        .max(40)
        .matches(/^[a-zA-Z ]+$/, "Digite um nome válido"),
      relation: yup
        .string("Digite uma relação")
        .max(40)
        .matches(/^[a-zA-Z ]+$/, "Digite uma relação válida"),
    })
  ),
  classNumber: yup
    .string()
    .oneOf(["A", "B", "C", "D"])
    .required("Campo obrigatório!"),
});

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
}));

const Teste = () => {
  const { values, errors } = useFormikContext();
  React.useEffect(() => {
    console.log(values, errors);
  });
  return null;
};

const StudentRegisterPage = () => {
  const classes = useStyles();
  const [setSaveToLocalStorage, addStudent] = useLocalStorage();

  return (
    <div className={classes.root}>
      <Formik
        initialValues={{
          id: "",
          name: "",
          surname: "",
          birthday: null,
          sponsorName: "",
          sponsorPhone: "",
          sponsorType: "pais",
          emergencyPhone: "",
          foodRestriction: {
            have: "no",
            description: "",
          },
          authorizeStudentImage: "yes",
          authorizedPeople: [{ name: "", relation: "" }],
          classNumber: "A",
          additionalInfo: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          values.id = "XYZ" + getRndInteger(100, 100000);
          console.log(JSON.stringify(values, null, 2));
          addStudent(values);
          setSaveToLocalStorage(true);
          window.alert("Estudante salvo com sucesso!");
        }}
      >
        {({
          values,
          handleSubmit,
          handleChange,
          handleBlur,
          errors,
          touched,
          setFieldValue,
        }) => (
          <form
            className={classes.form}
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit(e);
            }}
          >
            <TextField
              required
              id="name"
              name="name"
              label="Nome"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              error={Boolean(errors.name) && touched.name}
              helperText={touched.name ? errors.name : ""}
            />

            <TextField
              required
              id="surname"
              name="surname"
              label="Sobrenome"
              value={values.surname}
              onBlur={handleBlur}
              onChange={handleChange}
              error={Boolean(errors.surname) && touched.surname}
              helperText={touched.surname ? errors.surname : ""}
            />
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="dd/MM/yyyy"
                margin="normal"
                id="birthday"
                label="Data de Nascimento"
                name={"birthday"}
                value={values.birthday}
                onChange={(date) => {
                  if (date.toISOString()) {
                    setFieldValue(
                      "birthday",
                      date.getDate() +
                        "/" +
                        (date.getMonth() + 1) +
                        "/" +
                        date.getFullYear()
                    );
                  }
                }}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
              />
            </MuiPickersUtilsProvider>
            <TextField
              required
              id="sponsorName"
              name="sponsorName"
              fullWidth
              onChange={handleChange}
              onBlur={handleBlur}
              label="Nome do responsável pela criança"
              value={values.sponsorName}
              error={Boolean(errors.sponsorName) && touched.sponsorName}
              helperText={touched.sponsorName ? errors.sponsorName : ""}
            />
            <TextField
              required
              fullWidth
              id="sponsorPhone"
              name="sponsorPhone"
              value={values.sponsorPhone}
              // onChange={handleChange}
              placeholder="(48) 99999-9999"
              onBlur={handleBlur}
              onInput={(e) => {
                if (e.target.value.length > 15) {
                  return;
                }
                setFieldValue(
                  "sponsorPhone",
                  new AsYouType("BR").input(e.target.value)
                );
              }}
              error={Boolean(errors.sponsorPhone) && touched.sponsorPhone}
              helperText={touched.sponsorName ? errors.sponsorPhone : ""}
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
                  name="sponsorType"
                  value={values.sponsorType}
                  onChange={handleChange}
                >
                  <FormControlLabel
                    value="pais"
                    control={<Radio />}
                    label="Pais"
                  />
                  <FormControlLabel
                    value="tios"
                    control={<Radio />}
                    label="Tios"
                  />
                  <FormControlLabel
                    value="avós"
                    control={<Radio />}
                    label="Avós"
                  />
                  <FormControlLabel
                    value="padrinhos"
                    control={<Radio />}
                    label="Padrinhos"
                  />
                </RadioGroup>
              </FormControl>
            </div>
            <TextField
              required
              fullWidth
              name="emergencyPhone"
              id="emergencyPhone"
              value={values.emergencyPhone}
              onBlur={handleBlur}
              onInput={(e) => {
                if (e.target.value.length > 15) {
                  return;
                }
                setFieldValue(
                  "emergencyPhone",
                  new AsYouType("BR").input(e.target.value)
                );
              }}
              label="Telefone de Emergência"
              placeholder="(48) 99999-9999"
              error={Boolean(errors.emergencyPhone) && touched.emergencyPhone}
              helperText={touched.emergencyPhone ? errors.emergencyPhone : ""}
            />
            <div className={classes.formGroup}>
              <FormControl component="fieldset" required>
                <FormLabel component="legend">
                  Possui alguma restrição alimentar?
                </FormLabel>
                <RadioGroup
                  row
                  aria-label="Possui alguma restrição alimentar?"
                  name="foodRestriction"
                  id="foodRestriction"
                  value={values.foodRestriction.have}
                  onChange={(e) =>
                    setFieldValue("foodRestriction", {
                      ...values.foodRestriction,
                      have: e.target.value,
                    })
                  }
                >
                  <FormControlLabel
                    value={"no"}
                    control={<Radio />}
                    label="Não"
                  />
                  <FormControlLabel
                    value={"yes"}
                    control={<Radio />}
                    label="Sim"
                  />
                </RadioGroup>
              </FormControl>
            </div>
            {values.foodRestriction.have === "yes" && (
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
                  name="authorizeStudentImage"
                  id="authorizeStudentImage"
                  value={values.authorizeStudentImage}
                  onChange={handleChange}
                >
                  <FormControlLabel
                    value={"yes"}
                    control={<Radio />}
                    label="Sim"
                  />
                  <FormControlLabel
                    value={"no"}
                    control={<Radio />}
                    label="Não"
                  />
                </RadioGroup>
              </FormControl>
            </div>
            <FormControl className={classes.formGroup} component="div">
              <FormLabel component="legend">
                Adicionar pessoa autorizada
              </FormLabel>
              <FieldArray
                name="authorizedPeople"
                render={({ remove, push }) => (
                  <div>
                    {values.authorizedPeople.length > 0 &&
                      values.authorizedPeople.map(
                        ({ name, relation }, index) => {
                          const id = "auth-person-" + getRndInteger(0, 100000);

                          return (
                            <div key={id}>
                              <TextField
                                name={`authorizedPeople.${index}.name`}
                                value={name}
                                label="Nome"
                                onChange={handleChange}
                                onBlur={handleBlur}
                              />
                              <TextField
                                name={`authorizedPeople.${index}.relation`}
                                value={relation}
                                label="Relação"
                                onChange={handleChange}
                                onBlur={handleBlur}
                              />
                              {index !== 0 && (
                                <Button
                                  variant="contained"
                                  color="secondary"
                                  className={classes.button}
                                  startIcon={<DeleteIcon />}
                                  onClick={() => remove(index)}
                                >
                                  Delete
                                </Button>
                              )}
                            </div>
                          );
                        }
                      )}
                    <Fab
                      size="small"
                      color="primary"
                      aria-label="add"
                      onClick={() => push({ name: "", relation: "" })}
                    >
                      <AddIcon />
                    </Fab>
                  </div>
                )}
              />
            </FormControl>
            <FormControl className={classes.formGroup}>
              <InputLabel required id="classNumber">
                Turma
              </InputLabel>
              <Select
                labelId="classNumber"
                id="classNumber"
                name="classNumber"
                value={values.classNumber}
                onChange={handleChange}
              >
                <MenuItem value={"A"}>A</MenuItem>
                <MenuItem value={"B"}>B</MenuItem>
                <MenuItem value={"C"}>C</MenuItem>
                <MenuItem value={"D"}>D</MenuItem>
              </Select>
            </FormControl>

            <TextField
              id="additionalInfo"
              name="additionalInfo"
              fullWidth
              onChange={handleChange}
              onBlur={handleBlur}
              label="Informações adicionais"
              value={values.additionalInfo}
              error={Boolean(errors.additionalInfo) && touched.additionalInfo}
              helperText={touched.additionalInfo ? errors.additionalInfo : ""}
            />
            <Button
              className={classes.formGroup}
              variant="contained"
              color="primary"
              type="submit"
            >
              Registrar
            </Button>
            <Teste />
          </form>
        )}
      </Formik>
    </div>
  );
};

export default StudentRegisterPage;
