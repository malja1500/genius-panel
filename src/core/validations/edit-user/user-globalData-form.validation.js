import * as yup from "yup";

export const editUserGlobalDataFromSchema = yup.object().shape({
  fName: yup.string().nullable(),
  lName: yup.string().nullable(),
  userAbout: yup.string().nullable(),
  gmail: yup.string().nullable(),
  nationalCode: yup.string().nullable(),
  gender: yup.boolean().nullable(),
  homeAdderess: yup.string().nullable(),
  birthDay: yup.string().nullable(),
});
