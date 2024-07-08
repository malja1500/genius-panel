import http from "../../../interceptor";

export const deleteCourseReserveAPI = async (id) => {
  try {
    const response = await http.delete("/CourseReserve", {
      data: {
        id,
      },
    });

    return response.data;
  } catch (error) {
    return false;
  }
};
