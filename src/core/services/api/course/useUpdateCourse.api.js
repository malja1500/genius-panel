import { useMutation } from "@tanstack/react-query";

import {
  dismissToast,
  showLoadingToast,
  showSuccessToast,
} from "../../../../utility/toast.utils";
import http from "../../interceptor";

export const useUpdateCourse = () =>
  useMutation({
    mutationKey: ["updateCourse"],
    mutationFn: async (course) =>
      await http.put("/Course", course).then((res) => res.data),
    onMutate: () =>
      showLoadingToast("در حال ویرایش دوره ...", "updateCourseLoading"),
    onSuccess: (data) => {
      dismissToast("updateCourseLoading");

      if (data.success) showSuccessToast("دوره با موفقیت ویرایش شد !");
    },
    onError: () => dismissToast("updateCourseLoading"),
  });
