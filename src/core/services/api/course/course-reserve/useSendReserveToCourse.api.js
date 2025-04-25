import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  dismissToast,
  showErrorToast,
  showLoadingToast,
  showSuccessToast,
} from "../../../../../utility/toast.utils";
import http from "../../../interceptor";

export const useSendReserveToCourse = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["sendCourseReserveToCourse"],
    mutationFn: async (data) => {
      const { courseId, courseGroupId, studentId } = data;

      return await http
        .post("/CourseReserve/SendReserveToCourse", {
          courseId,
          courseGroupId,
          studentId,
        })
        .then((res) => res.data);
    },
    onMutate: () =>
      showLoadingToast(
        "در حال تایید رزرو ...",
        "sendCourseReserveToCourseLoading"
      ),
    onSuccess: (data) => {
      dismissToast("sendCourseReserveToCourseLoading");

      if (data.success) {
        showSuccessToast("رزرو با موفقیت تایید شد !");

        queryClient.invalidateQueries({
          queryKey: ["courseReserveWithId"],
        });
        queryClient.invalidateQueries({
          queryKey: ["userDetails"],
        });
      } else showErrorToast("مشکلی در تایید رزرو به وجود آمد !");
    },
    onError: () => {
      dismissToast("sendCourseReserveToCourseLoading");
      showErrorToast("مشکلی در تایید رزرو به وجود آمد !");
    },
  });
};
