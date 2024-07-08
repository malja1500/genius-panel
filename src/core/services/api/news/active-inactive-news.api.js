import http from "../../interceptor";

export const activeInactiveNewsAPI = async (data) => {
  try {
    const response = await http.put("/News/ActiveDeactiveNews", data);

    return response.data;
  } catch (error) {
    return false;
  }
};
