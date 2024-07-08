import http from "../../../interceptor";

export const addCourseGroupAPI = async (data) => {
  try {
    const response = await http.post("/CourseGroup", data);

    return response.data;
  } catch (error) {
    return false;
  }
};
