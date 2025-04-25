import { useMutation, useQueryClient } from "@tanstack/react-query";

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
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["courseList"],
      });
      queryClient.invalidateQueries({
        queryKey: ["teacherCourseList"],
      });
    },
  });
};
