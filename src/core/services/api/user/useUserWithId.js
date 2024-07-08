import { useQuery } from "@tanstack/react-query";
import http from "../../interceptor";

export const useUserWithId = (userId) => {
  return useQuery({
    queryKey: ["userDetails", userId],
    queryFn: async () =>
      await http.get(`/User/UserDetails/${userId}`).then((res) => res.data),
  });
};
