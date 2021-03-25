import * as yup from "yup";

export default yup.object().shape({
  password: yup
    .string()
    .required("password is required")
    .min(3, "password must be 3 chars long"),
  email: yup
    .string()
    .email("must be a valid email")
    .required("email is required"),
  role: yup
    .string()
    .oneOf(["tl", "instructor", "alumni", "student"], "role is required"),
  Agree: yup.boolean(),

});