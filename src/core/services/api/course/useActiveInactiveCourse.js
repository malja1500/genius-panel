import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  showErrorToast,
  showSuccessToast,
} from "../../../../utility/toast.utils";
import http from "../../interceptor";

export const useActiveInactiveCourse = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["activeInactiveCourse"],
    mutationFn: async (data) =>
      await http
        .put("/Course/ActiveAndDeactiveCourse", {
          active: data.active,
          id: data.id,
        })
        .then((res) => res.data),
    onSuccess: (data, deletedData) => {
      showSuccessToast(
        `دوره با موفقیت ${deletedData.active ? "فعال" : "غیرفعال"} شد !`
      );

      queryClient.invalidateQueries({
        queryKey: ["courseList"],
      });
      queryClient.invalidateQueries({
        queryKey: ["teacherCourseList"],
      });
    },
    onError: () => {
      showErrorToast("مشکلی در فعال یا غیرفعال کردن دوره به وجود آمد !");
    },
  });
};
