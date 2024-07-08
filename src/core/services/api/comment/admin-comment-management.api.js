import http from "../../interceptor";

export const adminCommentManagementAPI = async (
  pageNumber,
  rowsOfPage,
  sortingCol,
  sortType,
  query,
  accept,
  userId
) => {
  try {
    const response = await http.get("/Course/CommentManagment", {
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
