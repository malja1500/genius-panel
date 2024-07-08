import http from "../../interceptor";

export const teacherCommentManagementAPI = async (
  pageNumber,
  rowsOfPage,
  sortingCol,
  sortType,
  query,
  accept,
  userId
) => {
  try {
    const response = await http.get("/Course/CommentManagmentTeacher", {
      params: {
        pageNumber,
        rowsOfPage,
        sortingCol,
        sortType,
        query,
        accept,
        userId,
      },
    });

    return response.data;
  } catch (error) {
    return false;
  }
};
