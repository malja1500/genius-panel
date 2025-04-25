import * as yup from "yup";

export const userConnectionFormSchema = yup.object().shape({
  phoneNumber: yup.string().nullable(),
  gmail: yup.string().nullable(),
  recoveryEmail: yup.string().nullable(),
  telegramLink: yup.string().nullable(),
  linkdinProfile: yup.string().nullable(),
});
