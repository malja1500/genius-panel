import { keepPreviousData, useQuery } from "@tanstack/react-query";

import http from "../../interceptor";

export const useAdminCommentManagement = (
  pageNumber,
  rowsOfPage,
  sortingCol,
  sortType,
  query,
  accept,
  userId
) => {
  return useQuery({
    queryKey: [
      "adminCommentManagement",
      pageNumber,
      rowsOfPage,
      sortingCol,
      sortType,
      query,
      accept,
      userId,
    ],
    queryFn: async () =>
      await http
        .get("/Course/CommentManagment", {
          params: {
            pageNumber,
            rowsOfPage,
            sortingCol,
            sortType,
            query,
            accept,
            userId,
          },
        })
        .then((res) => res.data),
    placeholderData: keepPreviousData,
  });
};
