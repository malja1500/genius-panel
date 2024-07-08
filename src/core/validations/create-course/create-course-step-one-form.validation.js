import * as yup from "yup";

export const createCourseStepOneFormSchema = yup.object().shape({
  title: yup.string().required("این فیلد الزامی می باشد"),
  cost: yup
    .number()
    .min(1000, "قیمت دوره نمیتواند از 1000 تومان کمتر باشد")
    .required("این فیلد الزامی می باشد"),
  capacity: yup.number().required("این فیلد الزامی می باشد"),
  sessionNumber: yup.number().required("این فیلد الزامی می باشد"),
  miniDescribe: yup.string().required("این فیلد الزامی می باشد"),
});
