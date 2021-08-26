import * as yup from "yup";
import "yup-phone-lite";

const studentValidationSchema = yup.object({
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

export default studentValidationSchema;
