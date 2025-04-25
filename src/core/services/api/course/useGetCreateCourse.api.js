import { useQuery } from "@tanstack/react-query";

import http from "../../interceptor";

export const useGetCreateCourse = () =>
  useQuery({
    queryKey: ["getCreateCourse"],
    queryFn: async () =>
      await http.get("/Course/GetCreate").then((res) => res.data),
  });
