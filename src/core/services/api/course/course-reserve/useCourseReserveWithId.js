import http from "../../../interceptor";

export const getCourseReserveWithIdAPI = async (courseId) => {
  try {
    const response = await http.get(`/CourseReserve/${courseId}`);

    return response.data;
  } catch (error) {
    return false;
  }
};
