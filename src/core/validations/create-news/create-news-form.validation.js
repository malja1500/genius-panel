import * as yup from "yup";

export const createNewsFormSchema = yup.object().shape({
  title: yup
    .string()
    .min(5, "تعداد کاراکتر های این فیلد بین 10 الی 120 می باشد.")
    .required("این فیلد الزامی می باشد"),
  miniDescribe: yup
    .string()
    .min(5, "تعداد کاراکتر های این فیلد بین 10 الی 300 می باشد.")
    .required("این فیلد الزامی می باشد"),
  googleTitle: yup
    .string()
    .min(5, "تعداد کاراکتر های این فیلد بین 5 الی 70 می باشد.")
    .required("این فیلد الزامی می باشد"),
  googleDescribe: yup
    .string()
    .min(5, "تعداد کاراکتر های این فیلد بین 70 الی 150 می باشد.")
    .required("این فیلد الزامی می باشد"),
  keyword: yup.string().required("این فیلد الزامی می باشد"),
});
