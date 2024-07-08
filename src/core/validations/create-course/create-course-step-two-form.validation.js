import * as yup from "yup";

export const createCourseStepTwoFormSchema = yup.object().shape({
  googleTitle: yup.string().required("این فیلد الزامی می باشد"),
  googleSchema: yup.string().required("این فیلد الزامی می باشد"),
  uniqueUrlString: yup.string().required("این فیلد الزامی می باشد"),
  shortLink: yup.string().required("این فیلد الزامی می باشد"),
});
