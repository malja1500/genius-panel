import { useQuery, useQueryClient } from "@tanstack/react-query";

import http from "../../../interceptor";

export const useCourseGroup = (teacherId, courseId, enabled, options = {}) => {
  const queryClient = useQueryClient();

  const fetchCourseGroup = async (teacherId, courseId) =>
    await http
      .get("/CourseGroup/GetCourseGroup", {
        params: {
          teacherId,
          courseId,
        },
      })
      .then((res) => res.data);

  const queryResult = useQuery({
    queryKey: ["courseGroup", teacherId, courseId],
    queryFn: () => fetchCourseGroup(teacherId, courseId),
    enabled,
    ...options,
  });

  return {
    ...queryResult,
    fetchCourseGroup: (teacherId, courseId) =>
      queryClient.fetchQuery({
        queryKey: ["courseGroup", teacherId, courseId],
        queryFn: () => fetchCourseGroup(teacherId, courseId),
      }),
  };
};
