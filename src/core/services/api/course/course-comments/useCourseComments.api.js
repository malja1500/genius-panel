import { useQuery } from "@tanstack/react-query";

import http from "../../../interceptor";

export const useCourseComments = (courseId) =>
  useQuery({
    queryKey: ["courseCommetns", courseId],
    queryFn: async () =>
      await http
        .get(`/Course/GetCourseCommnets/${courseId}`)
        .then((res) => res.data),
  });
