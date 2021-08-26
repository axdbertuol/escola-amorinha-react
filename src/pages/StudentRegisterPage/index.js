import React from "react";
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
import DeleteIcon from "@material-ui/icons/Delete";
import { TextField } from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Checkbox from "@material-ui/core/Checkbox";
import { useParams } from "react-router-dom";

import useStyles from "./StudentRegisterPage.style";
import validationSchema from "./StudentRegisterPage.schema";
import useLocalStorage from "../../hooks/useLocalStorage";
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
  classNumber: "A",
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
  const { id } = useParams();
  const [isEditing, setIsEditing] = React.useState(Boolean(id));
  const classes = useStyles();
  const [setSaveToLocalStorage, getStudentFromLocalStorage, addStudent] =
    useLocalStorage();

  return (
    <div className={classes.root}>
      <Formik
        initialValues={
          isEditing ? getStudentFromLocalStorage(id) : initialValues
        }
        validationSchema={validationSchema}
        onSubmit={(values) => {
          values.id = "XYZ" + getRndInteger(100, 100000);
          console.log(JSON.stringify(values, null, 2));
          addStudent(values);
          setSaveToLocalStorage(true);
          window.alert(
            isEditing
              ? "Estudante editado com sucesso!"
              : "Estudante salvo com sucesso!"
          );
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
                  id="foodRestrictionList"
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
                    {values.authorizedPeople.length > 0 &&
                      values.authorizedPeople.map(
                        ({ name, relation }, index) => {
                          const id = "auth-person-" + getRndInteger(0, 100000);

                          return (
                            <div>
                              <TextField
                                key={id + "-name"}
                                name={`authorizedPeople.${index}.name`}
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
              {isEditing ? "Salvar" : "Registrar"}
            </Button>
            <Teste />
          </form>
        )}
      </Formik>
    </div>
  );
};

export default StudentRegisterPage;
