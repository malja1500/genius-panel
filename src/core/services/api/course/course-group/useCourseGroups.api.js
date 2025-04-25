import { keepPreviousData, useQuery } from "@tanstack/react-query";

import http from "../../../interceptor";

export const useCourseGroups = (
  pageNumber,
  rowsOfPage,
  sortingCol,
  sortType,
  query
) =>
  useQuery({
    queryKey: [
      "courseGroups",
      pageNumber,
      rowsOfPage,
      sortingCol,
      sortType,
      query,
    ],
    queryFn: async () =>
      await http
        .get("/CourseGroup", {
          params: {
            pageNumber,
            rowsOfPage,
            sortingCol,
            sortType,
            query,
          },
        })
        .then((res) => res.data),
    placeholderData: keepPreviousData,
  });
