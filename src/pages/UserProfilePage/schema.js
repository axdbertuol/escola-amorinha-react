import * as yup from "yup";

const passwordValidationSchema = yup.object({
  currPassword: yup
    .string("Digite sua senha atual")
    .min(5, "Senha precisa ter 5 caracteres")
    .required("Campo Obrigatório"),
  newPassword: yup
    .string("Digite sua senha nova")
    .min(5, "Senha precisa ter 5 caracteres")
    .required("Campo Obrigatório"),
  newPasswordConfirm: yup
    .string("Repita sua senha nova")
    .min(5, "Senha precisa ter 5 caracteres")
    .required("Campo Obrigatório"),
});

export default passwordValidationSchema;
