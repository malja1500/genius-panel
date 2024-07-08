import * as yup from "yup";

export const createCourseStepThreeFormSchema = yup.object().shape({
  courseType: yup
    .object()
    .shape({
      id: yup.number(),
      typeName: yup.string(),
      insertDate: yup.string(),
    })
    .required("این فیلد الزامی می باشد"),
  teacherId: yup
    .object()
    .shape({
      courseCounts: yup.number(),
      fullName: yup.string().nullable(),
      linkdinProfileLink: yup.string().nullable(),
      newsCount: yup.number(),
      pictureAddress: yup.string().nullable(),
      teacherId: yup.number(),
    })
    .required("این فیلد الزامی می باشد"),
  classIdState: yup
    .object()
    .shape({
      buildingId: yup.number(),
      buildingName: yup.string().nullable(),
      capacity: yup.number(),
      classRoomName: yup.string(),
      id: yup.number(),
      insertDate: yup.string(),
    })
    .required("این فیلد الزامی می باشد"),
  termId: yup
    .object()
    .shape({
      departmentId: yup.number(),
      departmentName: yup.string().nullable(),
      endDate: yup.string(),
      expire: yup.boolean(),
      id: yup.string(),
      insertDate: yup.string(),
      startDate: yup.string(),
      termName: yup.string(),
    })
    .required("این فیلد الزامی می باشد"),
  // technologiesState: yup
  //   .object()
  //   .shape({
  //     value: yup.string().required("این فیلد الزامی می باشد"),
  //     label: yup.string().required("این فیلد الزامی می باشد"),
  //   })
  //   .required("این فیلد الزامی می باشد"),
});
