import { useMutation, useQueryClient } from "@tanstack/react-query";

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
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["courseList"],
      });
      queryClient.invalidateQueries({
        queryKey: ["courseById"],
      });
      queryClient.invalidateQueries({
        queryKey: ["teacherCourseList"],
      });
    },
  });
};
