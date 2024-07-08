import http from "../../../interceptor";

export const getCourseGroupsAPI = async (
  pageNumber,
  rowsOfPage,
  sortingCol,
  sortType,
  query
) => {
  try {
    const response = await http.get("/CourseGroup", {
      params: {
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
