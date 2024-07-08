import http from "../../interceptor";

export const getNewsCategoryAPI = async (id) => {
  try {
    const response = await http.get(`/News/GetNewsCategory/${id}`);

    return response.data;
  } catch (error) {
    return false;
  }
};
