import { useMutation } from "@tanstack/react-query";

import {
  dismissToast,
  showErrorToast,
  showLoadingToast,
  showSuccessToast,
} from "../../../../utility/toast.utils";
import http from "../../interceptor";

export const useAddCourseTechnology = () =>
  useMutation({
    mutationKey: ["courseTechnology"],
    mutationFn: async (data) => {
      const { courseId, technologies } = data;

      return http
        .post(`/Course/AddCourseTechnology?courseId=${courseId}`, technologies)
        .then((res) => res.data);
    },
    onMutate: () =>
      showLoadingToast(
        "در حال افزودن تکنولوژی ...",
        "addCourseTechnologyLoading"
      ),
    onSuccess: (data) => {
      dismissToast("addCourseTechnologyLoading");

      if (data.success) showSuccessToast("تکنولوژی با موفقیت افزوده شد !");
      else showErrorToast("مشکلی در ایجاد تکنولوژی به وجود آمد !");
    },
    onError: () => {
      dismissToast("addCourseTechnologyLoading");
      showErrorToast("مشکلی در افزودن تکنولوژی به وجود آمد !");
    },
  });
