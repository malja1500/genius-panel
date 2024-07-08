import http from "../../interceptor";

export const adminNewsFilterListAPI = async (
  pageNumber,
  rowsOfPage,
  sortingCol,
  sortType,
  query,
  isActive
) => {
  try {
    const response = await http.get("/News/AdminNewsFilterList", {
      params: {
        pageNumber,
        rowsOfPage,
        sortingCol,
        sortType,
        query,
        isActive,
      },
    });

    return response.data;
  } catch (error) {
    return false;
  }
};
