import http from "../../interceptor";

export const updateCourseAPI = async (course) => {
  try {
    const response = await http.put("/Course", course);

    return response.data;
  } catch (error) {
    return false;
  }
};
