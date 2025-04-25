import { useMutation } from "@tanstack/react-query";

import {
  dismissToast,
  showErrorToast,
  showLoadingToast,
  showSuccessToast,
} from "../../../../utility/toast.utils";
import http from "../../interceptor";

export const useCreateCourse = () =>
  useMutation({
    mutationKey: ["createCourse"],
    mutationFn: async (data) =>
      await http
        .post("/Course", data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => res.data),
    onMutate: () =>
      showLoadingToast("در حال ایجاد دوره ...", "createCourseLoading"),
    onSuccess: () => {
      dismissToast("createCourseLoading");
      showSuccessToast("دوره با موفقیت ایجاد شد !");
    },
    onError: () => {
      dismissToast("createCourseLoading");
      showErrorToast("مشکلی در ایجاد دوره به وجود آمد !");
    },
  });
