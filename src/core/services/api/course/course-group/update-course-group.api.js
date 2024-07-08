import http from "../../../interceptor";

export const updateCourseGroupAPI = async (data) => {
  try {
    const response = await http.put("/CourseGroup", data);

    return response.data;
  } catch (error) {
    return false;
  }
};
