import { useQuery } from "@tanstack/react-query";

import http from "../../../interceptor";

export const useCourseReserveWithId = (courseId) => {
  return useQuery({
    queryKey: ["courseReserveWithId", courseId],
    queryFn: async () =>
      await http.get(`/CourseReserve/${courseId}`).then((res) => res.data),
  });
};
