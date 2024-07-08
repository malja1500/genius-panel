import * as yup from "yup";

export const courseGroupFormSchema = yup.object().shape({
  groupName: yup.string().required("این فیلد الزامی می باشد"),
  groupCapacity: yup
    .number()
    .min(1, "ظرفیت گروه بین 1 الی 100 می باشد !")
    .max(100, "ظرفیت گروه بین 1 الی 100 می باشد !"),
  courseId: yup
    .object({
      label: yup.string().required("این فیلد الزامی می باشد"),
      value: yup.string().required("این فیلد الزامی می باشد"),
    })
    .required("این فیلد الزامی می باشد"),
});
