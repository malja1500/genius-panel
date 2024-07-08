import { useQuery } from "@tanstack/react-query";

import http from "../../interceptor";

export const useDashboardReport = () => {
  return useQuery({
    queryKey: ["dashboardReport"],
    queryFn: async () =>
      await http.get("/Report/DashboardReport").then((res) => res.data),
  });
};
