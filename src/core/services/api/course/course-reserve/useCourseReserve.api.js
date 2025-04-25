import { useQuery } from "@tanstack/react-query";
import http from "../../../interceptor";

export const useCourseReserve = () =>
  useQuery({
    queryKey: ["course-reserve"],
    queryFn: async () =>
      await http.get("/CourseReserve").then((res) => res.data),
  });
