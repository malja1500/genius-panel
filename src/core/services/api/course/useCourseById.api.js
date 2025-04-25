import { useQuery, useQueryClient } from "@tanstack/react-query";

import http from "../../interceptor";

export const useCourseById = (id) => {
  const queryClient = useQueryClient();

  const fetchCourseById = async () =>
    await http.get(`/Course/${id}`).then((res) => res.data);

  const queryResult = useQuery({
    queryKey: ["courseById", id],
    queryFn: fetchCourseById,
  });

  return {
    ...queryResult,
    fetchCourseById: () =>
      queryClient.fetchQuery({
        queryKey: ["courseById", id],
        queryFn: fetchCourseById,
      }),
  };
};
