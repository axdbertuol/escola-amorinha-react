import React, { useContext, useEffect } from "react";
import { useFormik } from "formik";
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
import { makeStyles } from "@material-ui/core/styles";
import { TextField } from "@material-ui/core";

import { Context as StudentFormDataContext } from "../../context/StudentFormContext";

let asYouType = new AsYouType();
asYouType.defaultCountry = "BR";

const validationSchema = yup.object({
  name: yup
    .string("Digite o nome")
    .max(40)
    .matches(/^[a-zA-Z]+$/, "Digite um nome válido")
    .required("Campo obrigatório!"),
  surname: yup
    .string()
    .max(40)
    .matches(/^[a-zA-Z]+$/, "Digite um nome válido")
    .required("Campo obrigatório!"),
  sponsorName: yup
    .string()
    .matches(/^[a-zA-Z]+$/, "Digite um nome válido")
    .required("Campo obrigatório!"),
  sponsorPhone: yup
    .string()
    .phone("BR", "Número inválido")
    .required("Campo obrigatório!"),
  sponsorType: yup.string().required("Campo obrigatório!"),
  emergencyPhone: yup.string().required("Campo obrigatório!"),
  foodRestriction: yup.object({
    have: yup.string().required(),
    description: yup.string().optional(),
  }),
  authorizeStudentImage: yup.string().required(),
  authorizedPeople: yup
    .array()
    .of(yup.object({ id: "", name: "", relation: "" })),
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

  const formik = useFormik({
    initialValues: {
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
      authorizedPeople: [{ id: "", name: "", sponsorType: "" }],
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(JSON.stringify(values, null, 2));
    },
  });

  useEffect(() => {
    console.log("formik values changed", formik.values);
  }, [formik.values]);

  useEffect(() => {
    console.log("formik errors", formik.errors);
  }, [formik.errors]);

  return (
    <div className={classes.root}>
      <form className={classes.form} onSubmit={formik.handleSubmit}>
        <TextField
          id="name"
          name="name"
          label="Nome"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={Boolean(formik.errors.name) && formik.touched.name}
          helperText={formik.touched.name ? formik.errors.name : ""}
        />
        <TextField
          id="surname"
          name="surname"
          label="Sobrenome"
          value={formik.values.surname}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          error={Boolean(formik.errors.surname) && formik.touched.surname}
          helperText={formik.touched.surname ? formik.errors.surname : ""}
        />
        <TextField
          id="sponsorName"
          name="sponsorName"
          fullWidth
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          label="Nome do responsável pela criança"
          value={formik.values.sponsorName}
          error={
            Boolean(formik.errors.sponsorName) && formik.touched.sponsorName
          }
          helperText={
            formik.touched.sponsorName ? formik.errors.sponsorName : ""
          }
        />
        <TextField
          fullWidth
          id="sponsorPhone"
          name="sponsorPhone"
          value={formik.values.sponsorPhone}
          // onChange={formik.handleChange}
          placeholder="(48) 99999-9999"
          onBlur={formik.handleBlur}
          onInput={(e) => {
            formik.setFieldValue(
              "sponsorPhone",
              new AsYouType("BR").input(e.target.value)
            );
          }}
          error={
            Boolean(formik.errors.sponsorPhone) && formik.touched.sponsorPhone
          }
          helperText={formik.errors.sponsorPhone}
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
              value={formik.values.sponsorType}
              onChange={formik.handleChange}
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
      </form>
    </div>
  );
};

export default StudentRegisterPage;
