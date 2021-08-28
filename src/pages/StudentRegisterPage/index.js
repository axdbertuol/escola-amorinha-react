import React, { useContext } from "react";
import { FieldArray, Formik, useFormikContext } from "formik";
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
import { TextField } from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Checkbox from "@material-ui/core/Checkbox";
import { useParams, useHistory, Redirect } from "react-router-dom";
import CloseIcon from "@material-ui/icons/Close";
import { Divider } from "@material-ui/core";

import ColorRadio from "../../components/ColorRadio";
import Header from "../../components/Header";
import PageWrapper from "../PageWrapper";
import useStyles from "./StudentRegisterPage.style";
import validationSchema from "./StudentRegisterPage.schema";
import { Context as StudentsContext } from "../../context/StudentsContext";
import { getRndInteger } from "../../utils/functions";

const initialValues = {
  id: "",
  name: "",
  surname: "",
  birthday: null,
  sponsorName: "",
  sponsorPhone: "",
  sponsorType: "pais",
  emergencyPhone: "",
  foodRestriction: {
    have: false,
    description: "",
  },
  authorizeStudentImage: false,
  authorizedPeople: [{ name: "", relation: "" }],
  classNumber: "",
  additionalInfo: "",
};
const Teste = () => {
  const { values, errors } = useFormikContext();
  React.useEffect(() => {
    console.log(values, errors);
  });
  return null;
};

const StudentRegisterPage = () => {
  let params = useParams();
  let history = useHistory();
  const {
    state: { students },
    addStudent,
    editStudent,
  } = useContext(StudentsContext);
  const classes = useStyles();
  React.useEffect(() => {
    console.log("students", students);
  }, [students]);

  return (
    <PageWrapper>
      <div className={classes.root}>
        <Header title="Registro de Aluno" />
        <Divider variant="middle" />
        <Formik
          initialValues={
            params.id
              ? students.find((student) => student.id === params.id)
              : initialValues
          }
          validationSchema={validationSchema}
          onSubmit={(values) => {
            if (!params.id) {
              values.id =
                Math.random().toString(36).substr(2, 5) +
                "_" +
                getRndInteger(100, 100000);
              console.log(JSON.stringify(values, null, 2));
              addStudent(values);
              window.alert("Estudante salvo com sucesso!");
            } else if (params.id) {
              editStudent(values.id, values);
              console.log("edited student");
              window.alert("Estudante editado com sucesso!");
              history.push("/list");
            }
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
                // e.preventDefault();
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
                  disableFuture
                  placeholder={"08/10/2000"}
                  label="Data de Nascimento"
                  name={"birthday"}
                  value={values.birthday}
                  onChange={(date) => setFieldValue("birthday", date)}
                  invalidDateMessage="Data inválida"
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
                required
                fullWidth
                id="sponsorPhone"
                name="sponsorPhone"
                value={values.sponsorPhone}
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
                      control={<ColorRadio />}
                      label="Pais"
                    />
                    <FormControlLabel
                      value="tios"
                      control={<ColorRadio />}
                      label="Tios"
                    />
                    <FormControlLabel
                      value="avós"
                      control={<ColorRadio />}
                      label="Avós"
                    />
                    <FormControlLabel
                      value="padrinhos"
                      control={<ColorRadio />}
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
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={values.foodRestriction.have}
                      onChange={handleChange}
                      name="foodRestriction.have"
                      color="primary"
                    />
                  }
                  label="Possui alguma restrição alimentar?"
                />
                {values.foodRestriction.have && (
                  <TextField
                    required
                    id="foodRestriction.description"
                    name="foodRestriction.description"
                    value={values.foodRestriction.description}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    fullWidth
                    label="Descrição da Restrição Alimentar"
                    multiline
                    rows={4}
                  />
                )}
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={values.authorizeStudentImage}
                      onChange={handleChange}
                      name="authorizeStudentImage"
                      color="primary"
                    />
                  }
                  label="Autoriza o uso da imagem do aluno?"
                />
              </div>
              <FormControl className={classes.formGroup} component="div">
                <FormLabel component="legend">
                  Adicionar pessoa autorizada
                </FormLabel>
                <FieldArray
                  name="authorizedPeople"
                  render={({ remove, push }) => (
                    <div>
                      {values.authorizedPeople &&
                        values.authorizedPeople.map(
                          ({ name, relation }, index) => {
                            const id = `auth-person-${index}-`;

                            return (
                              <div>
                                <TextField
                                  key={id + "-name"}
                                  name={`authorizedPeople.${index}.name`}
                                  id={`authorizedPeople.${index}.name`}
                                  value={name}
                                  label="Nome"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                />
                                <TextField
                                  key={id + "-relation"}
                                  name={`authorizedPeople.${index}.relation`}
                                  value={relation}
                                  label="Relação"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                />
                                {index !== 0 && (
                                  <Fab
                                    size="small"
                                    color="secondary"
                                    aria-label="close"
                                    className={classes.marginTop2}
                                    onClick={() => remove(index)}
                                  >
                                    <CloseIcon />
                                  </Fab>
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
                        style={{ marginLeft: "1rem" }}
                      >
                        <AddIcon />
                      </Fab>
                    </div>
                  )}
                />
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
                {params.id ? "Salvar" : "Registrar"}
              </Button>
              {/* <Teste /> */}
            </form>
          )}
        </Formik>
      </div>
    </PageWrapper>
  );
};

export default StudentRegisterPage;
