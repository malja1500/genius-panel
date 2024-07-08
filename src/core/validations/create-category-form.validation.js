import * as yup from "yup";

export const categoryFormSchema = yup.object().shape({
  categoryName: yup.string().required("این فیلد الزامی می باشد !"),
  googleTitle: yup
    .string()
    .min(40, "تعداد کارکتر های عنوان گوگل بین 40 الی 70 میباشد")
    .max(70, "تعداد کارکتر های عنوان گوگل بین 40 الی 70 میباشد")
    .required("این فیلد الزامی می باشد !"),
  iconName: yup.string(),
  googleDescribe: yup
    .string()
    .min(70, "تعداد کارکتر های توضیحات گوگل بین 70 الی 150 میباشد")
    .max(150, "تعداد کارکتر های توضیحات گوگل بین 70 الی 150 میباشد")
    .required("این فیلد الزامی می باشد !"),
});
