import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  dismissToast,
  showErrorToast,
  showLoadingToast,
  showSuccessToast,
} from "../../../../../utility/toast.utils";
import http from "../../../interceptor";

export const useDeleteCourseReserve = (id) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["deleteCourseReserve", id],
    mutationFn: async () =>
      await http
        .delete("/CourseReserve", {
          data: {
            id,
          },
        })
        .then((res) => res.data),
    onMutate: () =>
      showLoadingToast("در حال حذف رزرو ...", "deleteCourseReserveLoading"),
    onSuccess: (data) => {
      dismissToast("deleteCourseReserveLoading");

      if (data.success) {
        showSuccessToast("رزرو با موفقیت حذف شد !");

        queryClient.invalidateQueries({
          queryKey: ["userDetails"],
        });
        queryClient.invalidateQueries({
          queryKey: ["courseReserveWithId"],
        });
      } else showErrorToast("مشکلی در حذف رزرو به وجود آمد !");
    },
    onError: () => {
      dismissToast("deleteCourseReserveLoading");
      showErrorToast("مشکلی در حذف رزرو به وجود آمد !");
    },
  });
};
