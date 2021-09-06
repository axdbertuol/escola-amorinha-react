import * as yup from "yup";
import "yup-phone-lite";

const userValidationSchema = yup.object({
  email: yup
    .string("Digite seu email")
    .email("Digite um email válido!")
    .required("Campo Obrigatório"),
  password: yup
    .string("Digite sua senha")
    .min(5, "Senha precisa ter 5 caracteres")
    .required("Campo Obrigatório"),
});

export default userValidationSchema;
