import { useQuery } from "@tanstack/react-query";

import http from "../../interceptor";

export const useProfileInfo = () => {
  return useQuery({
    queryKey: ["profileInfo"],
    queryFn: async () =>
      await http.get("/SharePanel/GetProfileInfo").then((res) => res.data),
  });
};
