import { useMutation } from "@tanstack/react-query";

import {
  dismissToast,
  showErrorToast,
  showLoadingToast,
  showSuccessToast,
} from "../../../../../utility/toast.utils";
import http from "../../../interceptor";

export const useUpdateCourseGroup = () =>
  useMutation({
    mutationKey: ["updateCourseGroup"],
    mutationFn: async (data) =>
      await http.put("/CourseGroup", data).then((res) => res.data),
    onMutate: () => showLoadingToast("در حال ویرایش گروه ...", "updateCourseGroupLoading"),
    onSuccess: (data) => {
      dismissToast("updateCourseGroupLoading");

      if (data.success) showSuccessToast("گروه با موفقیت ویرایش شد !");
    },
    onError: () => {
      dismissToast("updateCourseGroupLoading");
      showErrorToast("مشکلی در ویرایش گروه به وجود آمد !");
    },
  });
