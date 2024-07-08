import * as yup from "yup";

export const createUserFormSchema = yup.object().shape({
  firstName: yup.string().required("این فیلد الزامی می باشد"),
  lastName: yup.string().required("این فیلد الزامی می باشد"),
  gmail: yup.string().required("این فیلد الزامی می باشد"),
  password: yup.string().required("این فیلد الزامی می باشد"),
  phoneNumber: yup.string().required("این فیلد الزامی می باشد"),
  isStudent: yup.boolean(),
  isTeacher: yup.boolean(),
});
