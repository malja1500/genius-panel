import { useQuery } from "@tanstack/react-query";
import http from "../../interceptor";

export const useCourseList = (
  pageNumber,
  rowsOfPage,
  sortingCol,
  sortType,
  query,
  isTeacherCourse
) => {
  return useQuery({
    queryKey: [
      isTeacherCourse ? "teacherCourseList" : "courseList",
      pageNumber,
      rowsOfPage,
      sortingCol,
      sortType,
      query,
    ],
    queryFn: async () =>
      await http
        .get(
          `${
            isTeacherCourse ? "/Course/TeacherCourseList" : "/Course/CourseList"
          }`,
          {
            params: {
              pageNumber,
              rowsOfPage,
              sortingCol,
              sortType,
              query,
            },
          }
        )
        .then((res) => res.data),
  });
};
