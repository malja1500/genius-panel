import { useQuery } from "@tanstack/react-query";

import http from "../../interceptor";

export const useGetEditCourse = (courseId) =>
  useQuery({
    queryKey: ["getEditCourse"],
    queryFn: async () =>
      await http
        .get("/Course/GetEditCourse", {
          params: {
            courseId,
          },
        })
        .then((res) => res.data),
  });
