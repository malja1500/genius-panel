import http from "../../interceptor";

export const getCreateCourseAPI = async () => {
  try {
    const response = await http.get("/Course/GetCreate");

    return response.data;
  } catch (error) {
    return false;
  }
};
