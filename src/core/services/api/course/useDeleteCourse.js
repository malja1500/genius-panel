import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  showErrorToast,
  showSuccessToast,
} from "../../../../utility/toast.utils";
import http from "../../interceptor";

export const useDeleteCourse = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["deleteCourse"],
    mutationFn: async (data) =>
      await http
        .delete("/Course/DeleteCourse", {
          data: {
            active: !data.active,
            id: data.id,
          },
        })
        .then((res) => res.data),
    onSuccess: (data, deletedData) => {
      showSuccessToast(
        `دوره با موفقیت ${deletedData.active ? "بازگردانی" : "حذف"} شد !`
      );

      queryClient.invalidateQueries({
        queryKey: ["courseList"],
      });
      queryClient.invalidateQueries({
        queryKey: ["teacherCourseList"],
      });
    },
    onError: () =>
      showErrorToast("مشکلی در حذف یا بازگردانی دوره به وجود آمد !"),
  });
};
