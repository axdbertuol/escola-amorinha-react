import React, { useEffect } from "react";
import { useFormikContext, FieldArray, Formik } from "formik";
import * as yup from "yup";
import "yup-phone-lite";
import { AsYouType } from "libphonenumber-js";
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
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import { makeStyles } from "@material-ui/core/styles";
import { TextField } from "@material-ui/core";

import { Context as StudentFormDataContext } from "../../context/StudentFormContext";

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

const validationSchema = yup.object({
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
      id: yup.string().required(),
      name: yup
        .string("Digite o nome")
        .max(40)
        .matches(/^[a-zA-Z ]+$/, "Digite um nome válido")
        .required("Campo obrigatório!"),
      relation: yup
        .string("Digite uma relação")
        .max(40)
        .matches(/^[a-zA-Z ]+$/, "Digite uma relação válida")
        .required("Campo obrigatório!"),
    })
  ),
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
  },
}));

const StudentRegisterPage = () => {
  const classes = useStyles();
  // const { values, submitForm } = useFormikContext();
  // useEffect(() => {
  //   console.log(values);
  // }, [values]);

  const addAuthorizedPerson = (push) =>
    push({ id: "", name: "", relation: "" });
  return (
    <div className={classes.root}>
      <Formik
        initialValues={{
          name: "",
          surname: "",
          sponsorName: "",
          sponsorPhone: "",
          sponsorType: "pais",
          emergencyPhone: "",
          foodRestriction: {
            have: "no",
            description: "",
          },
          authorizeStudentImage: "yes",
          authorizedPeople: [{ id: "", name: "", relation: "" }],
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(JSON.stringify(values, null, 2));
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
          <form className={classes.form} onSubmit={handleSubmit}>
            <TextField
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
              id="surname"
              name="surname"
              label="Sobrenome"
              value={values.surname}
              onBlur={handleBlur}
              onChange={handleChange}
              error={Boolean(errors.surname) && touched.surname}
              helperText={touched.surname ? errors.surname : ""}
            />
            <TextField
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
            <FieldArray
              name="authorizedPeople"
              render={({ remove, push }) => (
                <div>
                  {values.authorizedPeople.length > 0 &&
                    values.authorizedPeople.map(
                      ({ id, name, relation }, index) => {
                        if (id === "") {
                          const id = "auth-person-" + getRndInteger(0, 100000);
                          setFieldValue(`authorizedPeople.${index}.id`, id);
                          console.log(values.authorizedPeople);
                        }
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
                    onClick={() => addAuthorizedPerson(push)}
                  >
                    <AddIcon />
                  </Fab>
                </div>
              )}
            ></FieldArray>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default StudentRegisterPage;
