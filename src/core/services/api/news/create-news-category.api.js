import http from "../../interceptor";

export const createNewsCategoryAPI = async (data) => {
  try {
    const response = await http.post("/News/CreateNewsCategory", data);

    return response.data;
  } catch (error) {
    return false;
  }
};
