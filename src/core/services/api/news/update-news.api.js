import http from "../../interceptor";

export const updateNewsAPI = async (data) => {
  try {
    const response = await http.put("/News/UpdateNews", data);

    return response.data;
  } catch (error) {
    return false;
  }
};
