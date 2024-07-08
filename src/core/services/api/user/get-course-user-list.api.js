import http from "../../interceptor";

export const getCourseListAPI = async (
  courseId,
  pageNumber,
  rowsOfPage,
  sortingCol,
  sortType,
  query
) => {
  try {
    const response = await http.get("/CourseUser/GetCourseUserList", {
      params: {
        courseId,
        pageNumber,
        rowsOfPage,
        sortingCol,
        sortType,
        query,
      },
    });

    return response.data;
  } catch (error) {
    return false;
  }
};
