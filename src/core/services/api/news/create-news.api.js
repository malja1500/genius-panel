import http from "../../interceptor";

export const createNewsAPI = async (data) => {
  try {
    const response = await http.post("/News/CreateNews", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    return false;
  }
};
