import { useMutation } from "@tanstack/react-query";

import {
  dismissToast,
  showErrorToast,
  showLoadingToast,
  showSuccessToast,
} from "../../../../../utility/toast.utils";
import http from "../../../interceptor";

export const useAddCourseGroup = () =>
  useMutation({
    mutationKey: ["addCourseGroup"],
    mutationFn: async (data) =>
      await http.post("/CourseGroup", data).then((res) => res.data),
    onMutate: () =>
      showLoadingToast("در حال افزودن گروه ...", "addCourseGroupLoading"),
    onSuccess: (data) => {
      dismissToast("addCourseGroupLoading");

      if (data.success) showSuccessToast("گروه با موفقیت ایجاد شد !");
      else showErrorToast("مشکلی در افزودن گروه به وجود آمد !");
    },
    onError: () => {
      dismissToast("addCourseGroupLoading");
      showErrorToast("مشکلی در افزودن گروه به وجود آمد !");
    },
  });
