import { keepPreviousData, useQuery } from "@tanstack/react-query";

import http from "../../interceptor";

export const useUserLists = (
  pageNumber,
  rowsOfPage,
  sortingCol,
  sortType,
  query,
  isActiveUser,
  isDeletedUser,
  roleId
) => {
  return useQuery({
    queryKey: [
      "userLists",
      pageNumber,
      rowsOfPage,
      sortingCol,
      sortType,
      query,
      isActiveUser,
      isDeletedUser,
      roleId,
    ],
    queryFn: async () =>
      await http
        .get("/User/UserMannage", {
          params: {
            pageNumber,
            rowsOfPage,
            sortingCol,
            sortType,
            query,
            isActiveUser,
            isDeletedUser,
            roleId,
          },
        })
        .then((res) => res.data),
    staleTime: 100000,
    placeholderData: keepPreviousData,
  });
};
