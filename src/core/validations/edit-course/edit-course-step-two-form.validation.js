import * as yup from "yup";

export const editCourseStepTwoFormSchema = yup.object().shape({
  googleTitle: yup.string().nullable(),
  googleSchema: yup.string().nullable(),
  uniqueUrlString: yup.string().required("این فیلد الزامی می باشد"),
  shortLink: yup.string().nullable(),
});
