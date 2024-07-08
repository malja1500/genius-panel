import http from "../../interceptor";

export const courseReserveAPI = async () => {
  try {
    const response = await http.get("/CourseReserve");

    return response.data;
  } catch (error) {
    return false;
  }
};
